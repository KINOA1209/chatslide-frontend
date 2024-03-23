import TextSlider, { TextBox } from "../ui/TextSlider";

export const TOPIC_SUGGESTIONS = {
	EN: [
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
	],
	ES: [
		'Luz UV contra gérmenes 🦠☀️',
		'Tu negocio en 5 pasos 🚀',
		'Dragones de Komodo: los más grandes 🦎',
		'Beneficios de meditar 🧘‍♂️✨',
		'Análisis de NVIDIA 📈💰',
		'Fundamentos de blockchain 🔗💻',
		'Vivir sostenible 🌿♻️',
		'Desafíos geopolíticos 2024 🌍🔍',
		'Del grano a la taza ☕',
		'Música y salud mental 🎵💖',
		'Astronomía para principiantes 🌌🔭',
		'Crear un huerto 🥕🌱',
		'Arte del pan de masa madre 🍞🎨',
		'Productividad con Pomodoro ⏱️📈',
		'La ciencia de soñar 💤🧠',
		'Civilizaciones antiguas 🏛️🗺️',
		'Tips de fotografía natural 📸🌳',
		'Aprender idiomas 🗣️🌐',
		'Decoración DIY económica 🛠️🏠',
	],
	FR: [
		'UV pour tuer les germes 🦠☀️',
		'Créer entreprise en 5 étapes 🚀',
		'Dragons de Komodo 🦎',
		'Bienfaits méditation 🧘‍♂️✨',
		'Analyse NVIDIA 📈💰',
		'Bases blockchain 🔗💻',
		'Vie durable & moins de déchets 🌿♻️',
		'Défis géopolitiques 2024 🌍🔍',
		'Monde du café ☕',
		'Musique & santé mentale 🎵💖',
		'Astronomie pour débutants 🌌🔭',
		'Jardin potager 🥕🌱',
		'Art du pain au levain 🍞🎨',
		'Productivité & Pomodoro ⏱️📈',
		'Science des rêves 💤🧠',
		'Anciennes civilisations 🏛️🗺️',
		'Astuces photographie nature 📸🌳',
		'Apprendre langue nouvelle 🗣️🌐',
		'Déco DIY budget limité 🛠️🏠',
	],
	zhCN: [
		'如何使用紫外线消灭细菌 🦠☀️',
		'五步启动你的业务 🚀',
		'科莫多巨蜥：世界上最大的蜥蜴 🦎',
		'每日冥想的好处 🧘‍♂️✨',
		'最新NVIDIA盈利报告分析 📈💰',
		'理解区块链技术的基础 🔗💻',
		'可持续生活和减少浪费的提示 🌿♻️',
		'2024年的地缘政治挑战 🌍🔍',
		'从豆到杯：探索咖啡世界 ☕',
		'音乐对心理健康的影响 🎵💖',
		'天文学初学者指南：观星 🌌🔭',
		'如何开始自己的菜园 🥕🌱',
		'制作酸面包的历史与艺术 🍞🎨',
		'使用番茄工作法提高生产力 ⏱️📈',
		'我们做梦的科学原理 💤🧠',
		'探索世界古代文明 🏛️🗺️',
		'摄影技巧：捕捉自然之美 📸🌳',
		'学习新语言的策略及其好处 🗣️🌐',
		'预算内的DIY家居装饰创意 🛠️🏠',
	],
	JP: [
		'紫外線を使用して細菌を殺す方法 🦠☀️',
		'ビジネスを5ステップで起業する 🚀',
		'コモドドラゴン：世界最大のトカゲ 🦎',
		'毎日の瞑想の利点 🧘‍♂️✨',
		'最新のNVIDIA収益報告分析 📈💰',
		'ブロックチェーン技術の基礎を理解する 🔗💻',
		'持続可能な生活と廃棄物削減のヒント 🌿♻️',
		'2024年の地政学的課題 🌍🔍',
		'豆からカップまで：コーヒーの世界を探る ☕',
		'音楽が心理健康に与える影響 🎵💖',
		'天文学初心者向けガイド：星を見る 🌌🔭',
		'自分の野菜園を始める方法 🥕🌱',
		'サワードウパン作りの歴史と芸術 🍞🎨',
		'ポモドーロテクニックで生産性を向上させる ⏱️📈',
		'夢を見る科学的背景 💤🧠',
		'世界の古代文明を発見する 🏛️🗺️',
		'自然の美しさを捕らえる写真撮影のヒント 📸🌳',
		'新しい言語を学ぶ：戦略と利点 🗣️🌐',
		'予算内でのDIYホームデコのアイデア 🛠️🏠',
	],
	DE: [
		'UV-Licht gegen Keime 🦠☀️',
		'Business-Start in 5 Schritten 🚀',
		'Komodowarane: Größte Echsen 🦎',
		'Vorteile der Meditation 🧘‍♂️✨',
		'NVIDIA Gewinnanalyse 📈💰',
		'Blockchain-Grundlagen 🔗💻',
		'Nachhaltig leben & Abfall reduzieren 🌿♻️',
		'Geopolitik 2024 🌍🔍',
		'Von der Bohne zur Tasse ☕',
		'Musik & psychische Gesundheit 🎵💖',
		'Astronomie für Anfänger 🌌🔭',
		'Eigener Gemüsegarten 🥕🌱',
		'Kunst des Sauerteigbrots 🍞🎨',
		'Mehr Produktivität mit Pomodoro ⏱️📈',
		'Warum wir träumen 💤🧠',
		'Alte Zivilisationen entdecken 🏛️🗺️',
		'Naturfotografie-Tipps 📸🌳',
		'Neue Sprachen lernen 🗣️🌐',
		'DIY-Heimdeko Ideen 🛠️🏠',
	],
	zhTW: [
		'最新NVIDIA收益報告分析 📈💰',
		'理解區塊鏈技術的基礎 🔗💻',
		'可持續生活與減少廢棄的小貼士 🌿♻️',
		'2024年的地緣政治挑戰 🌍🔍',
		'從豆到杯：探索咖啡世界 ☕',
		'音樂對心理健康的影響 🎵💖',
		'天文學初學者指南：賞星 🌌🔭',
		'如何開始自己的蔬菜園 🥕🌱',
		'製作酸種麵包的歷史與藝術 🍞🎨',
		'使用番茄工作法提高生產力 ⏱️📈',
		'我們為什麼會做夢的科學背後 💤🧠',
		'探索世界的古代文明 🏛️🗺️',
		'攝影技巧：捕捉大自然的美 📸🌳',
		'學習新語言的策略及好處 🗣️🌐',
		'預算內DIY家居裝飾想法 🛠️🏠',
		'如何使用紫外線殺死細菌 🦠☀️',
		'五個步驟啟動您的業務 🚀',
		'科莫多巨蜥：世界上最大的蜥蜴 🦎',
		'每日冥想的好處 🧘‍♂️✨',
	]
}

