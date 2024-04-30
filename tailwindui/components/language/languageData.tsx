interface Language {
	displayName: string; // User-friendly name with flag emoji
	englishName: string; // Name of the language in English
	code: string; // Language code or identifier
	rtl?: boolean; // Right-to-left language
}

const LANGUAGES: Language[] = [
	{ displayName: '🇺🇸 English (US)', englishName: 'English', code: 'en-US' },
	{
		displayName: '🇬🇧 English (UK)',
		englishName: 'British English',
		code: 'en-GB',
	},
	{
		displayName: '🌎 Español (Latinoamérica)',
		englishName: 'Spanish',
		code: 'es-MX',
	},
	{
		displayName: '🇪🇸 Español (España)',
		englishName: 'Continental Spanish',
		code: 'es-ES',
	},
	{ displayName: '🇨🇳 中文 (中国大陆)', englishName: 'Chinese', code: 'zh-CN' },
	{
		displayName: '🇹🇼 中文 (臺灣)',
		englishName: 'Traditional Chinese',
		code: 'zh-TW',
	},
	{ displayName: '🇩🇪 Deutsch', englishName: 'German', code: 'de-DE' },
	{ displayName: '🇫🇷 Français', englishName: 'French', code: 'fr-FR' },
	{ displayName: '🇷🇺 Русский', englishName: 'Russian', code: 'ru-RU' },
	{ displayName: '🇺🇦 Українська', englishName: 'Ukrainian', code: 'uk-UA' },
	{
		displayName: '🇧🇷 Português (Brasil)',
		englishName: 'Brazilian Portuguese',
		code: 'pt-BR',
	},
	{ displayName: '🇵🇹 Português', englishName: 'Portuguese', code: 'pt-PT' },
	{ displayName: '🇮🇹 Italiano', englishName: 'Italian', code: 'it-IT' },
	{ displayName: '🇮🇳 हिन्दी', englishName: 'Hindi', code: 'hi-IN' },
	{ displayName: '🇯🇵 日本語', englishName: 'Japanese', code: 'ja-JP' },
	{ displayName: '🇰🇷 한국어', englishName: 'Korean', code: 'ko-KR' },
	{
		displayName: 'العربية 🇸🇦',
		englishName: 'Arabic',
		code: 'ar-SA',
		rtl: true,
	},
	{ displayName: 'עברית 🇮🇱', englishName: 'Hebrew', code: 'he-IL', rtl: true },
	{ displayName: '🇳🇱 Nederlands', englishName: 'Dutch', code: 'nl-NL' },
	// { displayName: "🇳🇴 Norsk", englishName: "Norwegian", code: "no-NO" },
	{ displayName: '🇭🇷 Hrvatski', englishName: 'Croatian', code: 'hr-HR' },
	{ displayName: '🇹🇭 ไทย', englishName: 'Thai', code: 'th-TH' },
	{ displayName: '🇻🇳 Tiếng Việt', englishName: 'Vietnamese', code: 'vi-VN' },
	// Add more languages as needed...
	// danish
	{ displayName: '🇩🇰 Dansk', englishName: 'Danish', code: 'da-DK' },
	// indonesian
	{
		displayName: '🇮🇩 Bahasa Indonesia',
		englishName: 'Indonesian',
		code: 'id-ID',
	},
];

const ACCENTS: Language[] = [
	// english global
	{
		displayName: '🗺️ English (Global)',
		englishName: 'English (Global)',
		code: 'en-Global',
	},
	// french global
	{
		displayName: '🌍 Français (Mondial)',
		englishName: 'French (Global)',
		code: 'fr-Global',
	},
	{ displayName: '🇭🇰 粵語', englishName: 'Catonese', code: 'zh-HK' },
];

export const LANGUAGES_WITH_ACCENTS: Language[] = [...ACCENTS, ...LANGUAGES];

export default LANGUAGES;
