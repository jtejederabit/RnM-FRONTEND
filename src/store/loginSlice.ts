import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginState {
    token: string | null;
}

const initialState: LoginState = {
    token: localStorage.getItem('token'),
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        clearToken: (state) => {
            state.token = null;
            localStorage.removeItem('token');
        },
    },
});

export const { setToken, clearToken } = loginSlice.actions;
export default loginSlice.reducer;
