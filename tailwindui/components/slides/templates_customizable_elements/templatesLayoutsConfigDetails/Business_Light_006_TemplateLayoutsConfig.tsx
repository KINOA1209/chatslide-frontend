import { LayoutElements } from '../layout_elements';
import { LayoutKeys } from '../../slideLayout';
import { TemplateKeys } from '../../slideTemplates';

export const Business_Light_006_TemplateLayoutsConfig: {
	[key in LayoutKeys]?: LayoutElements;
} = {
	Cover_img_0_layout: {
		canvaCSS: {
			width: '100%',
			height: '100%',
			position: 'relative',
			// overflow: 'hidden',
		},
		titleCSS: {
			backgroundColor: '#F1F1F1',
			padding: '4rem',
			width: '100%',
			height: '70%',
			zIndex: 20,
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)', // Centering trick
		},
		userNameTextDividerCSS: {
			display: 'none',
		},
		userNameCSS: {
			zIndex: 30,
			position: 'absolute',
			top: '92%',
			left: '80%',
			transform: 'translate(-50%, -40%)', // Centering trick
			width: '40%',
		},
		columnCSS: {
			// paddingTop: '1rem', // Equivalent to pt-[1rem]
			paddingLeft: '2rem', // Equivalent to px-[2rem], for left padding
			paddingRight: '2rem', // Equivalent to px-[2rem], for right padding
			width: '50%', // Equivalent to w-1/2
			justifyContent: 'flex-start', // Equivalent to justify-start
			height: '100%', // Equivalent to h-full
			gap: '2rem',
		},

		imageContainerCSS: {
			width: '100%', // Equivalent to w-full
			height: '100%', // Equivalent to h-full
			overflow: 'hidden',
			borderRadius: '0.375rem', // Equivalent to rounded-md (approximation)
			position: 'absolute',
		},
		visualElementsCSS: {
			zIndex: 10,
			position: 'absolute',
			top: '0%',
			left: '0%',
			// display: 'none',
			pointerEvents: 'none' /* Make the layer transparent to pointer events */,
		},
		titlePos: { x: 80, y: 130, width: 390, height: 200 },
		usernamePos: {x: 80, y: 400, width: 390, height: 50},
	},
	Cover_img_1_layout: {
		canvaCSS: {
			width: '100%',
			height: '100%',
			position: 'relative',
			// overflow: 'hidden',
		},
		titleCSS: {
			backgroundColor: '#F1F1F1',
			padding: '4rem',
			width: '70%',
			height: '50%',
			zIndex: 20,
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)', // Centering trick
		},
		userNameTextDividerCSS: {
			display: 'none',
		},
		userNameCSS: {
			zIndex: 30,
			position: 'absolute',
			top: '92%',
			left: '80%',
			transform: 'translate(-50%, -40%)', // Centering trick
			width: '40%',
		},
		columnCSS: {
			// paddingTop: '1rem', // Equivalent to pt-[1rem]
			paddingLeft: '2rem', // Equivalent to px-[2rem], for left padding
			paddingRight: '2rem', // Equivalent to px-[2rem], for right padding
			width: '50%', // Equivalent to w-1/2
			justifyContent: 'flex-start', // Equivalent to justify-start
			height: '100%', // Equivalent to h-full
			gap: '2rem',
		},

		imageContainerCSS: {
			width: '100%', // Equivalent to w-full
			height: '100%', // Equivalent to h-full
			//overflow: 'hidden',
			borderRadius: '0.375rem', // Equivalent to rounded-md (approximation)
			position: 'absolute',
			zIndex: 10,
		},
		visualElementsCSS: {
			zIndex: 20,
			position: 'absolute',
			// display: 'none',
			pointerEvents: 'none' /* Make the layer transparent to pointer events */,
		},
		rndContainerCSS: {
			width: '100%',
			height: '100%',
			position: 'relative',
		},
		rndCSS: {
			zIndex: '10',
		},
		titlePos: { x: 80, y: 130, width: 390, height: 200 },
		imgContainerPos: [{ x: 480, y: 30, width: 450, height: 480 }],
		usernamePos: {x: 80, y: 400, width: 390, height: 50},
	},
	Col_1_img_0_layout: {
		canvaCSS: {
			width: '100%', // Equivalent to w-full
			height: '100%', // Equivalent to h-full
		},
		contentCSS: {
			width: '100%', // Equivalent to w-full
			paddingLeft: '4rem',
			paddingRight: '4rem',
		},
		columnCSS: {
			width: '100%', // Equivalent to w-full
			paddingLeft: '1rem',
			paddingTop: '1.2rem',
			paddingBottom: '1.2rem',
		},
		titleAndSubtopicBoxCSS: {
			backgroundColor: '#F1F1F1',
			paddingTop: '2rem',
			paddingBottom: '2rem',
			paddingLeft: '4rem',
			paddingRight: '4rem',
		},
		topicCSS: {
			order: '2',
			paddingTop: '1rem',
		},
		subtopicCSS: {
			order: '1',
			borderBottom: '1px solid #C2C2C2',
			paddingBottom: '0.5rem',
		},
		topicPos: { x: 50, y: 50, width: 860, height: 50 },
		subtopicPos: { x: 50, y: 104, width: 860, height: 80 },
		contentPos: [{ x: 50, y: 200, width: 860, height: 240 }],
	},
	Col_2_img_0_layout: {
		titleAndSubtopicBoxCSS: {
			backgroundColor: '#F1F1F1',
			paddingTop: '2rem',
			paddingBottom: '2rem',
			paddingLeft: '4rem',
			paddingRight: '4rem',
		},
		topicCSS: {
			order: '2',
			paddingTop: '1rem',
		},
		subtopicCSS: {
			order: '1',
			borderBottom: '1px solid #C2C2C2',
			paddingBottom: '0.5rem',
		},
		contentContainerCSS: {
			height: '100%',
			width: '100%',
			display: 'grid',
			gridTemplateColumns: 'repeat(2, 1fr)',
			gap: '4rem',
			paddingTop: '2rem',
			paddingBottom: '4rem',
			paddingLeft: '4rem',
			paddingRight: '4rem',
		},
		contentCSS: {
			gap: '0.5rem',
			paddingLeft: '1rem',
			borderLeft: '1px solid #C2C2C2',
		},
		contentIndexCSS: {
			mixBlendMode: 'hard-light',
			color: 'black', // Assuming text-neutral-900 corresponds to #374155
			fontSize: '2.5rem',
			fontWeight: 'bold',
			fontFamily: 'Yrsa Medium',
			textTransform: 'uppercase',
			lineHeight: '2.5rem',
			letterSpacing: '0.5rem',
			paddingTop: '1rem',
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
			backgroundColor: '#F1F1F1',
			paddingTop: '2rem',
			paddingBottom: '2rem',
			paddingLeft: '4rem',
			paddingRight: '4rem',
		},
		topicCSS: {
			order: '2',
			paddingTop: '1rem',
		},
		subtopicCSS: {
			order: '1',
			borderBottom: '1px solid #C2C2C2',
			paddingBottom: '0.5rem',
		},
		contentContainerCSS: {
			height: '100%',
			width: '100%',
			display: 'grid',
			gridTemplateColumns: 'repeat(3, 1fr)',
			gap: '4rem',
			paddingTop: '2rem',
			paddingBottom: '4rem',
			paddingLeft: '4rem',
			paddingRight: '4rem',
		},
		contentCSS: {
			paddingLeft: '1rem',
			gap: '0.5rem',
			borderLeft: '1px solid #C2C2C2',
		},
		contentIndexCSS: {
			mixBlendMode: 'hard-light',
			color: 'black', // Assuming text-neutral-900 corresponds to #374155
			fontSize: '2.5rem',
			fontWeight: 'bold',
			fontFamily: 'Yrsa Medium',
			textTransform: 'uppercase',
			lineHeight: '2.5rem',
			letterSpacing: '0.5rem',
			paddingTop: '1rem',
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
			gap: '0.1rem',
		},
		canvaCSS: {
			width: '100%',
			height: '100%',
			justifyContent: 'flex-start',
			alignItems: 'flex-start',
		},
		titleAndSubtopicBoxCSS: {
			backgroundColor: '#F1F1F1',
			paddingTop: '2rem',
			paddingBottom: '2rem',
			paddingLeft: '4rem',
			paddingRight: '4rem',
			width: '100%',
		},
		topicCSS: {
			order: '2',
			paddingTop: '1rem',
		},
		subtopicCSS: {
			order: '1',
			borderBottom: '1px solid #C2C2C2',
			paddingBottom: '0.5rem',
		},
		imageContainerCSS: {
			width: '50%', // equivalent to w-1/2
			height: '100%', // equivalent to h-[90%]
			borderRadius: '0.375rem', // equivalent to rounded-md
			//overflow: 'hidden',
			alignItems: 'center', // equivalent to items-center
		},
		contentContainerCSS: {
			paddingTop: '1rem',
			paddingLeft: '2rem',
			paddingRight: '2rem',
		},
		contentCSS: {
			borderLeft: '1px solid #C2C2C2',
			paddingLeft: '0.5rem',
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
		columnCSS: {
			width: '100%',
			height: '100%',
			display: 'grid',
			gridTemplateColumns: '1fr',
			gridAutoRows: '30% auto 30%',
		},
		titleAndSubtopicBoxCSS: {
			backgroundColor: '#F1F1F1',
			paddingTop: '2rem',
			paddingBottom: '2rem',
			paddingLeft: '4rem',
			paddingRight: '4rem',
			width: '100%',
		},
		topicCSS: {
			order: '2',
			paddingTop: '1rem',
		},
		subtopicCSS: {
			order: '1',
			borderBottom: '1px solid #C2C2C2',
			paddingBottom: '0.5rem',
		},
		imageContainerCSS: {
			height: '100%',
			flexGrow: 1,
			borderRadius: '0.375rem', // Assuming a typical rounded-md value
			//overflow: 'hidden',
			gridRow: 3,
			zIndex: 10,
		},
		contentContainerCSS: {
			paddingTop: '0.5rem',
			paddingBottom: '0.5rem',
			paddingLeft: '4rem',
			paddingRight: '4rem',
			height: '100%',
			width: '100%',
			gap: '0.5rem',
			gridRow: 2,
			zIndex: 20,
		},
		contentCSS: { borderLeft: '1px solid #C2C2C2', paddingLeft: '0.5rem' },
		contentTextCSS: {
			width: '100%',
			height: '100%',
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
			padding: '28px',
		},
		columnCSS: {
			gap: '0.5rem',
		},
		titleAndSubtopicBoxCSS: {
			justifyContent: 'center',
			alignItems: 'center',
			paddingBottom: '2rem',
		},
		topicCSS: {
			borderBottom: '1px solid #C2C2C2',
		},
		subtopicCSS: {
			paddingTop: '0.5rem',
		},
		imageContainerCSS: {
			width: '100%', // equivalent to w-full
			display: 'grid',
			gridTemplateColumns: 'repeat(2, 1fr)', // equivalent to grid-cols-2
			gap: '2rem', // equivalent to gap-[2rem]
		},
		imageCSS: {
			height: '11rem', // equivalent to h-[11rem]
			flexGrow: 1, // equivalent to grow
			borderRadius: '0.375rem', // equivalent to rounded-md
			//overflow: 'hidden', // equivalent to overflow-hidden
			position: 'relative', // equivalent to relative
		},
		contentContainerCSS: {
			width: '100%', // equivalent to w-full
			display: 'grid',
			gridTemplateColumns: 'repeat(2, 1fr)', // equivalent to grid-cols-2
			gap: '2rem', // equivalent to gap-[2rem]
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
			padding: '28px',
		},
		columnCSS: { gap: '0.5rem' },
		titleAndSubtopicBoxCSS: {
			justifyContent: 'center',
			alignItems: 'center',
			paddingBottom: '2rem',
		},
		topicCSS: {
			borderBottom: '1px solid #C2C2C2',
		},
		subtopicCSS: {
			paddingTop: '0.5rem',
		},
		imageContainerCSS: {
			width: '100%', // equivalent to w-full
			display: 'grid',
			gridTemplateColumns: 'repeat(3, 1fr)', // equivalent to grid-cols-3
			gap: '2rem', // equivalent to gap-[2rem]
		},
		imageCSS: {
			height: '11rem', // equivalent to h-[11rem]
			flexGrow: 1, // equivalent to grow
			borderRadius: '0.375rem', // equivalent to rounded-md
			//overflow: 'hidden', // equivalent to overflow-hidden
			position: 'relative',
		},
		contentContainerCSS: {
			width: '100%', // equivalent to w-full
			display: 'grid',
			gridTemplateColumns: 'repeat(3, 1fr)', // equivalent to grid-cols-3
			gap: '2rem', // equivalent to gap-[2rem]
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
			padding: '50px 50px 50px 50px',
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
