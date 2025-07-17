import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Provider} from 'react-redux';
import  PageCard  from '@/pages/main/ui/Page'
import App from '@/app/App';
import appStore from '@/app/appStore';


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={appStore}>
        <App></App>
        </Provider>
    </StrictMode>,
)
