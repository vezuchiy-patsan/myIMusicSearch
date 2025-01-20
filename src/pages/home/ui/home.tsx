import { memo } from 'react';

import { Affix, Button, Grid, GridCol, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { IconArrowUp } from '@tabler/icons-react';

import styles from './home.module.scss';
import { Filters } from '@/widgets/filters';
import { SearchResultList } from '@/widgets/search-result-list';

function MainSearchPage() {
	const [scroll, scrollTo] = useWindowScroll();
	return (
		<Grid className={styles.pageWrapper}>
			<GridCol span={{ base: 12, sm: 'auto' }} order={{ base: 2, md: 1 }}>
				<SearchResultList />
			</GridCol>
			<GridCol
				span={{ base: 12, sm: 12, md: 4, lg: 3, xl: 2 }}
				order={{ base: 1, md: 2 }}
			>
				<Filters />
			</GridCol>
			<Affix position={{ bottom: 20, right: 20 }}>
				<Transition transition="slide-up" mounted={scroll.y > 0}>
					{(transitionStyles) => (
						<Button
							leftSection={<IconArrowUp size={16} />}
							style={transitionStyles}
							onClick={() => scrollTo({ y: 0 })}
						>
							На вверх
						</Button>
					)}
				</Transition>
			</Affix>
		</Grid>
	);
}

export default memo(MainSearchPage);
