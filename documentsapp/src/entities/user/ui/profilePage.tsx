import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '@/app/hooks/hooks';
import { useUserData } from '@/app/hooks/hooks';
import { logout } from '@/app/auth/authSlice';
import EditProfileForm from '@/features/editProfile/ui/editProfileForm';
import Modal from '@/shared/ui/modal/ui/modal';
import { Heading, Stack, Button, Text, Box, IconButton } from '@chakra-ui/react';
import Loading from '@/shared/ui/spinner/Loading';
import { useNavigate, useLocation } from 'react-router-dom';

const ProfilePage: React.FC = () => {
    const { user } = useUserData();
    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isLoadingPage, setIsLoadingPage] = useState(false); // Локальное состояние загрузки
    const location = useLocation();

    useEffect(() => {
        setIsLoadingPage(false); // Сбрасываем состояние загрузки при изменении location
    }, [location]);

    if (!user) {
        return <Loading />; // Отображаем индикатор загрузки, пока данные загружаются
    }

    const handleLogout = () => {
        setIsLoadingPage(true);
        dispatch(logout())
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    if (isLoadingPage) {
        return <Loading />;
    }

    return (
        <Box overflow={'auto'} mb={5} mt={5} borderRadius={"md"} boxShadow={"md"} border={'2px solid'} borderColor={'gray.200'} shadow={'base'} alignSelf={'center'}>
            <Stack ml={2} mr={2} mb={2} direction={'column'}>
                <Heading>{user.name}</Heading>
                <Box textAlign='left'>
                    <Stack fontSize={'24'} direction={'row'}>
                        <Text fontWeight={'medium'}>Email:</Text>
                        <Text>{user.email}</Text>
                    </Stack>
                    <Stack mt={2} direction={'row'}>
                        <Button color={'white'} bg={'red.500'} onClick={handleLogout}>Выйти</Button>
                        <Button color={'white'} bg={'blue.400'} onClick={handleOpenModal}>Изменить</Button>
                    </Stack>
                </Box>
            </Stack>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <EditProfileForm user={user} onClose={handleCloseModal}></EditProfileForm>

            </Modal>
        </Box>
    );
};

export default ProfilePage;