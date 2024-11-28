/**
 * Internal dependencies
 */
import TextTransformControl from '../';

/**
 * WordPress dependencies
 */
import { useState, useEffect } from '@wordpress/element';

/**
 * Text transform options
 */
const TRANSFORM_OPTIONS = [ 'none', 'uppercase', 'lowercase', 'capitalize' ];

/**
 * Demo text component to show text transform effect
 */
const DemoText = ( { transform } ) => (
	<p style={ { textTransform: transform } }>
		This is a sample text to demonstrate the text transformation.
	</p>
);

/**
 * TextTransformControl Properties
 */
export default {
	title: 'BlockEditor/TextTransformControl',
	component: TextTransformControl,
	argTypes: {
		value: {
			control: 'select',
			options: TRANSFORM_OPTIONS,
			description: 'Currently selected text transform value',
			table: {
				type: {
					summary: 'string',
				},
				defaultValue: { summary: 'none' },
			},
		},
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
			control: 'text',
			description: 'Additional CSS class name to apply',
			table: {
				type: { summary: 'string' },
			},
		},
	},
	render: function Render( { onChange, value, className } ) {
		const [ selectedTransform, setSelectedTransform ] = useState( value );

		useEffect( () => {
			setSelectedTransform( value );
		}, [ value ] );

		const handleTransformChange = ( newValue ) => {
			const updatedValue =
				newValue === selectedTransform ? undefined : newValue;
			setSelectedTransform( updatedValue );
			if ( onChange ) {
				onChange( updatedValue );
			}
		};

		return (
			<div>
				<TextTransformControl
					value={ selectedTransform }
					onChange={ handleTransformChange }
					className={ className }
				/>
				<DemoText transform={ selectedTransform } />
			</div>
		);
	},
};

/**
 * Story demonstrating TextTransformControl with default settings
 */
export const Default = {
	args: {
		value: 'none',
	},
};

/**
 * TextTransformControl with uppercase transform selected
 */
export const WithUppercase = {
	args: {
		value: 'uppercase',
	},
};

/**
 * TextTransformControl with lowercase transform selected
 */
export const WithLowercase = {
	args: {
		value: 'lowercase',
	},
};

/**
 * TextTransformControl with capitalize transform selected
 */
export const WithCapitalize = {
	args: {
		value: 'capitalize',
	},
};

/**
 * TextTransformControl with custom className
 */
export const WithCustomClass = {
	args: {
		value: 'none',
		className: 'custom-text-transform-control',
	},
};
