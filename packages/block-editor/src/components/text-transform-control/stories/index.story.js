/**
 * Internal dependencies
 */
import TextTransformControl from '../';

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
			description: 'Handles change in text transform selection.',
			table: {
				type: {
					summary: 'function',
				},
			},
		},
		className: {
			control: { type: 'text' },
			description: 'Class name to add to the control.',
			table: {
				type: { summary: 'string' },
			},
		},
		value: {
			options: [ 'none', 'uppercase', 'lowercase', 'capitalize' ],
			control: { type: 'radio' },
			description: 'Currently selected text transform.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'none' },
			},
		},
	},
};

export default meta;

export const Default = {
	args: {
		value: 'none',
	},
	render: function Template( props ) {
		return <TextTransformControl { ...props } />;
	},
};
