/**
 * WordPress dependencies
 */
import { box, button, cog, paragraph } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import BlockIcon from '../';

const meta = {
	title: 'BlockEditor/BlockIcon',
	component: BlockIcon,
	parameters: {
		docs: {
			description: {
				component:
					'The `BlockIcon` component allows to display a icon for a block.',
			},
			canvas: { sourceState: 'shown' },
		},
	},
	argTypes: {
		icon: {
			control: 'select',
			options: [ 'paragraph', 'cog', 'box', 'button' ],
			mapping: {
				paragraph,
				cog,
				box,
				button,
			},
			description:
				'The icon of the block. This can be any of [WordPress Dashicons](https://developer.wordpress.org/resource/dashicons/), or a custom `svg` element.',
			table: {
				type: { summary: 'string | object' },
			},
		},
		showColors: {
			control: 'boolean',
			description: 'Whether to show background and foreground colors.',
		},
		className: {
			control: 'text',
			description: 'Additional CSS class for the icon.',
		},
		context: {
			control: 'text',
			description: 'Context where the icon is being used.',
		},
	},
};

export default meta;

export const Default = {
	args: {
		icon: paragraph,
		showColors: false,
		className: '',
		context: 'default',
	},
};
