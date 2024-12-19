/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Warning from '../';

const meta = {
	title: 'BlockEditor/Warning',
	component: Warning,
	parameters: {
		docs: {
			canvas: { sourceState: 'shown' },
			description: {
				component:
					'Displays a warning message with optional action buttons and secondary actions dropdown.',
			},
		},
	},
	argTypes: {
		children: {
			control: 'text',
			description:
				'Intended to represent the block to which the warning pertains. See screenshots above.',
			table: {
				type: { summary: 'string|element' },
			},
		},
		className: {
			control: 'text',
			description: 'Classes to pass to element.',
			table: {
				type: { summary: 'string' },
			},
		},
		actions: {
			control: 'object',
			description:
				'An array of elements to be rendered as action buttons in the warning element.',
			table: {
				type: { summary: 'Element[]' },
			},
		},
		secondaryActions: {
			control: 'object',
			description:
				'An array of { title, onClick } to be rendered as options in a dropdown of secondary actions.',
			table: {
				type: { summary: '{ title: string, onClick: Function }[]' },
			},
		},
	},
};

export default meta;

export const Default = {
	args: {
		children: __( 'This block ran into an issue.' ),
	},
	render: function Template( props ) {
		return <Warning { ...props } />;
	},
};
