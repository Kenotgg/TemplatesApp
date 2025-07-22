import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { templateApi } from "@/pages/templatesPage/api/templatesApi";
import authReducer from '@/app/auth/authSlice';
import { authApi } from "@/pages/login/api/authApi";

export const store = configureStore({
    reducer: {
        [templateApi.reducerPath]: templateApi.reducer,
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        
    },
    middleware: (getDefaultMiddleWare) => 
        getDefaultMiddleWare().concat(templateApi.middleware).concat(authApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
