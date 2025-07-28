import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetTemplateByIdQuery } from '@/pages/templatesPage/api/templatesApi';
import Loading from '@/shared/ui/spinner/Loading';
import TemplateEditForm from '@/features/editTemplate/ui/templateEditForm/templateEditForm';
import Modal from '@/shared/ui/modal/ui/modal';
import type { ITemplate } from '../model/types';
import { Button, Image, Spacer, Stack, Text } from '@chakra-ui/react';

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
    setUpdatedTemplate(updatedTemplateData);
    handleCloseModal();
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError && error) {
    return <div>Ошибка при загрузке темплейта: {error.toString()}</div>;
  }

  if (!template) {
    return <div>Данного темплейта не существует...</div>;
  }

  return (

    <Stack>
      <Stack>
        <Text>{template.name}</Text>
        <Spacer></Spacer>
      </Stack>
      
      <Stack direction={'row'}>
        <Image width={'30%'} height={'30%'} src={'../public/1.jpg'}></Image>
        <p>{template.description}</p>
        <Button bg={'blue.400'} onClick={handleOpenModal}>Изменить</Button>
      </Stack>

      <Stack direction={'row'}>
        <p>Статус: {template.status}</p>
        <p>Автор публикации: {template.author}</p>
      </Stack>

      {updatedTemplate && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <TemplateEditForm template={updatedTemplate as ITemplate} onSave={handleSaveTemplate} onCancel={handleCloseModal} />
        </Modal>
      )}
    </Stack>
  );
};
export default TemplateDetailsInfo;

