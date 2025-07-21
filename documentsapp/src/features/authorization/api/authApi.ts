const FAKE_USER = {
    id: 'user-1',
    email: 'test@example.com',
    password: '1234',
    name: 'test User',
};

import type { User } from '@/entities/user/model/user'
export const login = async (credentials: { email: string; password: string }): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (
                credentials.email == FAKE_USER.email &&
                credentials.password == FAKE_USER.password
            ) {
                console.log("credentials.email:", credentials.email);
                console.log("credentials.password:", credentials.password);
                console.log("FAKE_USER.email:", FAKE_USER.email);
                console.log("FAKE_USER.password:", FAKE_USER.password);
                resolve({
                    id: FAKE_USER.id,
                    email: FAKE_USER.email,
                    name: FAKE_USER.name,
                });
            } else {
                reject(new Error('Invalid credentials')); // Отклоняем Promise при неверных данных
            }
        }, 500)
    });
};