import { memo, useState } from 'react';

import {
	AspectRatio,
	Box,
	Button,
	Grid,
	GridCol,
	Loader,
	LoadingOverlay,
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';

import styles from './search.module.scss';
import { useSearchMediaQuery } from '@/app/api/api-query';
import { useAppSelector } from '@/app/providers/store-provider';
import { AppCard } from '@/shared/ui/card';

const ImageWithLoader = ({ src, alt }: { src: string; alt: string }) => {
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
					src={src}
					alt={alt}
					className={styles.imgStyle}
					onLoad={() => setIsLoading(false)}
				/>
			</AspectRatio>
		</div>
	);
};

export const SearchResultList = memo(() => {
	const searchArg = useAppSelector((state) => state.searchArg);

	const { data = [], isFetching } = useSearchMediaQuery(searchArg);

	return (
		<Grid
			classNames={{
				root: styles.gridRoot,
				inner: styles.gridInner,
			}}
			gutter="md"
			grow
		>
			<LoadingOverlay
				visible={isFetching}
				zIndex={1000}
				overlayProps={{ radius: 'sm', blur: 2 }}
			/>
			{data.map((card) => (
				<GridCol key={card.trackId}>
					<AppCard>
						<Grid align="center">
							<GridCol span={{ base: 12, md: 6, lg: 1 }}>
								<AspectRatio ratio={100 / 100}>
									<ImageWithLoader
										src={card.artworkUrl100 || ''}
										alt={card.trackName}
									/>
								</AspectRatio>
							</GridCol>
							<GridCol span={{ base: 12, md: 6, lg: 'auto' }}>
								<Grid>
									<GridCol>{card.trackName}</GridCol>
									<GridCol>{card.longDescription}</GridCol>
								</Grid>
							</GridCol>
							<GridCol span={{ base: 12, md: 6, lg: 2 }}>
								<Box
									component="a"
									href={card.collectionViewUrl}
									target="_blank"
								>
									<Button
										radius="xl"
										variant="gradient"
										gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
										rightSection={<IconArrowRight size={14} />}
										fullWidth
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
