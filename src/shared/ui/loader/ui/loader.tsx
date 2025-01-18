import { memo } from 'react';
import './loader.scss';

export const Loader = memo(() => (
	<div className="lds-ellipsis">
		<div />
		<div />
		<div />
		<div />
	</div>
));
