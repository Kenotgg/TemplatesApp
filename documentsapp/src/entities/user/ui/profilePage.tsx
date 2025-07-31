import React, { useState } from 'react';
import { useAppDispatch } from '@/app/hooks/hooks';
import { useUserData } from '@/app/hooks/hooks';
import { logout } from '@/app/auth/authSlice';
import EditProfileForm from '@/features/editProfile/ui/editProfileForm';
import Modal from '@/shared/ui/modal/ui/modal';
import { Heading, Stack, Button, Text, Box, IconButton } from '@chakra-ui/react';
import { LuFilePen } from 'react-icons/lu';

const ProfilePage: React.FC = () => {
    const { user } = useUserData();
    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!user) {
        return <div>Загрузка...</div>; // Отображаем индикатор загрузки, пока данные загружаются
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }


    return (
        <Box alignSelf={'center'}>
            <Stack direction={'row'}>
                <Heading>Профиль пользователя</Heading>

            </Stack>
            <Box textAlign='left'>
                <Stack direction={'row'}><Text fontWeight={'medium'}>Имя:</Text> <Text>{user.name}</Text></Stack>
                <Stack direction={'row'}><Text fontWeight={'medium'}>Email:</Text><Text>{user.email}</Text></Stack>
                <Stack mt={2} direction={'row'}>
                    <Button color={'white'} bg={'red.600'} onClick={handleLogout}>Выйти</Button>
                    <Button color={'white'} bg={'blue.600'} onClick={handleOpenModal}>Изменить</Button>
                </Stack>
            </Box>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <EditProfileForm user={user} onClose={handleCloseModal}></EditProfileForm>

            </Modal>
        </Box>
    );
};

export default ProfilePage;