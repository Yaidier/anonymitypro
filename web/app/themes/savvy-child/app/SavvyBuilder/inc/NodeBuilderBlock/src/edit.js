/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * WordPress dependencies
 */
import { useInstanceId } from '@wordpress/compose';
// import { useEffect } from '@wordpress/compose';

import { useEffect } from '@wordpress/element';

// 👇️ import useEffect hook
// import {useEffect, useState} from 'react';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

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
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {

	function getBlockId() {
		if( !props.attributes.block_id ){
			setTimeout(() => {
				props.setAttributes({block_id: Date.now().toString()});
			}, 100);
		}

		return props.attributes.block_id ?? '';
	}

	return (
		<div { ...useBlockProps() }>
			{
				wp.element.createElement(
					'div', 
					{
						id: getBlockId()
					},
					wp.element.createElement(
						'p', 
						null,
						getBlockId()
					)
				)
			}
		</div>
	);
}
