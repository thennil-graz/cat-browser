import React from 'react';
import { Card, Col, Container, Button, Row } from 'react-bootstrap';
import { CatBreed, CatImage } from '../types';

interface Props {
    breed: CatBreed,
    image: CatImage

}

function CatInfo({ breed, image }: Props) {
    const { name, origin, temperament, description } = breed;
    const { id, url } = image;
    return (
        <Row md={1}>
            <Button variant="primary" size="lg">Back</Button>
            <Col md>
                <Card id={id}>
                    <Card.Img variant="top" src={url} />
                    <Card.Body>
                        <Card.Title as="h4" >{name}</Card.Title>
                        <Card.Title as="h5">Origin: {origin}</Card.Title>
                        <Card.Subtitle>{temperament}</Card.Subtitle>
                        <Card.Text>{description}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>

    );
}

export default CatInfo;