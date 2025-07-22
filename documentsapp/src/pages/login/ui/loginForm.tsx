import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '@/pages/login//api/authApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/app/auth/authSlice';

interface LoginFormValues {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();
    const [login, { isLoading, isError, error }] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const result = await login({ email: data.email, password: data.password }).unwrap();
            dispatch(loginSuccess(result));
            navigate('/profile');
        } catch (err: any) {
            console.error('Login failed', err);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {isLoading && <div>Загрузка...</div>}
            {isError && <div>Ошибка: {(error as any)?.data?.message || 'Неизвестная ошибка'}</div>}
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    {...register('email', { required: 'Email обязателен' })}
                />
                {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div>
                <label htmlFor="password">Пароль:</label>
                <input
                    type="password"
                    id="password"
                    {...register('password', { required: 'Пароль обязателен' })}
                />
                {errors.password && <span>{errors.password.message}</span>}
            </div>
            <button type="submit">Войти</button>
        </form>
    );
};

export default LoginForm;