/**
 * WordPress dependencies
 */
import { useState, useEffect } from '@wordpress/element';
import {
	Panel,
	__experimentalToolsPanel as ToolsPanel,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import ResolutionTool from '../';

const meta = {
	title: 'BlockEditor/ResolutionTool',
	component: ResolutionTool,
	tags: [ 'status-private' ],
	parameters: {
		docs: {
			canvas: { sourceState: 'shown' },
			description: {
				component:
					'A control for selecting image resolution with preset size options.',
			},
		},
	},
	argTypes: {
		value: {
			control: 'radio',
			options: [ 'thumbnail', 'medium', 'large', 'full' ],
			description: 'Currently selected resolution value.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'thumbnail' },
			},
		},
		onChange: {
			action: 'onChange',
			control: { type: null },
			description: 'Handles change in resolution selection.',
			table: {
				type: { summary: 'function' },
			},
		},
		options: {
			control: 'object',
			description: 'Array of resolution options to display.',
			table: {
				type: { summary: 'array' },
				defaultValue: {
					summary: JSON.stringify( [
						{ label: 'Thumbnail', value: 'thumbnail' },
						{ label: 'Medium', value: 'medium' },
						{ label: 'Large', value: 'large' },
						{ label: 'Full Size', value: 'full' },
					] ),
				},
			},
		},
		defaultValue: {
			control: 'radio',
			options: [ 'thumbnail', 'medium', 'large', 'full' ],
			description: 'Default resolution value.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'thumbnail' },
			},
		},
		isShownByDefault: {
			control: 'boolean',
			description:
				'Whether the control is shown by default in the panel.',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: true },
			},
		},
		panelId: {
			control: { type: null },
			description: 'ID of the parent tools panel.',
			table: {
				type: { summary: 'string' },
			},
		},
	},
};

export default meta;

export const Default = {
	render: function Template( { onChange, defaultValue, value, ...args } ) {
		const [ resolution, setResolution ] = useState( value ?? defaultValue );

		useEffect( () => {
			if ( value !== resolution ) {
				setResolution( value );
			}
		}, [ value ] );

		const handleChange = ( newValue ) => {
			setResolution( newValue );
			onChange?.( newValue );
		};

		return (
			<Panel>
				<ToolsPanel
					resetAll={ () => {
						setResolution( defaultValue );
						onChange?.( defaultValue );
					} }
				>
					<ResolutionTool
						{ ...args }
						defaultValue={ defaultValue }
						onChange={ handleChange }
						value={ resolution }
					/>
				</ToolsPanel>
			</Panel>
		);
	},
};
