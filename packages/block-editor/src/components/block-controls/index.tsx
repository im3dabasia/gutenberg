/**
 * Internal dependencies
 */
import BlockControlsFill from './fill';
import BlockControlsSlot from './slot';

const BlockControls = Object.assign( BlockControlsFill, {
	Slot: BlockControlsSlot,
} );

// This is just here for backward compatibility.
export const BlockFormatControls = Object.assign(
	(
		props: Omit< React.ComponentProps< typeof BlockControlsFill >, 'group' >
	) => {
		return <BlockControlsFill group="inline" { ...props } />;
	},
	{
		Slot: (
			props: Omit<
				React.ComponentProps< typeof BlockControlsSlot >,
				'group'
			>
		) => {
			return <BlockControlsSlot group="inline" { ...props } />;
		},
	}
);

export default BlockControls;
