/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Popover } from '@wordpress/components';
import { useViewportMatch } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import BlockPreview from '../block-preview';

export default function PreviewBlockPopover( { blocks } ) {
	const isMobile = useViewportMatch( 'medium', '<' );

	if ( isMobile ) {
		return null;
	}

	return (
		<div className="block-editor-block-switcher__popover-preview-container">
			<Popover
				className="block-editor-block-switcher__popover-preview"
				placement="right-start"
				focusOnMount={ false }
				offset={ 16 }
			>
				<div className="block-editor-block-switcher__preview">
					<div className="block-editor-block-switcher__preview-title">
						{ __( 'Preview' ) }
					</div>
					{ /* 600px is the value of $break-small in base-styles/_breakpoints.scss.
						So we set the viewport somewhat arbitrarily to 610px to account for the padding of the block. */ }
					<BlockPreview viewportWidth={ 610 } blocks={ blocks } />
				</div>
			</Popover>
		</div>
	);
}
