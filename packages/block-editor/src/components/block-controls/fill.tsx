/**
 * External dependencies
 */
import type { ComponentProps } from 'react';

/**
 * WordPress dependencies
 */
import {
	__experimentalStyleProvider as StyleProvider,
	ToolbarGroup,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import useBlockControlsFill from './hook';
import type groups from './groups';

type GroupKey = keyof typeof groups;

interface BlockControlsFillProps {
	group?: GroupKey;
	controls?: ComponentProps< typeof ToolbarGroup >[ 'controls' ];
	children?: React.ReactNode;
	__experimentalShareWithChildBlocks?: boolean;
}

type ContextEntry = [
	React.ComponentType< { value: unknown; children?: React.ReactNode } >,
	{ value: unknown },
];

export default function BlockControlsFill( {
	group = 'default',
	controls,
	children,
	__experimentalShareWithChildBlocks = false,
}: BlockControlsFillProps ) {
	const Fill = useBlockControlsFill(
		group,
		__experimentalShareWithChildBlocks
	);
	if ( ! Fill ) {
		return null;
	}

	const innerMarkup = (
		<>
			{ group === 'default' && <ToolbarGroup controls={ controls } /> }
			{ children }
		</>
	);

	return (
		<StyleProvider document={ document }>
			{ /* eslint-disable-next-line react-hooks/static-components */ }
			<Fill>
				{ ( fillProps ) => {
					// `fillProps.forwardedContext` is an array of context provider entries, provided by slot,
					// that should wrap the fill markup.
					const { forwardedContext = [] } = fillProps as {
						forwardedContext: ContextEntry[];
					};

					return forwardedContext.reduce(
						( inner, [ Provider, props ] ) => (
							<Provider { ...props }>{ inner }</Provider>
						),
						innerMarkup
					);
				} }
			</Fill>
		</StyleProvider>
	);
}
