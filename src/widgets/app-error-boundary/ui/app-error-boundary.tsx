import { ReactNode } from 'react';

import { ErrorBoundary } from '@/shared/ui/error-boundary';
import { PageError } from '@/widgets/page-error';

interface AppErrorBoundaryProps {
	children: ReactNode;
}

export const AppErrorBoundary = (props: AppErrorBoundaryProps) => {
	const { children } = props;
	return (
		<ErrorBoundary renderElement={<PageError scope="app" />}>
			{children}
		</ErrorBoundary>
	);
};
