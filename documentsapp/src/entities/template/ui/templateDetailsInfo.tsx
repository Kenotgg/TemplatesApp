import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetTemplateByIdQuery } from '@/pages/templatesPage/api/templatesApi';
import Loading from '@/shared/ui/spinner/Loading';
import TemplateEditForm from '@/features/editTemplate/ui/templateEditForm/templateEditForm';
import Modal from '@/shared/ui/modal/ui/modal';
import type { ITemplate } from '../model/types';

const TemplateDetailsInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: template, isLoading, isError, error } = useGetTemplateByIdQuery(id!);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedTemplate, setUpdatedTemplate] = useState<ITemplate | undefined>(undefined); // Инициализируем undefined

  useEffect(() => {
    if (template) {
      setUpdatedTemplate(template); // Обновляем, когда данные загружены
    }
  }, [template]);

  const handleOpenModal = () => {
    console.log("Try to open modal template is ", template);
    if (updatedTemplate) {
      setIsModalOpen(true);
    } else {
      console.warn("Cannot open modal: updatedTemplate is undefined");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveTemplate = (updatedTemplateData: { id: string; name: string; description: string, status: 'черновик' | 'опубликован', createdAt: string, updatedAt: string, author: string, tags: string[] }) => {
    console.log('Обновили данные в темплейте', updatedTemplateData);
    setUpdatedTemplate(updatedTemplateData);
    handleCloseModal();
  };

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
      <button onClick={handleOpenModal}>Изменить</button>

      {/* Условный рендеринг Modal */}
      {updatedTemplate && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <TemplateEditForm template={updatedTemplate as ITemplate} onSave={handleSaveTemplate} onCancel={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
};
export default TemplateDetailsInfo;

