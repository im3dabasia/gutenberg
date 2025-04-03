/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	BlockIcon,
	MediaPlaceholder,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
	BlockControls,
	MediaReplaceFlow,
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { file as icon } from '@wordpress/icons';
import { store as noticesStore } from '@wordpress/notices';

// Default block for inner blocks
const DEFAULT_BLOCK = {
	name: 'core/file',
};

function FileListEditContainer( { attributes, clientId } ) {
	const { layout } = attributes;
	const { replaceInnerBlocks } = useDispatch( blockEditorStore );
	const { createErrorNotice } = useDispatch( noticesStore );

	const innerBlocks = useSelect(
		( select ) => select( blockEditorStore ).getBlocks( clientId ),
		[ clientId ]
	);

	const blockProps = useBlockProps( {} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		defaultBlock: DEFAULT_BLOCK,
		directInsert: true,
		template: [ [ 'core/file' ] ],
		orientation: layout?.orientation ?? 'vertical',
		templateInsertUpdatesSelection: true,
	} );

	const onSelectFiles = ( media ) => {
		if ( ! media || ! media.length ) {
			return;
		}

		try {
			// Create a file block for each selected media item
			const fileBlocks = media.map( ( item ) => {
				return createBlock( 'core/file', {
					id: item.id,
					href: item.url,
					fileName: item.title || item.filename,
					textLinkHref: item.url,
					showDownloadButton: true,
					// Add PDF preview if it's a PDF file
					displayPreview: item.url.endsWith( '.pdf' )
						? true
						: undefined,
					previewHeight: item.url.endsWith( '.pdf' )
						? 600
						: undefined,
				} );
			} );

			// Add the new file blocks to the existing inner blocks
			replaceInnerBlocks( clientId, [ ...innerBlocks, ...fileBlocks ] );
		} catch ( error ) {
			createErrorNotice( __( 'An error occurred while adding files.' ), {
				type: 'snackbar',
			} );
		}
	};

	const onUploadError = ( message ) => {
		createErrorNotice( message, { type: 'snackbar' } );
	};

	return (
		<>
			<BlockControls group="other">
				<MediaReplaceFlow
					allowedTypes={ [ '*' ] }
					accept="*"
					onSelect={ onSelectFiles }
					onError={ onUploadError }
					name={ __( 'Add Files' ) }
					multiple
				/>
			</BlockControls>

			<div { ...innerBlocksProps }>{ innerBlocksProps.children }</div>
		</>
	);
}

function Placeholder( { clientId } ) {
	const { replaceInnerBlocks } = useDispatch( blockEditorStore );
	const { createErrorNotice } = useDispatch( noticesStore );
	const blockProps = useBlockProps();

	const onSelectFiles = ( media ) => {
		if ( ! media || ! media.length ) {
			return;
		}

		try {
			// Create a file block for each selected media item
			const fileBlocks = media.map( ( item ) => {
				return createBlock( 'core/file', {
					id: item.id,
					href: item.url,
					fileName: item.title || item.filename,
					textLinkHref: item.url,
					showDownloadButton: true,
					// Add PDF preview if it's a PDF file
					displayPreview: item.url.endsWith( '.pdf' )
						? true
						: undefined,
					previewHeight: item.url.endsWith( '.pdf' )
						? 600
						: undefined,
				} );
			} );

			// Replace inner blocks with the new file blocks
			replaceInnerBlocks( clientId, fileBlocks );
		} catch ( error ) {
			createErrorNotice( __( 'An error occurred while adding files.' ), {
				type: 'snackbar',
			} );
		}
	};

	const onUploadError = ( message ) => {
		createErrorNotice( message, { type: 'snackbar' } );
	};

	return (
		<div { ...blockProps }>
			<MediaPlaceholder
				icon={ <BlockIcon icon={ icon } /> }
				labels={ {
					title: __( 'File List' ),
					instructions: __(
						'Upload files or select from your media library.'
					),
				} }
				onSelect={ onSelectFiles }
				onError={ onUploadError }
				accept="*"
				multiple // Allow selecting multiple files
			/>
		</div>
	);
}

const FileListEdit = ( props ) => {
	const { clientId } = props;

	const hasInnerBlocks = useSelect(
		( select ) =>
			select( blockEditorStore ).getBlocks( clientId ).length > 0,
		[ clientId ]
	);

	const Component = hasInnerBlocks ? FileListEditContainer : Placeholder;

	return <Component { ...props } />;
};

export default FileListEdit;
