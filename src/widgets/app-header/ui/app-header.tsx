import { Autocomplete, Group } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

import classes from './app-header.module.scss';

export function AppHeader() {
	return (
		<header className={classes.header}>
			<div className={classes.inner}>
				<Group>
					<Autocomplete
						className={classes.search}
						placeholder="Search"
						leftSection={<IconSearch size={16} stroke={1.5} />}
						data={[]}
					/>
				</Group>
			</div>
		</header>
	);
}
