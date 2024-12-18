import { LayoutElements } from '../layout_elements';
import { LayoutKeys } from '../../slideLayout';
import { TemplateKeys } from '../../slideTemplates';

export const Business_Review_012_TemplateLayoutsConfig: {
	[key in LayoutKeys]?: LayoutElements;
} = {
	Cover_img_0_layout: {
		canvaCSS: {
			width: '100%',
			height: '100%',
			position: 'relative',
			// overflow: 'hidden',
		},
		columnCSS: {
			marginTop: '25px', // Equivalent to pt-[1rem]
			marginLeft: '25px', // Equivalent to px-[2rem], for left padding
			marginRight: '25px', // Equivalent to px-[2rem], for right padding
			marginBottom: '25px',
			padding: '25px',
			borderRadius: '24px',
			width: '100%',
			justifyContent: 'space-between', // Equivalent to justify-start
			// gap: '2rem',
		},
		titleCSS: {
			// backgroundColor: '#F1F1F1',
			// padding: '130px 80px 0px 80px',
			width: '100%',
			order: 1,
			// height: '70%',
			zIndex: 20,
			// position: 'absolute',
			// top: '25px',
			// left: '25px',
			// textAlign: 'center',
		},
		userNameTextDividerCSS: {
			display: 'none',
		},
		userNameCSS: {
			// position: 'absolute',
			// bottom: '25px',
			// left: '25px',
			width: '100%',
			order: 0,
			// paddingLeft: '80px',
			// transform: 'translate(-50%, -50%)', // Centering trick
			// textAlign: 'center',
		},
		titlePos: { x: 80, y: 130, width: 390, height: 200 },
		usernamePos: {x: 80, y: 400, width: 390, height: 50},
	},
	Cover_img_1_layout: {
		canvaCSS: {
			width: '100%',
			height: '100%',
			position: 'relative',
			gap: '6px',
		},
		columnCSS: {
			marginTop: '25px', // Equivalent to pt-[1rem]
			marginLeft: '25px', // Equivalent to px-[2rem], for left padding
			marginRight: '0px', // Equivalent to px-[2rem], for right padding
			marginBottom: '25px',
			padding: '25px',
			borderRadius: '24px',
			width: '50%',
			// width: '50%', // Equivalent to w-1/2
			justifyContent: 'space-between', // Equivalent to justify-start
			// gap: '2rem',
		},
		titleCSS: {
			width: '100%',
			order: 1,

			zIndex: 20,
		},
		userNameTextDividerCSS: {
			display: 'none',
		},
		userNameCSS: {
			width: '100%',
			order: 0,
		},
		// titleCSS: {
		// 	padding: '80px 0px 0px 80px',
		// 	maxHeight: '80%',
		// 	width: '50%',
		// 	height: '70%',
		// 	position: 'absolute',
		// 	top: '0%',
		// 	left: '0%',
		// 	textAlign: 'center',
		// },
		// columnCSS: {
		// 	// paddingTop: '4rem', // Equivalent to pt-[1rem]
		// 	// paddingLeft: '2rem', // Equivalent to px-[2rem], for left padding
		// 	// paddingRight: '2rem', // Equivalent to px-[2rem], for right padding
		// 	width: '50%', // Equivalent to w-1/2
		// 	display: 'flex', // Equivalent to flex
		// 	flexDirection: 'column', // Equivalent to flex-col
		// 	justifyContent: 'flex-start', // Equivalent to justify-start
		// 	height: '100%', // Equivalent to h-full
		// 	gap: '2rem',
		// },
		imageContainerCSS: {
			width: '50%', // Equivalent to w-1/2
			height: '100%', // Equivalent to h-full
			//overflow: 'hidden',
			alignItems: 'center',
			zIndex: 20,
			padding: '25px 25px 25px 0px', // top right bottom left
			// position: 'absolute',
			// top: '0px',
			// left: '0px',
		},
		imageCSS: {
			borderRadius: '24px', // border radius 1.25rem for image
		},

		visualElementsCSS: {
			zIndex: 0,
			width: '100%',
			height: '100%',
			position: 'absolute',
			// display: 'none',
			pointerEvents: 'none' /* Make the layer transparent to pointer events */,
			top: '0%',
		},
		rndContainerCSS: {
			width: '100%',
			height: '100%',
			position: 'relative',
		},
		rndCSS: {
			zIndex: '51',
		},
		titlePos: { x: 80, y: 130, width: 390, height: 200 },
		imgContainerPos: [{ x: 480, y: 30, width: 450, height: 480 }],
		usernamePos: {x: 80, y: 400, width: 390, height: 50},
	},
	Col_1_img_0_layout: {
		canvaCSS: {
			width: '100%', // Equivalent to w-full
			height: '100%', // Equivalent to h-full
			// marginTop: '25px', // Equivalent to pt-[1rem]
			// marginLeft: '25px', // Equivalent to px-[2rem], for left padding
			// marginRight: '25px', // Equivalent to px-[2rem], for right padding
			// marginBottom: '45px',
			// padding: '25px',
			// borderRadius: '24px',
			//
			justifyContent: 'space-between', // Equivalent to justify-start
		},
		titleAndContentColumnCSS: {
			marginTop: '25px', // Equivalent to pt-[1rem]
			marginLeft: '25px', // Equivalent to px-[2rem], for left padding
			marginRight: '25px', // Equivalent to px-[2rem], for right padding
			marginBottom: '25px',
			padding: '25px',
			borderRadius: '24px',
			height: '100%',
			// justifyContent: 'space-between', // Equivalent to justify-start
		},
		contentCSS: {
			width: '100%', // Equivalent to w-full
			height: '100%',
			// borderRadius: '0px 0px 24px 24px',
			// paddingLeft: '50px',
			// paddingRight: '50px',
			// paddingTop: '0px',
			// paddingBottom: '0px',
			// marginTop: '0px', // Equivalent to pt-[1rem]
			// marginLeft: '25px', // Equivalent to px-[2rem], for left padding
			// marginRight: '25px', // Equivalent to px-[2rem], for right padding
			// marginBottom: '45px',
		},
		columnCSS: {
			width: '100%', // Equivalent to w-full
		},
		titleAndSubtopicBoxCSS: {
			// borderRadius: '24px 24px 0px 0px',
		},
		topicCSS: {
			order: '0',
			paddingBottom: '12px',
			textTransform: 'uppercase',
		},
		subtopicCSS: {
			order: '1',
			// borderBottom: '1px solid #C2C2C2',
			// paddingBottom: '0.5rem',
		},
		titlesAndContentDividerCSS: {
			display: 'none',
		},
		topicPos: { x: 50, y: 50, width: 860, height: 50 },
		subtopicPos: { x: 50, y: 104, width: 860, height: 80 },
		contentPos: [{ x: 50, y: 200, width: 860, height: 240 }],
	},
	Col_2_img_0_layout: {
		titleAndSubtopicBoxCSS: {
			paddingTop: '25px',
			paddingBottom: '80px',
			paddingLeft: '25px',
			paddingRight: '25px',
			borderRadius: '24px',
		},
		titleAndContentColumnCSS: {
			marginTop: '25px', // Equivalent to pt-[1rem]
			marginLeft: '25px', // Equivalent to px-[2rem], for left padding
			marginRight: '25px', // Equivalent to px-[2rem], for right padding
			marginBottom: '25px',
			// padding: '25px',
			borderRadius: '24px',
			height: '100%',
			// justifyContent: 'space-between', // Equivalent to justify-start
		},
		topicCSS: {
			order: '0',
			paddingBottom: '12px',
		},
		subtopicCSS: {
			order: '1',
			// borderBottom: '1px solid #C2C2C2',
			// paddingBottom: '0.5rem',
		},
		contentContainerCSS: {
			height: '100%',
			width: '100%',
			display: 'grid',
			gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
			gap: '30px',
			// borderRadius: '0px 0px 24px 24px',
			paddingLeft: '25px',
			paddingRight: '25px',
			paddingTop: '25px',
			paddingBottom: '25px',
			// marginBottom: '45px',
			// marginLeft: '25px',
			// marginRight: '25px',
		},
		contentCSS: {
			gap: '0.5rem',
			// paddingLeft: '1rem',
			// borderLeft: '1px solid #C2C2C2',
		},
		contentIndexCSS: {
			display: 'none',
		},
		contentIndexTextDividerCSS: {
			display: 'none',
		},
		contentTextCSS: {
			flexGrow: 1,
		},
		topicPos: { x: 50, y: 50, width: 860, height: 50 },
		subtopicPos: { x: 50, y: 104, width: 860, height: 50 },
		contentPos: [
			{ x: 50, y: 200, width: 405, height: 240 },
			{ x: 505, y: 200, width: 405, height: 240 },
		],
	},
	Col_3_img_0_layout: {
		titleAndSubtopicBoxCSS: {
			paddingTop: '25px',
			paddingBottom: '80px',
			paddingLeft: '25px',
			paddingRight: '25px',
			// marginTop: '25px',
			// marginLeft: '25px',
			// marginRight: '25px',
			borderRadius: '24px',
		},
		titleAndContentColumnCSS: {
			marginTop: '25px', // Equivalent to pt-[1rem]
			marginLeft: '25px', // Equivalent to px-[2rem], for left padding
			marginRight: '25px', // Equivalent to px-[2rem], for right padding
			marginBottom: '25px',
			// padding: '25px',
			borderRadius: '24px',
			height: '100%',
			// justifyContent: 'space-between', // Equivalent to justify-start
		},
		topicCSS: {
			order: '0',
			paddingBottom: '12px',
		},
		subtopicCSS: {
			order: '1',
			// borderBottom: '1px solid #C2C2C2',
			// paddingBottom: '0.5rem',
		},
		contentContainerCSS: {
			height: '100%',
			width: '100%',
			display: 'grid',
			gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
			gap: '30px',
			// borderRadius: '0px 0px 24px 24px',
			paddingLeft: '25px',
			paddingRight: '25px',
			paddingTop: '25px',
			paddingBottom: '25px',
			// marginBottom: '45px',
			// marginLeft: '25px',
			// marginRight: '25px',
		},
		contentCSS: {
			gap: '0.5rem',
			// paddingLeft: '1rem',
			// borderLeft: '1px solid #C2C2C2',
		},
		contentIndexCSS: {
			display: 'none',
		},
		contentIndexTextDividerCSS: {
			display: 'none',
		},
		contentTextCSS: {
			flexGrow: 1,
		},
		topicPos: { x: 50, y: 50, width: 860, height: 50 },
		subtopicPos: { x: 50, y: 104, width: 860, height: 50 },
		contentPos: [
			{ x: 50, y: 200, width: 250, height: 240 },
			{ x: 350, y: 200, width: 250, height: 240 },
			{ x: 650, y: 200, width: 250, height: 240 },
		],
	},
	Col_2_img_1_layout: {
		columnCSS: {
			width: '50%', // equivalent to w-1/2
			alignItems: 'flex-start',
			height: '100%',
			// gap: '0.1rem',
			marginLeft: '25px',
		},
		canvaCSS: {
			width: '100%',
			height: '100%',
			justifyContent: 'flex-start',
			alignItems: 'flex-start',
			gap: '6px',
		},
		titleAndSubtopicBoxCSS: {
			// backgroundColor: '#F1F1F1',
			paddingTop: '25px',
			paddingBottom: '12px',
			paddingLeft: '25px',
			paddingRight: '25px',
			borderRadius: '24px 24px 0px 0px',
			marginTop: '25px',
		},
		topicCSS: {
			order: '0',
			paddingBottom: '12px',
			textTransform: 'uppercase',
		},
		subtopicCSS: {
			order: '1',
			// borderBottom: '1px solid #C2C2C2',
			// paddingBottom: '0.5rem',
		},
		titlesAndContentDividerCSS: {
			display: 'none',
		},
		imageContainerCSS: {
			width: '50%', // equivalent to w-1/2
			height: '100%', // equivalent to h-[90%]
			alignItems: 'center', // equivalent to items-center

			padding: '25px 25px 25px 0px', // top right bottom left
		},
		imageCSS: {
			borderRadius: '24px', // border radius 1.25rem for image
		},
		contentContainerCSS: {
			width: '100%', // Equivalent to w-full
			paddingLeft: '25px',
			paddingRight: '25px',
			paddingTop: '0px',
			paddingBottom: '25px',
			height: '100%',
			// marginTop: '0px', // Equivalent to pt-[1rem]
			// marginLeft: '0px', // Equivalent to px-[2rem], for left padding
			// marginRight: '0px', // Equivalent to px-[2rem], for right padding
			// marginBottom: '45px',
			// padding: '25px',
			borderRadius: '0px 0px 24px 24px',
			marginBottom: '25px',
		},
		contentCSS: {
			// borderLeft: '1px solid #C2C2C2',
			// paddingLeft: '0.5rem',
		},
		rndContainerCSS: {
			width: '100%',
			height: '100%',
			position: 'relative',
		},
		rndCSS: {
			zIndex: '51',
		},
		topicPos: { x: 50, y: 50, width: 430, height: 50 },
		subtopicPos: { x: 50, y: 104, width: 430, height: 80 },
		contentPos: [{ x: 50, y: 200, width: 430, height: 300 }],
		imgContainerPos: [{ x: 480, y: 30, width: 450, height: 480 }],
	},
	Col_1_img_1_layout: {
		canvaCSS: {
			display: 'grid',
		},
		columnCSS: {
			// width: '100%',
			// height: '100%',
			display: 'grid',
			gridTemplateColumns: '1fr',
			gridAutoRows: '25% 25% auto',
			// gap: '30px',
			// overflow: 'hidden',
			marginTop: '25px', // Equivalent to pt-[1rem]
			marginLeft: '25px', // Equivalent to px-[2rem], for left padding
			marginRight: '25px', // Equivalent to px-[2rem], for right padding
			marginBottom: '25px',
			// padding: '25px',
			borderRadius: '24px',
		},
		titleAndSubtopicBoxCSS: {
			// backgroundColor: '#F1F1F1',
			// paddingTop: '50px',
			// paddingBottom: '50px',
			// paddingLeft: '50px',
			// paddingRight: '50px',

			gridRow: 1,
			padding: '25px 25px 0px 25px',
			borderRadius: '24px 24px 0px 0px', // border radius 1.25rem for image
		},
		topicCSS: {
			order: '0',
			paddingBottom: '12px',
			textTransform: 'uppercase',
		},
		subtopicCSS: {
			// borderBottom: '1px solid #C2C2C2',
			// paddingBottom: '0.5rem',
		},
		titlesAndContentDividerCSS: {
			display: 'none',
		},
		imageContainerCSS: {
			height: '100%',
			flexGrow: 1,
			gridRow: 3,
			// padding: '6px 25px 25px 45px',
			marginTop: '6px',
		},
		imageCSS: {
			borderRadius: '24px', // border radius 1.25rem for image
		},
		contentContainerCSS: {
			width: '100%', // Equivalent to w-full
			padding: '0px 25px 25px 25px',
			borderRadius: '0px 0px 24px 24px', // border radius 1.25rem for image
			maxHeight: '100%', // Maximum height,
			// paddingLeft: '50px',
			// paddingRight: '50px',
			// paddingTop: '0px',
			// paddingBottom: '0px',
			gridRow: 2,
		},

		// contentCSS: { borderLeft: '1px solid #C2C2C2', paddingLeft: '0.5rem' },
		contentTextCSS: {
			flexGrow: 1,
			paddingLeft: '1rem',
		},
		rndContainerCSS: {
			width: '100%',
			height: '100%',
			position: 'relative',
		},
		rndCSS: {
			zIndex: '51',
		},
		topicPos: { x: 50, y: 50, width: 860, height: 50 },
		subtopicPos: { x: 50, y: 104, width: 860, height: 50 },
		contentPos: [{ x: 50, y: 170, width: 860, height: 140 }],
		imgContainerPos: [{ x: 50, y: 320, width: 860, height: 210 }],
	},
	Col_2_img_2_layout: {
		canvaCSS: {
			width: '100%',
			height: '100%',
		},
		columnCSS: {
			width: '100%',
			// height: '100%',
			display: 'grid',
			gridTemplateColumns: '1fr',
			gridAutoRows: '25% 25% auto',
			marginTop: '25px', // Equivalent to pt-[1rem]
			marginLeft: '25px', // Equivalent to px-[2rem], for left padding
			marginRight: '25px', // Equivalent to px-[2rem], for right padding
			marginBottom: '25px',
			// gap: '10px',
		},
		titleAndSubtopicBoxCSS: {
			// backgroundColor: '#F1F1F1',
			padding: '25px 25px 0px 25px',
			borderRadius: '24px 24px 0px 0px', // border radius 1.25rem for image
			gridRow: 1,
		},
		topicCSS: {
			order: '0',
			paddingBottom: '12px',
			textTransform: 'uppercase',
		},
		subtopicCSS: {
			// borderBottom: '1px solid #C2C2C2',
			// paddingBottom: '0.5rem',
		},
		titlesAndContentDividerCSS: {
			display: 'none',
		},
		imageContainerCSS: {
			width: '100%', // equivalent to w-full
			display: 'grid',
			gridTemplateColumns: 'repeat(2, 1fr)', //
			order: 2,
			zIndex: 20,
			gap: '6px',
			padding: '6px 0px 0px 0px',
			// marginTop: '6px',
		},
		imageCSS: {
			borderRadius: '25px',
		},
		contentContainerCSS: {
			zIndex: 30,
			padding: '0px 25px 25px 25px',
			borderRadius: '0px 0px 24px 24px', // border radius 1.25rem for image
			width: '100%',
			display: 'grid',
			gridTemplateColumns: 'repeat(2, 1fr)', //
			gap: '50px',
			order: 1,
			maxHeight: '100%',
		},

		rndContainerCSS: {
			width: '100%',
			height: '100%',
			position: 'relative',
		},
		rndCSS: {
			zIndex: '51',
		},
		topicPos: { x: 50, y: 50, width: 860, height: 50 },
		subtopicPos: { x: 50, y: 104, width: 860, height: 80 },
		contentPos: [
			{ x: 50, y: 200, width: 405, height: 100 },
			{ x: 505, y: 200, width: 405, height: 100 },
		],
		imgContainerPos: [
			{ x: 50, y: 320, width: 405, height: 220 },
			{ x: 505, y: 320, width: 405, height: 220 },
		],
	},
	Col_3_img_3_layout: {
		canvaCSS: {
			width: '100%',
			height: '100%',
		},
		columnCSS: {
			width: '100%',
			// height: '100%',
			display: 'grid',
			gridTemplateColumns: '1fr',
			gridAutoRows: '25% 25% auto',
			marginTop: '25px', // Equivalent to pt-[1rem]
			marginLeft: '25px', // Equivalent to px-[2rem], for left padding
			marginRight: '25px', // Equivalent to px-[2rem], for right padding
			marginBottom: '25px',
			// gap: '10px',
		},
		titleAndSubtopicBoxCSS: {
			// backgroundColor: '#F1F1F1',
			padding: '25px 25px 0px 25px',
			borderRadius: '24px 24px 0px 0px', // border radius 1.25rem for image
			flexDirection: 'column', // Equivalent to flex
			gridRow: 1,
		},
		topicCSS: {
			order: '0',
			paddingBottom: '12px',
			textTransform: 'uppercase',
		},
		subtopicCSS: {
			// borderBottom: '1px solid #C2C2C2',
			// paddingBottom: '0.5rem',
		},
		titlesAndContentDividerCSS: {
			display: 'none',
		},
		imageContainerCSS: {
			width: '100%', // equivalent to w-full
			display: 'grid',
			gridTemplateColumns: 'repeat(3, 1fr)', //
			order: 2,
			zIndex: 20,
			gap: '6px',
			padding: '6px 0px 0px 0px',
			// marginTop: '6px',
		},
		imageCSS: {
			borderRadius: '25px',
		},
		contentContainerCSS: {
			zIndex: 30,
			padding: '0px 25px 25px 25px',
			borderRadius: '0px 0px 24px 24px', // border radius 1.25rem for image
			width: '100%',
			display: 'grid',
			gridTemplateColumns: 'repeat(3, 1fr)', //
			gap: '50px',
			order: 1,
			maxHeight: '100%',
		},

		rndContainerCSS: {
			width: '100%',
			height: '100%',
			position: 'relative',
		},
		rndCSS: {
			zIndex: '51',
		},
		topicPos: { x: 50, y: 50, width: 860, height: 50 },
		subtopicPos: { x: 50, y: 104, width: 860, height: 50 },
		contentPos: [
			{ x: 50, y: 310, width: 250, height: 180 },
			{ x: 350, y: 310, width: 250, height: 180 },
			{ x: 650, y: 310, width: 250, height: 180 },
		],
		imgContainerPos: [
			{ x: 50, y: 170, width: 250, height: 130 },
			{ x: 350, y: 170, width: 250, height: 130 },
			{ x: 650, y: 170, width: 250, height: 130 },
		],
	},
	Full_img_only_layout: {
		canvaCSS: {
			width: '100%',
			height: '100%',
		},

		imageContainerCSS: {
			width: '100%', // equivalent to w-full
			padding: '25px 25px 25px 25px',
		},
		imageCSS: {
			height: '100%', // equivalent to h-[11rem]
			width: '100%',
			borderRadius: '24px',
		},

		rndContainerCSS: {
			width: '100%',
			height: '100%',
			position: 'relative',
		},
		rndCSS: {
			zIndex: '51',
		},
		imgContainerPos: [{ x: 30, y: 30, width: 900, height: 480 }],
	},
};
