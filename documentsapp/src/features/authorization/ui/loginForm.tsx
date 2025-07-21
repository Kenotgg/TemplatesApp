import React from "react";
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { Box, Input, Button, Heading, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/features/authorization/model/useAuth";


interface LoginFormProps {
    onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<{ email: string; password: string }>();
    const { handleLogin, isLoading, loginError } = useAuth();
    const navigate = useNavigate();
    const [shouldNavigate, setShouldNavigate] = useState(false);
    
    useEffect(() => {
        if (loginError == null && shouldNavigate) {
            navigate('/templates');
            if (onSuccess) {
                onSuccess();
            }
            setShouldNavigate(false);
        }
    }, [loginError, shouldNavigate, navigate, onSuccess]);


    const onSubmit = async (values: { email: string; password: string }) => {
        await handleLogin(values);
           setShouldNavigate(true); 
    }

    return (
        <Box as="form" onSubmit={handleSubmit(onSubmit)} maxWidth="400px" margin="0 auto">
            <Heading>
                Login
            </Heading>
            <Box mb={4}>
                <Box as="label" display="block" fontWeight="bold" mb="2">
                    Email address:
                </Box>
                <Input
                    id="email"
                    type="email"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    {...register('email', {
                        required: 'This is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                        },
                    })}
                />
                {errors.email && (
                    <Text color="red.500" fontSize="sm" mt="1">
                        {errors.email.message}
                    </Text>
                )}
            </Box>

            {/* Password */}
            <Box mb={6}>
                <Box as="label" display="block" fontWeight="bold" mb="2">
                    Password:
                </Box>
                <Input
                    id="password"
                    type="password"
                    aria-invalid={errors.password ? 'true' : 'false'}
                    {...register('password', { required: 'This is required' })}
                />
                {errors.password && (
                    <Text color="red.500" fontSize="sm" mt="1">
                        {errors.password.message}
                    </Text>
                )}
            </Box>

            {loginError && (
                <Box color="red.500" mb={4}>
                    {loginError}
                </Box>
            )}

            <Button color={'white'} bg="blue.400" type="submit">
                Log In
            </Button>
        </Box>
    )
};

export default LoginForm;