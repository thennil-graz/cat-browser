import axios from 'axios';
import { api } from './config';
import { CatImageQueryParams } from '../types';


const catClient = axios.create({
    baseURL: `${api.url}${api.version}`,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': api.apiKey
    }
})

export function getBreeds() {
    return catClient.get('/breeds');
}

export function getCatImagesByBreed({ breed_id, limit, page, order }: CatImageQueryParams) {
    return catClient.get('/images/search', {
        params: {
            breed_id,
            limit,
            page,
            order
        }
    });
}