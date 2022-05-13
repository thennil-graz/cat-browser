import { Button, Col, Card } from 'react-bootstrap';
import { CatImage } from '../types';



function CatImageCard({ imageId, url }: CatImage) {
    return (
        <Col md={3} sm={6} xs={12} className="gy-3">
            <Card id={imageId} className="shadow p-3">
                <Card.Img variant="top" src={url} alt={imageId} />
                <Card.Body>
                    <Button href={`/${imageId}`} variant="primary" >View Details</Button>
                </Card.Body>
            </Card>
        </Col >
    );

}

export default CatImageCard;