import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IUser} from "../utils/types.ts";

interface UserState {
    user: IUser | null;
}

const initialState: UserState = {
    user: null
};

export const userSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        manageFavorites: (state, action: PayloadAction<number>) => {
            if (state.user) {
                if (state.user.favorites.includes(action.payload)) {
                    state.user.favorites = state.user.favorites.filter((fav) => fav !== action.payload);
                } else {
                    state.user.favorites.push(action.payload);
                }
            }
        }
    },
});

export const { setUser, manageFavorites } = userSlice.actions;
export default userSlice.reducer;
