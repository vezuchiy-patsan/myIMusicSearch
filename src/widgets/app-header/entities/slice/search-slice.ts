import { createSlice } from '@reduxjs/toolkit';

import { api, SearchMediaArg } from '@/app/api/api-query';

export interface initialSearchArg extends SearchMediaArg {
	isFetching: boolean;
}

const initialState: initialSearchArg = {
	term: '',
	isFetching: false,
};

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			api.endpoints.searchMedia.matchPending,
			(state, _action) => {
				state.isFetching = true;
			},
		);
		builder.addMatcher(
			api.endpoints.searchMedia.matchFulfilled,
			(_, action) => {
				return { ...action.meta.arg.originalArgs, isFetching: false };
			},
		);
	},
});
export const { actions: searchActions, reducer: searchReducer } = searchSlice;
