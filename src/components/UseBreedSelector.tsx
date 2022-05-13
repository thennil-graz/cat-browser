import React, { useState, useContext, useEffect, useRef } from 'react';
import { CatBreed, CatImage, CatImageQueryParams } from '../types';
import { getCatImagesByBreed } from '../api/CatApi';
import { useSearchParams } from 'react-router-dom';
import { BreedContext } from '../components/BreedContext';

export const useBreedSelector = () => {
    const { breeds, breedId, setBreedId } = useContext(BreedContext);
    const [searchParams] = useSearchParams();
    const breedParam = searchParams.get('breed');

    const items = listBreeds(breeds);
    const prevSelected = useRef<string>();

    const [isLoading, setIsLoading] = useState(false);
    const [loadNextPage, setLoadNextPage] = useState(false);
    const [cards, setCards] = useState<CatImage[]>([]);

    const [pageInfo, setPageInfo] = useState({
        totalPage: 0,
        currentPage: 0,
    });

    useEffect(() => {
        const { currentPage } = pageInfo;

        //check if there's selected breed ID in search parameters and in the state
        if (breedId !== "default" || breedParam) {
            const selected = breedParam ? breedParam : breedId;
            setBreedId(selected)
            loadCatImages(selected, currentPage);
        }

    }, [breedId, loadNextPage])

    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        searchParams.delete("breed");
        prevSelected.current = breedId;
        setBreedId(e.target.value);
        setIsLoading(true);
        setLoadNextPage(false);
        setPageInfo({
            totalPage: 0,
            currentPage: 0
        })
    }

    const loadMoreData = () => {
        prevSelected.current = breedId;
        setLoadNextPage(true);
        setPageInfo({
            ...pageInfo
        })
    }

    function loadCatImages(breedId: string, currentPage: number) {
        const params: CatImageQueryParams = {
            breed_id: breedId,
            limit: 10,
            page: currentPage,
            order: "asc"
        }

        getCatImagesByBreed(params).then(response => {
            const list: CatImage[] = [];
            const { data, headers } = response;

            // get the total no of results matching the request
            const { 'pagination-count': resultCount } = headers;

            // get the total page base from the result count and limit
            const pageInfo = {
                totalPage: Math.ceil(parseInt(resultCount) / params.limit),
                currentPage: currentPage + 1
            };

            data.map(({ id: imageId, url }) => (
                list.push({
                    imageId,
                    url
                })
            ));
            setPageInfo(pageInfo);
            // check if previous selected is the same with current breedId
            // so we know if the load more button is clicked
            // else replace the cards with new results
            setCards(prevSelected.current === breedId ? cards.concat(list) : list);
            setIsLoading(false);
        }).catch(err => {
            setBreedId("");
            setCards([]);
            setIsLoading(false);
            setLoadNextPage(false);
        }).finally(() => {
            setIsLoading(false);
            setLoadNextPage(false);
        });
    }

    function listBreeds(breeds: CatBreed[]) {
        const items = [];
        if (breeds.length === 0) {
            items.push(<option key={0} value="default" >No breeds are available</option>);
        } else {
            items.push(<option key={0} value="default">Please select a breed</option>);
            breeds.map(({ id, name }) => items.push(<option key={id} value={id}>{name}</option>));
        }
        return items;
    }

    return { breedId, items, cards, pageInfo, isLoading, loadMoreData, loadNextPage, handleOnChange }
}