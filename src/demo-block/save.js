import { useBlockProps, RichText } from '@wordpress/block-editor';
import classnames from 'classnames';

export default function save({ attributes }) {
	const { text, alignments, backgroundColor, textColor, shadow, shadowOpacity } = attributes;
	const classes = classnames( `text-box-align-${alignments}`, {
		'has-shadow': shadow,
		[`shadow-opacity-${shadowOpacity}`]: shadow && shadowOpacity,
	} );
	return (
		<RichText.Content { ...useBlockProps.save({
			className: classes
		}) }
			value={text}
			tagName='h4'
		/>
	);
}
