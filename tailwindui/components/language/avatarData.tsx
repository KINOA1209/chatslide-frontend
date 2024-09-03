export type AVATAR_ID = 'harry' | 'jeff' | 'max' | 'lisa' | 'meg' | 'lori';

export const GENDER_AVATAR = {
	male: ['harry', 'jeff', 'max'],
	female: ['lisa', 'meg', 'lori'],
} as const;

export const AVATAR_POSTURE = {
	harry: ['business', 'casual', 'youthful'],
	jeff: ['business', 'formal'],
	max: ['business', 'casual', 'formal'],
	lisa: [
		'casual-sitting',
		'graceful-sitting',
		'graceful-standing',
		'technical-sitting',
		'technical-standing',
	],
	meg: ['business', 'casual', 'formal'],
	lori: ['casual', 'formal', 'graceful'],
} as const;

export const AVATAR_NAMES: Record<AVATAR_ID, string> = {
	harry: '👨 Harry',
	jeff: '👨 Jeff',
	max: '👨 Max',
	lisa: '👩 Lisa',
	meg: '👩 Meg',
	lori: '👩 Lori',
	// 'your own': '👤 Your Own (coming)',
};

export const POSTURE_NAMES: { [key: string]: string } = {
	business: 'Business',
	casual: 'Casual',
	youthful: 'Youthful',
	formal: 'Formal',
	'casual-sitting': 'Casual Sitting',
	'graceful-sitting': 'Graceful Sitting',
	'graceful-standing': 'Graceful Standing',
	'technical-sitting': 'Technical Sitting',
	'technical-standing': 'Technical Standing',
	graceful: 'Graceful',
};

export const POSITION_NAMES: { [key: string]: string } = {
	'bottom-right': 'Bottom Right',
	'bottom-left': 'Bottom Left',
	// 'top-right': 'Top Right',
	// 'top-left': 'Top Left',
	// 'bottom-middle': 'Bottom Middle',
	// 'top-middle': 'Top Middle'
};

export const SIZE_NAMES: { [key: string]: string } = {
	small: 'Small',
	medium: 'Medium',
	large: 'Large',
};
