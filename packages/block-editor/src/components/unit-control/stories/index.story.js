/**
 * WordPress dependencies
 */
import { useState, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import UnitControl from '../';

const CUSTOM_UNITS = [
	{ value: 'px', label: 'px', default: 0 },
	{ value: 'em', label: 'em', default: 0 },
	{ value: 'rem', label: 'rem', default: 0 },
];

/**
 * UnitControl Properties
 */
export default {
	title: 'BlockEditor/UnitControl',
	component: UnitControl,
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
			control: 'select',
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
			control: 'select',
			options: [ 'small', 'medium' ],
			description: 'The size of the control.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'medium' },
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
	render: function Render( { onChange, onUnitChange, value, ...args } ) {
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

/**
 * Story demonstrating UnitControl with default settings
 */
export const Default = {
	args: {
		label: 'Default Unit Control',
		value: '10',
		size: 'medium',
		labelPosition: 'top',
	},
};

/**
 * Story demonstrating UnitControl with custom units
 */
export const CustomUnits = {
	args: {
		...Default.args,
		label: 'Custom Units',
		units: CUSTOM_UNITS,
	},
};

/**
 * Story demonstrating UnitControl in disabled state
 */
export const Disabled = {
	args: {
		...Default.args,
		label: 'Disabled Unit Control',
		disabled: true,
	},
};
