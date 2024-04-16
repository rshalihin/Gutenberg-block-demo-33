import { useBlockProps, RichText, MediaPlaceholder } from '@wordpress/block-editor';
import { isBlobURL } from '@wordpress/blob';
import { Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes}) {
	const { name, bio, id, alt, url } = attributes;
	const onMemberNameChange = ( newName ) => {
		setAttributes( { name: newName } );
	}
	const onMemberBioChange = ( newBio ) => {
		setAttributes( { bio: newBio } );
	}
	const onSelectImage = ( image ) => {
		if ( ! image || ! image.url ) {
			setAttributes( { url: undefined, id: undefined, alt: '' } );
			return;
		}
		setAttributes( { url: image.url, id: image.id, alt: image.alt } );
	};
	const onSelectImageUrlChange = (newUlr) => {
		setAttributes( { id: undefined, alt: '', url: newUlr } );
	}
	console.log( url );
	return (
		<div { ...useBlockProps() }>
			{ url && (
				<div className={`wp-block-demo-block-team-member-img${ isBlobURL(url) ? ' is-loading' : ''}`}>
					<img src={url} alt={alt} />
					{ isBlobURL(url) && <Spinner /> }
				</div> ) }
			<MediaPlaceholder 
				icon='admin-users'
				onSelect={ onSelectImage }
				onSelectURL={ onSelectImageUrlChange }
				accept='image/*'
				allowedTypes={['image']}
				disableMediaButtons={url}
			/>
			<RichText
				placeholder={ __( 'Member Name', 'demo-block' ) }
				value={ name }
				tagName='h4'
				onChange={ onMemberNameChange }
			/>
			<RichText
				placeholder={ __( 'Members Bio', 'demo-block' ) }
				value={ bio }
				tagName='p'
				onChange={ onMemberBioChange }
			/>
		</div>
	);
}
