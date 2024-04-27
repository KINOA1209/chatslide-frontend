type VoiceOptions = {
	female: string[],
	male: string[]
};

type LangToVoiceOptions = {
	[key: string]: VoiceOptions
}

const AZURE_VOICE_OPTIONS: LangToVoiceOptions = {
	'en-US': {
		'female': [
			'en-US-AvaNeural', 'en-US-EmmaNeural', 'en-US-JennyNeural', 'en-US-AriaNeural', 'en-US-JaneNeural',
			'en-US-SaraNeural', 'en-US-NancyNeural', 'en-US-AmberNeural', 'en-US-AnaNeural', 'en-US-AshleyNeural',
			'en-US-CoraNeural', 'en-US-ElizabethNeural', 'en-US-MichelleNeural', 'en-US-MonicaNeural'
		],
		'male': [
			'en-US-AndrewNeural', 'en-US-BrianNeural', 'en-US-GuyNeural', 'en-US-DavisNeural', 'en-US-JasonNeural',
			'en-US-TonyNeural', 'en-US-BrandonNeural', 'en-US-ChristopherNeural', 'en-US-EricNeural', 'en-US-JacobNeural',
			'en-US-RogerNeural', 'en-US-SteffanNeural'
		]
	},
	'en-GB': {
		'female': [
			'en-GB-SoniaNeural', 'en-GB-LibbyNeural', 'en-GB-AbbiNeural', 'en-GB-BellaNeural', 'en-GB-HollieNeural',
			'en-GB-MaisieNeural', 'en-GB-OliviaNeural', 'en-GB-MiaNeural'
		],
		'male': [
			'en-GB-RyanNeural', 'en-GB-AlfieNeural', 'en-GB-ElliotNeural', 'en-GB-EthanNeural', 'en-GB-NoahNeural',
			'en-GB-OliverNeural', 'en-GB-ThomasNeural'
		]
	},
	"en-Global": {
		"female": [
			"en-AU-NatashaNeural", "en-AU-AnnetteNeural", "en-AU-CarlyNeural", "en-AU-ElsieNeural", "en-AU-FreyaNeural",
			"en-AU-JoanneNeural", "en-AU-KimNeural", "en-AU-TinaNeural",
			"en-CA-ClaraNeural",
			"en-IN-NeerjaNeural",
			"en-SG-LunaNeural",
			"en-IE-EmilyNeural"
		],
		"male": [
			"en-AU-WilliamNeural", "en-AU-DarrenNeural", "en-AU-DuncanNeural", "en-AU-KenNeural", "en-AU-NeilNeural",
			"en-AU-TimNeural",
			"en-CA-LiamNeural",
			"en-IN-PrabhatNeural",
			"en-SG-WayneNeural",
			"en-IE-ConnorNeural"
		]
	},
	'es-ES': {
		'female': [
			'es-ES-ElviraNeural', 'es-ES-AbrilNeural', 'es-ES-EstrellaNeural', 'es-ES-IreneNeural', 'es-ES-LaiaNeural',
			'es-ES-LiaNeural', 'es-ES-TrianaNeural', 'es-ES-VeraNeural'
		],
		'male': [
			'es-ES-AlvaroNeural', 'es-ES-ArnauNeural', 'es-ES-DarioNeural', 'es-ES-EliasNeural', 'es-ES-NilNeural',
			'es-ES-SaulNeural', 'es-ES-TeoNeural'
		]
	},
	'es-MX': {
		'female': [
			'es-MX-DaliaNeural', 'es-MX-BeatrizNeural', 'es-MX-CandelaNeural', 'es-MX-CarlotaNeural', 'es-MX-LarissaNeural',
			'es-MX-MarinaNeural', 'es-MX-NuriaNeural', 'es-MX-RenataNeural',
			"es-VE-PaolaNeural"
		],
		'male': [
			'es-MX-JorgeNeural', 'es-MX-CecilioNeural', 'es-MX-GerardoNeural', 'es-MX-LibertoNeural', 'es-MX-LucianoNeural',
			'es-MX-PelayoNeural', 'es-MX-YagoNeural',
			"es-VE-SebastianNeural"
		]
	},
	'zh-CN': {
		'female': [
			'zh-CN-XiaoxiaoNeural', 'zh-CN-XiaoyiNeural', 'zh-CN-XiaochenNeural', 'zh-CN-XiaohanNeural',
			'zh-CN-XiaomengNeural', 'zh-CN-XiaomoNeural', 'zh-CN-XiaoqiuNeural', 'zh-CN-XiaoruiNeural',
			'zh-CN-XiaoshuangNeural', 'zh-CN-XiaoyanNeural', 'zh-CN-XiaoyouNeural', 'zh-CN-XiaozhenNeural',
			'zh-CN-XiaoxuanNeural', 'zh-CN-shaanxi-XiaoniNeural',
			'zh-CN-liaoning-XiaobeiNeural',
			'wuu-CN-XiaotongNeural', 'yue-CN-XiaoMinNeural'
		],
		'male': [
			'zh-CN-YunxiNeural', 'zh-CN-YunjianNeural', 'zh-CN-YunyangNeural', 'zh-CN-YunfengNeural',
			'zh-CN-YunhaoNeural', 'zh-CN-YunxiaNeural', 'zh-CN-YunyeNeural', 'zh-CN-YunzeNeural', 'zh-CN-sichuan-YunxiNeural',
			'zh-CN-shandong-YunxiangNeural', 'zh-CN-henan-YundengNeural',
			'wuu-CN-YunzheNeural.mp3', 'yue-CN-YunSongNeural'
		]
	},
	'zh-TW': {
		'female': [
			'zh-TW-HsiaoChenNeural', 'zh-TW-HsiaoYuNeural',
		],
		'male': [
			'zh-TW-YunJheNeural',
		]
	},
	'zh-HK': {
		'female': [
			'zh-HK-HiuMaanNeural', 'zh-HK-HiuGaaiNeural', 'yue-CN-XiaoMinNeural'
		],
		'male': [
			'zh-HK-WanLungNeural', 'yue-CN-YunSongNeural'
		]
	},
	'de-DE': {
		'female': [
			'de-DE-KatjaNeural', 'de-DE-AmalaNeural', 'de-DE-ElkeNeural', 'de-DE-GiselaNeural',
			'de-DE-KlarissaNeural', 'de-DE-LouisaNeural', 'de-DE-MajaNeural', 'de-DE-TanjaNeural',
			"de-AT-IngridNeural", "de-CH-LeniNeural"
		],
		'male': [
			'de-DE-ConradNeural', 'de-DE-BerndNeural', 'de-DE-ChristophNeural', 'de-DE-KasperNeural',
			'de-DE-KillianNeural', 'de-DE-KlausNeural', 'de-DE-RalfNeural',
			"de-AT-JonasNeural", "de-CH-JanNeural"
		]
	},
	'fr-FR': {
		'female': [
			'fr-FR-DeniseNeural', 'fr-FR-BrigitteNeural', 'fr-FR-CelesteNeural', 'fr-FR-CoralieNeural', 'fr-FR-EloiseNeural',
			'fr-FR-JacquelineNeural', 'fr-FR-JosephineNeural', 'fr-FR-YvetteNeural'
		],
		'male': [
			'fr-FR-HenriNeural', 'fr-FR-AlainNeural', 'fr-FR-ClaudeNeural', 'fr-FR-JeromeNeural', 'fr-FR-MauriceNeural',
			'fr-FR-YvesNeural'
		]
	},
	"fr-Global": {
		"female": [
			"fr-CH-ArianeNeural",
			"fr-BE-CharlineNeural",
			"fr-CA-SylvieNeural"
		],
		"male": [
			"fr-CH-FabriceNeural",
			"fr-BE-GerardNeural",
			"fr-CA-JeanNeural", "fr-CA-AntoineNeural", "fr-CA-ThierryNeural"
		]
	},
	'ru-RU': {
		'female': ['ru-RU-SvetlanaNeural', 'ru-RU-DariyaNeural'],
		'male': ['ru-RU-DmitryNeural']
	},
	'uk-UA': {
		'female': ['uk-UA-PolinaNeural'],
		'male': ['uk-UA-OstapNeural']
	},
	'pt-PT': {
		'female': ['pt-PT-RaquelNeural', 'pt-PT-FernandaNeural'],
		'male': ['pt-PT-DuarteNeural']
	},
	'pt-BR': {
		'female': [
			'pt-BR-FranciscaNeural', 'pt-BR-BrendaNeural', 'pt-BR-ElzaNeural', 'pt-BR-GiovannaNeural', 'pt-BR-LeilaNeural',
			'pt-BR-LeticiaNeural', 'pt-BR-ManuelaNeural', 'pt-BR-ThalitaNeural', 'pt-BR-YaraNeural'
		],
		'male': [
			'pt-BR-AntonioNeural', 'pt-BR-DonatoNeural', 'pt-BR-FabioNeural', 'pt-BR-HumbertoNeural', 'pt-BR-JulioNeural',
			'pt-BR-NicolauNeural', 'pt-BR-ValerioNeural'
		]
	},
	'it-IT': {
		'female': [
			'it-IT-ElsaNeural', 'it-IT-IsabellaNeural', 'it-IT-FabiolaNeural', 'it-IT-FiammaNeural', 'it-IT-ImeldaNeural',
			'it-IT-IrmaNeural', 'it-IT-PalmiraNeural', 'it-IT-PierinaNeural'
		],
		'male': [
			'it-IT-DiegoNeural', 'it-IT-BenignoNeural', 'it-IT-CalimeroNeural', 'it-IT-CataldoNeural', 'it-IT-GianniNeural',
			'it-IT-GiuseppeNeural', 'it-IT-LisandroNeural', 'it-IT-RinaldoNeural'
		]
	},
	'hi-IN': {
		'female': ['hi-IN-SwaraNeural'],
		'male': ['hi-IN-MadhurNeural']
	},
	'ja-JP': {
		'female': ['ja-JP-NanamiNeural', 'ja-JP-AoiNeural', 'ja-JP-MayuNeural', 'ja-JP-ShioriNeural'],
		'male': ['ja-JP-KeitaNeural', 'ja-JP-DaichiNeural', 'ja-JP-NaokiNeural']
	},
	'ko-KR': {
		'female': [
			'ko-KR-SunHiNeural', 'ko-KR-JiMinNeural', 'ko-KR-SeoHyeonNeural', 'ko-KR-SoonBokNeural', 'ko-KR-YuJinNeural'
		],
		'male': ['ko-KR-InJoonNeural', 'ko-KR-BongJinNeural', 'ko-KR-GookMinNeural', 'ko-KR-HyunsuNeural']
	},
	'ar-SA': {
		'female': ['ar-SA-ZariyahNeural'],
		'male': ['ar-SA-HamedNeural']
	},
	'he-IL': {
		'female': ['he-IL-HilaNeural'],
		'male': ['he-IL-AvriNeural']
	},
	'nl-NL': {
		'female': ['nl-NL-FennaNeural', 'nl-NL-ColetteNeural'],
		'male': ['nl-NL-MaartenNeural']
	},
	'hr-HR': {
		'female': ['hr-HR-GabrijelaNeural'],
		'male': ['hr-HR-SreckoNeural']
	},
	'vi-VN': { 'female': ['vi-VN-HoaiMyNeural'], 'male': ['vi-VN-NamMinhNeural'] },
	'th-TH': { 'female': ['th-TH-PremwadeeNeural', 'th-TH-AcharaNeural'], 'male': ['th-TH-NiwatNeural'] },
	"da-DK": {
		"female": ["da-DK-ChristelNeural"],
		"male": ["da-DK-JeppeNeural"]
	},
	"id-ID": {
		"female": ["id-ID-GadisNeural"],
		"male": ["id-ID-ArdiNeural"]
	},
};

