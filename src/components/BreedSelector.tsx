import React from 'react';
import { Button, Col, FormGroup, FormLabel, FormSelect, Row } from 'react-bootstrap';
import { CatImage } from '../types';
import CatImageCard from './CatImageCard';
import Loader from './Loader'
import { useBreedSelector } from '../components/UseBreedSelector'


function BreedSelector() {
    const { breedId, items, cards, pageInfo, isLoading,
        loadMoreData, loadNextPage, handleOnChange
    } = useBreedSelector();

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

    function listCatImages(cards: CatImage[]): React.ReactNode {
        return cards.length === 0
            ? <span>No cats are available</span>
            : cards.map(({ imageId, url }) => <CatImageCard imageId={imageId} url={url} />);
    }
}

export default BreedSelector;

