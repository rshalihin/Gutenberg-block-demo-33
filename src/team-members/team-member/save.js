import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes}) {
	const { name, bio, id, url, alt, socialLinks } = attributes;
	return (
		<div { ...useBlockProps.save() }>
			{ url && <img src={ url } alt={ alt } className={ id ? `wp-image-${ id }` : '' } /> }
			{ name && <RichText.Content value={name} tagName='h4' /> }
			{ bio && <RichText.Content value={bio} tagName='p' /> }
			{ socialLinks && socialLinks.map(( item, i ) => {
				return (
					<a href={ item.url } key={ i }>
                    </a>
				);
				})}
			
		</div>
	);
}
