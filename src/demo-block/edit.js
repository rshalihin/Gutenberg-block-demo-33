import { __ } from '@wordpress/i18n';
import { useBlockProps, BlockControls, RichText, AlignmentToolbar, InspectorControls, PanelColorSettings, ContrastChecker } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import classnames from 'classnames';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { text, alignments, textColor, backgroundColor, shadow, shadowOpacity } = attributes;
	const onChangeAlignment = (newAlignment) => {
		setAttributes({ alignments: newAlignment });
	}
	const onChangeBackgroundColor = (newBgColor) => {
		setAttributes({ backgroundColor: newBgColor });
	}
	const onTextColorChange = (newColor) => {
		setAttributes({ textColor: newColor });
	}
	const shadowToggle = () => {
		setAttributes({ shadow:!shadow });
	}
	const onChangeShadowOpacity = ( newShadowOpacity ) => {
		setAttributes({ shadowOpacity: newShadowOpacity });
	}
	const classes = classnames( `text-box-align-${alignments}`, {
		'has-shadow': shadow,
		[`shadow-opacity-${shadowOpacity}`]: shadow && shadowOpacity,
	} );

	return (
		<>
		{/* <InspectorControls>
			<PanelColorSettings
				title={__('Color Palate', 'block-dev')}
				icon="admin-appearance"
				initialOpen
				disableCustomColors={false}
				colorSettings={ [
					{
						value: backgroundColor,
						onChange: onChangeBackgroundColor,
						label: __( 'Background Color', 'block-dev' ),
					},
					{
						value: textColor,
						onChange: onTextColorChange,
						label: __( 'Text Color', 'block-dev' ),
					}
				]}
			>
				<ContrastChecker
					textColor={textColor}
					backgroundColor={backgroundColor}
				/>
			</PanelColorSettings>
		</InspectorControls> */}
		<InspectorControls>
		{ shadow && 
			<PanelBody>				
				<RangeControl
				    label={ __( 'Shadow Opacity', 'block-dev' ) }
					value={ shadowOpacity }
					min={ 10 }
					max={ 40 }
					step={ 10 }
					onChange={onChangeShadowOpacity}
					/>
			</PanelBody>
		}
		</InspectorControls>
		<BlockControls controls={[
			{
				icon: "admin-page",
				title: __( 'Shadow Settings', 'block-dev' ),
				onClick: shadowToggle,
				isActive: shadow
			}
		]}>
			<AlignmentToolbar
			value={ alignments }
			onChange={onChangeAlignment}
			/>
		</BlockControls>
		<div>
			<RichText { ...useBlockProps({
				className: classes,
			})}			
				value={ text }
				placeholder={ __('Your Text', 'block-dev') }
				tagName='h4'
				onChange={(text) => setAttributes({ text } )}
			/>
		</div>
		</>
	);
}
