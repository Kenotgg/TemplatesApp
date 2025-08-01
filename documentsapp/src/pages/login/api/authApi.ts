// src/entities/auth/api/authApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IUser } from '@/entities/user/model/user';
import { logout } from '@/app/auth/authSlice';
import { type AppDispatch } from '@/app/appStore';
import { profileUpdate } from '@/app/auth/authSlice';
let FAKE_USER = {
    id: 'user-1',
    email: '1@gmail.com',
    password: 'DFAD',
    name: 'Test User',
};

const fakeLogin = async (credentials: { email: string; password: string }): Promise<IUser | null> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (
                credentials.email === FAKE_USER.email &&
                credentials.password === FAKE_USER.password
            ) {
                resolve({
                    id: FAKE_USER.id,
                    email: FAKE_USER.email,
                    name: FAKE_USER.name,
                });
            } else {
                reject(new Error('Invalid credentials')); // Отклоняем Promise при неверных данных
            }
        }, 500)
    });
};

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }), // baseQuery больше не нужен, но его нужно оставить
    endpoints: (builder) => ({
        login: builder.mutation<IUser, { email: string; password: string }>({
            queryFn: async (credentials) => {
                try {
                    const user = await fakeLogin(credentials); // Вызываем вашу функцию fakeLogin
                    if (user) {
                        return { data: user }; // Возвращаем объект { data: user }
                    } else {
                        return { error: { status: 400, data: { message: 'Invalid credentials' } } }; // Обработка ошибок
                    }
                } catch (error: any) {
                    return { error: { status: 500, data: { message: error.message } } }; // Обработка ошибок
                }
            },

        }),
        logout: builder.mutation<void, void>({ //  void означает, что ничего не возвращаем
            queryFn: async (_arg, { dispatch }) => { // dispatch доступен
                dispatch(logout());
                return { data: undefined };
            },
        }),
        updateProfile: builder.mutation<IUser, Partial<IUser>>({
            queryFn: async (userData, { dispatch }) => {
                try {
                    // Обновляем FAKE_USER
                    FAKE_USER = { ...FAKE_USER, ...userData };
                    // Диспатчим profileUpdate
                    (dispatch as AppDispatch)(profileUpdate(FAKE_USER));
                    return { data: FAKE_USER };
                } catch (error: any) {
                    return { error: { status: 500, data: { message: error.message } } };
                }
            },
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation } = authApi; // Экспортируем хуки