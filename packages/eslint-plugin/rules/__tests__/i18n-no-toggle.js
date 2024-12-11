/**
 * External dependencies
 */
import { RuleTester } from 'eslint';

/**
 * Internal dependencies
 */
const rule = require( '../i18n-no-toggle' );

const ruleTester = new RuleTester( {
	parserOptions: {
		ecmaVersion: 6,
	},
} );

ruleTester.run( 'i18n-no-toggle', rule, {
	valid: [
		`__('Click to switch something');`,
		`__('Enable this feature.');`,
		`_x('Activate the option', 'context', 'context');`,
		`_n('There is one item', 'There are many items', 1, 'context');`,
		`_nx('Add the item', 'Add the items', 1, 'context', 'context');`,
		`i18n.__('Activate the setting.');`,
	],

	invalid: [
		{
			code: `__('Click to toggle something');`,
			errors: [
				{
					message:
						"Avoid using the verb 'toggle' in translatable strings.",
				},
			],
		},
		{
			code: `_x('Toggle the feature', 'context', 'context');`,
			errors: [
				{
					message:
						"Avoid using the verb 'Toggle' in translatable strings.",
				},
			],
		},
		{
			code: `_n('There is one toggle', 'There are many toggles', 1, 'context');`,
			errors: [
				{
					message:
						"Avoid using the verb 'toggle' in translatable strings.",
				},
			],
		},
		{
			code: `_nx('Enable the toggle', 'Enable the toggles', 1, 'context', 'context');`,
			errors: [
				{
					message:
						"Avoid using the verb 'toggle' in translatable strings.",
				},
			],
		},
		{
			code: `i18n.__('Click to Toggle something');`,
			errors: [
				{
					message:
						"Avoid using the verb 'Toggle' in translatable strings.",
				},
			],
		},
	],
} );
