import React from 'react';
import { Box, Button, Stack, Text } from '@chakra-ui/react';
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
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                {isLoading && <div>Загрузка...</div>}
                {isError && <div>Ошибка: {(error as any)?.data?.message || 'Неизвестная ошибка'}</div>}
                <Stack>
                    <Box>
                        <Text>Email:</Text>
                        <input
                            type="email"
                            id="email"
                            {...register('email', { required: 'Email обязателен' })}
                        />

                    </Box>
                    <Box marginBottom={1} height={2}>
                        {errors.email && <span>{<Text color={'yellow.500'}>{errors.email.message}</Text>}</span>}
                    </Box>

                    <Box>
                        <Text>Пароль:</Text>
                        <input
                            type="password"
                            id="password"
                            {...register('password', { required: 'Пароль обязателен' })}
                        />

                    </Box>
                    <Box marginBottom={1} height={2}>
                        {errors.password && <span><Text color={'yellow.500'}>{errors.password.message}</Text></span>}
                    </Box>
                </Stack>

                <Button bg={'blue.400'} mt={5} type="submit">Войти</Button>
            </form>
        </Box>

    );
};

export default LoginForm;