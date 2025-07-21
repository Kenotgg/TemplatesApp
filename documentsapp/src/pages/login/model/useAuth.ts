import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks';
import { loginStart, loginSuccess, loginFailure, logout } from './authSlice';
import { login } from '../api/authApi';
import type { User } from '@/entities/user/model/user';

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const { user, isLoading, error } = useAppSelector((state) => state.auth);
    const [loginError, setLoginError] = useState<string | null>(null); // Local error state

    const handleLogin = async (credentials: { email: string; password: string }) => {
        dispatch(loginStart());
        try {
            const userData: User | null = await login(credentials);
            if (userData) {
                dispatch(loginSuccess(userData));
            } else {
                setLoginError('Неправильные данные.');
                dispatch(loginFailure('Неправильные данные.'));
            }
        } catch (error: any) {
            console.log(error);
            setLoginError(error.message || 'Что-то пошло не так');
            dispatch(loginFailure(error.message || 'Что-то пошло не так'));
        }
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return {
        user,
        isLoading,
        error,
        loginError, // Expose local error
        handleLogin,
        handleLogout,
    };
};