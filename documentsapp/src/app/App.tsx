import React, { Suspense, useEffect } from 'react';
import '@/app/app.css';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/appStore';
import Loading from '@/shared/ui/spinner/Loading';

//Default loading
import LoginForm from '@/pages/login/ui/loginForm';
import TemplatesPage from '@/pages/templatesList/ui/templatesPage';
import PageNotFoundPage from '@/shared/ui/pageNotFound/pageNotFoundPage';
import ProfilePage from '@/entities/user/ui/profilePage';
//Lazy loading
const TemplateDetailsPage = React.lazy(() => import('@/entities/template/ui/TemplateCard/templateDetailsPage'))



export default function App() {
    const user = useSelector((state: RootState) => state.auth.user);
    const location = useLocation();

    useEffect(() => {
        console.log("user в App.tsx:", user); // Добавляем console.log
    }, [user]);

    // Функция для перенаправления на логин с сохранением текущего пути
    const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    //    if(!user){
    //     return <Navigate to='/login' replace state={{path: location.pathname}}></Navigate>
    //    }
    //    return children;
    if(children){

        return children;
    }
    };


    return (
        <Box minH={500}>
            <Box marginTop={0} width={'full'}>
                <Link style={{ marginRight: 5 }} to='/templates'>Главная</Link>
                {user ? (
                    <Link style={{ marginRight: 5 }} to='/profile'>{user.name}</Link>
                ) : (
                    <></>
                )}
                <Link style={{ marginRight: 5 }} to='/login'>Войти</Link>
            </Box>
            <Suspense fallback={<Loading></Loading>}>
                <Routes>
                    <Route path='/login' element={<LoginForm />} />
                    <Route path='/profile' element={<RequireAuth><ProfilePage user={user} /></RequireAuth>} />
                    <Route path='/templates' element={<RequireAuth><TemplatesPage /></RequireAuth>} />
                    <Route path='/template/:id' element={<RequireAuth><TemplateDetailsPage /></RequireAuth>} />
                    <Route path='*' element={<PageNotFoundPage />} />
                </Routes>
            </Suspense>

        </Box>


    )
}

