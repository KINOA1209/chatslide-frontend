import { RadioButtonOption } from "@/components/ui/RadioButton";

export const imageLicenseOptions: RadioButtonOption[] = [
	{
		value: 'stock',
		text: 'Stock',
		explanation: 'Generic, high quality',
	},
	{
		value: 'creative',
		text: 'Creative',
		explanation: 'Wide range',
	},
	{
		value: 'all',
		text: 'All',
		explanation: 'Wider range, personal use',
	},
	{
		value: 'illustration',
		text: 'Illustration',
		explanation: 'Small set of illustration images',
	},
];


export const extendedImageLicenseOptions: RadioButtonOption[] = [
	...imageLicenseOptions,
	{
		value: 'giphy',
		text: 'Gif',
	},
	{
		value: 'icon',
		text: 'Icon',
	},
];

export const imageColorOptions: RadioButtonOption[] = [
	// green, red, yellow, purple, blue
	{
		value: '',
		text: '🌈 All',
	},
	{
		value: 'red',
		text: '🔴 Red',
	},
	{
		value: 'purple',
		text: '🟣 Purple',
	},
	{
		value: 'blue',
		text: '🔵 Blue',
	},
	{
		value: 'green',
		text: '🟢 Green',
	},
	{
		value: 'yellow',
		text: '🟡 Yellow',
	},
];
