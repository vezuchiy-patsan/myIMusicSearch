import { useState } from 'react';

import { Autocomplete, Group, Loader } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';

import styles from './app-header.module.scss';
import { useSearchMediaQuery } from '@/app/api/api-query';
import { useAppSelector } from '@/app/providers/store-provider';

export function AppHeader() {
	const [value, setValue] = useState('');
	const [searchValue] = useDebouncedValue(value, 350);

	const arg = useAppSelector((state) => state.searchArg);

	const { isFetching } = useSearchMediaQuery({ ...arg, term: searchValue });

	return (
		<header className={styles.header}>
			<div className={styles.inner}>
				<Group grow classNames={{ root: styles.group }}>
					<Autocomplete
						radius="xl"
						value={value}
						onChange={setValue}
						clearable
						placeholder="Поиск"
						leftSection={<IconSearch size={16} stroke={1.5} />}
						data={[]}
						rightSection={isFetching && <Loader size={18} />}
					/>
				</Group>
			</div>
		</header>
	);
}
