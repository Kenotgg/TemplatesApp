import React, { Suspense } from 'react';
import '@/app/styles/app.css';
import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/appStore';
import Loading from '@/shared/ui/spinner/Spinner';
import { ProtectedRoute } from '@/shared/lib/helpers/protectedRoute';
import { Header } from '@/features/header';

const LoginForm = React.lazy(() => import('@/pages/login'));
const ProfilePage = React.lazy(() => import('@/pages/profile'));
const TemplatesPage = React.lazy(() => import('@/pages/templatesPage'));
const TemplateDetailsInfo = React.lazy(() => import('@/entities/template'));
const PageNotFoundPage = React.lazy(() => import('@/shared/ui/pageNotFound/pageNotFoundPage'));

export default function App() {
    const user = useSelector((state: RootState) => state.auth.user);
    return (
        <Box>
            <Header user={user}></Header>
            <Box>
                <Container minH="container.lg" maxW="container.lg">
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

