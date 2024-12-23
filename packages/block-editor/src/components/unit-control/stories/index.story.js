/**
 * WordPress dependencies
 */
import { useState, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import UnitControl from '../';

const meta = {
	title: 'BlockEditor/UnitControl',
	component: UnitControl,
	parameters: {
		docs: {
			canvas: { sourceState: 'shown' },
			description: {
				component:
					'UnitControl allows the user to set a numeric quantity as well as a unit ',
			},
		},
	},
	argTypes: {
		onChange: {
			action: 'onChange',
			description: 'Callback function when the value changes.',
			table: {
				type: { summary: 'function' },
			},
		},
		onUnitChange: {
			action: 'onUnitChange',
			description: 'Callback function when the unit changes.',
			table: {
				type: { summary: 'function' },
			},
		},
		labelPosition: {
			control: 'radio',
			options: [ 'top', 'side', 'bottom' ],
			description: 'The position of the label.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'top' },
			},
		},
		label: {
			control: 'text',
			description: 'The label for the control.',
			table: {
				type: { summary: 'string' },
			},
		},
		value: {
			control: 'text',
			description: 'The value of the control.',
			table: {
				type: { summary: 'string' },
			},
		},
		size: {
			control: 'radio',
			options: [ 'default', 'small' ],
			description: 'The size of the control.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'default' },
			},
		},
		disabled: {
			control: 'boolean',
			description: 'Whether the control is disabled.',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: false },
			},
		},
	},
};

export default meta;

export const Default = {
	render: function Template( { onChange, onUnitChange, value, ...args } ) {
		const [ componentValue, setComponentValue ] = useState( value || '' );

		useEffect( () => {
			setComponentValue( value );
		}, [ value ] );

		const handleValueChange = ( newValue ) => {
			setComponentValue( newValue );
			if ( onChange ) {
				onChange( newValue );
			}
		};

		return (
			<UnitControl
				{ ...args }
				value={ componentValue }
				onChange={ handleValueChange }
				onUnitChange={ onUnitChange }
			/>
		);
	},
};
