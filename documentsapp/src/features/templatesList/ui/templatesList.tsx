import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import type { ITemplate } from '@/entities/template/model/types';
import { TemplateCard } from '@/entities/template';

interface TemplateListProps {
    templates: ITemplate[];
}

export const TemplatesList: React.FC<TemplateListProps> = React.memo(({ templates }) => {
    if (!templates || templates.length === 0) {
        return <p>No templates found.</p>
    }

    return (
        <SimpleGrid columns={{ base: 1, md: 3 }} w="full">
            {templates.map((template: any) => (
                <TemplateCard key={template.id} template={template}></TemplateCard>
            ))}
        </SimpleGrid>
    );
});