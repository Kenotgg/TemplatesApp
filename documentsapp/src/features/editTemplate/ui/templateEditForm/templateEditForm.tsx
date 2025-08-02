import type { ITemplate } from '@/entities/template';
import { useForm } from 'react-hook-form';
import React from 'react';
import { Box, Button, Heading, Input, Select, Text, Textarea } from '@chakra-ui/react';

interface TemplateEditFormProps {
    template: ITemplate;
    onSave: (updatedTemplate: ITemplate) => void;
    onCancel: () => void;
}

export const TemplateEditForm: React.FC<TemplateEditFormProps> = ({ template, onSave, onCancel }) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<ITemplate>({
        defaultValues: template,
    });

    React.useEffect(() => {
        if (template) {
            setValue("name", template.name);
            setValue("description", template.description);
            setValue("status", template.status);
            setValue("author", template.author);
        }
    }, [template, setValue]);

    return (
        <Box>
            <Heading>Изменить заготовку для документа:</Heading>
            <form onSubmit={handleSubmit(onSave)}>
                <Text style={{ color: 'black' }} >Название:</Text>
                <Box>
                    <Input type='text' id='nameInput' {...register('name')} />
                    {errors.name && <span>{errors.name.message}</span>}
                </Box>
                <Text style={{ color: 'black' }}>Описание:</Text>
                <Box>
                    <Textarea id='descriptionInput' {...register('description')} />
                    {errors.description && <span>{errors.description.message}</span>}
                </Box>
                <Text style={{ color: 'black' }}>Статус:</Text>
                <Box>
                    <Select id="statusInput" {...register('status')}>
                        <option value="черновик">Черновик</option>
                        <option value="опубликован">Опубликован</option>
                    </Select>
                    {errors.status && <span>{errors.status.message}</span>}
                </Box>
                <Text style={{ color: 'black' }}>Автор:</Text>
                <Box mb={'2'}>
                    <Input type='text'{...register('author')} />
                    {errors.author && <span>{errors.author.message}</span>}
                </Box>
                <Button mr={'2'} color={'white'} bg={'blue.400'} type='submit'>Сохранить</Button>
                <Button color={'white'} bg={'red.500'} type='button' onClick={onCancel}>Выйти</Button>
            </form>

        </Box>
    )
};
