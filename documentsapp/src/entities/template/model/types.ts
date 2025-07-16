export interface ITemplate {
    id: string;
    name: string;
    description: string;
    status: 'draft' | 'published';
    createdAt: string;
    updatedAt: string;
    author: string;
    tags: string[];
}