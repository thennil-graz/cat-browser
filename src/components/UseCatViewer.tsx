import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, createSearchParams } from 'react-router-dom';
import { getCatImage } from '../api/CatApi';
import { BreedContext } from '../components/BreedContext'
import { CatDetails } from '../types';

export const useCatViewer = () => {
    const { setBreedId } = useContext(BreedContext);
    const { catId } = useParams<string>();
    const navigate = useNavigate();
    const [cat, setCat] = useState<CatDetails | null | undefined>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (catId) {
            setIsLoading(true);
            getCatImage(catId).then(response => {
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
    }, [catId])

    const handleBackButton = (breedId: string): void => {
        setBreedId(breedId);
        navigate({
            pathname: '/',
            search: `?${createSearchParams({ breed: breedId })}`
        })
    }

    return { cat, isLoading, error, handleBackButton }
}