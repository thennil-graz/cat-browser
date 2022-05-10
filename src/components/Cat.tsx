import { useState, useEffect, } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert, Card, Col, Button, Row, Container } from 'react-bootstrap';
import { getCatImage } from '../api/CatApi';
import { CatDetails } from '../types';
import Loader from './Loader';

type CatParams = {
    id: string
}

function Cat() {
    const { id } = useParams<CatParams>();
    const navigate = useNavigate();
    const [cat, setCat] = useState<CatDetails | null | undefined>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            getCatImage(id).then(response => {
                setIsLoading(false);
                const { breeds, id: imageId, url } = response.data;
                if (breeds) {
                    const { id, name, origin, temperament, description } = breeds[0];
                    setCat({
                        id,
                        name,
                        origin,
                        temperament,
                        description,
                        imageId,
                        url
                    })
                    setError(false);
                }
            }).catch(err => {
                setIsLoading(false);
                setError(true);
            });
        }
    }, [id])

    if (!cat) {
        return displayError();
    }

    const { imageId, url, name, origin, temperament, description } = cat;
    return (
        <div className="Cat">
            <Container fluid="md">
                <Row>
                    <Col xs={12}>
                        {isLoading ?
                            <Loader />
                            : <>
                                <Card id={imageId}>
                                    <Card.Header>
                                        <Button variant="primary" size="sm" onClick={() => navigate(-1)}>Back</Button>
                                    </Card.Header>
                                    <Card.Img variant="top" src={url} />
                                    <Card.Body>
                                        <Card.Title as="h4" >{name}</Card.Title>
                                        <Card.Title as="h5">Origin: {origin}</Card.Title>
                                        <Card.Subtitle>{temperament}</Card.Subtitle>
                                        <Card.Text>{description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    );

    function displayError() {
        return <Container fluid="md">
            <Row md={1}>
                <Col>{error ?
                    <Alert key="danger" variant="danger">
                        Apologies but we could not load new cats for you at this time! Miau!
                    </Alert>
                    : <>
                        <Loader />
                    </>}
                </Col>
            </Row>
        </Container>;
    }
}

export default Cat;