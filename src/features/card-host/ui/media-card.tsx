import { Group, Text } from '@mantine/core';

// import styles from './media-card.module.scss';
import { AppCard } from '@/shared/ui/card';

export function MediaCard() {
	return (
		<AppCard isLoading={false}>
			<Group justify="center">
				<Text fw={900} size="xl">
					Текст
				</Text>
			</Group>
		</AppCard>
	);
}
