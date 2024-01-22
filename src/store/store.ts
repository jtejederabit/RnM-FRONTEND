import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import userSlice from "./userSlice.ts";
import charactersSlice from "./charactersSlice.ts";
import errorSlice from "./errorSlice.ts";

export const store = configureStore({
    reducer: {
        login: loginReducer,
        user: userSlice,
        characters: charactersSlice,
        error: errorSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
