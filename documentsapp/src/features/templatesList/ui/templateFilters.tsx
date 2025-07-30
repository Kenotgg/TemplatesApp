import React, { useState } from "react";
import { Stack, Box, Input, Spacer, Text } from "@chakra-ui/react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface ITemplateFiltersProps {
    statusFilter: 'all' | 'черновик' | 'опубликован';
    onStatusFilterChange: (status: 'all' | 'черновик' | 'опубликован') => void;
    searchQuery: string;
    onSearchQueryChange: (query: string) => void;
    dateFilter: string | null; //  ISO date string
    onDateFilterChange: (date: string | null) => void;
}

export const TemplateFilters: React.FC<ITemplateFiltersProps> = ({
    statusFilter,
    onStatusFilterChange,
    searchQuery,
    onSearchQueryChange,
    dateFilter,
    onDateFilterChange,
}) => {
    const [localDate, setLocalDate] = useState<Date | null>(dateFilter ? new Date(dateFilter) : null);

    const handleDataChange = (date: Date | null) => {
        setLocalDate(date);
        onDateFilterChange(date ? date.toISOString() : null);
    };

    return (

        <Stack maxWidth={700} p={6} border={"2px solid"} marginTop={5} borderColor={'gray.200'} borderRadius={"md"} boxShadow={"md"} alignSelf={'left'} direction={'column'}>
            <Stack direction={'column'}>
                <Input
                    placeholder="Поиск по названию шаблона"
                    color="black"
                    bg={'white'}
                    type="text"
                    value={searchQuery} // Здесь используем searchQuery, которая является inputValue из TemplatesPage
                    onChange={(e) => onSearchQueryChange(e.target.value)}
                />
            </Stack>
            <Text textAlign={'left'}>Фильтрация: </Text>
            <Stack direction={'row'}>
                <Stack textAlign={'left'} direction={'column'}>
                    <label htmlFor="status-select">По статусу:</label>
                    <select
                        id="status-select"
                        value={statusFilter}
                        onChange={(e) => onStatusFilterChange(e.target.value as 'all' | 'черновик' | 'опубликован')}
                    >
                        <option value="all">Все</option>
                        <option value="черновик">черновик</option>
                        <option value="опубликован">опубликован</option>
                    </select>
                </Stack>

                <Stack textAlign={'left'} direction={'column'}>
                    <label htmlFor="date-picker">По дате:</label>
                    <DatePicker
                        id="date-picker"
                        selected={localDate}
                        onChange={handleDataChange}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Выберите дату"
                    >
                    </DatePicker>
                </Stack>
            </Stack>



        </Stack>
    )
}