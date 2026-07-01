/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	ToolbarDropdownMenu,
	ToolbarGroup,
	MenuGroup,
	MenuItem,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import useAvailableAlignments from './use-available-alignments';
import { BLOCK_ALIGNMENTS_CONTROLS, DEFAULT_CONTROL } from './constants';
import type { BlockAlignment } from './constants';

interface BlockAlignmentUIProps {
	value?: BlockAlignment;
	onChange: ( align: BlockAlignment | undefined ) => void;
	controls?: BlockAlignment[];
	isToolbar: boolean;
	isCollapsed?: boolean;
}

function BlockAlignmentUI( {
	value,
	onChange,
	controls,
	isToolbar,
	isCollapsed = true,
}: BlockAlignmentUIProps ) {
	const enabledControls = useAvailableAlignments( controls );
	const hasEnabledControls = !! enabledControls.length;

	if ( ! hasEnabledControls ) {
		return null;
	}

	function onChangeAlignment( align: BlockAlignment ) {
		onChange( [ value, 'none' ].includes( align ) ? undefined : align );
	}

	const activeAlignmentControl = value
		? BLOCK_ALIGNMENTS_CONTROLS[ value ]
		: undefined;
	const defaultAlignmentControl =
		BLOCK_ALIGNMENTS_CONTROLS[ DEFAULT_CONTROL ];

	const icon = activeAlignmentControl
		? activeAlignmentControl.icon
		: defaultAlignmentControl.icon;
	const label = __( 'Align' );

	if ( isToolbar ) {
		return (
			<ToolbarGroup
				icon={ icon }
				label={ label }
				isCollapsed={ isCollapsed }
				controls={ enabledControls.map( ( { name: controlName } ) => {
					return {
						...BLOCK_ALIGNMENTS_CONTROLS[ controlName ],
						isActive:
							value === controlName ||
							( ! value && controlName === 'none' ),
						role: isCollapsed
							? ( 'menuitemradio' as const )
							: undefined,
						onClick: () => onChangeAlignment( controlName ),
					};
				} ) }
			/>
		);
	}

	return (
		<ToolbarDropdownMenu
			icon={ icon }
			label={ label }
			toggleProps={ { description: __( 'Change alignment' ) } }
		>
			{ ( { onClose } ) => (
				<>
					<MenuGroup className="block-editor-block-alignment-control__menu-group">
						{ enabledControls.map(
							( { name: controlName, info } ) => {
								const { icon: controlIcon, title } =
									BLOCK_ALIGNMENTS_CONTROLS[ controlName ];
								// If no value is provided, mark as selected the `none` option.
								const isSelected =
									controlName === value ||
									( ! value && controlName === 'none' );
								return (
									<MenuItem
										key={ controlName }
										icon={ controlIcon }
										iconPosition="left"
										className={ clsx(
											'components-dropdown-menu__menu-item',
											{
												'is-active': isSelected,
											}
										) }
										isSelected={ isSelected }
										onClick={ () => {
											onChangeAlignment( controlName );
											onClose();
										} }
										role="menuitemradio"
										info={ info }
									>
										{ title }
									</MenuItem>
								);
							}
						) }
					</MenuGroup>
				</>
			) }
		</ToolbarDropdownMenu>
	);
}

export default BlockAlignmentUI;
