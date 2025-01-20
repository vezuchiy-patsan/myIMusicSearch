import { memo, useState } from 'react';

// eslint-disable-next-line import/named
import { ComboboxItem, Container, Text } from '@mantine/core';
import { useDidUpdate } from '@mantine/hooks';

import styles from './filters.module.scss';
import {
	entityDescriptions,
	MediaEntity,
	mediaEntityMapping,
	MediaType,
} from '../types/filters-type';
import { api } from '@/app/api/api-query';
import { useAppDispatch, useAppSelector } from '@/app/providers/store-provider';
import {
	CountriesCodesEnum,
	CountryNames,
} from '@/shared/types/countries-codes-enum';
import { AppCard } from '@/shared/ui/card';
import { AppSelect } from '@/shared/ui/select';

function getAllowedEntitiesForMediaType(
	mediaTypeString: string = '',
): ComboboxItem[] {
	const mediaType = Object.values(MediaType).find(
		(type) => type === mediaTypeString,
	);

	if (mediaType === undefined) {
		return [];
	}
	if (mediaTypeString === MediaType.ALL) {
		return Object.values(MediaEntity).map((entity) => ({
			value: entity,
			label: entityDescriptions[entity] || entity,
		}));
	}

	const allowedEntities = mediaEntityMapping[mediaType] || [];
	return allowedEntities.map((entity) => ({
		value: entity,
		label: entityDescriptions[entity] || entity,
	}));
}

export const Filters = memo(() => {
	const dispatch = useAppDispatch();

	const [mediaFilter, setMediaFilter] = useState<ComboboxItem | null>({
		value: MediaType.ALL,
		label: 'Всё',
	});
	const [entityFilter, setEntityFilter] = useState<ComboboxItem | null>(null);
	const [limitFilter, setLimitFilter] = useState<string | null>('25');
	const [countryFilter, setCountryFilter] = useState<ComboboxItem | null>({
		value: 'RU',
		label: 'Россия',
	});

	const arg = useAppSelector((state) => state.searchArg);

	useDidUpdate(() => {
		dispatch(
			api.endpoints.searchMedia.initiate(
				{
					...arg,
					media: mediaFilter?.value,
					entity: entityFilter?.value,
					limit: Number(limitFilter) || 25,
					country: countryFilter?.value,
				},
				{ forceRefetch: true },
			),
		);
	}, [mediaFilter, entityFilter, limitFilter, countryFilter]);

	return (
		<Container className={styles.container}>
			<AppCard>
				<Text size="xl">Фильтры</Text>
				<AppSelect
					key={`AppSelect-1`}
					label="Медиа"
					value={mediaFilter}
					onChange={(value, option) => {
						setMediaFilter(option);
						if (value !== null && value !== mediaFilter?.value)
							setEntityFilter(null);
					}}
					data={[
						{ value: MediaType.MOVIE, label: 'Фильмы' },
						{ value: MediaType.PODCAST, label: 'Подкасты' },
						{ value: MediaType.MUSIC, label: 'Музыка' },
						{ value: MediaType.MUSIC_VIDEO, label: 'Музыка и видео' },
						{ value: MediaType.AUDIOBOOK, label: 'Аудиокниги' },
						{ value: MediaType.SHORT_FILM, label: 'Шортсы' },
						{ value: MediaType.TV_SHOW, label: 'Сериалы' },
						{ value: MediaType.SOFTWARE, label: 'Програмное обеспечение' },
						{ value: MediaType.EBOOK, label: 'Книги' },
						{ value: MediaType.ALL, label: 'Всё' },
					]}
				/>
				<AppSelect
					key={`AppSelect-2-${mediaFilter?.value || ''}`}
					searchable
					label="Контент"
					value={entityFilter}
					onChange={(_, option) => setEntityFilter(option)}
					data={getAllowedEntitiesForMediaType(mediaFilter?.value)}
				/>
				<AppSelect
					key={`AppSelect-3`}
					label="Лимит показа"
					value={limitFilter}
					onChange={(value) => setLimitFilter(value)}
					data={['25', '50', '100']}
				/>
				<AppSelect
					key={`AppSelect-4`}
					label="Страна"
					searchable
					value={countryFilter}
					onChange={(_value, option) => setCountryFilter(option)}
					data={Object.values(CountriesCodesEnum).map((el) => ({
						value: el,
						label: CountryNames[el],
					}))}
				/>
			</AppCard>
		</Container>
	);
});
