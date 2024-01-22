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
    const filters = useSelector((state: RootState) => state.characters.filters);
    const currentPage = useSelector((state: RootState) => state.characters.currentPage);
    const dispatch = useDispatch();
    const { request } = useAxios();

    const [loading, setLoading] = useState<boolean>(true);



    useEffect(() => {
        setLoading(true);
        const getCharacters = async () => {
            try {
                const {results: characters, info} = await request('/characters', {
                    method: 'GET',
                    params: {
                        ...filters
                    },
                });

                dispatch(setCharacters(characters));
                characters.length ? dispatch(setCount(info.pages)) : dispatch(setCount(0));
                setLoading(false);
                dispatch(setError(null));
            } catch (err: unknown) {
                dispatch(setError(err as AxiosError));
                setLoading(false);
            }
        };
        getCharacters();
    }, [currentPage, filters]);

    useEffect(() => {
        const getParams = () => {
            const queryParams = new URLSearchParams(location.search);
            const status = queryParams.get('status');
            const species = queryParams.get('specie');
            const type = queryParams.get('type');
            const name = queryParams.get('name');
            const page = queryParams.get('page');
            dispatch(setFilters({
                status: status || '',
                specie: species || '',
                type: type || '',
                name: name || '',
                page: Number(page) || 1,
            }));
        }
        getParams();
    }, []);

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