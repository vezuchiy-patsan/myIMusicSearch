import { memo, useState } from 'react';

import { ComboboxItem, Container, Text } from '@mantine/core';
import { useDidUpdate } from '@mantine/hooks';

import styles from './filters.module.scss';
import { api } from '@/app/api/api-query';
import { useAppDispatch, useAppSelector } from '@/app/providers/store-provider';
import {
	CountriesCodesEnum,
	CountryNames,
} from '@/shared/types/countries-codes-enum';
import { AppCard } from '@/shared/ui/card';
import { AppSelect } from '@/shared/ui/select';

export enum MediaType {
	MOVIE = 'movie',
	PODCAST = 'podcast',
	MUSIC = 'music',
	MUSIC_VIDEO = 'musicVideo',
	AUDIOBOOK = 'audiobook',
	SHORT_FILM = 'shortFilm',
	TV_SHOW = 'tvShow',
	SOFTWARE = 'software',
	EBOOK = 'ebook',
	ALL = '',
}

export enum MediaEntity {
	MOVIE_ARTIST = 'movieArtist',
	MOVIE = 'movie',
	PODCAST_AUTHOR = 'podcastAuthor',
	PODCAST = 'podcast',
	MUSIC_ARTIST = 'musicArtist',
	MUSIC_TRACK = 'musicTrack',
	ALBUM = 'album',
	MUSIC_VIDEO = 'musicVideo',
	MIX = 'mix',
	SONG = 'song',
	AUDIOBOOK_AUTHOR = 'audiobookAuthor',
	AUDIOBOOK = 'audiobook',
	SHORT_FILM_ARTIST = 'shortFilmArtist',
	SHORT_FILM = 'shortFilm',
	TV_EPISODE = 'tvEpisode',
	TV_SEASON = 'tvSeason',
	SOFTWARE = 'software',
	IPAD_SOFTWARE = 'iPadSoftware',
	MAC_SOFTWARE = 'macSoftware',
	EBOOK = 'ebook',
	ALL_ARTIST = 'allArtist',
	ALL_TRACK = 'allTrack',
}

const mediaEntityMapping: Record<MediaType, MediaEntity[]> = {
	[MediaType.MOVIE]: [MediaEntity.MOVIE_ARTIST, MediaEntity.MOVIE],
	[MediaType.PODCAST]: [MediaEntity.PODCAST_AUTHOR, MediaEntity.PODCAST],
	[MediaType.MUSIC]: [
		MediaEntity.MUSIC_ARTIST,
		MediaEntity.MUSIC_TRACK,
		MediaEntity.ALBUM,
		MediaEntity.MUSIC_VIDEO,
		MediaEntity.MIX,
		MediaEntity.SONG,
	],
	[MediaType.MUSIC_VIDEO]: [MediaEntity.MUSIC_ARTIST, MediaEntity.MUSIC_VIDEO],
	[MediaType.AUDIOBOOK]: [MediaEntity.AUDIOBOOK_AUTHOR, MediaEntity.AUDIOBOOK],
	[MediaType.SHORT_FILM]: [
		MediaEntity.SHORT_FILM_ARTIST,
		MediaEntity.SHORT_FILM,
	],
	[MediaType.TV_SHOW]: [MediaEntity.TV_EPISODE, MediaEntity.TV_SEASON],
	[MediaType.SOFTWARE]: [
		MediaEntity.SOFTWARE,
		MediaEntity.IPAD_SOFTWARE,
		MediaEntity.MAC_SOFTWARE,
	],
	[MediaType.EBOOK]: [MediaEntity.EBOOK],
	[MediaType.ALL]: [
		MediaEntity.MOVIE,
		MediaEntity.ALBUM,
		MediaEntity.ALL_ARTIST,
		MediaEntity.PODCAST,
		MediaEntity.MUSIC_VIDEO,
		MediaEntity.MIX,
		MediaEntity.AUDIOBOOK,
		MediaEntity.TV_SEASON,
		MediaEntity.ALL_TRACK,
	],
};

const entityDescriptions: Record<MediaEntity, string> = {
	[MediaEntity.MOVIE_ARTIST]: 'Исполнитель фильмов',
	[MediaEntity.MOVIE]: 'Фильм',
	[MediaEntity.PODCAST_AUTHOR]: 'Автор подкастов',
	[MediaEntity.PODCAST]: 'Подкаст',
	[MediaEntity.MUSIC_ARTIST]: 'Музыкальный исполнитель',
	[MediaEntity.MUSIC_TRACK]: 'Музыкальный трек',
	[MediaEntity.ALBUM]: 'Альбом',
	[MediaEntity.MUSIC_VIDEO]: 'Музыкальное видео',
	[MediaEntity.MIX]: 'Микс',
	[MediaEntity.SONG]: 'Песня',
	[MediaEntity.AUDIOBOOK_AUTHOR]: 'Автор аудиокниг',
	[MediaEntity.AUDIOBOOK]: 'Аудиокнига',
	[MediaEntity.SHORT_FILM_ARTIST]: 'Шортсы',
	[MediaEntity.SHORT_FILM]: 'Короткометражный фильм',
	[MediaEntity.TV_EPISODE]: 'Эпизод сериала',
	[MediaEntity.TV_SEASON]: 'Сериал',
	[MediaEntity.SOFTWARE]: 'Программное обеспечение',
	[MediaEntity.IPAD_SOFTWARE]: 'Программное обеспечение для iPad',
	[MediaEntity.MAC_SOFTWARE]: 'Программное обеспечение для Mac',
	[MediaEntity.EBOOK]: 'Электронная книга',
	[MediaEntity.ALL_ARTIST]: 'Все исполнители',
	[MediaEntity.ALL_TRACK]: 'Все треки',
};

function getAllowedEntitiesForMediaType(
	mediaTypeString: string = '',
): { value: string; label: string }[] {
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
					value={countryFilter}
					onChange={(_value, option) => setCountryFilter(option)}
					data={Object.values(CountriesCodesEnum).map((el) => ({
						value: el,
						label: CountryNames[el], // Здесь CountryNames — это ваш объект с русскими названиями стран
					}))}
				/>
			</AppCard>
		</Container>
	);
});
