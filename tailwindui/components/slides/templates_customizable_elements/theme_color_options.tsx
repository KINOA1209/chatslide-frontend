export type ThemeColorOptions = {
    color: string[]
};

export type ThemeColorConfig = {
	Fun_Education_004: ThemeColorOptions;
	Business_002: ThemeColorOptions;
};

const themeColorConfigData: ThemeColorConfig = {
    Fun_Education_004:{
        color: [
            '#2E2E2E',
            '#BCBCBC',
            '#868686'
        ]
    },
    Business_002:{
        color:[
            '#2E2E2E',
            '#6B7A2D',
            '#F0F0F2'
        ]
    }

}

export default themeColorConfigData;