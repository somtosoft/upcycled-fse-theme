import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { url, linkTarget, rel, title, ariaLabel } = attributes;

	return (
		<div {...useBlockProps.save()}>
			<a href={url || '#'} target={linkTarget} rel={rel} title={title} aria-label={ariaLabel}>
				<InnerBlocks.Content />
			</a>
		</div>
	);
}
