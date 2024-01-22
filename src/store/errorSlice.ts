import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {AxiosError} from "axios";

interface ErrorState {
    error: string | null;
}

const initialState: ErrorState = {
    error: null
};

export const errorSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<AxiosError | null>) => {
            state.error = action?.payload?.message as string;
        },
    },
});

export const { setError } = errorSlice.actions;
export default errorSlice.reducer;
