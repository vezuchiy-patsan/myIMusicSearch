import { Attributes, FC, ReactNode } from 'react';

import { LoadingOverlay, Card } from '@mantine/core';

import styles from './card.module.scss';

interface IAppCardProps extends Attributes {
	isLoading: boolean;
	children: ReactNode;
}
export const AppCard: FC<IAppCardProps> = ({ children, isLoading = false }) => {
	return (
		<Card shadow="sm" padding="md" radius="md" withBorder>
			<LoadingOverlay
				visible={isLoading}
				className={styles.overlay}
				overlayProps={{ radius: 'sm', blur: 2 }}
				transitionProps={{ transition: 'fade', duration: 400 }}
			/>
			{children}
		</Card>
	);
};
