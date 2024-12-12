/**
 * Internal dependencies
 */
import TextTransformControl from '../';

/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';

/**
 * Meta configuration for Storybook
 */
const meta = {
	title: 'BlockEditor/TextTransformControl',
	component: TextTransformControl,
	parameters: {
		docs: {
			canvas: { sourceState: 'shown' },
			description: {
				component:
					'Control to facilitate text transformation selections.',
			},
		},
	},
	argTypes: {
		onChange: {
			action: 'onChange',
			control: {
				type: null,
			},
			description: 'Callback function when text transform changes',
			table: {
				type: {
					summary: 'function',
				},
			},
		},
		className: {
			control: { type: 'text' },
			description: 'Additional CSS class name to apply',
			table: {
				type: { summary: 'string' },
			},
		},
		value: {
			control: { type: null },
			description: 'Currently selected writing mode.',
			table: { type: { summary: 'string' } },
		},
	},
};

export default meta;

/**
 * Default Story Export
 */
export const Default = {
	render: function Template( { onChange, ...args } ) {
		const [ value, setValue ] = useState();

		return (
			<TextTransformControl
				{ ...args }
				onChange={ ( ...changeArgs ) => {
					onChange( ...changeArgs );
					setValue( ...changeArgs );
				} }
				value={ value }
			/>
		);
	},
};
