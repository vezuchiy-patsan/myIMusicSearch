import { memo } from 'react';

import styles from './home.module.scss';
import { Filters } from '@/widgets/filters';
import { SearchResultList } from '@/widgets/search-result-list';

function MainSearchPage() {
	return (
		<div className={styles.pageWrapper}>
			<SearchResultList />
			<Filters />
		</div>
	);
}

export default memo(MainSearchPage);
