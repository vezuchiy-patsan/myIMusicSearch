import { createReduxStore } from './store';
import { api, SearchMediaArg } from '@/app/api/api-query';

export interface IStateSchema {
	searchArg: SearchMediaArg;
	[api.reducerPath]: ReturnType<typeof api.reducer>;
}
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
