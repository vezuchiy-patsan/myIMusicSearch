import { memo } from 'react';

import styles from './not-found.module.scss';

function NotFoundPage() {
	return (
		<div className={styles.pageWrapper}>
			<p>Страница не найдена</p>
		</div>
	);
}

export default memo(NotFoundPage);
