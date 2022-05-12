import { useEffect, useContext } from 'react';
import { Container, Row } from 'react-bootstrap'
import BreedSelector from './BreedSelector';
import { getBreeds } from '../api/CatApi';
import { BreedContext } from '../components/BreedContext';

function Home() {
    const { breeds, setBreeds } = useContext(BreedContext);

    // Fetch breeds from API on initial render of component 
    useEffect(() => {
        if (breeds.length) {
            return;
        }
        getBreeds().then(response => {
            setBreeds(response.data)
        })
    }, [breeds]);


    return (
        <div className="Home">
            <Container fluid="md">
                <Row>
                    <BreedSelector />
                </Row>
            </Container>
        </div >
    );
}

export default Home;
