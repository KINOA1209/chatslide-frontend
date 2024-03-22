interface Language {
	displayName: string; // User-friendly name with flag emoji
	englishName: string; // Name of the language in English
	code: string; // Language code or identifier
}

const LANGUAGES: Language[] = [
	{ displayName: "🇺🇸 English (United States)", englishName: "English", code: "en-US" },
	{ displayName: "🇬🇧 English (British)", englishName: "British English", code: "en-GB" },
	{ displayName: "🌎 Español (Latinoamérica)", englishName: "Spanish", code: "es-MX" },
	{ displayName: "🇪🇸 Español (España)", englishName: "Continental Spanish", code: "es-ES" },
	{ displayName: "🇨🇳 中文 (简体)", englishName: "Chinese", code: "zh-CN" },
	{ displayName: "🇹🇼 中文 (繁體)", englishName: "Traditional Chinese", code: "zh-TW" },
	{ displayName: "🇩🇪 Deutsch", englishName: "German", code: "de-DE" },
	{ displayName: "🇫🇷 Français", englishName: "French", code: "fr-FR" },
	{ displayName: "🇷🇺 Русский", englishName: "Russian", code: "ru-RU" },
	{ displayName: "🇺🇦 Українська", englishName: "Ukrainian", code: "uk-UA" },
	{ displayName: "🇧🇷 Português (Brasil)", englishName: "Brazilian Portuguese", code: "pt-BR" },
	{ displayName: "🇵🇹 Português", englishName: "Portuguese", code: "pt-PT" },
	{ displayName: "🇮🇹 Italiano", englishName: "Italian", code: "it-IT" },
	{ displayName: "🇮🇳 हिन्दी", englishName: "Hindi", code: "hi-IN" },
	{ displayName: "🇯🇵 日本語", englishName: "Japanese", code: "ja-JP" },
	{ displayName: "🇰🇷 한국어", englishName: "Korean", code: "ko-KR" },
	{ displayName: "🇸🇦 العربية", englishName: "Arabic", code: "ar-SA" },
	{ displayName: "🇮🇱 עברית", englishName: "Hebrew", code: "he-IL" },
	{ displayName: "🇳🇱 Nederlands", englishName: "Dutch", code: "nl-NL" },
	{ displayName: "🇳🇴 Norsk", englishName: "Norwegian", code: "no-NO" },
	{ displayName: "🇭🇷 Hrvatski", englishName: "Croatian", code: "hr-HR" },
	// Add more languages as needed...
];

export default LANGUAGES;
