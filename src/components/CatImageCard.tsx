import React from 'react';
import { Button, Col, Card, Ratio } from 'react-bootstrap';
import { CatImage, CatInfo } from '../types';



function CatImageCard({ breed, image }: CatInfo) {
    return (
        <Col md={3} sm={6} xs={12}>
            <Card id={image.id}>
                <Card.Img variant="top" src={image.url} />
                <Card.Body>
                    <Button variant="primary" >View Details</Button>
                </Card.Body>
            </Card>
        </Col>
    );

}

export default CatImageCard;