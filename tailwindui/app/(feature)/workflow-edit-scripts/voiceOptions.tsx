type VoiceOption = {
	[languageCode: string]: {
		female: string[],
		male: string[]
	}
};

const VOICE_OPTIONS: VoiceOption = {
	'en-US': {
		'female': [
			'en-US-AvaNeural', 'en-US-EmmaNeural', 'en-US-JennyNeural', 'en-US-AriaNeural', 'en-US-JaneNeural',
			'en-US-SaraNeural', 'en-US-NancyNeural', 'en-US-AmberNeural', 'en-US-AnaNeural', 'en-US-AshleyNeural',
			'en-US-AvaMultilingualNeural', 'en-US-CoraNeural', 'en-US-ElizabethNeural', 'en-US-EmmaMultilingualNeural',
			'en-US-JennyMultilingualNeural', 'en-US-MichelleNeural', 'en-US-MonicaNeural'
		],
		'male': [
			'en-US-AndrewNeural', 'en-US-BrianNeural', 'en-US-GuyNeural', 'en-US-DavisNeural', 'en-US-JasonNeural',
			'en-US-TonyNeural', 'en-US-AndrewMultilingualNeural', 'en-US-BrandonNeural', 'en-US-BrianMultilingualNeural',
			'en-US-ChristopherNeural', 'en-US-EricNeural', 'en-US-JacobNeural', 'en-US-RogerNeural',
			'en-US-RyanMultilingualNeural', 'en-US-SteffanNeural'
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
	'zh-CN': {
		'female': [
			'zh-CN-XiaoxiaoNeural', 'zh-CN-XiaoyiNeural', 'zh-CN-XiaochenNeural', 'zh-CN-XiaohanNeural',
			'zh-CN-XiaomengNeural', 'zh-CN-XiaomoNeural', 'zh-CN-XiaoqiuNeural', 'zh-CN-XiaoruiNeural',
			'zh-CN-XiaoshuangNeural', 'zh-CN-XiaoyanNeural', 'zh-CN-XiaoyouNeural', 'zh-CN-XiaozhenNeural',
			'zh-CN-XiaoxuanNeural'
		],
		'male': [
			'zh-CN-YunxiNeural', 'zh-CN-YunjianNeural', 'zh-CN-YunyangNeural', 'zh-CN-YunfengNeural',
			'zh-CN-YunhaoNeural', 'zh-CN-YunxiaNeural', 'zh-CN-YunyeNeural', 'zh-CN-YunzeNeural'
		]
	},
	'zh-TW': {
		'female': [
			'zh-TW-HsiaoChenNeural', 'zh-TW-HsiaoYuNeural'
		],
		'male': [
			'zh-TW-YunJheNeural'
		]
	},
	'de-DE': {
		'female': [
			'de-DE-KatjaNeural', 'de-DE-AmalaNeural', 'de-DE-ElkeNeural', 'de-DE-GiselaNeural',
			'de-DE-KlarissaNeural', 'de-DE-LouisaNeural', 'de-DE-MajaNeural', 'de-DE-TanjaNeural'
		],
		'male': [
			'de-DE-ConradNeural', 'de-DE-BerndNeural', 'de-DE-ChristophNeural', 'de-DE-KasperNeural',
			'de-DE-KillianNeural', 'de-DE-KlausNeural', 'de-DE-RalfNeural'
		]
	}
};

type LanguageOption = {
	code: string;
	name: string;
};

const LANGUAGE_OPTIONS: LanguageOption[] = [
	{ code: 'en-US', name: 'American English' },
	{ code: 'en-GB', name: 'British English' },
	{ code: 'es-ES', name: 'European Spanish' },
	{ code: 'zh-CN', name: 'Mandarin Chinese (Simplified)' },
	{ code: 'zh-TW', name: 'Mandarin Chinese (Traditional)' },
	{ code: 'de-DE', name: 'German' },
];

export {VOICE_OPTIONS, LANGUAGE_OPTIONS};
