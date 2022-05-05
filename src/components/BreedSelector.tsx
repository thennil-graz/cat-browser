import React, { useState, useEffect } from 'react';
import { Col, FormGroup, FormLabel, FormSelect, Row, Spinner } from 'react-bootstrap';
import { CatAPIResponse, CatBreed, CatImage, CatInfo, PageInfo } from '../types';
import CatImageCard from './CatImageCard';
import { getCatImagesByBreed } from '../api/CatApi';

interface Props {
    breeds: CatBreed[]
}
function BreedSelector({ breeds }: Props) {
    const items = listBreeds(breeds);
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState("");
    const [cards, setCards] = useState<CatInfo[]>([]);
    const paging: PageInfo = {
        limit: 10,
        page: 1,
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setValue(e.target.value);
        setIsLoading(true);

        getCatImagesByBreed(e.target.value, paging).then(response => {
            const list: CatInfo[] = [];
            const { data }: { data: CatAPIResponse[] } = response;

            data.map(({ breeds, id, url }) => {
                const [breed] = breeds;
                list.push({
                    breed: breed,
                    image: {
                        id: id,
                        url: url
                    }
                });
            })
            setCards(list)
            setIsLoading(false);
        }).catch(err => {
            setValue("");
            setCards([])
            setIsLoading(false);
        })
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
                    ? <Spinner animation="grow" variant="primary" />
                    : listCatImages(cards)
                }
            </Row></>
    );
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

export default BreedSelector;

