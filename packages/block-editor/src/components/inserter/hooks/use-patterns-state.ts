/**
 * WordPress dependencies
 */
import { useCallback, useMemo } from '@wordpress/element';
import { cloneBlock, createBlock } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';
import { store as noticesStore } from '@wordpress/notices';
import type { Block } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { store as blockEditorStore } from '../../../store';
import { unlock } from '../../../lock-unlock';
import {
	isNavigationOverlayContextKey,
	userPatternCategoriesSelectKey,
} from '../../../store/private-keys';
import { INSERTER_PATTERN_TYPES } from '../block-patterns-tab/utils';
import { isFiltered } from '../../../store/utils';

interface Pattern {
	id: string;
	type: string;
	syncStatus: string;
	name: string;
	title: string;
	categories?: Array< string >;
}
/**
 * Retrieves the block patterns inserter state.
 *
 * @param onInsert         function called when inserter a list of blocks.
 * @param rootClientId     Insertion's root client ID.
 * @param selectedCategory The selected pattern category.
 * @param isQuick          For the quick inserter render only allowed patterns.
 *
 * @return Returns the patterns state. (patterns, categories, onSelect handler)
 */
const usePatternsState = (
	onInsert: Function,
	rootClientId?: string,
	// @ts-ignore -- Requires a wider change of parameter positioning. TBD in follow-up PR.
	selectedCategory: string,
	isQuick: boolean
): [ Pattern[], any[], ( pattern: Pattern, blocks: Block[] ) => void ] => {
	const options = useMemo(
		() => ( { [ isFiltered ]: !! isQuick } ),
		[ isQuick ]
	);

	// Check if we're editing a navigation-overlay template part.
	// This information is passed through block editor settings to avoid
	// cross-package dependencies.
	const isWithinNavigationOverlayContext = useSelect( ( select ) => {
		const { getSettings } = unlock( select( blockEditorStore ) );
		const settings = getSettings();
		return settings[ isNavigationOverlayContextKey ] ?? false;
	}, [] );

	const { patternCategories, patterns, userPatternCategories } = useSelect(
		( select ) => {
			const { getSettings, __experimentalGetAllowedPatterns } = unlock(
				select( blockEditorStore )
			);
			const settings = getSettings();
			const userPatternCategoriesSelect =
				settings[ userPatternCategoriesSelectKey ];
			return {
				patterns: __experimentalGetAllowedPatterns(
					rootClientId,
					options
				),
				userPatternCategories: userPatternCategoriesSelect
					? userPatternCategoriesSelect( select )
					: settings.__experimentalUserPatternCategories,
				patternCategories:
					settings.__experimentalBlockPatternCategories,
			};
		},
		[ rootClientId, options ]
	);

	// Filter out patterns with "navigation" category unless we're in
	// navigation-overlay template part context.
	// TO DO: create an api for patterns to decide in which context they should be shown.
	const filteredPatterns = useMemo( () => {
		return patterns.filter( ( pattern: Pattern ) => {
			const hasNavigationCategory =
				pattern.categories?.includes( 'navigation' );
			if ( hasNavigationCategory && ! isWithinNavigationOverlayContext ) {
				return false;
			}
			return true;
		} );
	}, [ patterns, isWithinNavigationOverlayContext ] );
	const { getClosestAllowedInsertionPointForPattern } = unlock(
		useSelect( blockEditorStore )
	);

	const allCategories = useMemo( () => {
		const categories = [ ...patternCategories ];
		userPatternCategories?.forEach( ( userCategory: any ) => {
			if (
				! categories.find(
					( existingCategory ) =>
						existingCategory.name === userCategory.name
				)
			) {
				categories.push( userCategory );
			}
		} );
		return categories;
	}, [ patternCategories, userPatternCategories ] );

	const { createSuccessNotice } = useDispatch( noticesStore );
	const onClickPattern = useCallback(
		(
			pattern: {
				id: string;
				type: string;
				syncStatus: string;
				name: string;
				title: string;
			},
			blocks: Block[]
		) => {
			const destinationRootClientId = isQuick
				? rootClientId
				: getClosestAllowedInsertionPointForPattern(
						pattern,
						rootClientId
				  );
			if ( destinationRootClientId === null ) {
				return;
			}
			const patternBlocks =
				pattern.type === INSERTER_PATTERN_TYPES.user &&
				pattern.syncStatus !== 'unsynced'
					? [
							createBlock( 'core/block', {
								ref: pattern.id,
							} ),
					  ]
					: blocks;
			onInsert(
				( patternBlocks ?? [] ).map( ( block: Block ) => {
					const clonedBlock = cloneBlock( block );
					if (
						// @ts-ignore -- Requires a wider change of parameter positioning. TBD in follow-up PR.
						clonedBlock.attributes.metadata?.categories?.includes(
							selectedCategory
						)
					) {
						// @ts-ignore -- Requires a wider change of parameter positioning. TBD in follow-up PR.
						clonedBlock.attributes.metadata.categories = [
							selectedCategory,
						];
					}
					return clonedBlock;
				} ),
				pattern.name,
				false,
				destinationRootClientId
			);
			createSuccessNotice(
				sprintf(
					/* translators: %s: block pattern title. */
					__( 'Pattern "%s" inserted.' ),
					pattern.title
				),
				{
					type: 'snackbar',
					id: 'inserter-notice',
				}
			);
		},
		[
			createSuccessNotice,
			onInsert,
			selectedCategory,
			rootClientId,
			getClosestAllowedInsertionPointForPattern,
			isQuick,
		]
	);

	return [ filteredPatterns, allCategories, onClickPattern ];
};

export default usePatternsState;
