import {
	combineReducers,
	configureStore,
	ReducersMapObject,
} from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import { AppDispatch, IStateSchema } from './state-schema';
import { api } from '@/app/api/api-query';

// создание store
export function createReduxStore(initialState?: IStateSchema) {
	// цепляем через интерфейс
	const reducers: ReducersMapObject<IStateSchema> = {
		[api.reducerPath]: api.reducer,
	};

	const rootReducer = combineReducers(reducers);

	const store = configureStore({
		reducer: rootReducer,
		devTools: true,
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(api.middleware),
	});
	return store;
}

// Типизированные
export const useAppSelector: TypedUseSelectorHook<IStateSchema> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
