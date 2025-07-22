import React, { useState } from 'react';
import { useAppDispatch } from '@/app/hooks/hooks';
import { useUserData } from '@/app/hooks/hooks';
import { logout } from '@/pages/login/model/authSlice';
import EditProfileForm from '@/features/profile/ui/editProfileForm';
import Modal from '@/shared/ui/modal/ui/modal';



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
        <div className="profile-container">
            <h1>Профиль пользователя</h1>

            <div className="profile-item">
                <span className="profile-label">ID:</span>
                <span>{user.id}</span>
            </div>

            <div className="profile-item">
                <span className="profile-label">Email:</span>
                <span>{user.email}</span>
            </div>

            <div className="profile-item">
                <span className="profile-label">Имя:</span>
                <span>{user.name}</span>
            </div>
            <button onClick={handleLogout}>Выйти</button>
            <button onClick={handleOpenModal}>Edit</button>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <EditProfileForm user={user} onClose={handleCloseModal}></EditProfileForm>
            </Modal>
        </div>
    );
};

export default ProfilePage;