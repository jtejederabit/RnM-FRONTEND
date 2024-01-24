import React, {useEffect, useState} from "react";
import CharacterCard from "./CharacterCard.tsx";
import {ICharacter} from "../../utils/types.ts";
import {useDispatch, useSelector} from "react-redux";
import {setCharacters, setCount, setFilters} from "../../store/charactersSlice.ts";
import {setError} from "../../store/errorSlice.ts";
import useAxios from "../../utils/hooks/useAxios.tsx";
import {RootState} from "../../store/store.ts";
import Loading from "../shared/Loading.tsx";
import './CharactersGrid.css';
import {AxiosError} from "axios";

const CharactersGrid: React.FC = () => {
    const characters: ICharacter[] = useSelector((state: RootState) => state.characters.characters);
    const currentPage = useSelector((state: RootState) => state.characters.currentPage);
    const dispatch = useDispatch();
    const { request } = useAxios();

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getCharacters = async () => {
            const queryParams = new URLSearchParams(location.search);
            const updatedFilters = {
                status: queryParams.get('status') || '',
                specie: queryParams.get('specie') || '',
                type: queryParams.get('type') || '',
                name: queryParams.get('name') || '',
                page: Number(queryParams.get('page')) || 1,
            };
            dispatch(setFilters(updatedFilters));

            try {
                setLoading(true);
                const {results: characters, info} = await request('/characters', {
                    method: 'GET',
                    params: updatedFilters,
                });
                dispatch(setCharacters(characters));
                dispatch(setCount(characters.length ? info.pages : 0));
                setLoading(false);
                dispatch(setError(null));
            } catch (err: unknown) {
                dispatch(setError(err as AxiosError));
                setLoading(false);
            }
        };

        getCharacters();
    }, [currentPage, location.search]);

    return (
        <div className="charactersGrid">
            {
                loading ? (
                    <div className="loadingContainer">
                        <Loading />
                    </div>
                ) : (
                    characters.length ?
                        characters.map((character) => (
                            <CharacterCard key={character.id} {...character} />
                        )) : (
                            <div className="noCharactersFound">
                                <h1>No characters found...</h1>
                            </div>
                        )
                )
            }
        </div>
    );
}

export default CharactersGrid;