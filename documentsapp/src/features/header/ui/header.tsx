import React from "react";
import { Routes, Route, Link } from 'react-router-dom';
import { Box, Stack, Spacer } from '@chakra-ui/react';
interface HeaderProps {
    user: any | null;
}
export const Header: React.FC<HeaderProps> = ({ user }) => {
    return (
        <Box>
            {user ? (
                <Stack direction={'row'}>
                    <Link style={{ marginRight: 5 }} to='/templates'>Главная</Link>
                    <Spacer></Spacer>
                    <Link style={{ marginRight: 5 }} to='/profile'>{user.name}</Link>
                </Stack>
            ) : (
                <Link style={{ marginRight: 5 }} to='/login'>Войти</Link>
            )}
        </Box>
    );
}