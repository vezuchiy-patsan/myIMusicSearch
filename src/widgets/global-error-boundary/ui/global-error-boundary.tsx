import { ReactNode } from 'react';

import { ErrorBoundary } from '@/shared/ui/error-boundary';
import { PageError } from '@/widgets/page-error';

interface GlobalErrorBoundaryProps {
	children: ReactNode;
}

export const GlobalErrorBoundary = (props: GlobalErrorBoundaryProps) => {
	const { children } = props;
	return (
		<ErrorBoundary renderElement={<PageError scope="global" />}>
			{children}
		</ErrorBoundary>
	);
};
