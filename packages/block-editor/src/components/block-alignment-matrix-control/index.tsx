/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { DOWN } from '@wordpress/keycodes';
import {
	ToolbarButton,
	Dropdown,
	AlignmentMatrixControl,
} from '@wordpress/components';

const noop = () => {};

interface BlockAlignmentMatrixControlProps {
	/**
	 * Label for the control. Defaults to 'Change matrix alignment'.
	 */
	label?: string;
	/**
	 * Function to execute upon change of matrix state.
	 */
	onChange: ( align: string | undefined ) => void;
	/**
	 * Content alignment location. One of: 'center', 'center center',
	 * 'center left', 'center right', 'top center', 'top left',
	 * 'top right', 'bottom center', 'bottom left', 'bottom right'.
	 */
	value?: string;
	/**
	 * Whether the control should be disabled.
	 */
	isDisabled?: boolean;
}
/**
 * The alignment matrix control allows users to quickly adjust inner block alignment.
 *
 * @see https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/block-alignment-matrix-control/README.md
 *
 * @example
 * ```jsx
 * function Example() {
 *   return (
 *     <BlockControls>
 *       <BlockAlignmentMatrixControl
 *         label={ __( 'Change content position' ) }
 *         value="center"
 *         onChange={ ( nextPosition ) =>
 *           setAttributes( { contentPosition: nextPosition } )
 *         }
 *       />
 *     </BlockControls>
 *   );
 * }
 * ```
 */
function BlockAlignmentMatrixControl(
	props: BlockAlignmentMatrixControlProps
): Element {
	const {
		label = __( 'Change matrix alignment' ),
		onChange = noop,
		value = 'center',
		isDisabled,
	} = props;

	const icon = <AlignmentMatrixControl.Icon value={ value } />;

	return (
		<Dropdown
			popoverProps={ { placement: 'bottom-start' } }
			renderToggle={ ( { onToggle, isOpen } ) => {
				const openOnArrowDown = ( event ) => {
					if ( ! isOpen && event.keyCode === DOWN ) {
						event.preventDefault();
						onToggle();
					}
				};

				return (
					<ToolbarButton
						onClick={ onToggle }
						aria-haspopup="true"
						aria-expanded={ isOpen }
						onKeyDown={ openOnArrowDown }
						label={ label }
						icon={ icon }
						showTooltip
						disabled={ isDisabled }
					/>
				);
			} }
			renderContent={ () => (
				<AlignmentMatrixControl onChange={ onChange } value={ value } />
			) }
		/>
	);
}

export default BlockAlignmentMatrixControl;
