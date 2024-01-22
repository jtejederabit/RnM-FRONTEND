import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ICharacter} from "../utils/types.ts";

export interface IFilterList {
    name: string;
    status: string;
    type: string;
    specie: string;
    page: number;
}
interface CharactersState {
    characters: ICharacter[];
    filters: IFilterList,
    currentPage: number;
    count: number;
}

const initialState: CharactersState = {
    characters: [],
    filters: {
        type: "",
        name: "",
        status: "",
        specie: "",
        page: 1,
    },
    count: 0,
    currentPage: 1,
};

export const charactersSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setCharacters: (state, action: PayloadAction<ICharacter[]>) => {
            state.characters = action.payload;
        },
        setFilters: (state, action: PayloadAction<IFilterList>) => {
            state.filters = action.payload;
        },
        setCount: (state, action: PayloadAction<number>) => {
            state.count = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        }
    },
});

export const { setCharacters, setFilters, setCount, setCurrentPage } = charactersSlice.actions;
export default charactersSlice.reducer;
