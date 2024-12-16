/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { TextControl, Panel, PanelBody, PanelRow } from '@wordpress/components';

import ServerSideRender from '@wordpress/server-side-render';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	return (
		// <p { ...useBlockProps() }>
		// 	{ __( 'Google Map – hello from the editor!', 'google-map' ) }
		// </p>
		<div {...useBlockProps()}>
			<InspectorControls>
				<Panel>
					<PanelBody title={__('Google Map Settings', 'google-map')}>
						<PanelRow>
							<TextControl
								label={__('Embed Source', 'google-map')}
								value={attributes.embedSource}
								onChange={(embedSource) =>
									setAttributes({ embedSource })
								}
							/>
						</PanelRow>
						<PanelRow>
							<TextControl
								label={__('Height', 'google-map')}
								value={attributes.height}
								onChange={(height) => setAttributes({ height })}
							/>
						</PanelRow>

						<PanelRow>
							<TextControl
								label={__('Width', 'google-map')}
								value={attributes.width}
								onChange={(width) => setAttributes({ width })}
							/>
						</PanelRow>
						<PanelRow>
							<TextControl
								label={__('Title', 'google-map')}
								value={attributes.title}
								onChange={(title) => setAttributes({ title })}
							/>
						</PanelRow>
					</PanelBody>
				</Panel>
			</InspectorControls>
			<ServerSideRender
				block="cannock-theme/google-map"
				attributes={attributes}
			/>
			{/* <div
				className="rounded-lg overflow-hidden"
				style={{
					width: attributes.width,
					height: attributes.height,
				}}
			>
				Google Map here
			</div> */}
			{/* <div class="rounded-lg overflow-hidden">
				<iframe
					title={attributes.title}
					src={attributes.embedSource}
					width={attributes.width}
					height={attributes.height}
					style="border:0;"
					allowfullscreen=""
					loading="lazy"
				></iframe>
			</div> */}
		</div>
	);
}
