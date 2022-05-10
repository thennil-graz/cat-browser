import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap'
import BreedSelector from './BreedSelector';
import { getBreeds } from '../api/CatApi';
import { CatBreed } from '../types';

function Home() {
    // Breeds is empty on initial state
    const [breeds, setBreeds] = useState<CatBreed[]>([]);

    // Fetch breeds from API on initial render of component 
    useEffect(() => {
        getBreeds().then(response => {
            setBreeds(response.data)
        })
    }, []);


    return (
        <div className="Home">
            <Container fluid="md">
                <Row>
                    <BreedSelector breeds={breeds} />
                </Row>
            </Container>
        </div >
    );
}

export default Home;
