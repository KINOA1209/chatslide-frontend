import React from 'react';
import { FaCoffee, FaBook, FaQuoteRight } from 'react-icons/fa';
import { ScenarioOption } from './slidesScenarios';


const options: ScenarioOption[] = [
	{
		id: 'casual_topic',
		title: 'Casual Topic',
		imageSrc: '/images/socialpost/casual_topic.png',
		icon: <FaCoffee />,
	},
	{
		id: 'serious_subject',
		title: 'Serious Subject',
		imageSrc: '/images/socialpost/serious_subject.png',
		icon: <FaBook />,
	},
	{
		id: 'reading_notes',
		title: 'Quote Sharing',
		imageSrc: '/images/socialpost/reading_notes.png',
		icon: <FaQuoteRight />,
	},
];

const socialpostScenarios = {
  message: 'What style do you prefer?',
  description: 'We will create contents tailored to your audience.',
  options,
};

export default socialpostScenarios;
