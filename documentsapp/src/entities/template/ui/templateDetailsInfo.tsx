import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetTemplateByIdQuery, useDeleteTemplateMutation } from '@/pages/templatesPage/api/templatesApi';
import Loading from '@/shared/ui/spinner/Loading';
import TemplateEditForm from '@/features/editTemplate/ui/templateEditForm/templateEditForm';
import Modal from '@/shared/ui/modal/ui/modal';
import type { ITemplate } from '../model/types';
import { Button, Image, Stack, Text, useBreakpointValue } from '@chakra-ui/react';

const TemplateDetailsInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: template, isLoading, isError, error, refetch } = useGetTemplateByIdQuery(id!);
  const [deleteTemplate] = useDeleteTemplateMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedTemplate, setUpdatedTemplate] = useState<ITemplate | undefined>(undefined); // Инициализируем undefined


  const handleDelete = async () => {
    if (template) {
      console.log("Удаляем:", template.id);
      try {
        const result = await deleteTemplate(template.id).unwrap();
        console.log(result ? "Успешно удалено" : "Шаблон не найден");
        await refetch();
      } catch (error) {
        console.error("Ошибка:", error);
      }
    }

  };

  useEffect(() => {
    if (template) {
      setUpdatedTemplate(template); // Обновляем, когда данные загружены

    }
  }, [template]);


  const formatedCreatedAt = template?.createdAt
    ? new Date(template.createdAt).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
    : 'Дата загружается...'; // Или любое другое значение по умолчанию


  const stackOrientation: any = useBreakpointValue({
    base: 'column',
    md: 'row',
  })



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
    <Stack mb={5} mt={5} border={"2px solid"} alignSelf={'center'} borderColor={'gray.200'} borderRadius={"md"} boxShadow={"md"} >
      <Stack ml={3} mr={3} mb={3} overflow={'auto'} alignSelf={'center'} direction={'column'}>
        <Text fontSize={'32'} fontWeight={'bold'}>{template.name}</Text>
        <Stack direction={stackOrientation}>
          <Image mr={'5'} shadow={'base'} alignSelf={'left'} width={'50%'} height={'50%'} src={'../public/1.jpg'}></Image>
          <Stack direction={'column'}>
            <Stack direction={'column'}>
              <Stack direction={stackOrientation}>
                <Text fontSize={'24'} fontWeight={'bold'}>Статус:</Text>
                <Text fontSize={'24'}>{template.status}</Text>
              </Stack>
              <Stack direction={stackOrientation}>
                <Text fontSize={'24'} fontWeight={'bold'}>Автор публикации:</Text>
                <Text fontSize={'24'}>{template.author}</Text>
              </Stack>
              <Stack direction={stackOrientation}>
                <Text fontSize={'24'} fontWeight={'bold'}>Дата публикации:</Text>
                <Text fontSize={'24'}>{formatedCreatedAt}</Text>
              </Stack>
            </Stack>
            <Button fontSize={'24'} color={'white'} bg={'blue.400'} onClick={handleOpenModal}>Изменить</Button>
            <Button fontSize={'24'} color={'white'} bg={'orange.400'} onClick={handleOpenModal}>Дублировать</Button>
            <Button fontSize={'24'} color={'white'} bg={'red.500'} onClick={handleDelete}>Удалить</Button>
          </Stack>
        </Stack>
        <Stack direction={'column'}>
          <Text fontSize={'28'} fontWeight={'bold'}>Описание:</Text>
          <Text fontSize={'24'}>{template.description}</Text>
        </Stack>
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

