import { memo } from 'react';

import styles from './home.module.scss';

function MainSearchPage() {
	return (
		<div className={styles.pageWrapper}>
			<>Список</>
			<>Фильтры</>
		</div>
	);
}

export default memo(MainSearchPage);
