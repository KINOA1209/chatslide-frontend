import { LayoutElements } from '../layout_elements';
import { LayoutKeys } from '../../slideLayout';
import { TemplateKeys } from '../../slideTemplates';

export const Simplistic_008_TemplateLayoutsConfig: {
	[key in LayoutKeys]?: LayoutElements;
} = {
	Cover_img_0_layout: {
		canvaCSS: {
			display: 'flex',
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
			display: 'flex', // Equivalent to flex
			flexDirection: 'column', // Equivalent to flex-col
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
	},
	Cover_img_1_layout: {
		canvaCSS: {
			display: 'flex',
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
			display: 'flex', // Equivalent to flex
			flexDirection: 'column', // Equivalent to flex-col
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
	},
	Col_1_img_0_layout: {
		canvaCSS: {
			width: '100%', // Equivalent to w-full
			height: '100%', // Equivalent to h-full
			display: 'flex', // Equivalent to flex
			flexDirection: 'column', // Equivalent to flex-col
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
			display: 'flex',
		},
		titleAndSubtopicBoxCSS: {
			backgroundColor: '#F1F1F1',
			paddingTop: '2rem',
			paddingBottom: '2rem',
			paddingLeft: '4rem',
			paddingRight: '4rem',
			display: 'flex',
			flexDirection: 'column', // Equivalent to flex
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
	},
	Col_2_img_0_layout: {
		titleAndSubtopicBoxCSS: {
			backgroundColor: '#F1F1F1',
			paddingTop: '2rem',
			paddingBottom: '2rem',
			paddingLeft: '4rem',
			paddingRight: '4rem',
			display: 'flex',
			flexDirection: 'column', // Equivalent to flex
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
			display: 'flex',
			flexDirection: 'column',
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
		contentIndexTextDividerCSS: {
			// display: 'flex',
			// opacity: 0.5,
			// border: '1px solid rgba(55, 65, 81, 0.4)',
		},
		contentTextCSS: {
			display: 'flex',
			flexDirection: 'row',
			width: '100%',
			height: '100%',
			flexGrow: 1,
		},
	},
	Col_3_img_0_layout: {
		titleAndSubtopicBoxCSS: {
			backgroundColor: '#F1F1F1',
			paddingTop: '2rem',
			paddingBottom: '2rem',
			paddingLeft: '4rem',
			paddingRight: '4rem',
			display: 'flex',
			flexDirection: 'column', // Equivalent to flex
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
			display: 'flex',
			paddingLeft: '1rem',
			flexDirection: 'column',
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
		contentIndexTextDividerCSS: {
			// display: 'flex',
			// opacity: 0.5,
			// border: '1px solid rgba(55, 65, 81, 0.4)',
		},
		contentTextCSS: {
			display: 'flex',
			flexDirection: 'row',
			width: '100%',
			height: '100%',
			flexGrow: 1,
		},
	},
	Col_2_img_1_layout: {
		columnCSS: {
			width: '50%', // equivalent to w-1/2
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'flex-start',
			height: '100%',
			gap: '0.1rem',
		},
		canvaCSS: {
			width: '100%',
			height: '100%',
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'flex-start',
			alignItems: 'flex-start',
		},
		titleAndSubtopicBoxCSS: {
			backgroundColor: '#F1F1F1',
			paddingTop: '2rem',
			paddingBottom: '2rem',
			paddingLeft: '4rem',
			paddingRight: '4rem',
			display: 'flex',
			flexDirection: 'column', // Equivalent to flex
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
			display: 'flex',
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
			display: 'flex',
			flexDirection: 'column', // Equivalent to flex
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
			display: 'flex',
			flexDirection: 'column',
			gap: '0.5rem',
			gridRow: 2,
			zIndex: 20,
		},
		contentCSS: { borderLeft: '1px solid #C2C2C2', paddingLeft: '0.5rem' },
		contentTextCSS: {
			display: 'flex',
			flexDirection: 'row',
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
	},
	Col_2_img_2_layout: {
		canvaCSS: {
			padding: '28px',
		},
		columnCSS: {
			display: 'flex',
			flexDirection: 'column',
			gap: '0.5rem',
		},
		titleAndSubtopicBoxCSS: {
			display: 'flex',
			flexDirection: 'column',
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
		contentCSS: {
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
	},
	Col_3_img_3_layout: {
		canvaCSS: {
			padding: '28px',
		},
		columnCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
		titleAndSubtopicBoxCSS: {
			display: 'flex',
			flexDirection: 'column',
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
		contentCSS: {
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
	},
};
