import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components'
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { columns } = attributes;
	const onColumnsChanged = ( newColumns ) => {
		setAttributes({ columns: newColumns });
	} 
	return (
		<div { ...useBlockProps({
			className: `has-${columns}-columns`
		}) }>
			<InspectorControls>
				<PanelBody
                    title={ __( 'Team Member' ) }
                    initialOpen={ true }
                >
                    <RangeControl
                        label={ __( 'Number of people' ) }
                        min={ 1 }
                        max={ 6 }
                        value={ columns }
						onChange={onColumnsChanged}
                    />
                </PanelBody>
			</InspectorControls>
			<InnerBlocks
				allowedBlocks={["demo-block/team-member"]}
				orientation='horizontal'
				template={[
					["demo-block/team-member"],
					["demo-block/team-member"],
				]}
			/>
		</div>
	);
}
