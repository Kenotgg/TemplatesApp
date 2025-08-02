import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "@/entities/user";

interface AuthState {
    user: IUser | null;
    isLoading: boolean;
    error: string | null;
}
const getLocalStorage = (): IUser | null => {
    try {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
        return null;
    }
}

const initialState: AuthState = {
    user: getLocalStorage(),
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart(state) {
            localStorage.removeItem('user');
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(state.user))
            state.isLoading = false;
            state.error = null;
        },
        loginFailure(state, action: PayloadAction<string>) {
            state.user = null;
            state.isLoading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.user = null;
            localStorage.removeItem('user');
        },
        profileUpdate(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(state.user))
            state.isLoading = false;
            state.error = null;
        }
    },
});

export const { loginStart, loginSuccess, loginFailure, logout, profileUpdate } = authSlice.actions;
export default authSlice.reducer;