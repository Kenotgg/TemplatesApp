import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import  PageCard  from '@/pages/main/ui/Page'
import BaseLayout from '@/app/layouts/BaseLayout';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PageCard></PageCard>
        <BaseLayout></BaseLayout>
    </StrictMode>,
)
