import { Provider as ReduxProvider } from 'react-redux';
import { Provider as ChakraProvider } from '@/app/providers/ui/provider'
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import App from '@/app/App';
import { store } from '@/app/appStore';
import '@/app/styles/index.css'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <ChakraProvider>
            <ReduxProvider store={store}>
                <App></App>
            </ReduxProvider>
        </ChakraProvider>
    </BrowserRouter>,
)
