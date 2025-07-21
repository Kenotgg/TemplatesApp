import React from 'react';

interface User {
    id: string;
    email: string;
    name: string;
}

interface ProfilePageProps {
    user: User | null; // Может быть null, пока данные загружаются
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
    if (!user) {
        return <div>Загрузка...</div>; // Отображаем индикатор загрузки, пока данные загружаются
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

        </div>
    );
};

export default ProfilePage;