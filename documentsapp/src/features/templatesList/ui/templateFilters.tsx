import React from "react";
import { useState } from "react";
import { Stack, Box, Input, Spacer, Text, Divider, Select, Button, IconButton, useBreakpointValue } from "@chakra-ui/react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@/app/styles/datePicker.css';
import customRuLocale from "@/app/locales/ruCapitalized";
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

    const stackDirection : any = useBreakpointValue({
        base: 'column', 
        md: 'row',      
    });
    
    const stackWidth: any = useBreakpointValue({
        base: 180,
        sm: 250,
    })


    return (
        <Stack overflow={'auto'} justifyContent={'space-between'} border={"2px solid"} marginTop={2} borderColor={'gray.200'} borderRadius={"md"} boxShadow={"md"} alignSelf={'left'} padding={'2'} direction={stackDirection}>
            <Box>
                <Stack direction={'row'}>
                    <Stack textAlign={'left'} direction={'column'}>
                        <Stack direction={stackDirection}>
                            <Stack direction={'column'}>
                                <Text fontWeight={'normal'}>По статусу:</Text>
                                <Select
                                    border={"2px solid black"} height={'35px'} width={stackWidth} borderRadius={'base'} _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500", }}
                                    value={statusFilter}
                                    onChange={(e) => onStatusFilterChange(e.target.value as 'all' | 'черновик' | 'опубликован')}
                                >
                                    <option value="all">Все</option>
                                    <option value="черновик">Черновик</option>
                                    <option value="опубликован">Опубликован</option>
                                </Select>
                            </Stack>

                            <Stack textAlign={'left'} direction={'column'}>
                                <Text fontWeight={'normal'}>По дате:</Text>
                                <Stack direction={'row'}>
                                    <DatePicker
                                        customInput={<Input fontWeight={'semibold'} border={"2px solid black"} height={'35px'} width={stackWidth} borderRadius={'base'} _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500", }}></Input>}
                                        id="date-picker"
                                        selected={localDate}
                                        onChange={handleDataChange}
                                        dateFormat="dd.MM.yyyy"
                                        placeholderText="Выберите дату"
                                        isClearable
                                        clearButtonClassName={'my-custom-clear-button'}
                                        clearButtonTitle="Отчистить поле ввода даты"
                                        locale={customRuLocale}
                                        
                                    >
                                    </DatePicker>
                                    {/* <IconButton height={'35px'} width={'35px'} aria-label="Стереть введенную дату"><AiFillBackward></AiFillBackward></IconButton> */}
                                </Stack>

                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>

            <Stack direction={'column'}>
                <Text fontWeight={'normal'}>Найти по названию:</Text>
                <Input
                    height={'35px'}
                    width={stackWidth}
                    title="Поиск по названию шаблона"
                    placeholder="Поиск по названию шаблона"
                    color="black"
                    bg={'white'}
                    type="text"
                    value={searchQuery} // Здесь используем searchQuery, которая является inputValue из TemplatesPage
                    onChange={(e) => onSearchQueryChange(e.target.value)}
                />
            </Stack>

        </Stack>
    )
}