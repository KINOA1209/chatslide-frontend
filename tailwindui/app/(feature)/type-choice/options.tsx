import React from 'react';
import { FaShareAlt, FaFilm, FaChartBar, FaImage } from 'react-icons/fa';
import { ScenarioOption } from '../scenario-choice/slidesScenarios';


const drlambdaOptions: ScenarioOption[] = [
	{
		id: 'social_posts',
		title: 'Social Media Post',
		imageSrc: '/images/scenario/socialpost.png',
		icon: <FaShareAlt />,
	},
	{
		id: 'presentation',
		title: 'Slide / Video',
		imageSrc: '/images/scenario/slides.png',
		icon: <FaFilm />,
		featured: true,
	},
	{
		id: 'charts',
		title: 'Infographics',
		imageSrc: '/images/scenario/charts.png',
		icon: <FaChartBar />,
		previewOnly: false,
	},
];

const chatslideOptions: ScenarioOption[] = [
  {
    id: 'presentation',
    title: 'Slide / Video',
    imageSrc: '/images/scenario/slides.png',
    icon: <FaFilm />,
    featured: true,
  },
];

const chatslideMinorOptions: ScenarioOption[] = [
	{
		id: 'social_posts',
		title: 'Social Post (Beta)',
		imageSrc: '/images/scenario/socialpost.png',
		icon: <FaShareAlt />,
	},
	{
		id: 'charts',
		title: 'Charts (Beta)',
		imageSrc: '/images/scenario/charts.png',
		icon: <FaChartBar />,
		previewOnly: false,
	},
	{
		id: 'ppt2video',
		title: 'PPT to Video (Beta)',
		imageSrc: '/images/scenario/charts.png',  // no use
		icon: <FaFilm />,
		previewOnly: false,
	},
];

const drlambdaMinorOptions: ScenarioOption[] = [
	{
		id: 'image',
		title: 'Image',
		imageSrc: '/images/scenario/charts.png',
		icon: <FaImage />,
	},
];

export const drlambdaWorkflowTypeOptions = {
	message: 'What type of content do you want to create?',
	description: 'We will guide you through the process.',
	options: drlambdaOptions,
	minorOptions: drlambdaMinorOptions,
};

export const chatslideWorkflowTypeOptions = {
	message: 'What type of content do you want to create?',
	description: 'We will guide you through the process.',
	options: chatslideOptions,
	minorOptions: chatslideMinorOptions,
};
