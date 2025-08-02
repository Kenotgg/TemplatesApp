import React from 'react';
import { Box, Button, Input, Stack, Text, Heading } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '@/pages/login//api/authApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// FSD-ИСКЛЮЧЕНИЕ: Прямой импорт слайса из-за ограничений RTK Query
import { loginSuccess } from '@/app/auth/authSlice';

interface LoginFormValues {
    email: string;
    password: string;
}

export const LoginForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();
    const [login, { isLoading, isError, error }] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const result = await login({ email: data.email, password: data.password }).unwrap();
            dispatch(loginSuccess(result));
            navigate('/profile'); // TODO: Вынести в колбэк
        } catch (err: any) {
            console.error('Login failed', err);
        }
    };

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                {isLoading && <div>Загрузка...</div>}
                {isError && <div>Ошибка: {(error as any)?.data?.message || 'Неизвестная ошибка'}</div>}
                <Heading>Войти</Heading>
                <Stack>
                    <Box>
                        <Box textAlign={'left'}>
                            <Text fontWeight={'medium'}>Email:</Text>
                        </Box>

                        <Input
                            width={200}
                            placeholder='Введите Email...'
                            bg={'white'}
                            color={'black'}
                            type="email"
                            id="email"
                            {...register('email', { required: 'Email обязателен.' })}
                        />

                    </Box>

                    {errors.email && <span>{<Box marginBottom={1} height={2}><Text color={'red.500'}>{errors.email.message}</Text></Box>}</span>}


                    <Box>
                        <Box textAlign={'left'}>
                            <Text fontWeight={'medium'}>Пароль:</Text>
                        </Box>
                        <Input
                            width={200}
                            placeholder='Введите пароль...'
                            bg={'white'}
                            color={'black'}
                            type="password"
                            id="password"
                            {...register('password', { required: 'Пароль обязателен.' })}
                        />

                    </Box>
                    {errors.password && <span><Box marginBottom={1} height={2}><Text color={'red.500'}>{errors.password.message}</Text></Box></span>}
                </Stack>
                <Button width={200} color={'white'} bg={'blue.600'} mt={5} type="submit">ВОЙТИ</Button>
            </form>
        </Box>

    );
};
