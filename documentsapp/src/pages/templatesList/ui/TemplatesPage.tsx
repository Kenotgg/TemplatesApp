import React, { useMemo, useState } from 'react';
import { useGetTemplatesQuery } from '@/entities/template/api/templatesApi';
import Loading from '@/shared/ui/spinner/Loading';
import { TemplatesList } from '@/features/templatesList/ui/templatesList';

const TemplatesPage: React.FC = () => {
    const { data: templates, isLoading, isError, error } = useGetTemplatesQuery();
    
    const [statusFilter, setStatusFilter] = useState<'draft' | 'published' | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTemplates = useMemo(() => {
        if (!templates) return [];

        let result = [...templates];
        if (statusFilter !== 'all') {
            result = result.filter(template => template.status === statusFilter);
        }

        if (searchQuery) {
            result = result.filter(template => {
                template.name.toLowerCase().includes(searchQuery.toLowerCase());
            });
        }

        return result;
    }, [templates, statusFilter, searchQuery]);

    if (isLoading) {
        return <Loading />
    }
    if (isError && error) {
        return <div>Error when try to loading templates: {error.toString()}</div>
    }

    return (
        <div>
            <h1>TemplatesList</h1>
            <p>Filters:</p>
            <div>
                <TemplatesList templates={filteredTemplates}></TemplatesList>
            </div>
        </div>
    )
}
export default TemplatesPage;