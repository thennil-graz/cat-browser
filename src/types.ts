
export interface CatBreed {
    id: string,
    name: string,
    origin: string,
    temperament: string,
    description: string
}

export interface CatImage {
    imageId: string,
    url: string
}

export interface CatDetails extends CatBreed, CatImage { }

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