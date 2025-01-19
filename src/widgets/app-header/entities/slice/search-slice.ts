import { createSlice } from '@reduxjs/toolkit';

import { api, SearchMediaArg } from '@/app/api/api-query';

const initialState: SearchMediaArg = {
	term: '',
};

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			api.endpoints.searchMedia.matchFulfilled,
			(_, action) => {
				return action.meta.arg.originalArgs;
			},
		);
	},
});
export const { actions: searchActions, reducer: searchReducer } = searchSlice;
