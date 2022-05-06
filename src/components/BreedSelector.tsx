import React, { useState } from 'react';
import { Button, Col, FormGroup, FormLabel, FormSelect, Row, Spinner } from 'react-bootstrap';
import { CatAPIResponse, CatBreed, CatInfo, CatImageQueryParams } from '../types';
import CatImageCard from './CatImageCard';
import { getCatImagesByBreed } from '../api/CatApi';
import { AxiosResponseHeaders } from 'axios';

interface Props {
    breeds: CatBreed[]
}
function BreedSelector({ breeds }: Props) {
    const items = listBreeds(breeds);
    const [isLoading, setIsLoading] = useState(false);
    const [loadNextPage, setLoadNextPage] = useState(false);
    const [value, setValue] = useState("");
    const [cards, setCards] = useState<CatInfo[]>([]);

    const [pageInfo, setPageInfo] = useState({
        totalPage: 0,
        currentPage: 0,
    });


    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const params: CatImageQueryParams = {
            breed_id: e.target.value,
            limit: 10,
            page: 0,
            order: "asc"
        }

        setValue(e.target.value);
        setIsLoading(true);
        setLoadNextPage(false);
        loadCatImages(params, 0);
    }

    const handleButtonClick = () => {
        const { currentPage } = pageInfo;
        const params: CatImageQueryParams = {
            breed_id: value,
            limit: 10,
            page: currentPage,
            order: "asc"
        }
        setLoadNextPage(true);
        loadCatImages(params, currentPage);
    }

    return (
        <><Col md={6}>
            <FormGroup className="mb-3">
                <FormLabel>Breed</FormLabel>
                <FormSelect id="breed" size="sm" value={value} onChange={handleOnChange}>
                    {items}
                </FormSelect>
            </FormGroup>
        </Col>
            <Row>
                {isLoading
                    ? <Col md={6}> <LoadingPlaceholder /> </Col>
                    : listCatImages(cards)
                }
            </Row>
            {cards.length > 0 && (pageInfo.totalPage > pageInfo.currentPage) &&
                <Row>
                    <Col md={6}>
                        <Button variant="primary" onClick={handleButtonClick} disabled={loadNextPage}>
                            {loadNextPage ? <LoadingPlaceholder /> : 'Load More'}
                        </Button>
                    </Col>
                </Row>
            }
        </>
    );

    function LoadingPlaceholder() {
        return <><Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> Loading results...</>;
    }

    function loadCatImages(params: CatImageQueryParams, currentPage: number) {
        getCatImagesByBreed(params).then(response => {
            const list: CatInfo[] = [];
            const { data, headers }: { data: CatAPIResponse[]; headers: AxiosResponseHeaders; } = response;

            const { 'pagination-count': resultCount } = headers;

            const pageInfo = {
                totalPage: Math.ceil(parseInt(resultCount) / params.limit),
                currentPage: currentPage + 1
            };
            setPageInfo(pageInfo);

            data.map(({ breeds, id, url }) => {
                const [breed] = breeds;
                list.push({
                    breed: breed,
                    image: {
                        id: id,
                        url: url
                    }
                });
            });
            setCards(params.breed_id === value && cards.length > 0 ? cards.concat(list) : list);
            setIsLoading(false);
            setLoadNextPage(false);
        }).catch(err => {
            setValue("");
            setCards([]);
            setIsLoading(false);
            setLoadNextPage(false);
        });
    }

    function listCatImages(cards: CatInfo[]): React.ReactNode {
        return cards.length === 0
            ? <span>No cats are available</span>
            : cards.map(c => <CatImageCard breed={c.breed} image={c.image} />);
    }

    function listBreeds(breeds: CatBreed[]) {
        const items = [];
        if (breeds.length === 0) {
            items.push(<option key={0} value="" >No breeds are available</option>);
        } else {
            items.push(<option key={0}>Please select a breed</option>);
            breeds.map(({ id, name }) => items.push(<option key={id} value={id}>{name}</option>));
        }
        return items;
    }
}

export default BreedSelector;

