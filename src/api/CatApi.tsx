import axios, { AxiosResponse, AxiosResponseHeaders } from 'axios';
import { api } from './config';
import { CatAPIResponse, CatBreed, CatImageQueryParams } from '../types';


const catClient = axios.create({
    baseURL: `${api.url}${api.version}`,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': api.apiKey
    }
})

export function getBreeds(): Promise<AxiosResponse<CatBreed[], AxiosResponseHeaders>> {
    return catClient.get('/breeds');
}

export function getCatImagesByBreed({ breed_id, limit, page, order }: CatImageQueryParams)
    : Promise<AxiosResponse<CatAPIResponse[], AxiosResponseHeaders>> {
    return catClient.get('/images/search', {
        params: {
            breed_id,
            limit,
            page,
            order,
            size: "full"
        }
    });
}
export function getCatImage(id: string): Promise<AxiosResponse<CatAPIResponse, AxiosResponseHeaders>> {
    return catClient.get(`/images/${id}`);
}