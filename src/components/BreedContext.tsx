import React, { useState, createContext } from 'react';
import { CatBreed } from '../types';

type BreedContextData = {
    breedId: string,
    setBreedId: React.Dispatch<React.SetStateAction<string>>,
    breeds: CatBreed[],
    setBreeds: React.Dispatch<React.SetStateAction<CatBreed[]>>

}

const defaultValues: BreedContextData = {
    breedId: "default",
    setBreedId: () => "default",
    breeds: [],
    setBreeds: () => []
}

export const BreedContext = createContext<BreedContextData>(defaultValues);

export function BreedProvier(props: any) {
    const [breeds, setBreeds] = useState<CatBreed[]>([]);
    const [breedId, setBreedId] = useState("default");
    const value = {
        breeds, setBreeds,
        breedId, setBreedId
    }

    return (
        <BreedContext.Provider value={value}>
            {props.children}
        </BreedContext.Provider>
    )
}