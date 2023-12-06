// YourConfig.tsx

export type TemplateElements = {
    backgroundColorCover: string;
    backgroundColor: string;
    titleFont: string;
    titleFontColor: string;
    subtopicFont: string;
    subtopicFontColor: string;
    contentFont: string;
    contentFontColor: string;
    userNameFont: string;
    userNameFontColor: string;
    headFont: string;
    headFontColor: string;
};

type Config = {
    Stanford: TemplateElements;
    Default: TemplateElements;
};

const configData: Config = {
    Stanford: {
        backgroundColorCover: 'bg-[#8C1515]',
        backgroundColor: 'bg-[#F0E9E9]',
        titleFont:
            'text-3xl font-nimbus-sans-bold font-bold leading-[110%] whitespace-nowrap',
        titleFontColor: 'text-[#8C1515]',
        subtopicFont:
            'opacity-70 text-opacity-40 text-xl font-normal leading-[150%]',
        subtopicFontColor: 'text-red-800',
        contentFont: 'text-base font-normal leading-9 ',
        contentFontColor: 'text-zinc-800',
        userNameFont: 'text-sm font-normal leading-[120%]',
        userNameFontColor: 'text-white',
        headFont: 'text-4xl font-bold leading-[120%]',
        headFontColor: 'text-white',
    },
    Default: {
        backgroundColorCover: 'bg-[#F0F0F2]',
        backgroundColor: 'bg-[#F0F0F2]',
        titleFont: 'text-3xl font-bold font-creato-medium leading-[100%] ',
        titleFontColor: 'text-black',
        subtopicFont:
            'text-xl font-normal font-creato-medium uppercase leading-[150%] tracking-[0.15rem]',
        subtopicFontColor: 'text-neutral-900',
        contentFont:
            'text-opacity-70 text-base font-normal font-creato-medium leading-[140%] tracking-[0.025rem] ',
        contentFontColor: 'text-neutral-900',
        userNameFont:
            'text-sm font-normal font-creato-medium leading-[140%] tracking-[0.026rem]',
        userNameFontColor: 'text-[#3D3D3D]',
        headFont:
            'text-neutral-800 text-4xl font-normal font-creato-medium leading-[120%] tracking-tight',
        headFontColor: 'text-neutral-800',
    },
};

export default configData;
