import React, { Suspense, useEffect } from 'react';
import '@/app/app.css';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { Box, Button } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/appStore';
import Loading from '@/shared/ui/spinner/Loading';
import { ProtectedRoute } from '@/shared/lib/components/protectedRoute';
import { useDispatch } from 'react-redux';
import { loginSuccess, profileUpdate } from '@/pages/login/model/authSlice';

//Lazy loading
const TemplateDetailsPage = React.lazy(() => import('@/entities/template/ui/TemplateCard/templateDetailsPage'))
const LoginForm = React.lazy(() => import('@/pages/login/ui/loginForm'))
const PageNotFoundPage = React.lazy(() => import('@/shared/ui/pageNotFound/pageNotFoundPage'))
const ProfilePage = React.lazy(() => import('@/entities/user/ui/profilePage'))
const TemplatesPage = React.lazy(() => import('@/pages/templatesList/ui/templatesPage'))

export default function App() {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();

    
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        console.log('storedUser:', storedUser)
        if (storedUser) {
            
            dispatch(profileUpdate(JSON.parse(storedUser))); // Восстанавливаем состояние из localStorage
        }
    }, [dispatch]);



    return (
        <Box minH={500}>
            {/* <Button onClick={() => {console.log(handleGetUser())}}></Button> */}
            <Box marginTop={0} width={'full'}>
                <Link style={{ marginRight: 5 }} to='/templates'>Главная</Link>
                {user ? (
                    <Link style={{ marginRight: 5 }} to='/profile'>{user.name}</Link>
                ) : (
                    <Link style={{ marginRight: 5 }} to='/login'>Войти</Link>
                )}

            </Box>
            <Suspense fallback={<Loading></Loading>}>
                <Routes>
                    <Route path='/login' element={<LoginForm />} />
                    <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                    <Route path='/templates' element={<ProtectedRoute><TemplatesPage /></ProtectedRoute>} />
                    <Route path='/template/:id' element={<ProtectedRoute><TemplateDetailsPage /></ProtectedRoute>} />
                    <Route path='*' element={<ProtectedRoute><PageNotFoundPage /></ProtectedRoute>} />
                </Routes>
            </Suspense>

        </Box>


    )
}

