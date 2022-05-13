import { Button, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CatImage } from '../types';

function CatImageCard({ imageId, url }: CatImage) {
    const navigate = useNavigate();
    const handleViewButton = (imageId: string): void => {
        navigate({
            pathname: `/${imageId}`
        })
    }

    return (
        <Col md={3} sm={6} xs={12} className="gy-3">
            <Card id={imageId} className=" shadow">
                <Card.Img variant="top" src={url} alt={imageId} />
                <Card.Body>
                    <Button onClick={() => handleViewButton(imageId)} variant="primary" style={{ width: '100%' }} >View Details</Button>
                </Card.Body>
            </Card>
        </Col >
    );

}

export default CatImageCard;
