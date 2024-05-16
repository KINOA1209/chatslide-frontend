import React from 'react';
import { FaShareAlt, FaFilm, FaChartBar } from 'react-icons/fa';
import { ScenarioOption } from '../scenario-choice/slidesScenarios';


const options: ScenarioOption[] = [
	{
		id: 'social_posts',
		title: 'Social Post',
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
		title: 'Charts (Beta+)',
		imageSrc: '/images/scenario/charts.png',
		icon: <FaChartBar />,
		previewOnly: true,
	},
];

const workflowTypeOptions = {
  message: 'What type of content do you want to create?',
  description: 'We will guide you through the process.',
  options,
};

export default workflowTypeOptions;
