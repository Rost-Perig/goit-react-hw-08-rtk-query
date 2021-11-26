/*==========вариант с подвязкой axios к RTK Query==========*/

import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

// axios.defaults.baseURL = 'https://6191e46441928b00176901ac.mockapi.io/api/v1';

const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: axios.defaults.baseURL }) =>
        async ({ url, method, data }) => {
            try {
                const result = await axios({ url: baseUrl + url, method, data })
                return { data: result.data }
            } catch (axiosError) {
                let err = axiosError
                return {
                    error: { status: err.response?.status, data: err.response?.data },
                }
            }
        };

export const contactsApi = createApi({
    reducerPath: 'contactsAPI',

    baseQuery: axiosBaseQuery(),
  
    tagTypes: ['Contacts'],

    endpoints: (build) => ({
        fetchContacts: build.query({
            query: () => ({ url: '/contacts', method: 'get' }),
            providesTags: ['Contacts'],
        }),

        deleteContact: build.mutation({
            query: (contactId) => ({ url: `/contacts/${contactId}`, method: 'delete' }),
            invalidatesTags: ['Contacts'],
        }),

        createContact: build.mutation({
            query: (newContact) => ({ url: `/contacts`, method: 'post', data: newContact }),
            invalidatesTags: ['Contacts'],
        }),

    }),
});

export const { useFetchContactsQuery, useDeleteContactMutation, useCreateContactMutation } = contactsApi;



/*==========вариант с использоваием fetchBaseQuery, встроеной в  RTK Query==========*/

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// /* Define a service using a base URL and expected endpoints / Объявляем службу-сервис, используя базовый URL-адрес и ожидаемые конечные точки*/

// export const contactsApi = createApi({
//     reducerPath: 'contactsAPI',
    
//     baseQuery: fetchBaseQuery({ baseUrl: 'https://6191e46441928b00176901ac.mockapi.io/api/v1' }),
    
//     tagTypes: ['Contacts'],  //создаем тег-ключ (может быть несколько), которыми будем связывать "действия"

//     endpoints: (builder) => ({
//         //получение (фетч) даных с сервера

//         fetchContacts: builder.query({
//             query: () => `/contacts`,
//             //==как вариант, при фетче не нужен==//
//             // query: () => ({
//             //     url: `/contacts`,
//             //     method: 'GET'
//             // }),
//             providesTags: ['Contacts'], //привязываем зафетченые даные к этому тегу-кллючу
//         }),
        
//         //другие операции (т.н. мутации) - удаление на сервере, добавление на сервер.....

//         deleteContact: builder.mutation({
//             query: contactId => ({
//                 url: `/contacts/${contactId}`,
//                 method: 'DELETE'
//             }),
//             invalidatesTags: ['Contacts'],  //объявляем, что по этому тегу-кллючу нужно повторно инвалидировать даные (перефетчить и перерендерить)
//         }),

//         createContact: builder.mutation({
//             query: newContact => ({
//                 url: `/contacts`,
//                 method: 'POST',
//                 body: newContact
//             }),
//             invalidatesTags: ['Contacts'],
//         }),
        
//     }),
// });

// // Export hooks for usage in functional components, which are / Экспорт хуков для использования в функциональных компонентах, в которых это необходимо
// // auto-generated based on the defined endpoints

// export const { useFetchContactsQuery, useDeleteContactMutation, useCreateContactMutation } = contactsApi;

