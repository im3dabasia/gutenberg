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
import { useEffect } from '@wordpress/element';

const DEFAULT_BLOCK = {
	name: 'core/file',
};

function FileListEditContainer( { attributes, clientId, setAttributes } ) {
	const { layout, files } = attributes;
	const { replaceInnerBlocks } = useDispatch( blockEditorStore );
	const { createErrorNotice } = useDispatch( noticesStore );

	const innerBlocks = useSelect(
		( select ) => select( blockEditorStore ).getBlocks( clientId ),
		[ clientId ]
	);

	useEffect( () => {
		if ( innerBlocks && innerBlocks.length > 0 ) {
			const fileData = innerBlocks.map( ( block ) => ( {
				id: block.attributes.id,
				url: block.attributes.href,
				fileName: block.attributes.fileName,
				displayPreview: block.attributes.displayPreview,
				previewHeight: block.attributes.previewHeight,
			} ) );

			if ( JSON.stringify( fileData ) !== JSON.stringify( files ) ) {
				setAttributes( { files: fileData } );
			}
		}
	}, [ innerBlocks, setAttributes ] );

	useEffect( () => {
		if (
			files &&
			files.length > 0 &&
			( ! innerBlocks || innerBlocks.length === 0 )
		) {
			const fileBlocks = files.map( ( item ) => {
				return createBlock( 'core/file', {
					id: item.id,
					href: item.url,
					fileName: item.fileName,
					textLinkHref: item.url,
					showDownloadButton: true,
					displayPreview: item.displayPreview,
					previewHeight: item.previewHeight,
				} );
			} );

			replaceInnerBlocks( clientId, fileBlocks );
		}
	}, [] );

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
			const fileBlocks = media.map( ( item ) => {
				return createBlock( 'core/file', {
					id: item.id,
					href: item.url,
					fileName: item.title || item.filename,
					textLinkHref: item.url,
					showDownloadButton: true,
					displayPreview: item.url.endsWith( '.pdf' )
						? true
						: undefined,
					previewHeight: item.url.endsWith( '.pdf' )
						? 600
						: undefined,
				} );
			} );

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

function Placeholder( { clientId, setAttributes } ) {
	const { replaceInnerBlocks } = useDispatch( blockEditorStore );
	const { createErrorNotice } = useDispatch( noticesStore );
	const blockProps = useBlockProps();

	const onSelectFiles = ( media ) => {
		if ( ! media || ! media.length ) {
			return;
		}

		try {
			const fileBlocks = media.map( ( item ) => {
				const isPdf = item.url.endsWith( '.pdf' );

				return createBlock( 'core/file', {
					id: item.id,
					href: item.url,
					fileName: item.title || item.filename,
					textLinkHref: item.url,
					showDownloadButton: true,
					displayPreview: isPdf ? true : undefined,
					previewHeight: isPdf ? 600 : undefined,
				} );
			} );

			const fileData = media.map( ( item ) => ( {
				id: item.id,
				url: item.url,
				fileName: item.title || item.filename,
				displayPreview: item.url.endsWith( '.pdf' ) ? true : undefined,
				previewHeight: item.url.endsWith( '.pdf' ) ? 600 : undefined,
			} ) );

			setAttributes( { files: fileData } );

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
				multiple
			/>
		</div>
	);
}

const FileListEdit = ( props ) => {
	const { clientId, attributes } = props;
	const { files } = attributes;

	const hasInnerBlocks = useSelect(
		( select ) =>
			select( blockEditorStore ).getBlocks( clientId ).length > 0,
		[ clientId ]
	);

	const showPlaceholder =
		! hasInnerBlocks && ( ! files || files.length === 0 );
	const Component = showPlaceholder ? Placeholder : FileListEditContainer;

	return <Component { ...props } />;
};

export default FileListEdit;
