import React from "react";
import type { ITemplate } from "@/entities/template/model/types";

interface TemplateCardProps{
    template: ITemplate;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onDuplicate?: (id: string) => void;
}



export const TemplateCard: React.FC<TemplateCardProps> = React.memo(({
    template,
    onEdit,
    onDelete,
    onDuplicate,
}) => {
    const formatedCreatedAt = new Date(template.createdAt).toLocaleDateString('ru-RU',{
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
    return(
        <div>
            <div>
                <h3>
                    {template.name}
                </h3>
                <span>{template.status}</span>
            </div>
            {(onEdit || onDelete || onDuplicate) && (
                <div>
                    {onEdit && <button onClick={() => onEdit(template.id)}>Edit</button>}
                    {/* {onEdit && <button onClick={() => {onDuplicate(template.id)}>Duplicate</button>} */}
                    {/* {onEdit && <button onClick={() => onDelete(template.id)}>Delete</button>} */}
                </div>
            )}
        </div>

    )
})