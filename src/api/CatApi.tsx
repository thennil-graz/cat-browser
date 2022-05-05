import axios from 'axios';
import { api } from './config';
import { PageInfo } from '../types';


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

export function getCatImagesByBreed(breed_id: string, page_info: PageInfo) {
    return catClient.get('/images/search', {
        params: {
            breed_id,
            ...page_info
        }
    });
}