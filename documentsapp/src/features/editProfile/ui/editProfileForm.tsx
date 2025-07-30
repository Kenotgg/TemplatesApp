// src/features/profile/editProfileForm/ui/EditProfileForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Heading, Spacer, Stack } from '@chakra-ui/react';
import { useAppDispatch } from '@/app/hooks/hooks';
import { loginSuccess as login, profileUpdate } from '@/app/auth/authSlice'; // <- Correct action
import type { IUser } from '@/entities/user/model/user';
import styles from './Modal.module.scss';

interface EditProfileFormProps {
    user: IUser | null;
    onClose: () => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ user, onClose }) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<IUser>({
        defaultValues: {
            id: user?.id || '',
            name: user?.name || '',
            email: user?.email || '',
        },
        mode: 'onBlur',
    });

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (user) {
            setValue('name', user.name);
            setValue('email', user.email);
        }
    }, [user, setValue]);

    const onSubmit = (data: Omit<IUser, 'id'>) => {
        if (!user) return;

        const updatedUser = {
            ...user,
            ...data,
        };
        console.log("afterUpdating:", updatedUser);

        dispatch(profileUpdate(updatedUser));
        localStorage.setItem('user', JSON.stringify(updatedUser));
        onClose();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Heading>Редактировать профиль</Heading>
            <Stack direction={'column'}>
                <label htmlFor="name">Имя:</label>
                <input type="text" id="name" {...register("name", { required: "Пожалуйста, введите имя" })} />
                {errors.name && <span className={styles.error}>{errors.name.message}</span>}

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" {...register("email", {
                    required: "Пожалуйста, введите email",
                    pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Некорректный формат email",
                    }
                })} />
                {errors.email && <span className={styles.error}>{errors.email.message}</span>}

                <div className={styles.formActions}>
                    <button type="button" onClick={onClose} className={styles.cancelButton}>
                        Отмена
                    </button>
                    <button type="submit" className={styles.submitButton}>
                        Сохранить
                    </button>
                </div>
            </Stack>

        </form>
    );
};

export default EditProfileForm;