/**
 * WordPress dependencies
 */
import {
	getBlockType,
	createBlock,
	createBlocksFromInnerBlocksTemplate,
	store as blocksStore,
	parse,
} from '@wordpress/blocks';
import { useSelect, useDispatch } from '@wordpress/data';
import { useCallback, useMemo } from '@wordpress/element';
import { store as noticesStore } from '@wordpress/notices';
import { __, sprintf } from '@wordpress/i18n';
import type { Block } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { store as blockEditorStore } from '../../../store';
import { isFiltered } from '../../../store/utils';
import { unlock } from '../../../lock-unlock';

interface UseBlockTypesState {
	rootClientId?: string;
	onInsert: (
		block: ReturnType< typeof createBlock > | ReturnType< typeof parse >,
		index?: number,
		shouldFocusBlock?: boolean,
		destinationClientId?: string
	) => void;
	isQuick: boolean;
}

/**
 * Retrieves the block types inserter state.
 *
 * @param rootClientId Insertion's root client ID.
 * @param onInsert     function called when inserter a list of blocks.
 * @param isQuick
 * @return  Returns the block types state. (block types, categories, collections, onSelect handler)
 */
const useBlockTypesState = (
	rootClientId?: string,
	// @ts-ignore -- Requires a wider change of parameter positioning. TBD in follow-up PR.
	onInsert: UseBlockTypesState[ 'onInsert' ],
	isQuick: boolean
) => {
	const options = useMemo(
		() => ( { [ isFiltered ]: !! isQuick } ),
		[ isQuick ]
	);
	const [ items ] = useSelect(
		( select ) => [
			select( blockEditorStore ).getInserterItems(
				rootClientId,
				options
			),
		],
		[ rootClientId, options ]
	);
	const { getClosestAllowedInsertionPoint } = unlock(
		useSelect( blockEditorStore )
	);
	const { createErrorNotice } = useDispatch( noticesStore );

	const [ categories, collections ] = useSelect( ( select ) => {
		const { getCategories, getCollections } = select( blocksStore );
		return [ getCategories(), getCollections() ];
	}, [] );

	const onSelectItem = useCallback(
		(
			{
				name,
				initialAttributes,
				innerBlocks,
				syncStatus,
				content,
			}: {
				name: string;
				initialAttributes: Block[ 'attributes' ];
				innerBlocks: Block[];
				syncStatus: 'synced' | 'unsynced';
				content: string;
			},
			shouldFocusBlock: boolean
		) => {
			const destinationClientId = getClosestAllowedInsertionPoint(
				name,
				rootClientId
			);
			if ( destinationClientId === null ) {
				const title = getBlockType( name )?.title ?? name;
				createErrorNotice(
					sprintf(
						/* translators: %s: block pattern title. */
						__( 'Block "%s" can\'t be inserted.' ),
						title
					),
					{
						type: 'snackbar',
						id: 'inserter-notice',
					}
				);
				return;
			}

			const insertedBlock =
				syncStatus === 'unsynced'
					? parse( content, {
							__unstableSkipMigrationLogs: true,
					  } )
					: createBlock(
							name,
							initialAttributes,
							createBlocksFromInnerBlocksTemplate( innerBlocks )
					  );
			onInsert(
				insertedBlock,
				undefined,
				shouldFocusBlock,
				destinationClientId
			);
		},
		[
			getClosestAllowedInsertionPoint,
			rootClientId,
			onInsert,
			createErrorNotice,
		]
	);

	return [ items, categories, collections, onSelectItem ];
};

export default useBlockTypesState;
