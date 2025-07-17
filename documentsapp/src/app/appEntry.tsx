import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import App from '@/app/App';
import { store } from '@/app/appStore';
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <App></App>
        </Provider>
    </StrictMode>,
)
