import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { templateApi } from "@/entities/template/api/templatesApi";
import authReducer from '@/features/authorization/model/authSlice';

export const store = configureStore({
    reducer: {
        [templateApi.reducerPath]: templateApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleWare) => 
        getDefaultMiddleWare().concat(templateApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