export const getTopicSuggestions = (language = 'English') => {
	let suggestions = TOPIC_SUGGESTIONS.EN;
	if (language.includes('Spanish')) {
		suggestions = TOPIC_SUGGESTIONS.ES;
	}
	else if (language.includes('Chinese')) {
		suggestions = language.includes('Traditional') ? TOPIC_SUGGESTIONS.zhTW : TOPIC_SUGGESTIONS.zhCN;
	}
	else if (language.includes('Japanese')) {
		suggestions = TOPIC_SUGGESTIONS.JP;
	}
	else if (language.includes('German')) {
		suggestions = TOPIC_SUGGESTIONS.DE;
	}
	else if (language.includes('French')) {
		suggestions = TOPIC_SUGGESTIONS.FR;
	}

	// return a shuffled array of topic suggestions
	return suggestions.sort(() => 0.5 - Math.random());
}


const TopicSuggestions: React.FC<{
	language: string;
	setTopic: (topic: string) => void;
}> = ({
	language,
	setTopic
}) => {
		return (
			<TextSlider>
				{getTopicSuggestions(language).map((topic) => (
					<div className='hover:cursor-pointer' key={topic} onClick={() => setTopic(topic)}>
						<TextBox key={topic}>{topic}</TextBox>
					</div>
				))}
			</TextSlider>
		)
	};

export default TopicSuggestions;