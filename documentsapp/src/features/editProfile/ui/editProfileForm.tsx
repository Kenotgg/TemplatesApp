import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Heading, Stack, Text, Input, Button } from '@chakra-ui/react';
import { useAppDispatch } from '@/app/hooks/hooks';
import { profileUpdate } from '@/app/auth/authSlice';
import type { IUser } from '@/entities/user';
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

        console.log("after updating user data:", updatedUser);

        dispatch(profileUpdate(updatedUser));
        localStorage.setItem('user', JSON.stringify(updatedUser));
        onClose();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Heading>Редактировать профиль</Heading>
            <Stack direction={'column'}>
                <Text fontWeight={'bold'}>Имя:</Text>
                <Input type="text" id="name" {...register("name", { required: "Пожалуйста, введите имя" })} />
                {errors.name && <span className={styles.error}>{errors.name.message}</span>}

                <Text fontWeight={'bold'}>Электронная почта:</Text>
                <Input type="email" id="email" {...register("email", {
                    required: "Пожалуйста, введите email",
                    pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Некорректный формат email",
                    }
                })} />
                {errors.email && <span className={styles.error}>{errors.email.message}</span>}

                <Box className={styles.formActions}>
                    <Button color={'white'} bg={'red.500'} mr={'2'} type="button" onClick={onClose} className={styles.cancelButton}>
                        Отмена
                    </Button>
                    <Button color={'white'} bg={'blue.400'} type="submit" className={styles.submitButton}>
                        Сохранить
                    </Button>
                </Box>
            </Stack>

        </form>
    );
};

export default EditProfileForm;