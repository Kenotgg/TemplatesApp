// src/features/profile/editProfileForm/ui/EditProfileForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/app/hooks/hooks';
import { loginSuccess as login } from '@/pages/login/model/authSlice'; // <- Correct action
import type { User } from '@/entities/user/model/user';
import styles from './Modal.module.scss';
interface EditProfileFormProps {
  user: User | null;
  onClose: () => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ user, onClose }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<User>({
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

  const onSubmit = (data: Omit<User, 'id'>) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      ...data,
    };

    dispatch(login(updatedUser)); 
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2>Редактировать профиль</h2>

      <div className={styles.formGroup}>
        <label htmlFor="name">Имя:</label>
        <input type="text" id="name" {...register("name", { required: "Пожалуйста, введите имя" })} />
        {errors.name && <span className={styles.error}>{errors.name.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" {...register("email", {
          required: "Пожалуйста, введите email",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Некорректный формат email",
          }
        })} />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
      </div>

      <div className={styles.formActions}>
        <button type="button" onClick={onClose} className={styles.cancelButton}>
          Отмена
        </button>
        <button type="submit" className={styles.submitButton}>
          Сохранить
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;