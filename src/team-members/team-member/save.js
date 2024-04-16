import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes}) {
	const { name, bio } = attributes;
	return (
		<div { ...useBlockProps.save() }>
			{ name && <RichText.Content value={name} tagName='h4' /> }
			{ bio && <RichText.Content value={bio} tagName='p' /> }
			
		</div>
	);
}
