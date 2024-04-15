import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({attributes}) {
	const { cardHeading, cardBody, cardFooter } = attributes;
	return (
		<>
			<div { ...useBlockProps.save() }>
				<RichText.Content
					tagName='h4'
					value={cardHeading}
				/>
				<RichText.Content
					tagName='p'
					value={cardBody}
				/>
				<RichText.Content
					tagName='p'
					value={cardFooter}
				/>
			</div>
		</>
	);
}
