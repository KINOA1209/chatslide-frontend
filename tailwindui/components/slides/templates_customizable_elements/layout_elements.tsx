// YourConfig.tsx
import { LayoutKeys } from '../slideLayout';
import { TemplateKeys } from '../slideTemplates';
import { StanfordTemplateLayoutsConfig } from './templatesLayoutsConfigDetails/StanfordTemplateLayoutsConfig';
import { Clean_Lifestyle_003_TemplateLayoutsConfig } from './templatesLayoutsConfigDetails/Clean_Lifestyle_003_TemplateLayoutsConfig';
import { Business_002_TemplateLayoutsConfig } from './templatesLayoutsConfigDetails/Business_002_TemplateLayoutsConfig';
import { Fun_Education_004_TemplateLayoutsConfig } from './templatesLayoutsConfigDetails/Fun_Education_004_TemplateLayoutsConfig';
import { Default_TemplateLayoutsConfig } from './templatesLayoutsConfigDetails/Default_TemplateLayoutsConfig';
export type LayoutElements = {
	canvaCSS?: React.CSSProperties;
	logoCSS?: React.CSSProperties;
	backgroundCSS?: React.CSSProperties;
	titleCSS?: React.CSSProperties;
	headCSS?: React.CSSProperties;
	topicCSS?: React.CSSProperties;
	subtopicCSS?: React.CSSProperties;
	contentCSS?: React.CSSProperties;
	userNameCSS?: React.CSSProperties;
	imageCSS?: React.CSSProperties;
	imageContainerCSS?: React.CSSProperties;
	columnCSS?: React.CSSProperties;
	visualElementsCSS?: React.CSSProperties; // if a certain layout of one page needs some visual elements on top.
	titleAndSubtopicBoxCSS?: React.CSSProperties;
	contentContainerCSS?: React.CSSProperties;
	contentIndexCSS?: React.CSSProperties;
	contentIndexTextDividerCSS?: React.CSSProperties;
	contentTextCSS?: React.CSSProperties;
	userNameTextDividerCSS?: React.CSSProperties;
	titlesAndContentDividerCSS?: React.CSSProperties;
};

export type TemplateLayoutsConfig = {
	[templateName in TemplateKeys]?: {
		[key in LayoutKeys]?: LayoutElements;
	};
};