export const AZURE_MULTILINGUAL_VOICE_OPTIONS: VoiceOptions = {
	female: [
		'fr-FR-VivienneMultilingualNeural',
		'en-US-AvaMultilingualNeural',
		'en-US-EmmaMultilingualNeural',
		'en-US-JennyMultilingualNeural'
	],
	male: [
		'fr-FR-RemyMultilingualNeural',
		'en-US-AndrewMultilingualNeural',
		'en-US-BrianMultilingualNeural',
		'en-US-RyanMultilingualNeural'
	]
}

export const OAI_VOICE_OPTIONS: VoiceOptions = {
	female: ['nova'],
	male: [
		'alloy',
		'echo',
		'fable',
		'onyx',
		'shimmer'
	]
}

export function isOpenaiVoice(voice: string): boolean {
	return OAI_VOICE_OPTIONS.female.includes(voice) || OAI_VOICE_OPTIONS.male.includes(voice);
}

export function isMultilingualVoice(voice: string): boolean {
	return voice.includes('Multilingual') || isOpenaiVoice(voice);
}

export const TONE_DISPLAY_NAMES: { [key: string]: string } = {
	'Xiaoxiao': '晓晓',
	'Xiaoyi': '晓怡',
	'Xiaochen': '晓晨',
	'Xiaohan': '晓涵',
	'Xiaomeng': '晓萌',
	'Xiaomo': '晓莫',
	'Xiaoqiu': '晓秋',
	'Xiaorui': '晓蕊',
	'Xiaoshuang': '晓霜',
	'Xiaoyan': '晓燕',
	'Xiaoyou': '晓友',
	'Xiaozhen': '晓珍',
	'Xiaoxuan': '晓萱',
	'Yunxi': '云熙',
	'Yunjian': '云健',
	'Yunyang': '云扬',
	'Yunfeng': '云峰',
	'Yunhao': '云浩',
	'Yunxia': '云霞',
	'Yunye': '云业',
	'Yunze': '云泽',
	'HsiaoChen': '曉辰',
	'HsiaoYu': '曉宇',
	'YunJhe': '雲哲',
	'Nanami': '七海',
	'Aoi': '葵',
	'Mayu': '真由',
	'Shiori': '詩織',
	'Keita': '圭太',
	'Daichi': '大地',
	'Naoki': '直樹',
	'SunHi': '선희',
	'JiMin': '지민',
	'SeoHyeon': '서현',
	'SoonBok': '순복',
	'YuJin': '유진',
	'InJoon': '인준',
	'BongJin': '봉진',
	'GookMin': '국민',
	'Hyunsu': '현수',
	'Alvaro': 'Álvaro',
	'Dario': 'Darío',
	'Elias': 'Elías',
	'Saul': 'Saúl',
	'Henan-Yundeng': '云登 (河南)',
	'Shaanxi-Xiaoni': '晓妮 (陕西)',
	'Shandong-Yunxiang': '云祥 (山东)',
	'Sichuan-Yunxi': '云熙 (四川)',
	"Ingrid": "Ingrid (🇦🇹)",
	"Jonas": "Jonas (🇦🇹)",
	"Leni": "Leni (🇨🇭)",
	"Jan": "Jan (🇨🇭)",
	"Natasha": "Natasha (🇦🇺)",
	"Annette": "Annette (🇦🇺)",
	"Carly": "Carly (🇦🇺)",
	"Elsie": "Elsie (🇦🇺)",
	"Freya": "Freya (🇦🇺)",
	"Joanne": "Joanne (🇦🇺)",
	"Kim": "Kim (🇦🇺)",
	"Tina": "Tina (🇦🇺)",
	"William": "William (🇦🇺)",
	"Darren": "Darren (🇦🇺)",
	"Duncan": "Duncan (🇦🇺)",
	"Ken": "Ken (🇦🇺)",
	"Neil": "Neil (🇦🇺)",
	"Tim": "Tim (🇦🇺)",
	"Clara": "Clara (🇨🇦)",
	"Liam": "Liam (🇨🇦)",
	"Neerja": "Neerja (🇮🇳)",
	"Prabhat": "Prabhat (🇮🇳)",
	"Luna": "Luna (🇸🇬)",
	"Wayne": "Wayne (🇸🇬)",
	"Emily": "Emily (🇮🇪)",
	"Connor": "Connor (🇮🇪)",
	"Ariane": "Ariane (🇨🇭)",
	"Fabrice": "Fabrice (🇨🇭)",
	"Charline": "Charline (🇧🇪)",
	"Gerard": "Gerard (🇧🇪)",
	"Sylvie": "Sylvie (🇨🇦)",
	"Jean": "Jean (🇨🇦)",
	"Antoine": "Antoine (🇨🇦)",
	"Thierry": "Thierry (🇨🇦)",
	"Paola": "Paola (🇻🇪)",
	"Sebastian": "Sebastian (🇻🇪)",
	"HiuMaan": "曉曼 (🇭🇰)",
	"HiuGaai": "曉佳 (🇭🇰)",
	"WanLung": "雲龍 (🇭🇰)",
	"-YunSong": "云松 (广东)",  // yue-CN has 6 chars, so we need to add a dash
	"-XiaoMin": "小敏 (广东)",
	"-Yunzhe": "雲哲 (吴语)",
	"-Xiaotong": "晓彤 (吴语)",
	"Xiaobei": "晓蓓 (辽宁)",
	
	"VivienneMultilingual": "Vivienne (🇫🇷🌐)",
	"RemyMultilingual": "Rémy (🇫🇷🌐)",
	"AndrewMultilingual": "Andrew (🇺🇸🌐)",
	"BrianMultilingual": "Brian (🇺🇸🌐)",
	"RyanMultilingual": "Ryan (🇺🇸🌐)",
	"AvaMultilingual": "Ava (🇺🇸🌐)",
	"EmmaMultilingual": "Emma (🇺🇸🌐)",
	"JennyMultilingual": "Jenny (🇺🇸🌐)",
};

