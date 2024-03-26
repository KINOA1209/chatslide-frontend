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
			// backgroundColor: '#F1F1F1',
			padding: '130px 80px 0px 80px',
			width: '100%',
			height: '70%',
			zIndex: 20,
			position: 'absolute',
			top: '0%',
			left: '0%',
			// transform: 'translate(-50%, -50%)', // Centering trick
		},
		userNameTextDividerCSS: {
			display: 'none',
		},
		userNameCSS: {
			position: 'absolute',
			top: '400px',
			left: '0%',
			width: '80%',
			paddingLeft: '80px',
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
	},
	Cover_img_1_layout: {
		canvaCSS: {
			display: 'flex',
			width: '100%',
			height: '100%',
			position: 'relative',
		},
		userNameCSS: {
			position: 'absolute',
			top: '400px',
			left: '0%',
			width: '50%',
			paddingLeft: '80px',
		},
		titleCSS: {
			padding: '130px 0px 0px 80px',
			maxHeight: '80%',
			width: '50%',
			height: '70%',
			position: 'absolute',
			top: '0%',
			left: '0%',
		},
		columnCSS: {
			paddingTop: '4rem', // Equivalent to pt-[1rem]
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
			width: '50%', // Equivalent to w-1/2
			height: '100%', // Equivalent to h-full
			borderRadius: '48px', // Equivalent to rounded-md (approximation)
			//overflow: 'hidden',
			display: 'flex',
			alignItems: 'center',
			zIndex: 20,
			padding: '30px 30px 30px 30px', // top right bottom left
			// position: 'absolute',
			// top: '0px',
			// left: '0px',
		},
		imageCSS: {
			borderRadius: '48px', // border radius 1.25rem for image
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
			paddingLeft: '50px',
			paddingRight: '50px',
			paddingTop: '0px',
			paddingBottom: '0px',
		},
		columnCSS: {
			width: '100%', // Equivalent to w-full
			display: 'flex',
		},
		titleAndSubtopicBoxCSS: {
			// backgroundColor: '#F1F1F1',
			paddingTop: '50px',
			paddingBottom: '50px',
			paddingLeft: '50px',
			paddingRight: '50px',
			display: 'flex',
			flexDirection: 'column', // Equivalent to flex
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
	},
	Col_2_img_0_layout: {
		titleAndSubtopicBoxCSS: {
			paddingTop: '50px',
			paddingBottom: '50px',
			paddingLeft: '50px',
			paddingRight: '50px',
			display: 'flex',
			flexDirection: 'column', // Equivalent to flex
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
			gridTemplateColumns: 'repeat(2, 1fr)',
			gap: '50px',
			paddingLeft: '50px',
			paddingRight: '50px',
			paddingTop: '0px',
			paddingBottom: '0px',
		},
		contentCSS: {
			display: 'flex',
			flexDirection: 'column',
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
			display: 'flex',
			flexDirection: 'row',
			width: '100%',
			height: '100%',
			flexGrow: 1,
		},
	},
	Col_3_img_0_layout: {
		titleAndSubtopicBoxCSS: {
			paddingTop: '50px',
			paddingBottom: '50px',
			paddingLeft: '50px',
			paddingRight: '50px',
			display: 'flex',
			flexDirection: 'column', // Equivalent to flex
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
			gridTemplateColumns: 'repeat(3, 1fr)',
			gap: '50px',
			paddingLeft: '50px',
			paddingRight: '50px',
			paddingTop: '0px',
			paddingBottom: '0px',
		},
		contentCSS: {
			display: 'flex',
			flexDirection: 'column',
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
