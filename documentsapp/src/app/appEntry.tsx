import { Provider as ReduxProvider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from '@/app/App';
import { store } from '@/app/appStore';
import '@/app/styles/index.css'

const rootElement: any = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(
    <BrowserRouter>
        <ReduxProvider store={store}>
            <ChakraProvider>
                <App></App>
            </ChakraProvider>
        </ReduxProvider>
    </BrowserRouter>,
)
