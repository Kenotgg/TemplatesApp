import React, { useMemo, useState, useEffect } from 'react';
import { useGetTemplatesQuery } from '@/pages/templatesPage/api/templatesApi';
import Loading from '@/shared/ui/spinner/Loading';
import { TemplatesList } from '@/features/templatesList/ui/templatesList';
import { Heading, Stack } from '@chakra-ui/react';
import useDebounce from '@/app/hooks/useDebounce'
import { useSearchParams } from 'react-router-dom'
import { TemplateFilters } from '@/features/templatesList/ui/templateFilters';

const TemplatesPage: React.FC = () => {
    const { data: templates, isLoading, isError, error } = useGetTemplatesQuery();

    const [statusFilter, setStatusFilter] = useState<'черновик' | 'опубликован' | 'all'>('all');
    const [inputValue, setInputValue] = useState('');
    const debouncedSearchQuery = useDebounce(inputValue, 500);
    const [dateFilter, setDateFilter] = useState<string | null>(null);

    const currentFilters = {
        status: statusFilter,
        query: debouncedSearchQuery,
        date: dateFilter,
    }

    const [searchParams, setSearchParams] = useSearchParams();

    //Обновление URL при изменении фильтров
    useEffect(() => {
        const params = new URLSearchParams();
        if (statusFilter && statusFilter !== 'all') {
            params.set('status', statusFilter);
        }
        if (dateFilter) {
            params.set('date', dateFilter);
        }
        if (debouncedSearchQuery) {
            params.set('query', debouncedSearchQuery);
        }
        setSearchParams(params);

    }, [statusFilter, debouncedSearchQuery, dateFilter, setSearchParams]);

    //Фильтрация шаблонов
    const filteredTemplates = useMemo(() => {
        if (!templates) return [];

        let result = [...templates];

        if (currentFilters.status !== 'all') {
            result = result.filter(template => template.status === currentFilters.status);
        }

        if (currentFilters.query) {
            result = result.filter(template =>
                template.name.toLowerCase().includes(currentFilters.query.toLowerCase()))
        }

        if (currentFilters.date) {
            const filterDate = new Date(currentFilters.date);
            result = result.filter(template => {
                const templateDate = new Date(template.createdAt);
                return (
                    templateDate.getFullYear() === filterDate.getFullYear() &&
                    templateDate.getMonth() === filterDate.getMonth() &&
                    templateDate.getDate() === filterDate.getDate()
                );
            });
        }

        return result;
    }, [templates, currentFilters]);

    if (isLoading) {
        return <Loading />
    }

    if (isError && error) {
        return <div>Error when try to loading templates: {error.toString()}</div>
    }

    return (
        <Stack>
            <TemplateFilters
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                searchQuery={inputValue}
                onSearchQueryChange={setInputValue}
                dateFilter={dateFilter}
                onDateFilterChange={setDateFilter}
            >
            </TemplateFilters>
            <TemplatesList templates={filteredTemplates}></TemplatesList>
        </Stack>
    )
}
export default TemplatesPage;