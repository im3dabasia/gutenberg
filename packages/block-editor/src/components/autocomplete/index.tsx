/**
 * WordPress dependencies
 */
import { applyFilters, hasFilter } from '@wordpress/hooks';
import {
	Autocomplete as WCAutocomplete,
	__unstableUseAutocompleteProps as useAutocompleteProps,
} from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { getDefaultBlockName, getBlockSupport } from '@wordpress/blocks';
import type { WPCompleter, UseAutocompleteProps } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { useBlockEditContext } from '../block-edit/context';
import blockAutocompleter from '../../autocompleters/block';

/**
 * Shared reference to an empty array for cases where it is important to avoid
 * returning a new array reference on every invocation.
 *
 * @type {Array}
 */
const EMPTY_ARRAY: WPCompleter[] = [];

function useCompleters( {
	completers = EMPTY_ARRAY,
}: UseAutocompleteProps ): WPCompleter[] {
	const { name } = useBlockEditContext() as { name: string };
	return useMemo( () => {
		let filteredCompleters = [ ...completers ];

		if (
			name === getDefaultBlockName() ||
			getBlockSupport( name, '__experimentalSlashInserter', false )
		) {
			filteredCompleters = [
				...filteredCompleters,
				blockAutocompleter as WPCompleter,
			];
		}

		if ( hasFilter( 'editor.Autocomplete.completers' ) ) {
			// Provide copies so filters may directly modify them.
			if ( filteredCompleters === completers ) {
				filteredCompleters = filteredCompleters.map(
					( completer ) => ( { ...completer } )
				);
			}

			filteredCompleters = applyFilters(
				'editor.Autocomplete.completers',
				filteredCompleters,
				name
			) as WPCompleter[];
		}

		return filteredCompleters;
	}, [ completers, name ] );
}

export function useBlockEditorAutocompleteProps( props: any ) {
	return useAutocompleteProps( {
		...props,
		completers: useCompleters( props ),
	} );
}
/**
 * Wrap the default Autocomplete component with one that supports a filter hook
 * for customizing its list of autocompleters.
 *
 * @type {React.FC}
 */
function BlockEditorAutocomplete( props: any ) {
	return (
		<WCAutocomplete { ...props } completers={ useCompleters( props ) } />
	);
}

/**
 * @see https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/autocomplete/README.md
 */
export default BlockEditorAutocomplete;
