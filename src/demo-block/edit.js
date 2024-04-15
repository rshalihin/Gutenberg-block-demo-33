import { __ } from '@wordpress/i18n';
import { useBlockProps, BlockControls, RichText, AlignmentToolbar, InspectorControls, PanelColorSettings, ContrastChecker } from '@wordpress/block-editor';
import classnames from 'classnames';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { text, alignments, textColor, backgroundColor } = attributes;
	const onChangeAlignment = (newAlignment) => {
		setAttributes({ alignments: newAlignment });
	}
	const onChangeBackgroundColor = (newBgColor) => {
		setAttributes({ backgroundColor: newBgColor });
	}
	const onTextColorChange = (newColor) => {
		setAttributes({ textColor: newColor });
	}
	const classes = classnames( `text-box-align-${alignments}` );

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
		<BlockControls>
			<AlignmentToolbar
			value={ alignments }
			onChange={onChangeAlignment}
			/>
		</BlockControls>
		<RichText
			{ ...useBlockProps({
				className: classes,
			})}
			value={ text }
			placeholder={ __('Your Text', 'block-dev') }
			tagName='h4'
			onChange={(text) => setAttributes({ text } )}
		/>
		</>
	);
}
