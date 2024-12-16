/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
	return (
		<div {...useBlockProps.save()} class="relative min-h-[80vh]">
			<div class="p-4">
				<div class="bg-gradient-to-br from-primary-container/50 to-secondary-container/50 rounded-2xl">
					<div class="w-full md:w-3/4 px-4 md:px-8">
					<InnerBlocks.Content />
					</div>
				</div>
			</div>
		</div>
	);
}