// doc: https://github.com/MicrosoftDocs/azure-docs/blob/main/articles/ai-services/speech-service/includes/language-support/voice-styles-and-roles.md
export const AZURE_VOICE_STYLES: { [key: string]: string[] } = {
	"de-DE-ConradNeural1": ["cheerful"],
	"en-GB-SoniaNeural": ["cheerful", "sad"],
	"en-US-AriaNeural": ["angry", "chat", "cheerful", "customerservice", "empathetic", "excited", "friendly", "hopeful", "narration-professional", "newscast-casual", "newscast-formal", "sad", "shouting", "terrified", "unfriendly", "whispering"],
	"en-US-DavisNeural": ["angry", "chat", "cheerful", "excited", "friendly", "hopeful", "sad", "shouting", "terrified", "unfriendly", "whispering"],
	"en-US-GuyNeural": ["angry", "cheerful", "excited", "friendly", "hopeful", "newscast", "sad", "shouting", "terrified", "unfriendly", "whispering"],
	"en-US-JaneNeural": ["angry", "cheerful", "excited", "friendly", "hopeful", "sad", "shouting", "terrified", "unfriendly", "whispering"],
	"en-US-JasonNeural": ["angry", "cheerful", "excited", "friendly", "hopeful", "sad", "shouting", "terrified", "unfriendly", "whispering"],
	"en-US-JennyNeural": ["angry", "assistant", "chat", "cheerful", "customerservice", "excited", "friendly", "hopeful", "newscast", "sad", "shouting", "terrified", "unfriendly", "whispering"],
	"en-US-NancyNeural": ["angry", "cheerful", "excited", "friendly", "hopeful", "sad", "shouting", "terrified", "unfriendly", "whispering"],
	"en-US-SaraNeural": ["angry", "cheerful", "excited", "friendly", "hopeful", "sad", "shouting", "terrified", "unfriendly", "whispering"],
	"en-US-TonyNeural": ["angry", "cheerful", "excited", "friendly", "hopeful", "sad", "shouting", "terrified", "unfriendly", "whispering"],
	"es-MX-JorgeNeural": ["chat", "cheerful"],
	"fr-FR-DeniseNeural": ["cheerful", "sad"],
	"fr-FR-HenriNeural": ["cheerful", "sad"],
	"it-IT-IsabellaNeural": ["chat", "cheerful"],
	"ja-JP-NanamiNeural": ["chat", "cheerful", "customerservice"],
	"pt-BR-FranciscaNeural": ["calm"],
	"zh-CN-XiaohanNeural": ["affectionate", "angry", "calm", "cheerful", "disgruntled", "embarrassed", "fearful", "gentle", "sad", "serious"],
	"zh-CN-XiaomengNeural": ["chat"],
	"zh-CN-XiaomoNeural": ["affectionate", "angry", "calm", "cheerful", "depressed", "disgruntled", "embarrassed", "envious", "fearful", "gentle", "sad", "serious"],
	"zh-CN-XiaoruiNeural": ["angry", "calm", "fearful", "sad"],
	"zh-CN-XiaoshuangNeural": ["chat"],
	"zh-CN-XiaoxiaoNeural": ["affectionate", "angry", "assistant", "calm", "chat", "chat-casual", "cheerful", "customerservice", "disgruntled", "fearful", "friendly", "gentle", "lyrical", "newscast", "poetry-reading", "sad", "serious", "sorry", "whisper"],
	"zh-CN-XiaoyiNeural": ["affectionate", "angry", "cheerful", "disgruntled", "embarrassed", "fearful", "gentle", "sad", "serious"],
	"zh-CN-XiaozhenNeural": ["angry", "cheerful", "disgruntled", "fearful", "sad", "serious"],
	"zh-CN-YunfengNeural": ["angry", "cheerful", "depressed", "disgruntled", "fearful", "sad", "serious"],
	"zh-CN-YunhaoNeural2": ["advertisement-upbeat"],
	"zh-CN-YunjianNeural3,4": ["angry", "cheerful", "depressed", "disgruntled", "documentary-narration", "narration-relaxed", "sad", "serious", "sports-commentary", "sports-commentary-excited"],
	"zh-CN-YunxiaNeural": ["angry", "calm", "cheerful", "fearful", "sad"],
	"zh-CN-YunxiNeural": ["angry", "assistant", "chat", "cheerful", "depressed", "disgruntled", "embarrassed", "fearful", "narration-relaxed", "newscast", "sad", "serious"],
	"zh-CN-YunyangNeural": ["customerservice", "narration-professional", "newscast-casual"],
	"zh-CN-YunyeNeural": ["angry", "calm", "cheerful", "disgruntled", "embarrassed", "fearful", "sad", "serious"],
	"zh-CN-YunzeNeural": ["angry", "calm", "cheerful", "depressed", "disgruntled", "documentary-narration", "fearful", "sad", "serious"],
};

