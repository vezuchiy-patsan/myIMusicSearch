import { Loader } from '@mantine/core';

import styles from './page-loader.module.scss';

export const PageLoader = () => (
	<div className={styles.pageWrapper}>
		<Loader />
	</div>
);
