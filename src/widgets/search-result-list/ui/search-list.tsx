import { memo, useState } from 'react';

import {
	AspectRatio,
	Box,
	Button,
	Center,
	Grid,
	GridCol,
	Loader,
	Spoiler,
	Text,
} from '@mantine/core';
import {
	IconAlbum,
	IconApps,
	IconArrowRight,
	IconBook,
	IconBrandApplePodcast,
	IconBrandYoutube,
	IconDeviceSpeaker,
	IconDeviceUnknown,
	IconMovie,
	IconPdf,
	IconPlaylist,
	IconStarFilled,
	IconWallpaper,
} from '@tabler/icons-react';

import styles from './search.module.scss';
import { useSearchMediaQuery } from '@/app/api/api-query';
import { useAppSelector } from '@/app/providers/store-provider';
import { AppCard } from '@/shared/ui/card';

type kindContent =
	| 'book'
	| 'album'
	| 'coached-audio'
	| 'feature-movie'
	| 'interactive-booklet'
	| 'music-video'
	| 'pdf'
	| 'podcast'
	| 'podcast-episode'
	| 'software-package'
	| 'song'
	| 'tv-episode'
	| 'artist'
	| 'unknown-type';

const getSvgTypeContent = (type: kindContent): JSX.Element => {
	switch (type) {
		case 'book':
			return <IconBook />;
		case 'album':
			return <IconAlbum />;
		case 'coached-audio':
			return <IconDeviceSpeaker />;
		case 'feature-movie':
			return <IconMovie />;
		case 'interactive-booklet':
			return <IconWallpaper />;
		case 'music-video':
			return <IconBrandYoutube />;
		case 'pdf':
			return <IconPdf />;
		case 'podcast':
			return <IconBrandApplePodcast />;
		case 'podcast-episode':
			return <IconBrandApplePodcast />;
		case 'software-package':
			return <IconApps />;
		case 'song':
			return <IconPlaylist />;
		case 'tv-episode':
			return <IconBrandYoutube />;
		case 'artist':
			return <IconStarFilled />;
		default:
			return <IconDeviceUnknown />;
	}
};

const ImageWithLoader = memo(({ src, alt }: { src: string; alt: string }) => {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<div className={styles.imageWrapper}>
			{isLoading && (
				<div className={styles.loader}>
					<Loader size="sm" />
				</div>
			)}

			<AspectRatio ratio={100 / 100}>
				<img
					src={
						src.length > 0 ? src : 'https://placehold.co/100x100?text=Not+Found'
					}
					alt={alt}
					className={styles.imgStyle}
					onLoad={() => setIsLoading(false)}
				/>
			</AspectRatio>
		</div>
	);
});

export const SearchResultList = memo(() => {
	const { isFetching, ...searchArg } = useAppSelector(
		(state) => state.searchArg,
	);

	const { data = [] } = useSearchMediaQuery(searchArg);
	if (isFetching)
		return (
			<div className={styles.loader}>
				<Loader />
			</div>
		);
	if (data.length === 0)
		return (
			<Center>
				<Text size="xl">Нет данных</Text>
			</Center>
		);
	return (
		<Grid
			classNames={{
				root: styles.gridRoot,
				inner: styles.gridInner,
			}}
			gutter="md"
			grow
		>
			{data.map((card, index) => (
				<GridCol key={`${card.wrapperType}-${index}`}>
					<AppCard>
						<Grid align="center" justify="center">
							<GridCol span={{ base: 6, xs: 3, sm: 3, md: 3, lg: 2, xl: 1 }}>
								<ImageWithLoader
									src={card.artworkUrl100 || ''}
									alt={card.trackName}
								/>
							</GridCol>
							<GridCol
								span={{ base: 12, xs: 9, sm: 9, md: 9, lg: 'auto' }}
								className={styles.textCard}
							>
								<Grid>
									<GridCol>
										<Text size="xl" fw={700}>
											{card.trackName || card.artistName}
											{getSvgTypeContent(card.kind)}
										</Text>
									</GridCol>
									<GridCol pt={0}>
										<Spoiler
											maxHeight={70}
											showLabel="Подробнее"
											hideLabel="Скрыть"
										>
											<Text fw={400} size="md" c={'gray.6'}>
												{card.longDescription || 'Нет описания'}
											</Text>
										</Spoiler>
									</GridCol>
								</Grid>
							</GridCol>
							<GridCol span={{ base: 12, md: 12, lg: 3, xl: 2 }}>
								<Box
									component="a"
									href={
										card.collectionViewUrl ||
										card.artistLinkUrl ||
										card.trackViewUrl
									}
									target="_blank"
								>
									<Button
										radius="xl"
										variant="gradient"
										gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
										rightSection={<IconArrowRight size={14} />}
										fullWidth
										className={styles.gradientButton}
									>
										Источник
									</Button>
								</Box>
							</GridCol>
						</Grid>
					</AppCard>
				</GridCol>
			))}
		</Grid>
	);
});
