/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

type MediaType = 'image' | 'video' | 'audio';
type PreviewTagName = 'img' | 'video' | 'audio';

const mediaTypeTag: Record< MediaType, PreviewTagName > = {
	image: 'img',
	video: 'video',
	audio: 'audio',
};

type InserterMediaItem = {
	title: string;
	url: string;
	previewUrl?: string;
	id?: number;
	sourceId?: number | string;
	alt?: string;
	caption?: string;
};

type Attributes = {
	id: number | undefined;
	caption: string | undefined;
	url?: string;
	alt?: string;
	src?: string;
};

/**
 * Creates a block and a preview element from a media object.
 *
 * @param media     The media object to create the block from.
 * @param mediaType The media type to create the block for.
 * @return An array containing the block and the preview element.
 */
export function getBlockAndPreviewFromMedia(
	media: InserterMediaItem,
	mediaType: 'image' | 'audio' | 'video'
) {
	// Add the common attributes between the different media types.
	const attributes: Attributes = {
		id: media.id || undefined,
		caption: media.caption || undefined,
	};
	const mediaSrc = media.url;
	const alt = media.alt || undefined;
	if ( mediaType === 'image' ) {
		attributes.url = mediaSrc;
		attributes.alt = alt;
	} else if ( [ 'video', 'audio' ].includes( mediaType ) ) {
		attributes.src = mediaSrc;
	}

	const handlePreviewError: React.ReactEventHandler< Element > = (
		event
	) => {
		const target = event.currentTarget as
			| HTMLImageElement
			| HTMLMediaElement;

		// Fall back to the media source if the preview cannot be loaded.
		if ( target.src === media.previewUrl ) {
			target.src = mediaSrc;
		}
	};

	const PreviewTag = mediaTypeTag[ mediaType ];
	const preview = (
		<PreviewTag
			src={ media.previewUrl || mediaSrc }
			alt={ alt }
			controls={ mediaType === 'audio' ? true : undefined }
			// @ts-expect-error: The `inert` attribute is not yet supported in React's type definitions.
			inert="true"
			onError={ handlePreviewError }
		/>
	);
	return [ createBlock( `core/${ mediaType }`, attributes ), preview ];
}
