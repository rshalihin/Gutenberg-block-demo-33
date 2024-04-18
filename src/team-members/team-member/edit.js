import { useBlockProps, RichText, MediaPlaceholder, MediaReplaceFlow, BlockControls, InspectorControls, store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect } from "@wordpress/data";
import { usePrevious } from "@wordpress/compose";
import { useEffect, useState, useRef } from "@wordpress/element";
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
import { Spinner, withNotices, ToolbarButton, PanelBody, TextareaControl, SelectControl, Icon, Tooltip } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function Edit({ attributes, setAttributes, noticeOperations, noticeUI, isSelected}) {

	const { name, bio, id, alt, url, socialLinks } = attributes;
	const [ blobUrl, setBlobUrl ] = useState();
	const prevUrl = usePrevious(url);
	const titleRef = useRef();

	const getMediaObject = useSelect(
		(select) => {
			const { getMedia } = select("core");
			return id ? getMedia( id ) : null;
	}, [ id ] );

	const imageSizes = useSelect(
		(select) => {
			return select( blockEditorStore ).getSettings().imageSizes;
		}, [] );

	const getImageSizeOptions = () => {
		if ( ! getMediaObject )  return [];
		const options = [];
		const sizes = getMediaObject.media_details.sizes;
		for ( const key in sizes ) {
			const size = sizes[ key ];
			const imageSize = imageSizes.find( s => s.slug === key );
			if ( imageSize ) {
				options.push({
					label: imageSize.name,
					value: size.source_url
				})
			}
		}
		return options;
	};

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
	const onErrorImageChange = ( message ) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice( message );
	}
	const onRemoveImage = () => {
		setAttributes( { id: undefined, alt: '', url: undefined } );
	}
	const onImageAltChange = ( newAlt ) => {
		setAttributes( { alt: newAlt } );
	}
	const onImageSizeChange = ( newUrlSize ) => {
		setAttributes( { url: newUrlSize } );
	}
	useEffect( () => {
		if ( ! id && isBlobURL( url ) ) {
			setAttributes( { url: undefined, alt: '' } );
		}
	}, []);

	useEffect( () => {
		if ( isBlobURL( url ) ) {
			setBlobUrl( url );
		} else {
			revokeBlobURL( blobUrl );
			setBlobUrl();
		}
	}, [ url ] );
	useEffect( () => {
		if ( url && ! prevUrl ) {
			titleRef.current.focus();
		}
	}, [url, prevUrl] );

	return (
		<>
			<InspectorControls>
				<PanelBody
				    title={ __( 'Image Settings', 'demo-block' ) }
				>
				{ id && (
					<SelectControl
						label={__( 'Image Size', 'demo-block' )}
						options={ getImageSizeOptions() }
						value={ url }
						onChange={ onImageSizeChange }
					/>
				)}
					
				{ url && !isBlobURL(url) && (
					<TextareaControl
                        label={ __( 'Alt Text', 'demo-block' ) }
                        value={ alt }
                        onChange={ onImageAltChange }
                    /> ) }
				</PanelBody>
			</InspectorControls>
		{ url && 
			<BlockControls group='inline'>
				<MediaReplaceFlow
					name={ __('Replace Image', 'demo-block') }
					onSelect={ onSelectImage }
					onSelectURL={ onSelectImageUrlChange }
					accept='image/*'
					allowedTypes={['image']}
					disableMediaButtons={url}
					onError={ onErrorImageChange}
					mediaURL={url}
					mediaId={id}
				/>
				<ToolbarButton onClick={onRemoveImage} >
				{ __('Remove Image', 'demo-block') }
				</ToolbarButton>
			</BlockControls>
		}
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
					onError={ onErrorImageChange}
					notices={ noticeUI }
				/>
				<RichText
				    ref={titleRef}
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
				<div className={'wp-block-demo-block-team-member-social-links'}>
					<ul>
						{socialLinks.map((item, index) => {
							return (
									<li key={index}>
										{item.icon}
									</li>
							)
						}
						)}
						{ isSelected && 
						<li className={'wp-block-demo-block-team-member-add-social-link-li'}>
							<Tooltip text={ __( 'Add Social Link', 'demo-block' ) }>
								<button aria-label={__( 'Add Social Link', 'demo-block' )}>
									+
								</button>
							</Tooltip>
						</li>
						 }
					</ul>
				</div>
			</div>
		</>
	);
}
export default withNotices(Edit);