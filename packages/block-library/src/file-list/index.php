<?php
/**
 * Server-side rendering of the `core/file` block.
 *
 * @package WordPress
 */

/**
 * When the `core/file` block is rendering, check if we need to enqueue the `wp-block-file-view` script.
 *
 * @since 5.8.0
 *
 * @param array    $attributes The block attributes.
 * @param string   $content    The block content.
 * @param WP_Block $block      The parsed block.
 *
 * @return string Returns the block content.
 */
function render_block_core_file2( $attributes, $content ) {
	// If it's interactive, enqueue the script module and add the directives.
	return '<div class="wp-block-hello-world-block-hello-world"><p>Hello world</p></div>';
}

/**
 * Registers the `core/file` block on server.
 *
 * @since 5.8.0
 */
function register_block_core_file2() {
	register_block_type_from_metadata(
		__DIR__ . '/file-list',
		array(
			'render_callback' => 'render_block_core_file2',
		)
	);
}
add_action( 'init', 'register_block_core_file2' );
