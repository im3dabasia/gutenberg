/**
 * Internal dependencies
 */
import groups from './groups';
import {
	useBlockEditContext,
	mayDisplayControlsKey,
	mayDisplayParentControlsKey,
} from '../block-edit/context';

type GroupKey = keyof typeof groups;

export default function useBlockControlsFill(
	group: GroupKey,
	shareWithChildBlocks: boolean
): ( typeof groups )[ GroupKey ][ 'Fill' ] | null {
	const context = useBlockEditContext() as Record< symbol, unknown >;
	if ( context[ mayDisplayControlsKey ] ) {
		return groups[ group ]?.Fill;
	}
	if ( context[ mayDisplayParentControlsKey ] && shareWithChildBlocks ) {
		return groups.parent.Fill;
	}
	return null;
}