const layoutConfigData: TemplateLayoutsConfig = {
	Clean_Lifestyle_003: Clean_Lifestyle_003_TemplateLayoutsConfig,
	Fun_Education_004: Fun_Education_004_TemplateLayoutsConfig,
	Business_002: Business_002_TemplateLayoutsConfig,
	Default: Default_TemplateLayoutsConfig,
	Berkeley: {
		Cover_img_0_layout: {
			canvaCSS: {
				display: 'flex',
				width: '100%',
				height: '100%',
			},
			userNameCSS: {
				zIndex: 30,
			},
			columnCSS: {
				paddingTop: '1rem', // Equivalent to pt-[1rem]
				paddingLeft: '2rem', // Equivalent to px-[2rem], for left padding
				paddingRight: '2rem', // Equivalent to px-[2rem], for right padding
				width: '100%', // Equivalent to w-full
				display: 'flex', // Equivalent to flex
				flexDirection: 'column', // Equivalent to flex-col
				justifyContent: 'flex-start', // Equivalent to justify-start
				height: '100%', // Equivalent to h-full
				gap: '2rem', // Equivalent to gap-[2rem]
			},
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
			},
		},
		Cover_img_1_layout: {
			canvaCSS: {
				display: 'flex',
				width: '100%',
				height: '100%',
			},
			userNameCSS: {
				zIndex: 30,
			},
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
				maxHeight: '80%',
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
				width: '50%', // Equivalent to w-1/2
				height: '100%', // Equivalent to h-full
				borderRadius: '0.375rem', // Equivalent to rounded-md (approximation)
				overflow: 'hidden',
			},
		},
		Col_1_img_0_layout: {
			canvaCSS: {
				width: '100%', // Equivalent to w-full
				height: '100%', // Equivalent to h-full
				display: 'flex', // Equivalent to flex
				flexDirection: 'column', // Equivalent to flex-col
				padding: '28px',
			},
			contentCSS: {
				width: '100%', // Equivalent to w-full
			},
			columnCSS: {
				width: '100%', // Equivalent to w-full
				paddingLeft: '1rem',
				paddingTop: '1.2rem',
				paddingBottom: '1.2rem',
				display: 'flex',
			},
		},
		Col_2_img_0_layout: {
			canvaCSS: { padding: '28px' },
			contentContainerCSS: {
				height: '100%',
				width: '100%',
				display: 'grid',
				gridTemplateColumns: 'repeat(2, 1fr)',
				gap: '2rem',
			},
			contentCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			contentIndexCSS: {
				mixBlendMode: 'hard-light',
				color: 'rgba(55, 65, 81, 0.25)', // Assuming text-neutral-900 corresponds to #374155
				fontSize: '2rem',
				fontWeight: 'bold',
				fontFamily: 'Creato Display Medium',
				textTransform: 'uppercase',
				lineHeight: '2.5rem',
				letterSpacing: '0.5rem',
				paddingTop: '2rem',
			},
			contentIndexTextDividerCSS: {
				display: 'flex',
				opacity: 0.5,
				border: '1px solid rgba(55, 65, 81, 0.4)',
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
			canvaCSS: { padding: '28px' },
			contentContainerCSS: {
				height: '100%',
				width: '100%',
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)',
				gap: '2rem',
			},
			contentCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			contentIndexCSS: {
				mixBlendMode: 'hard-light',
				color: 'rgba(55, 65, 81, 0.25)', // Assuming text-neutral-900 corresponds to #374155
				fontSize: '2rem',
				fontWeight: 'bold',
				fontFamily: 'Creato Display Medium',
				textTransform: 'uppercase',
				lineHeight: '2.5rem',
				letterSpacing: '0.5rem',
				paddingTop: '2rem',
			},
			contentIndexTextDividerCSS: {
				display: 'flex',
				opacity: 0.5,
				border: '1px solid rgba(55, 65, 81, 0.4)',
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
				padding: '28px',
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'row',
				gap: '2rem',
				justifyContent: 'flex-start',
				alignItems: 'flex-start',
			},
			titleAndSubtopicBoxCSS: { display: 'flex', flexDirection: 'column' },
			imageContainerCSS: {
				width: '50%', // equivalent to w-1/2
				height: '90%', // equivalent to h-[90%]
				borderRadius: '0.375rem', // equivalent to rounded-md
				overflow: 'hidden',
				display: 'flex',
				alignItems: 'center', // equivalent to items-center
			},
		},
		Col_1_img_1_layout: {
			canvaCSS: { padding: '28px' },
			columnCSS: { width: '100%', display: 'grid', gridTemplateColumns: '1fr' },
			titleAndSubtopicBoxCSS: { display: 'flex', flexDirection: 'column' },
			imageContainerCSS: {
				height: '15rem',
				flexGrow: 1,
				borderRadius: '0.375rem', // Assuming a typical rounded-md value
				overflow: 'hidden',
			},
			contentContainerCSS: {
				paddingTop: '0.5rem',
				paddingBottom: '0.5rem',
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				gap: '0.5rem',
			},
			contentCSS: {},
			contentTextCSS: {
				display: 'flex',
				flexDirection: 'row',
				width: '100%',
				height: '100%',
				flexGrow: 1,
				paddingLeft: '1rem',
			},
		},
		Col_2_img_2_layout: {
			canvaCSS: { padding: '28px' },
			columnCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			titleAndSubtopicBoxCSS: {
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
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
				overflow: 'hidden', // equivalent to overflow-hidden
				position: 'relative', // equivalent to relative
			},
			contentCSS: {
				width: '100%', // equivalent to w-full
				display: 'grid',
				gridTemplateColumns: 'repeat(2, 1fr)', // equivalent to grid-cols-2
				gap: '2rem', // equivalent to gap-[2rem]
			},
		},
		Col_3_img_3_layout: {
			canvaCSS: { padding: '28px' },
			columnCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			titleAndSubtopicBoxCSS: {
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
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
				width: '100%', // equivalent to w-full
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)', // equivalent to grid-cols-3
				gap: '2rem', // equivalent to gap-[2rem]
			},
		},
	},
	Stanford: StanfordTemplateLayoutsConfig,
	Harvard: {
		Cover_img_0_layout: {
			canvaCSS: {
				display: 'flex',
				width: '100%',
				height: '100%',
			},
			userNameCSS: {
				zIndex: 30,
			},
			columnCSS: {
				paddingTop: '1rem', // Equivalent to pt-[1rem]
				paddingLeft: '2rem', // Equivalent to px-[2rem], for left padding
				paddingRight: '2rem', // Equivalent to px-[2rem], for right padding
				width: '100%', // Equivalent to w-full
				display: 'flex', // Equivalent to flex
				flexDirection: 'column', // Equivalent to flex-col
				justifyContent: 'flex-start', // Equivalent to justify-start
				height: '100%', // Equivalent to h-full
				gap: '2rem', // Equivalent to gap-[2rem]
			},
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
			},
		},
		Cover_img_1_layout: {
			canvaCSS: {
				display: 'flex',
				width: '100%',
				height: '100%',
			},
			userNameCSS: {
				zIndex: 30,
			},
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
				maxHeight: '80%',
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
				width: '50%', // Equivalent to w-1/2
				height: '100%', // Equivalent to h-full
				borderRadius: '0.375rem', // Equivalent to rounded-md (approximation)
				overflow: 'hidden',
			},
		},
		Col_1_img_0_layout: {
			canvaCSS: {
				width: '100%', // Equivalent to w-full
				height: '100%', // Equivalent to h-full
				display: 'flex', // Equivalent to flex
				flexDirection: 'column', // Equivalent to flex-col
				padding: '28px',
			},
			contentCSS: {
				width: '100%', // Equivalent to w-full
			},
			columnCSS: {
				width: '100%', // Equivalent to w-full
				paddingLeft: '1rem',
				paddingTop: '1.2rem',
				paddingBottom: '1.2rem',
				display: 'flex',
			},
		},
		Col_2_img_0_layout: {
			canvaCSS: { padding: '28px' },
			contentContainerCSS: {
				height: '100%',
				width: '100%',
				display: 'grid',
				gridTemplateColumns: 'repeat(2, 1fr)',
				gap: '2rem',
			},
			contentCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			contentIndexCSS: {
				mixBlendMode: 'hard-light',
				color: 'rgba(55, 65, 81, 0.25)', // Assuming text-neutral-900 corresponds to #374155
				fontSize: '2rem',
				fontWeight: 'bold',
				fontFamily: 'Creato Display Medium',
				textTransform: 'uppercase',
				lineHeight: '2.5rem',
				letterSpacing: '0.5rem',
				paddingTop: '2rem',
			},
			contentIndexTextDividerCSS: {
				display: 'flex',
				opacity: 0.5,
				border: '1px solid rgba(55, 65, 81, 0.4)',
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
			canvaCSS: { padding: '28px' },
			contentContainerCSS: {
				height: '100%',
				width: '100%',
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)',
				gap: '2rem',
			},
			contentCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			contentIndexCSS: {
				mixBlendMode: 'hard-light',
				color: 'rgba(55, 65, 81, 0.25)', // Assuming text-neutral-900 corresponds to #374155
				fontSize: '2rem',
				fontWeight: 'bold',
				fontFamily: 'Creato Display Medium',
				textTransform: 'uppercase',
				lineHeight: '2.5rem',
				letterSpacing: '0.5rem',
				paddingTop: '2rem',
			},
			contentIndexTextDividerCSS: {
				display: 'flex',
				opacity: 0.5,
				border: '1px solid rgba(55, 65, 81, 0.4)',
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
				padding: '28px',
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'row',
				gap: '2rem',
				justifyContent: 'flex-start',
				alignItems: 'flex-start',
			},
			titleAndSubtopicBoxCSS: { display: 'flex', flexDirection: 'column' },
			imageContainerCSS: {
				width: '50%', // equivalent to w-1/2
				height: '90%', // equivalent to h-[90%]
				borderRadius: '0.375rem', // equivalent to rounded-md
				overflow: 'hidden',
				display: 'flex',
				alignItems: 'center', // equivalent to items-center
			},
		},
		Col_1_img_1_layout: {
			canvaCSS: { padding: '28px' },
			columnCSS: { width: '100%', display: 'grid', gridTemplateColumns: '1fr' },
			titleAndSubtopicBoxCSS: { display: 'flex', flexDirection: 'column' },
			imageContainerCSS: {
				height: '15rem',
				flexGrow: 1,
				borderRadius: '0.375rem', // Assuming a typical rounded-md value
				overflow: 'hidden',
			},
			contentContainerCSS: {
				paddingTop: '0.5rem',
				paddingBottom: '0.5rem',
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				gap: '0.5rem',
			},
			contentCSS: {},
			contentTextCSS: {
				display: 'flex',
				flexDirection: 'row',
				width: '100%',
				height: '100%',
				flexGrow: 1,
				paddingLeft: '1rem',
			},
		},
		Col_2_img_2_layout: {
			canvaCSS: { padding: '28px' },
			columnCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			titleAndSubtopicBoxCSS: {
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
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
				overflow: 'hidden', // equivalent to overflow-hidden
				position: 'relative', // equivalent to relative
			},
			contentCSS: {
				width: '100%', // equivalent to w-full
				display: 'grid',
				gridTemplateColumns: 'repeat(2, 1fr)', // equivalent to grid-cols-2
				gap: '2rem', // equivalent to gap-[2rem]
			},
		},
		Col_3_img_3_layout: {
			canvaCSS: { padding: '28px' },
			columnCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			titleAndSubtopicBoxCSS: {
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
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
				width: '100%', // equivalent to w-full
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)', // equivalent to grid-cols-3
				gap: '2rem', // equivalent to gap-[2rem]
			},
		},
	},
	MIT: {
		Cover_img_0_layout: {
			canvaCSS: {
				display: 'flex',
				width: '100%',
				height: '100%',
			},
			userNameCSS: {
				zIndex: 30,
			},
			columnCSS: {
				paddingTop: '1rem', // Equivalent to pt-[1rem]
				paddingLeft: '2rem', // Equivalent to px-[2rem], for left padding
				paddingRight: '2rem', // Equivalent to px-[2rem], for right padding
				width: '100%', // Equivalent to w-full
				display: 'flex', // Equivalent to flex
				flexDirection: 'column', // Equivalent to flex-col
				justifyContent: 'flex-start', // Equivalent to justify-start
				height: '100%', // Equivalent to h-full
				gap: '2rem', // Equivalent to gap-[2rem]
			},
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
			},
		},
		Cover_img_1_layout: {
			canvaCSS: {
				display: 'flex',
				width: '100%',
				height: '100%',
			},
			userNameCSS: {
				zIndex: 30,
			},
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
				maxHeight: '80%',
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
				width: '50%', // Equivalent to w-1/2
				height: '100%', // Equivalent to h-full
				borderRadius: '0.375rem', // Equivalent to rounded-md (approximation)
				overflow: 'hidden',
			},
		},
		Col_1_img_0_layout: {
			canvaCSS: {
				width: '100%', // Equivalent to w-full
				height: '100%', // Equivalent to h-full
				display: 'flex', // Equivalent to flex
				flexDirection: 'column', // Equivalent to flex-col
				padding: '28px',
			},
			contentCSS: {
				width: '100%', // Equivalent to w-full
			},
			columnCSS: {
				width: '100%', // Equivalent to w-full
				paddingLeft: '1rem',
				paddingTop: '1.2rem',
				paddingBottom: '1.2rem',
				display: 'flex',
			},
		},
		Col_2_img_0_layout: {
			canvaCSS: { padding: '28px' },
			contentContainerCSS: {
				height: '100%',
				width: '100%',
				display: 'grid',
				gridTemplateColumns: 'repeat(2, 1fr)',
				gap: '2rem',
			},
			contentCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			contentIndexCSS: {
				mixBlendMode: 'hard-light',
				color: 'rgba(55, 65, 81, 0.25)', // Assuming text-neutral-900 corresponds to #374155
				fontSize: '2rem',
				fontWeight: 'bold',
				fontFamily: 'Creato Display Medium',
				textTransform: 'uppercase',
				lineHeight: '2.5rem',
				letterSpacing: '0.5rem',
				paddingTop: '2rem',
			},
			contentIndexTextDividerCSS: {
				display: 'flex',
				opacity: 0.5,
				border: '1px solid rgba(55, 65, 81, 0.4)',
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
			canvaCSS: { padding: '28px' },
			contentContainerCSS: {
				height: '100%',
				width: '100%',
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)',
				gap: '2rem',
			},
			contentCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			contentIndexCSS: {
				mixBlendMode: 'hard-light',
				color: 'rgba(55, 65, 81, 0.25)', // Assuming text-neutral-900 corresponds to #374155
				fontSize: '2rem',
				fontWeight: 'bold',
				fontFamily: 'Creato Display Medium',
				textTransform: 'uppercase',
				lineHeight: '2.5rem',
				letterSpacing: '0.5rem',
				paddingTop: '2rem',
			},
			contentIndexTextDividerCSS: {
				display: 'flex',
				opacity: 0.5,
				border: '1px solid rgba(55, 65, 81, 0.4)',
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
				padding: '28px',
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'row',
				gap: '2rem',
				justifyContent: 'flex-start',
				alignItems: 'flex-start',
			},
			titleAndSubtopicBoxCSS: { display: 'flex', flexDirection: 'column' },
			imageContainerCSS: {
				width: '50%', // equivalent to w-1/2
				height: '90%', // equivalent to h-[90%]
				borderRadius: '0.375rem', // equivalent to rounded-md
				overflow: 'hidden',
				display: 'flex',
				alignItems: 'center', // equivalent to items-center
			},
		},
		Col_1_img_1_layout: {
			canvaCSS: { padding: '28px' },
			columnCSS: { width: '100%', display: 'grid', gridTemplateColumns: '1fr' },
			titleAndSubtopicBoxCSS: { display: 'flex', flexDirection: 'column' },
			imageContainerCSS: {
				height: '15rem',
				flexGrow: 1,
				borderRadius: '0.375rem', // Assuming a typical rounded-md value
				overflow: 'hidden',
			},
			contentContainerCSS: {
				paddingTop: '0.5rem',
				paddingBottom: '0.5rem',
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				gap: '0.5rem',
			},
			contentCSS: {},
			contentTextCSS: {
				display: 'flex',
				flexDirection: 'row',
				width: '100%',
				height: '100%',
				flexGrow: 1,
				paddingLeft: '1rem',
			},
		},
		Col_2_img_2_layout: {
			canvaCSS: { padding: '28px' },
			columnCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			titleAndSubtopicBoxCSS: {
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
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
				overflow: 'hidden', // equivalent to overflow-hidden
				position: 'relative', // equivalent to relative
			},
			contentCSS: {
				width: '100%', // equivalent to w-full
				display: 'grid',
				gridTemplateColumns: 'repeat(2, 1fr)', // equivalent to grid-cols-2
				gap: '2rem', // equivalent to gap-[2rem]
			},
		},
		Col_3_img_3_layout: {
			canvaCSS: { padding: '28px' },
			columnCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			titleAndSubtopicBoxCSS: {
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
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
				width: '100%', // equivalent to w-full
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)', // equivalent to grid-cols-3
				gap: '2rem', // equivalent to gap-[2rem]
			},
		},
	},
	Princeton: {
		Cover_img_0_layout: {
			canvaCSS: {
				display: 'flex',
				width: '100%',
				height: '100%',
			},
			userNameCSS: {
				zIndex: 30,
			},
			columnCSS: {
				paddingTop: '1rem', // Equivalent to pt-[1rem]
				paddingLeft: '2rem', // Equivalent to px-[2rem], for left padding
				paddingRight: '2rem', // Equivalent to px-[2rem], for right padding
				width: '100%', // Equivalent to w-full
				display: 'flex', // Equivalent to flex
				flexDirection: 'column', // Equivalent to flex-col
				justifyContent: 'flex-start', // Equivalent to justify-start
				height: '100%', // Equivalent to h-full
				gap: '2rem', // Equivalent to gap-[2rem]
			},
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
			},
		},
		Cover_img_1_layout: {
			canvaCSS: {
				display: 'flex',
				width: '100%',
				height: '100%',
			},
			userNameCSS: {
				zIndex: 30,
			},
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
				maxHeight: '80%',
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
				width: '50%', // Equivalent to w-1/2
				height: '100%', // Equivalent to h-full
				borderRadius: '0.375rem', // Equivalent to rounded-md (approximation)
				overflow: 'hidden',
			},
		},
		Col_1_img_0_layout: {
			canvaCSS: {
				width: '100%', // Equivalent to w-full
				height: '100%', // Equivalent to h-full
				display: 'flex', // Equivalent to flex
				flexDirection: 'column', // Equivalent to flex-col
				padding: '28px',
			},
			contentCSS: {
				width: '100%', // Equivalent to w-full
			},
			columnCSS: {
				width: '100%', // Equivalent to w-full
				paddingLeft: '1rem',
				paddingTop: '1.2rem',
				paddingBottom: '1.2rem',
				display: 'flex',
			},
		},
		Col_2_img_0_layout: {
			canvaCSS: { padding: '28px' },
			contentContainerCSS: {
				height: '100%',
				width: '100%',
				display: 'grid',
				gridTemplateColumns: 'repeat(2, 1fr)',
				gap: '2rem',
			},
			contentCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			contentIndexCSS: {
				mixBlendMode: 'hard-light',
				color: 'rgba(55, 65, 81, 0.25)', // Assuming text-neutral-900 corresponds to #374155
				fontSize: '2rem',
				fontWeight: 'bold',
				fontFamily: 'Creato Display Medium',
				textTransform: 'uppercase',
				lineHeight: '2.5rem',
				letterSpacing: '0.5rem',
				paddingTop: '2rem',
			},
			contentIndexTextDividerCSS: {
				display: 'flex',
				opacity: 0.5,
				border: '1px solid rgba(55, 65, 81, 0.4)',
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
			canvaCSS: { padding: '28px' },
			contentContainerCSS: {
				height: '100%',
				width: '100%',
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)',
				gap: '2rem',
			},
			contentCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			contentIndexCSS: {
				mixBlendMode: 'hard-light',
				color: 'rgba(55, 65, 81, 0.25)', // Assuming text-neutral-900 corresponds to #374155
				fontSize: '2rem',
				fontWeight: 'bold',
				fontFamily: 'Creato Display Medium',
				textTransform: 'uppercase',
				lineHeight: '2.5rem',
				letterSpacing: '0.5rem',
				paddingTop: '2rem',
			},
			contentIndexTextDividerCSS: {
				display: 'flex',
				opacity: 0.5,
				border: '1px solid rgba(55, 65, 81, 0.4)',
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
				padding: '28px',
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'row',
				gap: '2rem',
				justifyContent: 'flex-start',
				alignItems: 'flex-start',
			},
			titleAndSubtopicBoxCSS: { display: 'flex', flexDirection: 'column' },
			imageContainerCSS: {
				width: '50%', // equivalent to w-1/2
				height: '90%', // equivalent to h-[90%]
				borderRadius: '0.375rem', // equivalent to rounded-md
				overflow: 'hidden',
				display: 'flex',
				alignItems: 'center', // equivalent to items-center
			},
		},
		Col_1_img_1_layout: {
			canvaCSS: { padding: '28px' },
			columnCSS: { width: '100%', display: 'grid', gridTemplateColumns: '1fr' },
			titleAndSubtopicBoxCSS: { display: 'flex', flexDirection: 'column' },
			imageContainerCSS: {
				height: '15rem',
				flexGrow: 1,
				borderRadius: '0.375rem', // Assuming a typical rounded-md value
				overflow: 'hidden',
			},
			contentContainerCSS: {
				paddingTop: '0.5rem',
				paddingBottom: '0.5rem',
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				gap: '0.5rem',
			},
			contentCSS: {},
			contentTextCSS: {
				display: 'flex',
				flexDirection: 'row',
				width: '100%',
				height: '100%',
				flexGrow: 1,
				paddingLeft: '1rem',
			},
		},
		Col_2_img_2_layout: {
			canvaCSS: { padding: '28px' },
			columnCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			titleAndSubtopicBoxCSS: {
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
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
				overflow: 'hidden', // equivalent to overflow-hidden
				position: 'relative', // equivalent to relative
			},
			contentCSS: {
				width: '100%', // equivalent to w-full
				display: 'grid',
				gridTemplateColumns: 'repeat(2, 1fr)', // equivalent to grid-cols-2
				gap: '2rem', // equivalent to gap-[2rem]
			},
		},
		Col_3_img_3_layout: {
			canvaCSS: { padding: '28px' },
			columnCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			titleAndSubtopicBoxCSS: {
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
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
				width: '100%', // equivalent to w-full
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)', // equivalent to grid-cols-3
				gap: '2rem', // equivalent to gap-[2rem]
			},
		},
	},
	Caltech: {
		Cover_img_0_layout: {
			canvaCSS: {
				display: 'flex',
				width: '100%',
				height: '100%',
			},
			userNameCSS: {
				zIndex: 30,
			},
			columnCSS: {
				paddingTop: '1rem', // Equivalent to pt-[1rem]
				paddingLeft: '2rem', // Equivalent to px-[2rem], for left padding
				paddingRight: '2rem', // Equivalent to px-[2rem], for right padding
				width: '100%', // Equivalent to w-full
				display: 'flex', // Equivalent to flex
				flexDirection: 'column', // Equivalent to flex-col
				justifyContent: 'flex-start', // Equivalent to justify-start
				height: '100%', // Equivalent to h-full
				gap: '2rem', // Equivalent to gap-[2rem]
			},
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
			},
		},
		Cover_img_1_layout: {
			canvaCSS: {
				display: 'flex',
				width: '100%',
				height: '100%',
			},
			userNameCSS: {
				zIndex: 30,
			},
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
				maxHeight: '80%',
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
				width: '50%', // Equivalent to w-1/2
				height: '100%', // Equivalent to h-full
				borderRadius: '0.375rem', // Equivalent to rounded-md (approximation)
				overflow: 'hidden',
			},
		},
		Col_1_img_0_layout: {
			canvaCSS: {
				width: '100%', // Equivalent to w-full
				height: '100%', // Equivalent to h-full
				display: 'flex', // Equivalent to flex
				flexDirection: 'column', // Equivalent to flex-col
				padding: '28px',
			},
			contentCSS: {
				width: '100%', // Equivalent to w-full
			},
			columnCSS: {
				width: '100%', // Equivalent to w-full
				paddingLeft: '1rem',
				paddingTop: '1.2rem',
				paddingBottom: '1.2rem',
				display: 'flex',
			},
		},
		Col_2_img_0_layout: {
			canvaCSS: { padding: '28px' },
			contentContainerCSS: {
				height: '100%',
				width: '100%',
				display: 'grid',
				gridTemplateColumns: 'repeat(2, 1fr)',
				gap: '2rem',
			},
			contentCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			contentIndexCSS: {
				mixBlendMode: 'hard-light',
				color: 'rgba(55, 65, 81, 0.25)', // Assuming text-neutral-900 corresponds to #374155
				fontSize: '2rem',
				fontWeight: 'bold',
				fontFamily: 'Creato Display Medium',
				textTransform: 'uppercase',
				lineHeight: '2.5rem',
				letterSpacing: '0.5rem',
				paddingTop: '2rem',
			},
			contentIndexTextDividerCSS: {
				display: 'flex',
				opacity: 0.5,
				border: '1px solid rgba(55, 65, 81, 0.4)',
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
			canvaCSS: { padding: '28px' },
			contentContainerCSS: {
				height: '100%',
				width: '100%',
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)',
				gap: '2rem',
			},
			contentCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			contentIndexCSS: {
				mixBlendMode: 'hard-light',
				color: 'rgba(55, 65, 81, 0.25)', // Assuming text-neutral-900 corresponds to #374155
				fontSize: '2rem',
				fontWeight: 'bold',
				fontFamily: 'Creato Display Medium',
				textTransform: 'uppercase',
				lineHeight: '2.5rem',
				letterSpacing: '0.5rem',
				paddingTop: '2rem',
			},
			contentIndexTextDividerCSS: {
				display: 'flex',
				opacity: 0.5,
				border: '1px solid rgba(55, 65, 81, 0.4)',
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
				padding: '28px',
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'row',
				gap: '2rem',
				justifyContent: 'flex-start',
				alignItems: 'flex-start',
			},
			titleAndSubtopicBoxCSS: { display: 'flex', flexDirection: 'column' },
			imageContainerCSS: {
				width: '50%', // equivalent to w-1/2
				height: '90%', // equivalent to h-[90%]
				borderRadius: '0.375rem', // equivalent to rounded-md
				overflow: 'hidden',
				display: 'flex',
				alignItems: 'center', // equivalent to items-center
			},
		},
		Col_1_img_1_layout: {
			canvaCSS: { padding: '28px' },
			columnCSS: { width: '100%', display: 'grid', gridTemplateColumns: '1fr' },
			titleAndSubtopicBoxCSS: { display: 'flex', flexDirection: 'column' },
			imageContainerCSS: {
				height: '15rem',
				flexGrow: 1,
				borderRadius: '0.375rem', // Assuming a typical rounded-md value
				overflow: 'hidden',
			},
			contentContainerCSS: {
				paddingTop: '0.5rem',
				paddingBottom: '0.5rem',
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				gap: '0.5rem',
			},
			contentCSS: {},
			contentTextCSS: {
				display: 'flex',
				flexDirection: 'row',
				width: '100%',
				height: '100%',
				flexGrow: 1,
				paddingLeft: '1rem',
			},
		},
		Col_2_img_2_layout: {
			canvaCSS: { padding: '28px' },
			columnCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			titleAndSubtopicBoxCSS: {
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
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
				overflow: 'hidden', // equivalent to overflow-hidden
				position: 'relative', // equivalent to relative
			},
			contentCSS: {
				width: '100%', // equivalent to w-full
				display: 'grid',
				gridTemplateColumns: 'repeat(2, 1fr)', // equivalent to grid-cols-2
				gap: '2rem', // equivalent to gap-[2rem]
			},
		},
		Col_3_img_3_layout: {
			canvaCSS: { padding: '28px' },
			columnCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			titleAndSubtopicBoxCSS: {
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
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
				width: '100%', // equivalent to w-full
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)', // equivalent to grid-cols-3
				gap: '2rem', // equivalent to gap-[2rem]
			},
		},
	},
	Columbia: {
		Cover_img_0_layout: {
			canvaCSS: {
				display: 'flex',
				width: '100%',
				height: '100%',
			},
			userNameCSS: {
				zIndex: 30,
			},
			columnCSS: {
				paddingTop: '1rem', // Equivalent to pt-[1rem]
				paddingLeft: '2rem', // Equivalent to px-[2rem], for left padding
				paddingRight: '2rem', // Equivalent to px-[2rem], for right padding
				width: '100%', // Equivalent to w-full
				display: 'flex', // Equivalent to flex
				flexDirection: 'column', // Equivalent to flex-col
				justifyContent: 'flex-start', // Equivalent to justify-start
				height: '100%', // Equivalent to h-full
				gap: '2rem', // Equivalent to gap-[2rem]
			},
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
			},
		},
		Cover_img_1_layout: {
			canvaCSS: {
				display: 'flex',
				width: '100%',
				height: '100%',
			},
			userNameCSS: {
				zIndex: 30,
			},
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
				maxHeight: '80%',
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
				width: '50%', // Equivalent to w-1/2
				height: '100%', // Equivalent to h-full
				borderRadius: '0.375rem', // Equivalent to rounded-md (approximation)
				overflow: 'hidden',
			},
		},
		Col_1_img_0_layout: {
			canvaCSS: {
				width: '100%', // Equivalent to w-full
				height: '100%', // Equivalent to h-full
				display: 'flex', // Equivalent to flex
				flexDirection: 'column', // Equivalent to flex-col
				padding: '28px',
			},
			contentCSS: {
				width: '100%', // Equivalent to w-full
			},
			columnCSS: {
				width: '100%', // Equivalent to w-full
				paddingLeft: '1rem',
				paddingTop: '1.2rem',
				paddingBottom: '1.2rem',
				display: 'flex',
			},
		},
		Col_2_img_0_layout: {
			canvaCSS: { padding: '28px' },
			contentContainerCSS: {
				height: '100%',
				width: '100%',
				display: 'grid',
				gridTemplateColumns: 'repeat(2, 1fr)',
				gap: '2rem',
			},
			contentCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			contentIndexCSS: {
				mixBlendMode: 'hard-light',
				color: 'rgba(55, 65, 81, 0.25)', // Assuming text-neutral-900 corresponds to #374155
				fontSize: '2rem',
				fontWeight: 'bold',
				fontFamily: 'Creato Display Medium',
				textTransform: 'uppercase',
				lineHeight: '2.5rem',
				letterSpacing: '0.5rem',
				paddingTop: '2rem',
			},
			contentIndexTextDividerCSS: {
				display: 'flex',
				opacity: 0.5,
				border: '1px solid rgba(55, 65, 81, 0.4)',
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
			canvaCSS: { padding: '28px' },
			contentContainerCSS: {
				height: '100%',
				width: '100%',
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)',
				gap: '2rem',
			},
			contentCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			contentIndexCSS: {
				mixBlendMode: 'hard-light',
				color: 'rgba(55, 65, 81, 0.25)', // Assuming text-neutral-900 corresponds to #374155
				fontSize: '2rem',
				fontWeight: 'bold',
				fontFamily: 'Creato Display Medium',
				textTransform: 'uppercase',
				lineHeight: '2.5rem',
				letterSpacing: '0.5rem',
				paddingTop: '2rem',
			},
			contentIndexTextDividerCSS: {
				display: 'flex',
				opacity: 0.5,
				border: '1px solid rgba(55, 65, 81, 0.4)',
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
				padding: '28px',
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'row',
				gap: '2rem',
				justifyContent: 'flex-start',
				alignItems: 'flex-start',
			},
			titleAndSubtopicBoxCSS: { display: 'flex', flexDirection: 'column' },
			imageContainerCSS: {
				width: '50%', // equivalent to w-1/2
				height: '90%', // equivalent to h-[90%]
				borderRadius: '0.375rem', // equivalent to rounded-md
				overflow: 'hidden',
				display: 'flex',
				alignItems: 'center', // equivalent to items-center
			},
		},
		Col_1_img_1_layout: {
			canvaCSS: { padding: '28px' },
			columnCSS: { width: '100%', display: 'grid', gridTemplateColumns: '1fr' },
			titleAndSubtopicBoxCSS: { display: 'flex', flexDirection: 'column' },
			imageContainerCSS: {
				height: '15rem',
				flexGrow: 1,
				borderRadius: '0.375rem', // Assuming a typical rounded-md value
				overflow: 'hidden',
			},
			contentContainerCSS: {
				paddingTop: '0.5rem',
				paddingBottom: '0.5rem',
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				gap: '0.5rem',
			},
			contentCSS: {},
			contentTextCSS: {
				display: 'flex',
				flexDirection: 'row',
				width: '100%',
				height: '100%',
				flexGrow: 1,
				paddingLeft: '1rem',
			},
		},
		Col_2_img_2_layout: {
			canvaCSS: { padding: '28px' },
			columnCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			titleAndSubtopicBoxCSS: {
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
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
				overflow: 'hidden', // equivalent to overflow-hidden
				position: 'relative', // equivalent to relative
			},
			contentCSS: {
				width: '100%', // equivalent to w-full
				display: 'grid',
				gridTemplateColumns: 'repeat(2, 1fr)', // equivalent to grid-cols-2
				gap: '2rem', // equivalent to gap-[2rem]
			},
		},
		Col_3_img_3_layout: {
			canvaCSS: { padding: '28px' },
			columnCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			titleAndSubtopicBoxCSS: {
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
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
				width: '100%', // equivalent to w-full
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)', // equivalent to grid-cols-3
				gap: '2rem', // equivalent to gap-[2rem]
			},
		},
	},
	JHU: {
		Cover_img_0_layout: {
			canvaCSS: {
				display: 'flex',
				width: '100%',
				height: '100%',
			},
			userNameCSS: {
				zIndex: 30,
			},
			columnCSS: {
				paddingTop: '1rem', // Equivalent to pt-[1rem]
				paddingLeft: '2rem', // Equivalent to px-[2rem], for left padding
				paddingRight: '2rem', // Equivalent to px-[2rem], for right padding
				width: '100%', // Equivalent to w-full
				display: 'flex', // Equivalent to flex
				flexDirection: 'column', // Equivalent to flex-col
				justifyContent: 'flex-start', // Equivalent to justify-start
				height: '100%', // Equivalent to h-full
				gap: '2rem', // Equivalent to gap-[2rem]
			},
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
			},
		},
		Cover_img_1_layout: {
			canvaCSS: {
				display: 'flex',
				width: '100%',
				height: '100%',
			},
			userNameCSS: {
				zIndex: 30,
			},
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
				maxHeight: '80%',
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
				width: '50%', // Equivalent to w-1/2
				height: '100%', // Equivalent to h-full
				borderRadius: '0.375rem', // Equivalent to rounded-md (approximation)
				overflow: 'hidden',
			},
		},
		Col_1_img_0_layout: {
			canvaCSS: {
				width: '100%', // Equivalent to w-full
				height: '100%', // Equivalent to h-full
				display: 'flex', // Equivalent to flex
				flexDirection: 'column', // Equivalent to flex-col
				padding: '28px',
			},
			contentCSS: {
				width: '100%', // Equivalent to w-full
			},
			columnCSS: {
				width: '100%', // Equivalent to w-full
				paddingLeft: '1rem',
				paddingTop: '1.2rem',
				paddingBottom: '1.2rem',
				display: 'flex',
			},
		},
		Col_2_img_0_layout: {
			canvaCSS: { padding: '28px' },
			contentContainerCSS: {
				height: '100%',
				width: '100%',
				display: 'grid',
				gridTemplateColumns: 'repeat(2, 1fr)',
				gap: '2rem',
			},
			contentCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			contentIndexCSS: {
				mixBlendMode: 'hard-light',
				color: 'rgba(55, 65, 81, 0.25)', // Assuming text-neutral-900 corresponds to #374155
				fontSize: '2rem',
				fontWeight: 'bold',
				fontFamily: 'Creato Display Medium',
				textTransform: 'uppercase',
				lineHeight: '2.5rem',
				letterSpacing: '0.5rem',
				paddingTop: '2rem',
			},
			contentIndexTextDividerCSS: {
				display: 'flex',
				opacity: 0.5,
				border: '1px solid rgba(55, 65, 81, 0.4)',
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
			canvaCSS: { padding: '28px' },
			contentContainerCSS: {
				height: '100%',
				width: '100%',
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)',
				gap: '2rem',
			},
			contentCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			contentIndexCSS: {
				mixBlendMode: 'hard-light',
				color: 'rgba(55, 65, 81, 0.25)', // Assuming text-neutral-900 corresponds to #374155
				fontSize: '2rem',
				fontWeight: 'bold',
				fontFamily: 'Creato Display Medium',
				textTransform: 'uppercase',
				lineHeight: '2.5rem',
				letterSpacing: '0.5rem',
				paddingTop: '2rem',
			},
			contentIndexTextDividerCSS: {
				display: 'flex',
				opacity: 0.5,
				border: '1px solid rgba(55, 65, 81, 0.4)',
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
				padding: '28px',
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'row',
				gap: '2rem',
				justifyContent: 'flex-start',
				alignItems: 'flex-start',
			},
			titleAndSubtopicBoxCSS: { display: 'flex', flexDirection: 'column' },
			imageContainerCSS: {
				width: '50%', // equivalent to w-1/2
				height: '90%', // equivalent to h-[90%]
				borderRadius: '0.375rem', // equivalent to rounded-md
				overflow: 'hidden',
				display: 'flex',
				alignItems: 'center', // equivalent to items-center
			},
		},
		Col_1_img_1_layout: {
			canvaCSS: { padding: '28px' },
			columnCSS: { width: '100%', display: 'grid', gridTemplateColumns: '1fr' },
			titleAndSubtopicBoxCSS: { display: 'flex', flexDirection: 'column' },
			imageContainerCSS: {
				height: '15rem',
				flexGrow: 1,
				borderRadius: '0.375rem', // Assuming a typical rounded-md value
				overflow: 'hidden',
			},
			contentContainerCSS: {
				paddingTop: '0.5rem',
				paddingBottom: '0.5rem',
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				gap: '0.5rem',
			},
			contentCSS: {},
			contentTextCSS: {
				display: 'flex',
				flexDirection: 'row',
				width: '100%',
				height: '100%',
				flexGrow: 1,
				paddingLeft: '1rem',
			},
		},
		Col_2_img_2_layout: {
			canvaCSS: { padding: '28px' },
			columnCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			titleAndSubtopicBoxCSS: {
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
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
				overflow: 'hidden', // equivalent to overflow-hidden
				position: 'relative', // equivalent to relative
			},
			contentCSS: {
				width: '100%', // equivalent to w-full
				display: 'grid',
				gridTemplateColumns: 'repeat(2, 1fr)', // equivalent to grid-cols-2
				gap: '2rem', // equivalent to gap-[2rem]
			},
		},
		Col_3_img_3_layout: {
			canvaCSS: { padding: '28px' },
			columnCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			titleAndSubtopicBoxCSS: {
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
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
				width: '100%', // equivalent to w-full
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)', // equivalent to grid-cols-3
				gap: '2rem', // equivalent to gap-[2rem]
			},
		},
	},
	UChicago: {
		Cover_img_0_layout: {
			canvaCSS: {
				display: 'flex',
				width: '100%',
				height: '100%',
			},
			userNameCSS: {
				zIndex: 30,
			},
			columnCSS: {
				paddingTop: '1rem', // Equivalent to pt-[1rem]
				paddingLeft: '2rem', // Equivalent to px-[2rem], for left padding
				paddingRight: '2rem', // Equivalent to px-[2rem], for right padding
				width: '100%', // Equivalent to w-full
				display: 'flex', // Equivalent to flex
				flexDirection: 'column', // Equivalent to flex-col
				justifyContent: 'flex-start', // Equivalent to justify-start
				height: '100%', // Equivalent to h-full
				gap: '2rem', // Equivalent to gap-[2rem]
			},
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
			},
		},
		Cover_img_1_layout: {
			canvaCSS: {
				display: 'flex',
				width: '100%',
				height: '100%',
			},
			userNameCSS: {
				zIndex: 30,
			},
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
				maxHeight: '80%',
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
				width: '50%', // Equivalent to w-1/2
				height: '100%', // Equivalent to h-full
				borderRadius: '0.375rem', // Equivalent to rounded-md (approximation)
				overflow: 'hidden',
			},
		},
		Col_1_img_0_layout: {
			canvaCSS: {
				width: '100%', // Equivalent to w-full
				height: '100%', // Equivalent to h-full
				display: 'flex', // Equivalent to flex
				flexDirection: 'column', // Equivalent to flex-col
				padding: '28px',
			},
			contentCSS: {
				width: '100%', // Equivalent to w-full
			},
			columnCSS: {
				width: '100%', // Equivalent to w-full
				paddingLeft: '1rem',
				paddingTop: '1.2rem',
				paddingBottom: '1.2rem',
				display: 'flex',
			},
		},
		Col_2_img_0_layout: {
			canvaCSS: { padding: '28px' },
			contentContainerCSS: {
				height: '100%',
				width: '100%',
				display: 'grid',
				gridTemplateColumns: 'repeat(2, 1fr)',
				gap: '2rem',
			},
			contentCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			contentIndexCSS: {
				mixBlendMode: 'hard-light',
				color: 'rgba(55, 65, 81, 0.25)', // Assuming text-neutral-900 corresponds to #374155
				fontSize: '2rem',
				fontWeight: 'bold',
				fontFamily: 'Creato Display Medium',
				textTransform: 'uppercase',
				lineHeight: '2.5rem',
				letterSpacing: '0.5rem',
				paddingTop: '2rem',
			},
			contentIndexTextDividerCSS: {
				display: 'flex',
				opacity: 0.5,
				border: '1px solid rgba(55, 65, 81, 0.4)',
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
			canvaCSS: { padding: '28px' },
			contentContainerCSS: {
				height: '100%',
				width: '100%',
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)',
				gap: '2rem',
			},
			contentCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			contentIndexCSS: {
				mixBlendMode: 'hard-light',
				color: 'rgba(55, 65, 81, 0.25)', // Assuming text-neutral-900 corresponds to #374155
				fontSize: '2rem',
				fontWeight: 'bold',
				fontFamily: 'Creato Display Medium',
				textTransform: 'uppercase',
				lineHeight: '2.5rem',
				letterSpacing: '0.5rem',
				paddingTop: '2rem',
			},
			contentIndexTextDividerCSS: {
				display: 'flex',
				opacity: 0.5,
				border: '1px solid rgba(55, 65, 81, 0.4)',
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
				padding: '28px',
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'row',
				gap: '2rem',
				justifyContent: 'flex-start',
				alignItems: 'flex-start',
			},
			titleAndSubtopicBoxCSS: { display: 'flex', flexDirection: 'column' },
			imageContainerCSS: {
				width: '50%', // equivalent to w-1/2
				height: '90%', // equivalent to h-[90%]
				borderRadius: '0.375rem', // equivalent to rounded-md
				overflow: 'hidden',
				display: 'flex',
				alignItems: 'center', // equivalent to items-center
			},
		},
		Col_1_img_1_layout: {
			canvaCSS: { padding: '28px' },
			columnCSS: { width: '100%', display: 'grid', gridTemplateColumns: '1fr' },
			titleAndSubtopicBoxCSS: { display: 'flex', flexDirection: 'column' },
			imageContainerCSS: {
				height: '15rem',
				flexGrow: 1,
				borderRadius: '0.375rem', // Assuming a typical rounded-md value
				overflow: 'hidden',
			},
			contentContainerCSS: {
				paddingTop: '0.5rem',
				paddingBottom: '0.5rem',
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				gap: '0.5rem',
			},
			contentCSS: {},
			contentTextCSS: {
				display: 'flex',
				flexDirection: 'row',
				width: '100%',
				height: '100%',
				flexGrow: 1,
				paddingLeft: '1rem',
			},
		},
		Col_2_img_2_layout: {
			canvaCSS: { padding: '28px' },
			columnCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			titleAndSubtopicBoxCSS: {
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
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
				overflow: 'hidden', // equivalent to overflow-hidden
				position: 'relative', // equivalent to relative
			},
			contentCSS: {
				width: '100%', // equivalent to w-full
				display: 'grid',
				gridTemplateColumns: 'repeat(2, 1fr)', // equivalent to grid-cols-2
				gap: '2rem', // equivalent to gap-[2rem]
			},
		},
		Col_3_img_3_layout: {
			canvaCSS: { padding: '28px' },
			columnCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			titleAndSubtopicBoxCSS: {
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
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
				width: '100%', // equivalent to w-full
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)', // equivalent to grid-cols-3
				gap: '2rem', // equivalent to gap-[2rem]
			},
		},
	},
	Yale: {
		Cover_img_0_layout: {
			canvaCSS: {
				display: 'flex',
				width: '100%',
				height: '100%',
			},
			userNameCSS: {
				zIndex: 30,
			},
			columnCSS: {
				paddingTop: '1rem', // Equivalent to pt-[1rem]
				paddingLeft: '2rem', // Equivalent to px-[2rem], for left padding
				paddingRight: '2rem', // Equivalent to px-[2rem], for right padding
				width: '100%', // Equivalent to w-full
				display: 'flex', // Equivalent to flex
				flexDirection: 'column', // Equivalent to flex-col
				justifyContent: 'flex-start', // Equivalent to justify-start
				height: '100%', // Equivalent to h-full
				gap: '2rem', // Equivalent to gap-[2rem]
			},
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
			},
		},
		Cover_img_1_layout: {
			canvaCSS: {
				display: 'flex',
				width: '100%',
				height: '100%',
			},
			userNameCSS: {
				zIndex: 30,
			},
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
				maxHeight: '80%',
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
				width: '50%', // Equivalent to w-1/2
				height: '100%', // Equivalent to h-full
				borderRadius: '0.375rem', // Equivalent to rounded-md (approximation)
				overflow: 'hidden',
			},
		},
		Col_1_img_0_layout: {
			canvaCSS: {
				width: '100%', // Equivalent to w-full
				height: '100%', // Equivalent to h-full
				display: 'flex', // Equivalent to flex
				flexDirection: 'column', // Equivalent to flex-col
				padding: '28px',
			},
			contentCSS: {
				width: '100%', // Equivalent to w-full
			},
			columnCSS: {
				width: '100%', // Equivalent to w-full
				paddingLeft: '1rem',
				paddingTop: '1.2rem',
				paddingBottom: '1.2rem',
				display: 'flex',
			},
		},
		Col_2_img_0_layout: {
			canvaCSS: { padding: '28px' },
			contentContainerCSS: {
				height: '100%',
				width: '100%',
				display: 'grid',
				gridTemplateColumns: 'repeat(2, 1fr)',
				gap: '2rem',
			},
			contentCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			contentIndexCSS: {
				mixBlendMode: 'hard-light',
				color: 'rgba(55, 65, 81, 0.25)', // Assuming text-neutral-900 corresponds to #374155
				fontSize: '2rem',
				fontWeight: 'bold',
				fontFamily: 'Creato Display Medium',
				textTransform: 'uppercase',
				lineHeight: '2.5rem',
				letterSpacing: '0.5rem',
				paddingTop: '2rem',
			},
			contentIndexTextDividerCSS: {
				display: 'flex',
				opacity: 0.5,
				border: '1px solid rgba(55, 65, 81, 0.4)',
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
			canvaCSS: { padding: '28px' },
			contentContainerCSS: {
				height: '100%',
				width: '100%',
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)',
				gap: '2rem',
			},
			contentCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			contentIndexCSS: {
				mixBlendMode: 'hard-light',
				color: 'rgba(55, 65, 81, 0.25)', // Assuming text-neutral-900 corresponds to #374155
				fontSize: '2rem',
				fontWeight: 'bold',
				fontFamily: 'Creato Display Medium',
				textTransform: 'uppercase',
				lineHeight: '2.5rem',
				letterSpacing: '0.5rem',
				paddingTop: '2rem',
			},
			contentIndexTextDividerCSS: {
				display: 'flex',
				opacity: 0.5,
				border: '1px solid rgba(55, 65, 81, 0.4)',
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
				padding: '28px',
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'row',
				gap: '2rem',
				justifyContent: 'flex-start',
				alignItems: 'flex-start',
			},
			titleAndSubtopicBoxCSS: { display: 'flex', flexDirection: 'column' },
			imageContainerCSS: {
				width: '50%', // equivalent to w-1/2
				height: '90%', // equivalent to h-[90%]
				borderRadius: '0.375rem', // equivalent to rounded-md
				overflow: 'hidden',
				display: 'flex',
				alignItems: 'center', // equivalent to items-center
			},
		},
		Col_1_img_1_layout: {
			canvaCSS: { padding: '28px' },
			columnCSS: { width: '100%', display: 'grid', gridTemplateColumns: '1fr' },
			titleAndSubtopicBoxCSS: { display: 'flex', flexDirection: 'column' },
			imageContainerCSS: {
				height: '15rem',
				flexGrow: 1,
				borderRadius: '0.375rem', // Assuming a typical rounded-md value
				overflow: 'hidden',
			},
			contentContainerCSS: {
				paddingTop: '0.5rem',
				paddingBottom: '0.5rem',
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				gap: '0.5rem',
			},
			contentCSS: {},
			contentTextCSS: {
				display: 'flex',
				flexDirection: 'row',
				width: '100%',
				height: '100%',
				flexGrow: 1,
				paddingLeft: '1rem',
			},
		},
		Col_2_img_2_layout: {
			canvaCSS: { padding: '28px' },
			columnCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			titleAndSubtopicBoxCSS: {
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
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
				overflow: 'hidden', // equivalent to overflow-hidden
				position: 'relative', // equivalent to relative
			},
			contentCSS: {
				width: '100%', // equivalent to w-full
				display: 'grid',
				gridTemplateColumns: 'repeat(2, 1fr)', // equivalent to grid-cols-2
				gap: '2rem', // equivalent to gap-[2rem]
			},
		},
		Col_3_img_3_layout: {
			canvaCSS: { padding: '28px' },
			columnCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			titleAndSubtopicBoxCSS: {
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
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
				width: '100%', // equivalent to w-full
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)', // equivalent to grid-cols-3
				gap: '2rem', // equivalent to gap-[2rem]
			},
		},
	},
	UPenn: {
		Cover_img_0_layout: {
			canvaCSS: {
				display: 'flex',
				width: '100%',
				height: '100%',
			},
			userNameCSS: {
				zIndex: 30,
			},
			columnCSS: {
				paddingTop: '1rem', // Equivalent to pt-[1rem]
				paddingLeft: '2rem', // Equivalent to px-[2rem], for left padding
				paddingRight: '2rem', // Equivalent to px-[2rem], for right padding
				width: '100%', // Equivalent to w-full
				display: 'flex', // Equivalent to flex
				flexDirection: 'column', // Equivalent to flex-col
				justifyContent: 'flex-start', // Equivalent to justify-start
				height: '100%', // Equivalent to h-full
				gap: '2rem', // Equivalent to gap-[2rem]
			},
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
			},
		},
		Cover_img_1_layout: {
			canvaCSS: {
				display: 'flex',
				width: '100%',
				height: '100%',
			},
			userNameCSS: {
				zIndex: 30,
			},
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
				maxHeight: '80%',
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
				width: '50%', // Equivalent to w-1/2
				height: '100%', // Equivalent to h-full
				borderRadius: '0.375rem', // Equivalent to rounded-md (approximation)
				overflow: 'hidden',
			},
		},
		Col_1_img_0_layout: {
			canvaCSS: {
				width: '100%', // Equivalent to w-full
				height: '100%', // Equivalent to h-full
				display: 'flex', // Equivalent to flex
				flexDirection: 'column', // Equivalent to flex-col
				padding: '28px',
			},
			contentCSS: {
				width: '100%', // Equivalent to w-full
			},
			columnCSS: {
				width: '100%', // Equivalent to w-full
				paddingLeft: '1rem',
				paddingTop: '1.2rem',
				paddingBottom: '1.2rem',
				display: 'flex',
			},
		},
		Col_2_img_0_layout: {
			canvaCSS: { padding: '28px' },
			contentContainerCSS: {
				height: '100%',
				width: '100%',
				display: 'grid',
				gridTemplateColumns: 'repeat(2, 1fr)',
				gap: '2rem',
			},
			contentCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			contentIndexCSS: {
				mixBlendMode: 'hard-light',
				color: 'rgba(55, 65, 81, 0.25)', // Assuming text-neutral-900 corresponds to #374155
				fontSize: '2rem',
				fontWeight: 'bold',
				fontFamily: 'Creato Display Medium',
				textTransform: 'uppercase',
				lineHeight: '2.5rem',
				letterSpacing: '0.5rem',
				paddingTop: '2rem',
			},
			contentIndexTextDividerCSS: {
				display: 'flex',
				opacity: 0.5,
				border: '1px solid rgba(55, 65, 81, 0.4)',
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
			canvaCSS: { padding: '28px' },
			contentContainerCSS: {
				height: '100%',
				width: '100%',
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)',
				gap: '2rem',
			},
			contentCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			contentIndexCSS: {
				mixBlendMode: 'hard-light',
				color: 'rgba(55, 65, 81, 0.25)', // Assuming text-neutral-900 corresponds to #374155
				fontSize: '2rem',
				fontWeight: 'bold',
				fontFamily: 'Creato Display Medium',
				textTransform: 'uppercase',
				lineHeight: '2.5rem',
				letterSpacing: '0.5rem',
				paddingTop: '2rem',
			},
			contentIndexTextDividerCSS: {
				display: 'flex',
				opacity: 0.5,
				border: '1px solid rgba(55, 65, 81, 0.4)',
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
				padding: '28px',
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'row',
				gap: '2rem',
				justifyContent: 'flex-start',
				alignItems: 'flex-start',
			},
			titleAndSubtopicBoxCSS: { display: 'flex', flexDirection: 'column' },
			imageContainerCSS: {
				width: '50%', // equivalent to w-1/2
				height: '90%', // equivalent to h-[90%]
				borderRadius: '0.375rem', // equivalent to rounded-md
				overflow: 'hidden',
				display: 'flex',
				alignItems: 'center', // equivalent to items-center
			},
		},
		Col_1_img_1_layout: {
			canvaCSS: { padding: '28px' },
			columnCSS: { width: '100%', display: 'grid', gridTemplateColumns: '1fr' },
			titleAndSubtopicBoxCSS: { display: 'flex', flexDirection: 'column' },
			imageContainerCSS: {
				height: '15rem',
				flexGrow: 1,
				borderRadius: '0.375rem', // Assuming a typical rounded-md value
				overflow: 'hidden',
			},
			contentContainerCSS: {
				paddingTop: '0.5rem',
				paddingBottom: '0.5rem',
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				gap: '0.5rem',
			},
			contentCSS: {},
			contentTextCSS: {
				display: 'flex',
				flexDirection: 'row',
				width: '100%',
				height: '100%',
				flexGrow: 1,
				paddingLeft: '1rem',
			},
		},
		Col_2_img_2_layout: {
			canvaCSS: { padding: '28px' },
			columnCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			titleAndSubtopicBoxCSS: {
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
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
				overflow: 'hidden', // equivalent to overflow-hidden
				position: 'relative', // equivalent to relative
			},
			contentCSS: {
				width: '100%', // equivalent to w-full
				display: 'grid',
				gridTemplateColumns: 'repeat(2, 1fr)', // equivalent to grid-cols-2
				gap: '2rem', // equivalent to gap-[2rem]
			},
		},
		Col_3_img_3_layout: {
			canvaCSS: { padding: '28px' },
			columnCSS: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
			titleAndSubtopicBoxCSS: {
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
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
				width: '100%', // equivalent to w-full
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)', // equivalent to grid-cols-3
				gap: '2rem', // equivalent to gap-[2rem]
			},
		},
	},
};

export default layoutConfigData;
