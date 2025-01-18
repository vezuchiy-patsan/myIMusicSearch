import { createReduxStore } from './store';
import { api } from '@/app/api/api-query';

export interface IStateSchema {
	[api.reducerPath]: ReturnType<typeof api.reducer>;
}
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
