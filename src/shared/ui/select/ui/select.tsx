import { FC } from 'react';

// eslint-disable-next-line import/named
import { Select, SelectProps } from '@mantine/core';

import styles from './select.module.scss';

interface IValueObj {
	value: string | number;
	label: string;
}

export interface ExtendedSelectProps extends Omit<SelectProps, 'value'> {
	value?: string | IValueObj | null;
}

export const AppSelect: FC<ExtendedSelectProps> = (props) => {
	return (
		<Select
			{...props}
			value={
				typeof props.value === 'object'
					? props.value?.value?.toString()
					: (props?.value?.toString() ?? '')
			}
			placeholder="Выберете значение"
			checkIconPosition="left"
			classNames={{ ...props.classNames, input: styles.input }}
			comboboxProps={{
				position: 'bottom',
				middlewares: { flip: false, shift: false },
				offset: 0,
			}}
		/>
	);
};
