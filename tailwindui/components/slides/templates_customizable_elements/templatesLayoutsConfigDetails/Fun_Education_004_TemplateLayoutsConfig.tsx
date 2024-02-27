import { LayoutElements } from '../layout_elements';
import { LayoutKeys } from '../../slideLayout';
import { TemplateKeys } from '../../slideTemplates';

export const Fun_Education_004_TemplateLayoutsConfig: {
	[key in LayoutKeys]?: LayoutElements;
} = {
	Cover_img_0_layout: {
		// canvaCSS: {
		// 	margin: 0,
		// 	padding: 0,
		// 	boxSizing: 'border-box',
		// 	width: '100%',
		// 	minHeight: '100vh', // Set minimum height to cover the entire viewport
		// },
		titleCSS: {
			backgroundColor: 'white',
			paddingBottom: '20rem',
			paddingTop: '4rem',
			paddingLeft: '2rem',
			paddingRight: '2rem',
			// height: '80%',
			width: '80%',
			zIndex: 20,
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)', // Centering trick
			maxHeight: '80%',
		},
		userNameTextDividerCSS: {
			display: 'none',
		},
		userNameCSS: {
			zIndex: 30,
			position: 'absolute',
			top: '65%',
			left: '22%',
			transform: 'translate(-50%, -50%)', // Centering trick
		},
		columnCSS: {
			paddingTop: '1rem', // Equivalent to pt-[1rem]
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
			zIndex: 30,
			position: 'absolute',
			// display: 'none',
			pointerEvents: 'none' /* Make the layer transparent to pointer events */,
		},
	},
	Cover_img_1_layout: {
		titleCSS: {
			backgroundColor: 'white',
			paddingBottom: '20rem',
			paddingTop: '4rem',
			paddingLeft: '2rem',
			paddingRight: '2rem',
			// height: '80%',
			width: '80%',
			zIndex: 20,
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)', // Centering trick
			maxHeight: '80%',
		},
		userNameCSS: {
			zIndex: 30,
			position: 'absolute',
			top: '65%',
			left: '22%',
			transform: 'translate(-50%, -50%)', // Centering trick
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
			zIndex: 30,
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
		}
	},
	Col_1_img_0_layout: {
		canvaCSS: {
			width: '100%', // Equivalent to w-full
			height: '100%', // Equivalent to h-full
			display: 'flex', // Equivalent to flex
			flexDirection: 'column', // Equivalent to flex-col
			position: 'relative', // Equivalent to
			// overflow: 'hidden',
		},
		visualElementsCSS: {
			zIndex: 20,
			width: '100%',
			position: 'absolute',
			// display: 'none',
			pointerEvents: 'none' /* Make the layer transparent to pointer events */,
			top: '21%',
		},
		titleAndSubtopicBoxCSS: {
			marginTop: '2rem',
			marginLeft: '2rem',
			marginRight: '2rem',
		},
		topicCSS: {
			zIndex: 30,
		},
		subtopicCSS: {
			zIndex: 30,
		},
		contentCSS: {
			width: '100%', // Equivalent to w-full
			zIndex: 30,
		},
		columnCSS: {
			width: 'auto',
			paddingLeft: '1rem',
			paddingTop: '1.2rem',
			paddingBottom: '1.2rem',
			marginLeft: '2rem',
			marginRight: '2rem',
			marginTop: '1rem',
			marginBottom: '1rem',
			display: 'flex',
			// zIndex: 10,
			backgroundColor: '#E4F9F6',
			borderRadius: '1.25rem',
		},
		titlesAndContentDividerCSS: {
			display: 'none',
		},
	},
	Col_2_img_0_layout: {
		visualElementsCSS: {
			zIndex: 20,
			width: '100%',
			position: 'absolute',
			// display: 'none',
			pointerEvents: 'none' /* Make the layer transparent to pointer events */,
			top: '21%',
		},
		titleAndSubtopicBoxCSS: {
			marginTop: '2rem',
			marginLeft: '2rem',
			marginRight: '2rem',
		},
		topicCSS: {
			zIndex: 30,
		},
		subtopicCSS: {
			zIndex: 30,
		},

		contentContainerCSS: {
			height: 'auto',
			width: 'auto',
			display: 'grid',
			gridTemplateColumns: 'repeat(2, 1fr)',
			gap: '2rem',
			margin: 'auto', // Center the container horizontally
			padding: '2rem 2rem', // Add left and right padding
		},
		contentCSS: {
			display: 'flex',
			flexDirection: 'column',
			gap: '0.5rem',
			width: '100%', // Equivalent to w-full
			flexGrow: 0,
			backgroundColor: '#E4F9F6',
			borderRadius: '1.25rem',
			padding: '2rem 2rem 4rem 2rem',
			// zIndex: 30,
		},
		contentIndexCSS: {
			fontFamily: 'Caveat', // font-nimbus-sans-bold
			color: '#2E2E2E', // Assuming text-neutral-900 corresponds to #374155
			fontSize: '2.5rem',
			fontWeight: 'bold',
			// fontFamily: 'Creato Display Medium',
			textTransform: 'uppercase',
			lineHeight: '2.5rem',
			letterSpacing: '0.5rem',
			paddingTop: '2rem',
			zIndex: 30,
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
			zIndex: 30,
		},
	},
	Col_3_img_0_layout: {
		canvaCSS: {
			width: '100%',
			// boxSizing: 'border-box',
		},
		visualElementsCSS: {
			zIndex: 20,
			width: '100%',
			position: 'absolute',
			// display: 'none',
			pointerEvents: 'none' /* Make the layer transparent to pointer events */,
			top: '21%',
		},
		titleAndSubtopicBoxCSS: {
			marginTop: '2rem',
			marginLeft: '2rem',
			marginRight: '2rem',
		},
		topicCSS: {
			zIndex: 30,
		},
		subtopicCSS: {
			zIndex: 30,
		},

		contentContainerCSS: {
			height: 'auto',
			width: '100%',
			display: 'grid',
			gridTemplateColumns: 'repeat(3,1fr)',
			gap: '2rem',
			margin: 'auto', // Center the container horizontally
			padding: '2rem 2rem', // Add left and right padding
		},
		contentCSS: {
			display: 'flex',
			flexDirection: 'column',
			gap: '0.5rem',
			width: '100%', // Equivalent to w-full
			// maxWidth: '200px', // Set your desired maximum width here
			flexGrow: 1,
			// flexWrap: 'wrap',
			backgroundColor: '#E4F9F6',
			borderRadius: '1.25rem',
			padding: '2rem 2rem 2rem 2rem',
			// zIndex: 30,
		},
		contentIndexCSS: {
			fontFamily: 'Caveat', // font-nimbus-sans-bold
			color: '#2E2E2E', // Assuming text-neutral-900 corresponds to #374155
			fontSize: '2.5rem',
			fontWeight: 'bold',
			// fontFamily: 'Creato Display Medium',
			textTransform: 'uppercase',
			lineHeight: '2.5rem',
			letterSpacing: '0.5rem',
			paddingTop: '2rem',
			zIndex: 30,
		},
		contentIndexTextDividerCSS: {
			display: 'none',
		},
		contentTextCSS: {
			display: 'flex',
			flexDirection: 'row',
			flexWrap: 'wrap', // Add this line to enable wrapping
			width: '100%',
			// maxWidth: '300px',
			height: '100%',
			flexGrow: 1,
			zIndex: 30,
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
			paddingTop: '2rem',
			paddingLeft: '2rem',
		},
		visualElementsCSS: {
			zIndex: 20,
			width: '100%',
			height: '100%',
			position: 'absolute',
			// display: 'none',
			pointerEvents: 'none' /* Make the layer transparent to pointer events */,
			top: '0%',
		},
		contentContainerCSS: {
			paddingTop: '2rem',
			zIndex: 30,
		},
		canvaCSS: {
			width: '100%',
			height: '100%',
			display: 'flex',
			flexDirection: 'row',
			// gap: '2rem',
			justifyContent: 'flex-start',
			alignItems: 'flex-start',
		},
		titleAndSubtopicBoxCSS: {
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
			zIndex: 30,
		},
		imageContainerCSS: {
			width: '100%',
			height: '100%',
			// borderRadius: '1.25rem',
			overflow: 'hidden',
			display: 'flex',
			alignItems: 'center',
			padding: '2rem 2rem 2rem 4rem', // top right bottom left
		},
		imageCSS: {
			borderRadius: '1.25rem', // border radius 1.25rem for image
		},
		rndContainerCSS: {
			width: '100%',
			height: '100%',
			position: 'relative',
		},
		rndCSS: {
			zIndex: '10',
		}
	},
	Col_1_img_1_layout: {
		canvaCSS: {},
		columnCSS: {
			width: '100%',
			display: 'grid',
			gridTemplateColumns: '1fr',
			paddingTop: '2rem',
			paddingLeft: '2rem',
			paddingRight: '2rem',
			paddingBottom: '2rem',
		},
		titleAndSubtopicBoxCSS: {
			display: 'flex',
			flexDirection: 'column',
			zIndex: 30,
		},
		imageContainerCSS: {
			height: '15rem',
			flexGrow: 1,
			borderRadius: '0.375rem', // Assuming a typical rounded-md value
			overflow: 'hidden',
			gridRow: 3,
		},
		imageCSS: {
			borderRadius: '1.25rem',
		},
		contentContainerCSS: {
			zIndex: 30,
			paddingTop: '0.5rem',
			paddingBottom: '0.5rem',
			height: '100%',
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
			gap: '0.5rem',
			gridRow: 2,
		},
		visualElementsCSS: {
			zIndex: 20,
			width: '100%',
			height: '100%',
			position: 'absolute',
			// display: 'none',
			pointerEvents: 'none' /* Make the layer transparent to pointer events */,
			top: '0%',
		},
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
			zIndex: '10',
		}
	},
	Col_2_img_2_layout: {
		columnCSS: {
			display: 'flex',
			flexDirection: 'column',
			gap: '0.5rem',
			padding: '2rem 2rem 2rem 2rem',
		},
		titleAndSubtopicBoxCSS: {
			zIndex: 30,
			display: 'flex',
			flexDirection: 'column',
			// justifyContent: 'center',
			// alignItems: 'center',
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
			borderRadius: '1.25rem', // equivalent to rounded-md
			overflow: 'hidden', // equivalent to overflow-hidden
			position: 'relative', // equivalent to relative
		},
		contentCSS: {
			zIndex: 30,
			width: '100%', // equivalent to w-full
			display: 'grid',
			gridTemplateColumns: 'repeat(2, 1fr)', // equivalent to grid-cols-2
			gap: '2rem', // equivalent to gap-[2rem]
			paddingTop: '1rem',
		},
		visualElementsCSS: {
			zIndex: 20,
			width: '100%',
			height: '80%',
			position: 'absolute',
			// display: 'none',
			pointerEvents: 'none' /* Make the layer transparent to pointer events */,
			top: '20%',
		},
		rndContainerCSS: {
			width: '100%',
			height: '100%',
			position: 'relative',
		},
		rndCSS: {
			zIndex: '10',
		}
	},
	Col_3_img_3_layout: {
		columnCSS: {
			display: 'flex',
			flexDirection: 'column',
			gap: '0.5rem',
			padding: '2rem 2rem 2rem 2rem',
		},
		titleAndSubtopicBoxCSS: {
			zIndex: 30,
			display: 'flex',
			flexDirection: 'column',
			// justifyContent: 'center',
			// alignItems: 'center',
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
			overflow: 'hidden', // equivalent to overflow-hidden
		},
		contentCSS: {
			zIndex: 30,
			paddingTop: '1rem',
			width: '100%', // equivalent to w-full
			display: 'grid',
			gridTemplateColumns: 'repeat(3, 1fr)', // equivalent to grid-cols-3
			gap: '2rem', // equivalent to gap-[2rem]
		},
		visualElementsCSS: {
			zIndex: 20,
			width: '100%',
			height: '80%',
			position: 'absolute',
			// display: 'none',
			pointerEvents: 'none' /* Make the layer transparent to pointer events */,
			top: '20%',
		},
		rndContainerCSS: {
			width: '100%',
			height: '100%',
			position: 'relative',
		},
		rndCSS: {
			zIndex: '10',
		}
	},
};
