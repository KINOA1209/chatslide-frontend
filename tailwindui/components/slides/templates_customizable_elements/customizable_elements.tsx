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
    Berkeley: TemplateElements;
    Harvard: TemplateElements;
    MIT: TemplateElements;
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
            'opacity-70 font-nimbus-sans-bold text-opacity-40 text-xl font-normal leading-[150%]',
        subtopicFontColor: 'text-red-800',
        contentFont:
            'text-base font-nimbus-sans-regular font-normal leading-9 ',
        contentFontColor: 'text-zinc-800',
        userNameFont:
            'text-sm font-nimbus-sans-regular font-normal leading-[120%]',
        userNameFontColor: 'text-white',
        headFont: 'text-4xl font-nimbus-sans-bold font-bold leading-[120%]',
        headFontColor: 'text-white',
    },
    Berkeley: {
        backgroundColorCover: 'bg-[#003262]',
        backgroundColor: 'bg-[#F0F2F5]',
        titleFont:
            'text-3xl leading-[120%] font-sans font-bold whitespace-nowrap',
        titleFontColor: 'text-[#003262]',
        subtopicFont: 'text-xl font-semibold leading-[120%] font-sans',
        subtopicFontColor: 'text-[#525252]',
        contentFont: 'text-base font-normal font-sans leading-[120%]',
        contentFontColor: 'text-[#1B1B1B]',
        userNameFont: 'text-sm font-normal font-sans leading-[120%]',
        userNameFontColor: 'text-white',
        headFont: 'text-4xl font-bold font-sans leading-[120%]',
        headFontColor: 'text-white',
    },
    Harvard: {
        backgroundColorCover: 'bg-[#F0F0F2]',
        backgroundColor: 'bg-[#F0F0F2]',
        titleFont:
            "text-3xl font-normal font-['Georgia'] leading-[120%] whitespace-nowrap",
        titleFontColor: 'text-neutral-800 ',
        subtopicFont: "text-xxl font-bold font-['Arial'] leading-[120%]",
        subtopicFontColor: 'text-neutral-700',
        contentFont:
            "opacity-70 text-base font-normal font-['Arial'] leading-loose",
        contentFontColor: 'text-neutral-700 ',
        userNameFont:
            "opacity-70 text-sm font-normal font-['Arial'] leading-loose",
        userNameFontColor: 'text-neutral-700',
        headFont: "text-4xl font-normal font-['Gorgia'] leading-[120%]",
        headFontColor: 'text-neutral-800',
    },
    MIT: {
        backgroundColorCover: 'bg-gray-100', // Light gray background
        backgroundColor: 'bg-gray-100', // Light gray background
        titleFont:
            'text-3xl font-bold font-creato-medium leading-[100%] text-black', // Black title font
        titleFontColor: 'text-black', // Black title font color
        subtopicFont:
            'text-xl font-normal font-creato-medium uppercase leading-[150%] tracking-[0.15rem] text-red-700', // MIT red subtopic font
        subtopicFontColor: 'text-red-700', // MIT red subtopic font color
        contentFont:
            'text-opacity-70 text-base font-normal font-creato-medium leading-[140%] tracking-[0.025rem] text-gray-800', // Dark gray content font
        contentFontColor: 'text-gray-800', // Dark gray content font color
        userNameFont:
            'text-sm font-normal font-creato-medium leading-[140%] tracking-[0.026rem] text-gray-800', // Dark username font
        userNameFontColor: 'text-gray-800', // Dark username font color
        headFont:
            'text-neutral-800 text-4xl font-normal font-creato-medium leading-[120%] tracking-tight', // Neutral 800 head font
        headFontColor: 'text-neutral-800', // Neutral 800 head font color
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