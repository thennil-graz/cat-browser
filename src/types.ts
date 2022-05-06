export interface CatBreed {
    id: string,
    name: string,
    origin: string,
    temperament: string,
    description: string
}

export interface CatImage {
    id: string,
    url: string
}

export interface CatInfo {
    breed: CatBreed,
    image: CatImage
}

export interface CatAPIResponse {
    breeds: CatBreed[],
    id: string,
    url: string
}

export interface PageInfo {
    [key: string]: string | number
}

export interface CatImageQueryParams {
    breed_id: string,
    limit: number,
    page: number,
    order: string
}