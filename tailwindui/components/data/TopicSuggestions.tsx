const TOPIC_SUGGESTIONS = [
	'How to use ultraviolet light to kill germs 🦠☀️',
	'Bootstrap your business in five steps 🚀',
	'Komodo dragons: The largest lizards in the world 🦎',
	'The benefits of daily meditation 🧘‍♂️✨',
	'Latest NVIDIA earnings report analysis 📈💰',
	'Understanding the basics of blockchain technology 🔗💻',
	'Tips for sustainable living and reducing waste 🌿♻️',
	'Geopolitical challenges in 2024 🌍🔍',
	'Exploring the world of coffee from bean to cup ☕',
	'The impact of music on mental health 🎵💖',
	'Beginner’s guide to astronomy: Stargazing 🌌🔭',
	'How to start your own vegetable garden 🥕🌱',
	'The history and art of making sourdough bread 🍞🎨',
	'Improving productivity with the Pomodoro Technique ⏱️📈',
	'The science behind why we dream 💤🧠',
	'Discovering the world’s ancient civilizations 🏛️🗺️',
	'Photography tips for capturing nature’s beauty 📸🌳',
	'Learning a new language: Strategies and benefits 🗣️🌐',
	'DIY home decor ideas on a budget 🛠️🏠',
];

export const getTopicSuggestions = ({languageCode = 'en-US'} = {}) => {

	// return a shuffled array of topic suggestions
	return TOPIC_SUGGESTIONS.sort(() => 0.5 - Math.random());
}

export default TOPIC_SUGGESTIONS;