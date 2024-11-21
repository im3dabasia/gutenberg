/**
 * WordPress dependencies
 */
import { registerCoreBlocks } from '@wordpress/block-library';
import { paragraph, heading, image } from '@wordpress/icons';
import { Toolbar } from '@wordpress/components';

/**
 * Internal dependencies
 */
import BlockIcon from '../';

// Register core blocks for the story
registerCoreBlocks();

/**
 * BlockIcon component demonstrates rendering icons for different block types
 */
const meta = {
	title: 'BlockEditor/BlockIcon',
	component: BlockIcon,
	parameters: {
		docs: { canvas: { sourceState: 'shown' } },
	},
	decorators: [
		( Story ) => (
			<Toolbar label="Block Icon">
				<Story />
			</Toolbar>
		),
	],
	argTypes: {
		icon: {
			control: {
				type: 'select',
				options: {
					Paragraph: paragraph,
					Heading: heading,
					Image: image,
					'Default Block': 'block-default',
				},
			},
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

/**
 * Default story showing a paragraph icon
 */
export const Default = {
	args: {
		icon: paragraph,
	},
};

/**
 * Story showing the default block icon
 */
export const DefaultBlockIcon = {
	args: {
		icon: { src: 'block-default' },
	},
};

/**
 * Story showing an icon with colors
 */
export const WithColors = {
	args: {
		icon: {
			src: image,
			background: '#f0f0f0',
			foreground: '#333',
		},
		showColors: true,
	},
};

/**
 * Story showing an icon with a custom class
 */
export const WithCustomClass = {
	args: {
		icon: heading,
		className: 'my-custom-block-icon',
	},
};

/**
 * Story showing an icon with a specific context
 */
export const WithContext = {
	args: {
		icon: paragraph,
		context: 'inserter',
	},
};
