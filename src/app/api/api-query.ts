import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const link = import.meta.env.VITE_ITUNES_API_URL;

// инициализация api
export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: link,
	}),
	keepUnusedDataFor: 60,
	endpoints: (build) => ({}),
});
