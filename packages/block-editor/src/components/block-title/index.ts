/**
 * Internal dependencies
 */

import useBlockDisplayTitle from './use-block-display-title';

/**
 * Renders the block's configured title as a string, or empty if the title
 * cannot be determined.
 *
 * @example
 *
 * ```jsx
 * <BlockTitle clientId="afd1cb17-2c08-4e7a-91be-007ba7ddc3a1" maximumLength={ 17 }/>
 * ```
 *
 * @param props
 * @param props.clientId      Client ID of block.
 * @param props.maximumLength The maximum length that the block title string may be before truncated.
 * @param props.context       The context to pass to `getBlockLabel`.
 *
 * @return Block title.
 */
export default function BlockTitle( {
	clientId,
	maximumLength,
	context,
}: {
	clientId: string;
	maximumLength?: number;
	context?: string;
} ) {
	return useBlockDisplayTitle( { clientId, maximumLength, context } );
}
