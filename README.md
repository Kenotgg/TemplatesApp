# DocumentsApp

DocumentsApp - это Single Page Application веб приложение написанное на React + TypeScript с соблюдением архитектурной метадологии FSD(Feature Sliced Design), направленное просмотр и использования шаблонов документов для потребностей пользователя.

## Функционал
- Авторизация
- Просмотр, дублирование, удаление шаблонов
- Редактирование данных пользователя в личнном кабинете в рамках сессии в аккаунте

## Как запустить приложение
- Клонируйте репозиторий средствами github в вашем браузере
- Перейдите в папку проекта
- Установите все зависимости с помощью команды ```npm install```
- Запустите приложение через команду npm run dev
- Перейдите по появившемуся адресу в терминале
<img width="349" height="134" alt="Снимок экрана 2025-07-19 003802" src="https://github.com/user-attachments/assets/51d0367b-703b-4727-aa55-9e0ae52745d8" />

## Использованные библиотеки
- @chakra-ui/icons@2.2.4
- @chakra-ui/react@2.10.9
- @emotion/react@11.14.0
- @emotion/styled@11.14.1
- @eslint/js@9.31.0
- @mui/icons-material@7.2.0
- @mui/material@7.2.0
- @mui/x-date-pickers-pro@8.8.0
- @mui/x-date-pickers@8.8.0
- @reduxjs/toolkit@2.8.2
- @types/node@20.19.8
- @types/react-dom@19.1.6
- @types/react@19.1.8
- @vitejs/plugin-react@4.6.0
- date-fns@4.1.0
- eslint-plugin-react-hooks@5.2.0
- eslint-plugin-react-refresh@0.4.20
- eslint@9.31.0
- framer-motion@12.23.12
- globals@16.3.0
- next-themes@0.4.6
- react-datepicker@8.4.0
- react-dom@19.1.0
- react-hook-form@7.60.0
- react-icons@5.5.0
- react-redux@9.2.0
- react-router-dom@6.30.1
- react@19.1.0
- redux-thunk@3.1.0
- redux@5.0.1
- sass@1.89.2
- steiger@0.5.8
- typescript-eslint@8.37.0
- typescript@5.8.3
- vite@7.0.4

## 🏗 Архитектура (Feature-Sliced Design)

Проект следует принципам FSD с осознанными исключениями для баланса между чистотой архитектуры и практической целесообразностью.

### ✅ Соблюдённые принципы

#### 1. Слоистая структура
```bash
src/
├── app/        # Инициализация приложения
├── pages/      # Композиция страниц
├── features/   # Бизнес-логика (auth, templates)
├── entities/   # Базовые сущности
└── shared/     # Переиспользуемые ресурсы
```
#### 2. Публичный API
Каждый модуль предоставляет явный интерфейс через index.ts:
```bash
// features/auth/index.ts
export { LoginForm } from './ui/LoginForm';
export { authApi } from './api/authApi';
```
#### 3. Контроль зависимостей
```bash
app → pages → features → entities → shared
```
