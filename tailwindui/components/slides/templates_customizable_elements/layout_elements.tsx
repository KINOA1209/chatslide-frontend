// YourConfig.tsx
import { LayoutKeys } from '../slideLayout';
import { TemplateKeys } from '../slideTemplates';
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
};

export type TemplateLayoutConfig = {
	[templateName in TemplateKeys]?: {
		[key in LayoutKeys]?: LayoutElements;
	};
};

const layoutConfigData: TemplateLayoutConfig = {
	Default: {
		Cover_img_0_layout: {
			canvaCSS: {
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
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
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
		Col_2_img_0_layout: {}, // TODO @guangyao
		Col_3_img_0_layout: {},
		Col_2_img_1_layout: {},
		Col_1_img_1_layout: {},
		Col_2_img_2_layout: {},
		Col_3_img_3_layout: {},
	},
	Berkeley: {
		Cover_img_0_layout: {
			canvaCSS: {
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
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
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
		Col_2_img_0_layout: {}, // TODO @guangyao
		Col_3_img_0_layout: {},
		Col_2_img_1_layout: {},
		Col_1_img_1_layout: {},
		Col_2_img_2_layout: {},
		Col_3_img_3_layout: {},
	},
	Stanford: {
		Cover_img_0_layout: {
			canvaCSS: {
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
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
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
		Col_2_img_0_layout: {}, // TODO @guangyao
		Col_3_img_0_layout: {},
		Col_2_img_1_layout: {},
		Col_1_img_1_layout: {},
		Col_2_img_2_layout: {},
		Col_3_img_3_layout: {},
	},
	Harvard: {
		Cover_img_0_layout: {
			canvaCSS: {
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
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
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
		Col_2_img_0_layout: {}, // TODO @guangyao
		Col_3_img_0_layout: {},
		Col_2_img_1_layout: {},
		Col_1_img_1_layout: {},
		Col_2_img_2_layout: {},
		Col_3_img_3_layout: {},
	},
	MIT: {
		Cover_img_0_layout: {
			canvaCSS: {
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
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
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
		Col_2_img_0_layout: {}, // TODO @guangyao
		Col_3_img_0_layout: {},
		Col_2_img_1_layout: {},
		Col_1_img_1_layout: {},
		Col_2_img_2_layout: {},
		Col_3_img_3_layout: {},
	},
	Princeton: {
		Cover_img_0_layout: {
			canvaCSS: {
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
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
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
		Col_2_img_0_layout: {}, // TODO @guangyao
		Col_3_img_0_layout: {},
		Col_2_img_1_layout: {},
		Col_1_img_1_layout: {},
		Col_2_img_2_layout: {},
		Col_3_img_3_layout: {},
	},
	Caltech: {
		Cover_img_0_layout: {
			canvaCSS: {
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
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
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
		Col_2_img_0_layout: {}, // TODO @guangyao
		Col_3_img_0_layout: {},
		Col_2_img_1_layout: {},
		Col_1_img_1_layout: {},
		Col_2_img_2_layout: {},
		Col_3_img_3_layout: {},
	},
	Columbia: {
		Cover_img_0_layout: {
			canvaCSS: {
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
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
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
		Col_2_img_0_layout: {}, // TODO @guangyao
		Col_3_img_0_layout: {},
		Col_2_img_1_layout: {},
		Col_1_img_1_layout: {},
		Col_2_img_2_layout: {},
		Col_3_img_3_layout: {},
	},
	JHU: {
		Cover_img_0_layout: {
			canvaCSS: {
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
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
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
		Col_2_img_0_layout: {}, // TODO @guangyao
		Col_3_img_0_layout: {},
		Col_2_img_1_layout: {},
		Col_1_img_1_layout: {},
		Col_2_img_2_layout: {},
		Col_3_img_3_layout: {},
	},
	UChicago: {
		Cover_img_0_layout: {
			canvaCSS: {
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
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
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
		Col_2_img_0_layout: {}, // TODO @guangyao
		Col_3_img_0_layout: {},
		Col_2_img_1_layout: {},
		Col_1_img_1_layout: {},
		Col_2_img_2_layout: {},
		Col_3_img_3_layout: {},
	},
	Yale: {
		Cover_img_0_layout: {
			canvaCSS: {
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
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
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
		Col_2_img_0_layout: {}, // TODO @guangyao
		Col_3_img_0_layout: {},
		Col_2_img_1_layout: {},
		Col_1_img_1_layout: {},
		Col_2_img_2_layout: {},
		Col_3_img_3_layout: {},
	},
	UPenn: {
		Cover_img_0_layout: {
			canvaCSS: {
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
			titleCSS: {
				paddingLeft: '2rem',
				zIndex: 20,
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
		Col_2_img_0_layout: {}, // TODO @guangyao
		Col_3_img_0_layout: {},
		Col_2_img_1_layout: {},
		Col_1_img_1_layout: {},
		Col_2_img_2_layout: {},
		Col_3_img_3_layout: {},
	},
};

export default layoutConfigData;
