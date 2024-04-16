import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit({ attributes, setAttributes}) {
	const { cardHeading, cardBody, cardFooter } = attributes;
	const onCardHeadingChange = (newCardHeading) =>{
		setAttributes({ cardHeading: newCardHeading });
	}
	const onCardBodyChange = (newCardBody) =>{
		setAttributes({ cardBody: newCardBody });
	}
	const onCardFooterChange = (newCardFooter) =>{
		setAttributes({ cardFooter: newCardFooter });
	}
	return (
		<>
			<div>
				<div { ...useBlockProps() }>
					<RichText
						placeholder={ __( 'Enter your card heading here...' ) }
						tagName="h4"
						value={cardHeading}
						onChange={ onCardHeadingChange}
					/>
					<RichText
						placeholder={ __( 'Enter your card body text here...' ) }
						tagName="p"
						value={cardBody}
						onChange={ onCardBodyChange}
					/>
					<RichText
						placeholder={ __( 'Enter your card footer here...' ) }
						tagName="p"
						value={cardFooter}
						onChange={ onCardFooterChange}
					/>	
				</div>
			</div>
		</>
	);
}
