import React, { Suspense } from 'react';
import '@/app/styles/app.css';
import { Routes, Route, Link } from 'react-router-dom';
import { Box, Stack, Spacer } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/appStore';
import Loading from '@/shared/ui/spinner/Loading';
import { ProtectedRoute } from '@/shared/lib/helpers/protectedRoute';
import { Layout } from './layout/Layout';

const LoginForm = React.lazy(() => import('@/pages/login/ui/loginForm'))
const ProfilePage = React.lazy(() => import('@/entities/user/ui/profilePage'))
const TemplatesPage = React.lazy(() => import('@/pages/templatesPage/ui/templatesPage'))
const TemplateDetailsInfo = React.lazy(() => import('@/entities/template/ui/templateDetailsInfo'))
const PageNotFoundPage = React.lazy(() => import('@/shared/ui/pageNotFound/pageNotFoundPage'))

export default function App() {
    const user = useSelector((state: RootState) => state.auth.user);
    return (
        <Layout user={user}>
            <Suspense fallback={<Loading></Loading>}>
                <Routes>
                    <Route path='/login' element={<LoginForm />} />
                    <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                    <Route path='/templates' element={<ProtectedRoute><TemplatesPage /></ProtectedRoute>} />
                    <Route path='/template/:id' element={<ProtectedRoute><TemplateDetailsInfo /></ProtectedRoute>} />
                    <Route path='*' element={<ProtectedRoute><PageNotFoundPage /></ProtectedRoute>} />
                </Routes>
            </Suspense>
        </Layout>




    )
}

