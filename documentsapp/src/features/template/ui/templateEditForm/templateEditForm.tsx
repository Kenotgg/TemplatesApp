import type { ITemplate } from '@/entities/template/model/types';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';

interface TemplateEditFormProps {
    template: ITemplate;
    onSave: (updatedTemplate: ITemplate) => void;
    onCancel: () => void;
}

const TemplateEditForm: React.FC<TemplateEditFormProps> = ({ template, onSave, onCancel }) => {
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

    const handleSave = (data: ITemplate) => {
        console.log("Обновленные данные формы:", data);
        onSave(data);
    };

    return (
        <div>
            <h2>Изменить заготовку для документа:</h2>
            <form onSubmit={handleSubmit(onSave)}>
                <label style={{ color: 'black' }} htmlFor='nameInput'>Название:</label>
                <div>
                    <input type='text' id='nameInput' {...register('name')} />
                    {errors.name && <span>{errors.name.message}</span>} {/* Отображение ошибок */}
                </div>
                <label style={{ color: 'black' }} htmlFor='descriptionInput'>Описание:</label>
                <div>
                    <textarea id='descriptionInput' {...register('description')} />
                    {errors.description && <span>{errors.description.message}</span>}
                </div>
                <label style={{ color: 'black' }} htmlFor='statusInput'>Статус:</label>
                <div>
                    <select id="statusInput" {...register('status')}>
                        <option value="черновик">Черновик</option>
                        <option value="опубликован">Опубликован</option>
                    </select>
                    {errors.status && <span>{errors.status.message}</span>}
                </div>
                <label style={{ color: 'black' }} htmlFor='authorInput'>Автор:</label>
                <div>
                    <input type='text' id='authorInput' {...register('author')} />
                    {errors.author && <span>{errors.author.message}</span>}
                </div>
                <button type='submit'>Сохранить</button>
                <button type='button' onClick={onCancel}>Выйти</button>
            </form>

        </div>
    )
};

export default TemplateEditForm;