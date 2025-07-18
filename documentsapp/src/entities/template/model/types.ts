export interface ITemplate {
    id: string;
    name: string;
    description: string;
    status: 'черновик' | 'опубликован';
    createdAt: string;
    updatedAt: string;
    author: string;
    tags: string[];
}