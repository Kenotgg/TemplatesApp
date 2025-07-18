import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ITemplate } from '@/entities/template/model/types';

const mockTemplates: ITemplate[] = [...Array(10)].map((_, i) => ({
    id: `tpl-${i}`,
    name: `Шаблон №${i + 1}`,
    description: `Описание шаблона №${i + 1}`,
    status: i % 2 === 0 ? 'опубликован' : 'черновик',
    createdAt: new Date(2025, i, i).toISOString(),
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
        getTemplateById: builder.query<ITemplate | undefined, string>({
            queryFn: (id) => {
                const template = mockTemplates.find((template) => template.id === id);
                return { data: template };
            },
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

export const { useGetTemplatesQuery, useAddTemplateMutation, useGetTemplateByIdQuery } = templateApi;