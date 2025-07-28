# DocumentsApp

DocumentsApp - это Single Page Application веб приложение написанное на React + TypeScript с соблюдением архитектурной метадологии FSD(Feature Sliced Design), направленное просмотр и использования шаблонов документов для потребностей пользователя.

## Функционал
- Возможность войти в систему
- Возможность просмотреть все шаблоны и посмотреть каждый шаблон детально
- Возможность просмотра и редактирования своего личного кабинета

## Как запустить
- Клонируйте репозиторий
- Перейдите в папку проекта
- Установить все зависимости npm i
- Запустить через команду npm run dev
- Перейти по появившемуся адресу веб приложения
<img width="349" height="134" alt="Снимок экрана 2025-07-19 003802" src="https://github.com/user-attachments/assets/51d0367b-703b-4727-aa55-9e0ae52745d8" />

## Использованные библиотеки

- @chakra-ui/react@3.22.0
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
- framer-motion@12.23.9
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

## Примененные принципы согласно Feature-Sliced Design (FSD)
- **Разделение на срезы (Slices):** Функциональность организована в отдельные "слайсы", каждый из которых отвечает за конкретную задачу или компонент интерфейса (например, авторизация, отображение списка шаблонов).
  
<img width="163" height="211" alt="image" src="https://github.com/user-attachments/assets/6dd7b331-4b6e-45e8-b3ba-6803fab7c288" />

- **Явные зависимости (Explicit Dependencies):** Компоненты и модули явно указывают на свои зависимости, упрощая понимание структуры проекта и облегчая рефакторинг.
- **Соглашения об именовании (Naming Conventions):** Применяются строгие соглашения об именовании файлов, папок, компонентов и функций, что повышает читаемость и упрощает навигацию.
- **Single Responsibility (Единственная ответственность):** Каждый компонент/модуль имеет только одну причину для изменения.

