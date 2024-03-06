type SurveySectionConfig = {
	question: string;
	itemsArr: string[];
};

const surveyObject: Record<string, SurveySectionConfig> = {
	industry: {
		question: 'What industry do you work for?',
		itemsArr: [
			'Tech',
			'Education',
			'Entertainment',
			'Finance',
			'Consulting',
			'Health',
			'Energy',
			'Retail',
			'Marketing',
			'Other',
		],
	},

	referral: {
		question: 'Where did you find us?',
		itemsArr: [
			'Friend',
			'Google',
			'ProductHunt',
			'Newsletter',
			'Facebook',
			'Tiktok',
			'X (Twitter)',
			'Reddit',
			'Instagram',
			'Telegram',
			'Yandex',
			'Other',
		],
	},

	purpose: {
		question: "What's the purpose of your output?",
		itemsArr: [
			'Teaching', // prev Education
			'Learning', // prev Education
			'Business',
			'Research',
			'Technical',
			'Conference',
			'Training',
			'Proposal',
			'Webinar',
			'Portfolio',
			'Storytelling',
			'Marketing',
			'Other',
		],
	},
};

export default surveyObject;
