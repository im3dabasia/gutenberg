/**
 * Internal dependencies
 */
const {
	TRANSLATION_FUNCTIONS,
	getTextContentFromNode,
	getTranslateFunctionName,
	getTranslateFunctionArgs,
} = require( '../utils' );

module.exports = {
	meta: {
		type: 'problem',
		schema: [],
		messages: {
			noToggle:
				"Avoid using the verb '{{ word }}' in translatable strings.",
		},
		fixable: null,
	},
	create( context ) {
		return {
			CallExpression( node ) {
				const { callee, arguments: args } = node;

				const functionName = getTranslateFunctionName( callee );

				if ( ! TRANSLATION_FUNCTIONS.has( functionName ) ) {
					return;
				}

				const candidates = getTranslateFunctionArgs(
					functionName,
					args
				);

				for ( const arg of candidates ) {
					const argumentString = getTextContentFromNode( arg );
					if ( ! argumentString ) {
						continue;
					}

					const match = /\btoggle\b/i.exec( argumentString );

					if ( match ) {
						const matchedWord = match[ 0 ];

						context.report( {
							node,
							messageId: 'noToggle',
							data: {
								word: matchedWord,
							},
						} );
					}
				}
			},
		};
	},
};
