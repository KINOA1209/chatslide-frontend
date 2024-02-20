export type ThemeColorOptions = {
	color: string[];
};

export type ThemeColorConfig = {
	Fun_Education_004: ThemeColorOptions;
	Business_002: ThemeColorOptions;
	Clean_Lifestyle_003: ThemeColorOptions;
	Fun_Education_001: ThemeColorOptions;
};

const themeColorConfigData: ThemeColorConfig = {
	Fun_Education_004: {
		color: ['#2E2E2E', '#BCBCBC', '#868686'],
	},
	Business_002: {
		color: ['#2E2E2E', '#6B7A2D', '#F0F0F2'],
	},
	Clean_Lifestyle_003: {
		color: ['#000000', '#666666', '#A9A9A9'],
	},
	Fun_Education_001: {
		color: ['#013E3F', '#B2B2B2', '#3C3C3C', '#A3A3A3'],
	},
};

export default themeColorConfigData;
