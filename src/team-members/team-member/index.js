import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import save from './save';

registerBlockType( "demo-block/team-member", {
	apiVersion: 3,
	title: __( 'Team Member', 'demo-block' ),
	description: __( 'Example block scaffolded with Create Block tool.', 'demo-block' ),
	category: "text",
	icon: "admin-users",
	parent: [ 'blocks-course/team-members' ],
	supports: {
		reusable: false,
		html: false
	},
	attributes: {
		name: {
			type: "string",
			source: "html",
			selector: "h4"
		},
		bio: {
			type: "string",
			source: "html",
			selector: "p"
		},
		id: {
			type: "number"
		},
		alt: {
			type: "string",
			source: "attribute",
			selector: "img",
			attribute: "alt"
		},
		url: {
			type: "string",
			source: "attribute",
			selector: "img",
			attribute: "src"
		}
	},
	edit: Edit,
	save,
} );
