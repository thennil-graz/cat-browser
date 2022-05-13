import React, { useState, useContext, useEffect, useRef } from 'react';
import { Button, Col, FormGroup, FormLabel, FormSelect, Row } from 'react-bootstrap';
import { CatBreed, CatImage, CatImageQueryParams } from '../types';
import CatImageCard from './CatImageCard';
import { getCatImagesByBreed } from '../api/CatApi';
import Loader from './Loader'
import { useSearchParams } from 'react-router-dom';
import { BreedContext } from '../components/BreedContext'

function BreedSelector() {
    const { breeds, breedId, setBreedId } = useContext(BreedContext);
    const [searchParams] = useSearchParams();
    const breedParam = searchParams.get('breed');

    const items = listBreeds(breeds);
    const prevSelected = useRef<string>();

    const [isLoading, setIsLoading] = useState(false);
    const [loadNextPage, setLoadNextPage] = useState(false);
    const [cards, setCards] = useState<CatImage[]>([]);

    const [pageInfo, setPageInfo] = useState({
        totalPage: 0,
        currentPage: 0,
    });

    useEffect(() => {
        const { currentPage } = pageInfo;

        //check if there's selected breed ID in search parameters and in the state
        if (breedId !== "default" || breedParam) {
            const selected = breedParam ? breedParam : breedId;
            setBreedId(selected)
            loadCatImages(selected, currentPage);
        }

    }, [breedId, loadNextPage])

    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        searchParams.delete("breed");
        prevSelected.current = breedId;
        setBreedId(e.target.value);
        setIsLoading(true);
        setLoadNextPage(false);
        setPageInfo({
            totalPage: 0,
            currentPage: 0
        })
    }

    const loadMoreData = () => {
        prevSelected.current = breedId;
        setLoadNextPage(true);
        setPageInfo({
            ...pageInfo
        })
    }

    return (
        <><Col md={6}>
            <FormGroup className="mb-3">
                <FormLabel htmlFor="breed">Breed</FormLabel>
                <FormSelect id="breed" size="sm" value={breedId} onChange={handleOnChange}>
                    {items}
                </FormSelect>
            </FormGroup>
        </Col>
            <Row>
                {isLoading
                    ? <Col md={6}> <Loader /> </Col>
                    : listCatImages(cards)
                }
            </Row>
            {cards.length > 0 && (pageInfo.totalPage > pageInfo.currentPage) &&
                <Row className="mb-3">
                    <Col md={6}>
                        <Button variant="success" onClick={loadMoreData} disabled={loadNextPage}>
                            {loadNextPage ? <Loader /> : 'Load More'}
                        </Button>
                    </Col>
                </Row>
            }
        </>
    );

    function loadCatImages(breedId: string, currentPage: number) {
        const params: CatImageQueryParams = {
            breed_id: breedId,
            limit: 10,
            page: currentPage,
            order: "asc"
        }

        getCatImagesByBreed(params).then(response => {
            const list: CatImage[] = [];
            const { data, headers } = response;

            const { 'pagination-count': resultCount } = headers;

            const pageInfo = {
                totalPage: Math.ceil(parseInt(resultCount) / params.limit),
                currentPage: currentPage + 1
            };

            data.map(({ id: imageId, url }) => (
                list.push({
                    imageId,
                    url
                })
            ));
            setPageInfo(pageInfo);
            setCards(prevSelected.current === breedId ? cards.concat(list) : list);
            setIsLoading(false);
            console.log(cards.length)
        }).catch(err => {
            setBreedId("");
            setCards([]);
            setIsLoading(false);
            setLoadNextPage(false);
        }).finally(() => {
            setIsLoading(false);
            setLoadNextPage(false);
        });
    }

    function listCatImages(cards: CatImage[]): React.ReactNode {
        return cards.length === 0
            ? <span>No cats are available</span>
            : cards.map(({ imageId, url }) => <CatImageCard imageId={imageId} url={url} />);
    }

    function listBreeds(breeds: CatBreed[]) {
        const items = [];
        if (breeds.length === 0) {
            items.push(<option key={0} value="default" >No breeds are available</option>);
        } else {
            items.push(<option key={0} value="default">Please select a breed</option>);
            breeds.map(({ id, name }) => items.push(<option key={id} value={id}>{name}</option>));
        }
        return items;
    }
}

export default BreedSelector;

