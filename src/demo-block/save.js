
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { text, alignments, backgroundColor, textColor } = attributes;
	return (
		<RichText.Content { ...useBlockProps.save({
			className: `text-box-align-${alignments}`,
		}) }
			value={text}
			tagName='h4'
		/>
	);
}
