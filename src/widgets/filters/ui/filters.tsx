import { memo } from 'react';

import { Grid } from '@mantine/core';

import styles from './filters.module.scss';

export const Filters = memo(() => {
	return (
		<Grid
			classNames={{
				root: styles.gridRoot,
				inner: styles.gridInner,
			}}
		>
			Фильтры
		</Grid>
	);
});
