import { Attributes, FC, ReactNode } from 'react';

import { Card } from '@mantine/core';

interface IAppCardProps extends Attributes {
	children: ReactNode;
}
export const AppCard: FC<IAppCardProps> = ({ children }) => {
	return (
		<Card shadow="sm" padding="md" radius="md" withBorder>
			{children}
		</Card>
	);
};
