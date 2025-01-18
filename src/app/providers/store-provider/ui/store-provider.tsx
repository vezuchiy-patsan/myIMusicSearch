import { FC, ReactNode } from 'react';

import { Provider } from 'react-redux';

import { IStateSchema } from '../config/state-schema';
import { createReduxStore } from '../config/store';

interface StoreProviderProps {
	children?: ReactNode;
	initialState?: IStateSchema;
}

// Компонент RTK провайдера
export const StoreProvider: FC<StoreProviderProps> = (
	props: StoreProviderProps,
) => {
	const { children, initialState } = props;

	const store = createReduxStore(initialState);

	return <Provider store={store}>{children}</Provider>;
};
