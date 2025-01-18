import type { IStateSchema } from './config/state-schema';
import {
	createReduxStore,
	useAppDispatch,
	useAppSelector,
} from './config/store';
import { StoreProvider } from './ui/store-provider';

export {
	StoreProvider,
	createReduxStore,
	IStateSchema,
	useAppDispatch,
	useAppSelector,
};
