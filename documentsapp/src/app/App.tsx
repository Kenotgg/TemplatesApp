import React, { Suspense } from 'react';
import '@/app/styles/app.css';
import { Routes, Route, Link} from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/appStore';
import Loading from '@/shared/ui/spinner/Loading';
import { ProtectedRoute } from '@/shared/lib/helpers/protectedRoute';

const TemplateDetailsInfo = React.lazy(() => import('@/entities/template/ui/templateDetailsInfo'))
const LoginForm = React.lazy(() => import('@/pages/login/ui/loginForm'))
const PageNotFoundPage = React.lazy(() => import('@/shared/ui/pageNotFound/pageNotFoundPage'))
const ProfilePage = React.lazy(() => import('@/entities/user/ui/profilePage'))
const TemplatesPage = React.lazy(() => import('@/pages/templatesPage/ui/templatesPage'))

export default function App() {
    const user = useSelector((state: RootState) => state.auth.user);
    return (
        <Box minH={500}>
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
                    <Route path='/template/:id' element={<ProtectedRoute><TemplateDetailsInfo /></ProtectedRoute>} />
                    <Route path='*' element={<ProtectedRoute><PageNotFoundPage /></ProtectedRoute>} />
                </Routes>
            </Suspense>

        </Box>


    )
}