// doc: https://learn.microsoft.com/en-us/azure/ai-services/speech-service/speech-synthesis-markup-voice 
export const STYLE_DISPLAY_NAMES: { [key: string]: string } = {
	"": "🙂 Default",
	"advertisement_upbeat": "💼 Advertisement (upbeat)",
	"affectionate": "❤️ Affectionate",
	"angry": "😡 Angry",
	"assistant": "🤖 Assistant",
	"calm": "🧘 Calm",
	"chat": "💬 Chat",
	"chat-casual": "💬 Chat (casual)",
	"cheerful": "😊 Cheerful",
	"customerservice": "👩‍💼 Customerservice",
	"depressed": "😢 Depressed",
	"disgruntled": "😒 Disgruntled",
	"documentary-narration": "🎥 Documentary narration",
	"embarrassed": "😳 Embarrassed",
	"empathetic": "🤲 Empathetic",
	"envious": "😤 Envious",
	"excited": "🎉 Excited",
	"fearful": "😨 Fearful",
	"friendly": "😃 Friendly",
	"gentle": "🕊️ Gentle",
	"hopeful": "🌟 Hopeful",
	"lyrical": "🎶 Lyrical",
	"narration-professional": "📖 Narration (professional)",
	"narration-relaxed": "🛋️ Narration (relaxed)",
	"newscast": "📰 Newscast",
	"newscast-casual": "🗞️ Newscast (casual)",
	"newscast-formal": "🎙️ Newscast (formal)",
	"poetry-reading": "📜 Poetry reading",
	"sad": "😔 Sad",
	"serious": "🧐 Serious",
	"shouting": "📢 Shouting",
	"sports_commentary": "🏀 Sports commentary",
	"sports_commentary_excited": "⚽️ Sports commentary (excited)",
	"sorry": "🙏 Sorry",
	"whispering": "🤫 Whispering",
	"whisper": "🤫 Whispering",
	"terrified": "😱 Terrified",
	"unfriendly": "🚫 Unfriendly"
}


export default AZURE_VOICE_OPTIONS;
