/**
 * Internal dependencies
 */
import BlockIcon from '../';

/**
 * WordPress dependencies
 */
import { paragraph } from '@wordpress/icons';

const meta = {
	title: 'BlockEditor/BlockIcon',
	component: BlockIcon,
	parameters: {
		docs: { canvas: { sourceState: 'shown' } },
	},
	argTypes: {
		icon: {
			control: 'block',
			description:
				'The icon to display. Can be a custom icon or a predefined WordPress icon.',
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
