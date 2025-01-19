import '@mantine/core/styles.css';
import '@/app/styles/index.scss';
import '@/index.css';

import { Suspense } from 'react';

import { AppShell } from '@mantine/core';
import cn from 'classnames';

import { AppRouter } from '@/app/providers/router';
import { AppErrorBoundary } from '@/widgets/app-error-boundary';
import { AppHeader } from '@/widgets/app-header';

export function App() {
	return (
		<div className={cn('app')}>
			<Suspense fallback="">
				<AppErrorBoundary>
					<AppShell
						header={{ height: 'var(--header-height)' }}
						padding="md"
						classNames={{
							root: 'app-shell-root',
							main: 'app-shell-main',
						}}
					>
						<AppHeader />

						<AppShell.Main>
							<AppRouter />
						</AppShell.Main>
					</AppShell>
				</AppErrorBoundary>
			</Suspense>
		</div>
	);
}
