import React from 'react';
import {
	FaUsers,
	FaHandshake,
	FaChartLine,
	FaLifeRing,
	FaBookOpen,
	FaGraduationCap,
	FaMicroscope,
	FaStethoscope,
	FaChartBar,
	FaBuilding,
	FaList,
	FaCogs,
} from 'react-icons/fa';

export type ScenarioOption = {
	id: string;
	title: string;
	imageSrc: string;
	audience?: string;
	structure?: string;
	featured?: boolean;
	previewOnly?: boolean;
	icon: React.JSX.Element;
  disabled?: boolean;
};

const options: ScenarioOption[] = [
	{
		id: 'general',
		title: 'General',
		imageSrc: '/images/scenario/general.webp',
		audience: 'Community_Members',
		structure: 'Introduction, background, details, examples, conclusion.',
		icon: <FaUsers />,
	},
	{
		id: 'sales_pitch',
		title: 'Sales Pitch',
		imageSrc: '/images/scenario/sales_pitch.jpg',
		audience: 'Business_Prospects',
		structure:
			'Introduction, persuasive arguments, case studies, product benefits.',
		icon: <FaHandshake />,
	},
	{
		id: 'business_coaching',
		title: 'Business Coaching',
		imageSrc: '/images/scenario/business_coaching.jpg',
		audience: 'Business_Clients',
		structure:
			'Introduction, market analysis, growth strategies, leadership development.',
		icon: <FaChartLine />,
	},
	{
		id: 'life_coaching',
		title: 'Life Coaching',
		imageSrc: '/images/scenario/life_coaching.jpg',
		audience: 'Business_Clients',
		structure:
			'Introduction, goal-setting, personal well-being, success stories.',
		icon: <FaLifeRing />,
	},
	{
		id: 'storytelling',
		title: 'Storytelling',
		imageSrc: '/images/scenario/storytelling.jpg',
		audience: 'Video_Viewers',
		structure:
			'Introduction, narrative structures, character arcs, visual aids.',
		icon: <FaBookOpen />,
	},
	{
		id: 'tutorial',
		title: 'Tutorial',
		imageSrc: '/images/scenario/tutorial.webp',
		audience: 'Students',
		structure:
			'Introduction, practical exercises, specific step-by-step guides, quiz.',
		icon: <FaGraduationCap />,
	},
	{
		id: 'scientific_teaching',
		title: 'Scientific Teaching',
		imageSrc: '/images/scenario/scientific_teaching.jpg',
		audience: 'Students',
		structure: 'Introduction, theories explanations, applications, quiz.',
		icon: <FaMicroscope />,
	},
	{
		id: 'health_advising',
		title: 'Health Advising',
		imageSrc: '/images/scenario/health_advising.webp',
		audience: 'Business_Clients',
		structure:
			'Introduction, fitness tips, dietary recommendations, mental health advice.',
		icon: <FaStethoscope />,
	},
	{
		id: 'data_analysis',
		title: 'Data Analysis',
		imageSrc: '/images/scenario/data_analysis.jpg',
		audience: 'Researchers',
		structure: 'Introduction, statistical methods, case study reviews.',
		icon: <FaChartBar />,
	},
    {
    id: 'elearning',
    title: 'E-learning',
    imageSrc: '/images/scenario/elearning.jpg',
    audience: 'Students',
    structure: 'Short Introduction, learning objective, main content, summary.',
    icon: <FaGraduationCap />,
  },
	// {
	// 	id: 'policy_training',
	// 	title: 'Policy Training',
	// 	imageSrc: '/images/scenario/policy_training.jpg',
	// 	audience: 'Office_Colleagues',
	// 	structure:
	// 		'Introduction, company rules, employee expectations, compliance procedures.',
	// 	icon: <FaBuilding />,
	// },
	{
		id: 'recommendation',
		title: 'Listicle',
		imageSrc: '/images/scenario/news_report.jpg',
		audience: 'Community_Members',
		structure: 'Introduction, item 1, item 2, item 3, etc.',
		icon: <FaList />,
	},
	{
		id: 'product_spec',
		title: 'Product Spec',
		imageSrc: '/images/scenario/product_spec.jpg',
		audience: 'Business_Clients',
		structure:
			'Introduction, features, technical specifications, comparison, use cases.',
		icon: <FaCogs />,
	},
];

const slideScenarios = {
  message: 'Great! Where are you going to use it?',
  description: "We'll create contents tailored to your needs.",
  options,
};


export default slideScenarios;
