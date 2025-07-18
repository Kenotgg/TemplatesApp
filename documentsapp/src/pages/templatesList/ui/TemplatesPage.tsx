import React, { useMemo, useState } from 'react';
import { useGetTemplatesQuery } from '@/entities/template/api/templatesApi';
import Loading from '@/shared/ui/spinner/Loading';
import { TemplatesList } from '@/features/templatesList/ui/templatesList';
import { Heading } from '@chakra-ui/react';
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
            <Heading marginBottom={5}>TemplatesList</Heading>
            <TemplatesList templates={filteredTemplates}></TemplatesList>
        </div>
    )
}
export default TemplatesPage;