import React, { Suspense, useEffect, useState } from 'react';
import '@/app/styles/app.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Box, Container, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/appStore';
import Loading from '@/shared/ui/spinner/Loading';
import { ProtectedRoute } from '@/shared/lib/helpers/protectedRoute';
import { Header } from '@/features/header/ui/header';
const LoginForm = React.lazy(() => import('@/pages/login/ui/loginForm'))
const ProfilePage = React.lazy(() => import('@/entities/user/ui/profilePage'))
const TemplatesPage = React.lazy(() => import('@/pages/templatesPage/ui/templatesPage'))
const TemplateDetailsInfo = React.lazy(() => import('@/entities/template/ui/templateDetailsInfo'))
const PageNotFoundPage = React.lazy(() => import('@/shared/ui/pageNotFound/pageNotFoundPage'))

export default function App() {
    const user = useSelector((state: RootState) => state.auth.user);
    useEffect(() => {
        console.log('Current user in LocalStorage:', localStorage.getItem('user'));
        console.log('Current user:', user);
    }, [user])
    return (
        <Box>   
            <Header user={user}></Header>
            <Box>
                <Container minH={500} maxW="container.lg">
                    <Suspense fallback={<Loading></Loading>}>
                        <Routes>
                            <Route path='/login' element={<LoginForm />} />
                            <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                            <Route path='/templates' element={<ProtectedRoute><TemplatesPage /></ProtectedRoute>} />
                            <Route path='/template/:id' element={<ProtectedRoute><TemplateDetailsInfo /></ProtectedRoute>} />
                            <Route path='*' element={<ProtectedRoute><PageNotFoundPage /></ProtectedRoute>} />
                        </Routes>
                    </Suspense>
                </Container>
            </Box>
        </Box>

    )
}

