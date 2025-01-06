/**
 * WordPress dependencies
 */
import { link, linkOff } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Button from '../../button';
import { View } from '../../view';
import type { WordPressComponentProps } from '../../context';
import { contextConnect } from '../../context';
import { useBorderBoxControlLinkedButton } from './hook';

import type { LinkedButtonProps } from '../types';

const BorderBoxControlLinkedButton = (
	props: WordPressComponentProps< LinkedButtonProps, 'button' >,
	forwardedRef: React.ForwardedRef< any >
) => {
	const { className, isLinked, ...buttonProps } =
		useBorderBoxControlLinkedButton( props );
	const label = isLinked ? __( 'Unlink sides' ) : __( 'Link sides' );

	return (
		<View className={ className }>
			<Button
				{ ...buttonProps }
				size="small"
				icon={ isLinked ? link : linkOff }
				iconSize={ 24 }
				label={ label }
				ref={ forwardedRef }
			/>
		</View>
	);
};

const ConnectedBorderBoxControlLinkedButton = contextConnect(
	BorderBoxControlLinkedButton,
	'BorderBoxControlLinkedButton'
);
export default ConnectedBorderBoxControlLinkedButton;
