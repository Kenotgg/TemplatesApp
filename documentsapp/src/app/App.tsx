import '@/app/app.css';
import { Routes, Route, Link } from 'react-router-dom';
import TemplatesPage from '@/pages/templatesList/ui/templatesPage';
import TemplateDetailsPage from '@/entities/template/ui/TemplateCard/templateDetailsPage';
import PageNotFoundPage from '@/shared/ui/pageNotFound/pageNotFoundPage';
import { Box } from '@chakra-ui/react';
export default function App() {
    return (
        <Box minHeight={500}>
            <Box width={'full'}>
                <Link style={{marginRight:5}} to='/templates'>Главная</Link>
                <Link style={{marginRight:5}} to='/profile'>Профиль</Link>
                <Link style={{marginRight:5}} to='/profile'>Войти</Link>
            </Box>
            <Routes>
                <Route path='/templates' element={<TemplatesPage />} />
                <Route path='/template/:id' element={<TemplateDetailsPage />} />
                <Route path='/login' element={<PageNotFoundPage />} />
                <Route path='/profile' element={<PageNotFoundPage />} />

                <Route path='*' element={<PageNotFoundPage />} />
            </Routes>
        </Box>


    )
}

