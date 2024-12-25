/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import DuotoneControl from '../';

const meta = {
	title: 'BlockEditor/DuotoneControl',
	component: DuotoneControl,
	parameters: {
		docs: {
			canvas: { sourceState: 'shown' },
			description: {
				component: 'Control to facilitate duotone filter selections.',
			},
		},
	},
	argTypes: {
		value: {
			control: 'text',
			description: 'Currently selected duotone value.',
			table: {
				type: {
					summary: 'string',
				},
			},
		},
		onChange: {
			action: 'onChange',
			control: { type: null },
			description: 'Handles change in duotone selection.',
			table: {
				type: {
					summary: 'function',
				},
			},
		},
		colorPalette: {
			control: null,
			description: 'Array of available colors for the duotone filter.',
			table: {
				type: { summary: 'array' },
			},
		},
		duotonePalette: {
			control: null,
			description: 'Array of duotone preset palettes.',
			table: {
				type: { summary: 'array' },
			},
		},
		disableCustomColors: {
			control: 'boolean',
			description: 'Disables the option to customize duotone colors.',
			table: {
				type: { summary: 'boolean' },
			},
		},
		disableCustomDuotone: {
			control: 'boolean',
			description: 'Disables the option to customize the duotone effect.',
			table: {
				type: { summary: 'boolean' },
			},
		},
	},
};

export default meta;

export const Default = {
	render: function Template( { onChange, ...args } ) {
		const [ value, setValue ] = useState( 'unset' );

		const colorPalette = args.colorPalette || [];
		const duotonePalette = args.duotonePalette || [];

		const handleChange = ( newValue ) => {
			setValue( newValue );
			onChange?.( newValue );
		};

		return (
			<DuotoneControl
				{ ...args }
				value={ value }
				onChange={ handleChange }
				colorPalette={ colorPalette }
				duotonePalette={ duotonePalette }
			/>
		);
	},
};
