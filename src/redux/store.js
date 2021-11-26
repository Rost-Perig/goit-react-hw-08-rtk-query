
import { configureStore } from "@reduxjs/toolkit";
//для возможности записи в локал сторидж
import storage from 'redux-persist/lib/storage';  
//для записи в локал сторидж и небыло красного в консоли
import { contactsApi } from 'redux/contacts/contactsSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist';
import filter from './contacts/contacts-reducer';
//вариант со слайсом
// import {authReducer} from './auth/auth-slice';
//вариант без слайса
import authReducer from './auth/auth-reducer';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    filter,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],},
    }).concat(contactsApi.middleware),
    
    devTools: process.env.NODE_ENV === 'development' //devTools будет доступно только в процессе разработки (как и надо)
});

export const persistor = persistStore(store);