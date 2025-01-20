import { createReduxStore } from './store';
import { api } from '@/app/api/api-query';
import { initialSearchArg } from '@/widgets/app-header/entities/slice/search-slice';

export interface IStateSchema {
	searchArg: initialSearchArg;
	[api.reducerPath]: ReturnType<typeof api.reducer>;
}
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
