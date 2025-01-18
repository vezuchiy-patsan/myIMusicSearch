import { memo, useCallback } from 'react';

import { Button } from '@mantine/core';

import cls from './page-error.module.scss';

interface PageErrorProps {
	scope: 'global' | 'app';
}

export const PageError = memo((props: PageErrorProps) => {
	const handleReload = useCallback(() => {
		window.location.reload();
	}, []);

	return (
		<div className={cls.pageWrapper}>
			<p>Что-то случилось!!! Инфо: {props.scope}</p>
			<Button onClick={handleReload} variant="primary">
				Перезагрузить
			</Button>
		</div>
	);
});
