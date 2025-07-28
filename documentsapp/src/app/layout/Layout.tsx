import React from 'react';
import { Box } from '@chakra-ui/react';
import { Header } from '@/features/header/ui/header';

interface LayoutProps {
    user: any | null;
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ user, children }) => {
    return (
        <Box minH={'100vh'} width={'100%'}  >
            <Header user={user} />
            <Box>
                {children}
            </Box>
        </Box>
    );
};