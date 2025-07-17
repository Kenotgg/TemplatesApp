import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ITemplate } from '@/entities/template/model/types';

const mockTemplates: ITemplate[] = [...Array(10)].map((_, i) => ({
    id: `tpl-${i}`,
    name: `Шаблон ${i + 1}`,
    description: `Описание шаблона ${i + 1}`,
    status: i % 2 === 0 ? 'published' : 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    author: 'Антон Сергеевич',
    tags: ['demo'],
}));

export const templateApi = createApi({
    reducerPath: 'templateApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getTemplates: builder.query<ITemplate[], void>({
            queryFn: () => ({ data: mockTemplates }),
        }),
        addTemplate: builder.mutation<ITemplate, Partial<ITemplate>>({
            query: (template) => ({ url: '/', method: 'POST', body: template }),
            transformResponse: (baseQueryReturnValue, meta, arg) => {
                const newTemplate: ITemplate = {
                    ...arg,
                    id: String(mockTemplates.length + 1),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                } as ITemplate;
                mockTemplates.push(newTemplate);
                return newTemplate;
            },
        }),
    }),
})

export const {useGetTemplatesQuery, useAddTemplateMutation} = templateApi;