import type { ITemplate } from '@/entities/template/model/types';

import React, { useState } from 'react';

interface TemplateEditFormProps {
    template: ITemplate;
    onSave: (updatedTemplate: ITemplate) => void;
    onCancel: () => void;
}

const TemplateEditForm: React.FC<TemplateEditFormProps> = ({ template, onSave, onCancel }) => {
    const [name, setName] = useState(template.name);
    const [description, setDescription] = useState(template.description);

    const handleSave = () => {
        const updatedTemplate: ITemplate = {
            ...template,
            name: name,
            description: description,
        }
        onSave(updatedTemplate);
    };

    return (
        <div>
            <h2>Изменить заготовку для документа:</h2>
            <label style={{ color: 'black' }} htmlFor='nameInput'>Название:</label>
            <div>
                <input type='text' id='nameInput' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <label style={{ color: 'black' }} htmlFor='descriptionInput'>Описание:</label>
            <div>
                <textarea id='descriptionInput' value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <button onClick={handleSave}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    )
};

export default TemplateEditForm;