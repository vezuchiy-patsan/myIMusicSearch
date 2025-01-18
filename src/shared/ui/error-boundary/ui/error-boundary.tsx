import React, { ErrorInfo, ReactNode, Suspense } from 'react';

interface ErrorBoundaryProps {
	children: ReactNode;
	renderElement: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

export class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(_error: Error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// You can also log the error to an error reporting service
		console.log('Boundary catch error:', error, errorInfo);
	}

	render() {
		const { children, renderElement } = this.props;
		const { hasError } = this.state;
		if (hasError) {
			return <Suspense fallback="">{renderElement}</Suspense>;
		}

		return children;
	}
}
