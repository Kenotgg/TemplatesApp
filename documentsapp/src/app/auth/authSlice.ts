import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "@/entities/user/model/user";

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
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
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
        },
        profileUpdate(state, action: PayloadAction<IUser>) {
            state.user = getLocalStorage();
            state.isLoading = false;
            state.error = null;
        }
    },
});

export const { loginStart, loginSuccess, loginFailure, logout, profileUpdate } = authSlice.actions;
export default authSlice.reducer;