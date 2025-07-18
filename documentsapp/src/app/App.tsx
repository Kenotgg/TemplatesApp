import '@/app/app.css';
import { Routes, Route, Link } from 'react-router-dom';
import TemplatesPage from '@/pages/templatesList/ui/templatesPage';
import TemplateDetailsPage from '@/entities/template/ui/TemplateCard/templateDetailsPage';
import PageNotFoundPage from '@/shared/ui/pageNotFound/pageNotFoundPage';
export default function App() {
    return (
        <>
        <header>
             <Link to='/all'>Все шаблоны</Link>
             <Link to='*'>Профиль</Link>
        </header>
        <Routes>
            <Route path='/all' element={<TemplatesPage/>}/>
            <Route path='/template/:id' element={<TemplateDetailsPage/>}/>
            <Route path='*' element={<PageNotFoundPage/>}/>
        </Routes>
        </>
    )
}

