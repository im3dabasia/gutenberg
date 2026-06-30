/**
 * WordPress dependencies
 */
import { __, isRTL } from '@wordpress/i18n';
import { ToolbarDropdownMenu, ToolbarGroup } from '@wordpress/components';
import { alignLeft, alignRight, alignCenter } from '@wordpress/icons';
import type { IconType } from '@wordpress/components';

type Alignment = 'left' | 'center' | 'right';

interface AlignmentControl {
	icon: IconType;
	title: string;
	align: Alignment | ( string & {} );
}

interface AlignmentUIProps {
	value?: string;
	onChange: ( align: string | undefined ) => void;
	alignmentControls?: AlignmentControl[];
	label?: string;
	description?: string;
	isCollapsed?: boolean;
	isToolbar?: boolean;
}

const DEFAULT_ALIGNMENT_CONTROLS: AlignmentControl[] = [
	{
		icon: alignLeft,
		title: __( 'Align text left' ),
		align: 'left',
	},
	{
		icon: alignCenter,
		title: __( 'Align text center' ),
		align: 'center',
	},
	{
		icon: alignRight,
		title: __( 'Align text right' ),
		align: 'right',
	},
];

const POPOVER_PROPS = {
	placement: 'bottom-start',
} as const;

function AlignmentUI( {
	value,
	onChange,
	alignmentControls = DEFAULT_ALIGNMENT_CONTROLS,
	label = __( 'Align text' ),
	description = __( 'Change text alignment' ),
	isCollapsed = true,
	isToolbar,
}: AlignmentUIProps ) {
	function applyOrUnset( align: string ) {
		return () => onChange( value === align ? undefined : align );
	}

	const activeAlignment = alignmentControls.find(
		( control ) => control.align === value
	);

	function setIcon() {
		if ( activeAlignment ) {
			return activeAlignment.icon;
		}
		return isRTL() ? alignRight : alignLeft;
	}

	const controls = alignmentControls.map( ( control ) => {
		const { align } = control;
		const isActive = value === align;

		return {
			...control,
			isActive,
			role: isCollapsed ? ( 'menuitemradio' as const ) : undefined,
			onClick: applyOrUnset( align ),
		};
	} );

	if ( isToolbar ) {
		return isCollapsed ? (
			<ToolbarGroup
				icon={ setIcon() }
				controls={ controls }
				isCollapsed
				title={ label }
			/>
		) : (
			<ToolbarGroup
				icon={ setIcon() }
				controls={ controls }
				// isCollapsed to false allows the toolbar to behave as a menu bar.
				isCollapsed={ false }
			/>
		);
	}
	return (
		<ToolbarDropdownMenu
			icon={ setIcon() }
			label={ label }
			controls={ controls }
			toggleProps={ { description } }
			popoverProps={ POPOVER_PROPS }
		/>
	);
}

export default AlignmentUI;
