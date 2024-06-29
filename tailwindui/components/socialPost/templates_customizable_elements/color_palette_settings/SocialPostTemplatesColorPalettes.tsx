export type SocialPostColorPaletteKeys =
	| 'default'
	| 'pure_grey'
	| 'retro_red'
	| 'gradient_unicorn'
	| 'texture_colorful_paint';
// pure/ retro / gradient / texture four categories

export type SocialPostColorPaletteConfigType = {
	fontColorConfig?: React.CSSProperties;
	canvasBackgroundConfig?: React.CSSProperties;
};

export const SocialPostColorPaletteConfig: {
	[key in SocialPostColorPaletteKeys]: SocialPostColorPaletteConfigType;
} = {
	default: {},
	pure_grey: {
		fontColorConfig: { color: 'black' },
		canvasBackgroundConfig: { background: 'red' },
	},
	retro_red: {
		fontColorConfig: { color: 'black' },
		canvasBackgroundConfig: { background: 'orange' },
	},
	gradient_unicorn: {
		fontColorConfig: { color: 'black' },
		canvasBackgroundConfig: {
			background: 'linear-gradient(to right, red, yellow)',
		},
	},
	texture_colorful_paint: {
		fontColorConfig: { color: 'black' },
		canvasBackgroundConfig: {
			background:
				'url("/images/socialpost/glassmorphismTheme/coverBg.png") no-repeat',
		},
	},
};
