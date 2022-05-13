import { Alert, Card, Col, Button, Row, Container } from 'react-bootstrap';
import Loader from './Loader';
import { useCatViewer } from '../components/UseCatViewer';


function Cat() {
    const { cat, isLoading, error, handleBackButton } = useCatViewer();

    if (!cat) {
        return displayError();
    }

    const { id: breedId, imageId, url, name, origin, temperament, description } = cat;
    return (
        <div className="Cat">
            <Container>
                <Row className="m-2">
                    <Col xs={12}>
                        {isLoading ?
                            <Loader />
                            : <>
                                <Card id={imageId}>
                                    <Card.Header>
                                        <Button variant="primary" size="sm" onClick={() => handleBackButton(breedId)}>Back</Button>
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