/* eslint-disable import/named */
import {
	combineReducers,
	configureStore,
	ReducersMapObject,
} from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import { AppDispatch, IStateSchema } from './state-schema';
import { api } from '@/app/api/api-query';
import { searchReducer } from '@/widgets/app-header/entities/slice/search-slice';

// создание store
export function createReduxStore(initialState?: IStateSchema) {
	// цепляем через интерфейс
	const reducers: ReducersMapObject<IStateSchema> = {
		searchArg: searchReducer,
		[api.reducerPath]: api.reducer,
	};

	const rootReducer = combineReducers(reducers);

	const store = configureStore({
		reducer: rootReducer,
		devTools: import.meta.env.MODE === 'development',
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(api.middleware),
	});
	return store;
}

// Типизированные
export const useAppSelector: TypedUseSelectorHook<IStateSchema> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
