// src/entities/template/ui/TemplateDetailsPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetTemplateByIdQuery } from '@/entities/template/api/templatesApi'; // Используйте ваш RTK Query endpoint
import Loading from '@/shared/ui/spinner/Loading'

const TemplateDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Получаем ID из URL

  const { data: template, isLoading, isError, error } = useGetTemplateByIdQuery(id!); // Загружаем данные о шаблоне

  if (isLoading) {
    return <Loading />;
  }

  if (isError && error) {
    return <div>Error loading template: {error.toString()}</div>;
  }

  if (!template) {
    return <div>Template not found</div>;
  }

  return (
    <div>
      <h1>{template.name}</h1>
      <p>{template.description}</p>
      <p>Status: {template.status}</p>
      <p>Author: {template.author}</p>
    </div>
  );
};

export default TemplateDetailsPage;