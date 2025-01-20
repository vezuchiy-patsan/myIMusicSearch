import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ITunesResponse, SearchMediaArg, SearchMediaResponse } from './types';
import { CountriesCodesEnum } from '@/shared/types/countries-codes-enum';

const url = import.meta.env.VITE_ITUNES_API_URL;

// инициализация api
export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: url,
	}),
	keepUnusedDataFor: 60,
	endpoints: (build) => ({
		searchMedia: build.query<SearchMediaResponse[], SearchMediaArg>({
			query: ({ term, media, entity, limit, country }) => {
				const params = new URLSearchParams({
					term,
					limit: limit?.toString() || '25',
					country: country || CountriesCodesEnum.RU,
				});
				if (entity) params.append('entity', entity);
				if (media) params.append('media', media);

				return {
					url: 'search',
					method: 'GET',
					params,
				};
			},
			transformResponse: (response: ITunesResponse) => response.results || [],
		}),
	}),
});

export const { useSearchMediaQuery } = api;
