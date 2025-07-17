import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/features/counter/counterslice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { templateApi } from "@/entities/template/api/templatesApi";

export const store = configureStore({
    reducer: {
        [templateApi.reducerPath]: templateApi.reducer,
    },
    middleware: (getDefaultMiddleWare) => 
        getDefaultMiddleWare().concat(templateApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
