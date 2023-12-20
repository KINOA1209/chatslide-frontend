// YourConfig.tsx

export type TemplateElements = {
	backgroundColorCover: string;
	backgroundColor: string;
	titleFontCSS: React.CSSProperties;
	subtopicFontCSS: React.CSSProperties;
	contentFontCSS: React.CSSProperties;
	userNameFont: string;
	userNameFontColor: string;
	headFontCSS: React.CSSProperties;
};

type Config = {
	Stanford: TemplateElements;
	Berkeley: TemplateElements;
	Harvard: TemplateElements;
	MIT: TemplateElements;
	Princeton: TemplateElements;
	Caltech: TemplateElements;
	Columbia: TemplateElements;
	Default: TemplateElements;
};

const configData: Config = {
	Stanford: {
		backgroundColorCover: 'bg-[#8C1515]',
		backgroundColor: 'bg-[#F0E9E9]',
		// titleFont:
		//   'text-3xl font-nimbus-sans-bold font-bold leading-[110%] whitespace-nowrap',
		// titleFontColor: 'text-[#8C1515]',
		titleFontCSS: {
			fontSize: '24pt', // text-3xl in points
			fontWeight: 'bold', // font-bold
			fontFamily: "'nimbus-sans-bold', sans-serif", // font-nimbus-sans-bold
			lineHeight: 1.2, // leading-[110%] is equivalent to a line height of 1.1
			whiteSpace: 'nowrap', // whitespace-nowrap},
			color: '#8C1515', // text-[#8C1515] color
		},
		// subtopicFont:
		//   'opacity-70 font-nimbus-sans-bold text-opacity-40 text-xl font-normal leading-[150%]',
		// subtopicFontColor: 'text-red-800',
		subtopicFontCSS: {
			opacity: 0.7, // opacity-70
			fontWeight: 'bold', // font-nimbus-sans-bold
			fontSize: '18pt', // text-xl in points
			fontStyle: 'normal', // font-normal
			lineHeight: 1.2, // leading-[150%] is equivalent to a line height of 1.5
			color: '#EF4444', // text-red-800 color
		},
		// contentFont: 'text-base font-nimbus-sans-regular font-normal leading-9 ',
		// contentFontColor: 'text-zinc-800',
		contentFontCSS: {
			fontSize: '12pt', // text-base in points (assuming 1rem is 1pt)
			fontWeight: 'normal', // font-normal
			fontFamily: "'nimbus-sans-regular', sans-serif", // font-nimbus-sans-regular
			lineHeight: 1.2, // leading-9 is equivalent to a line height of 1.5
			color: '#4B5563', // text-zinc-800 color
		},
		userNameFont: 'text-sm font-nimbus-sans-regular font-normal leading-[120%]',
		userNameFontColor: 'text-white',
		// headFont: 'text-4xl font-nimbus-sans-bold font-bold leading-[120%]',
		// headFontColor: 'text-white',
		headFontCSS: {
			fontSize: '32pt', // text-4xl in points (assuming 1rem is 1pt)
			fontWeight: 'bold', // font-bold
			fontFamily: "'nimbus-sans-bold', sans-serif", // font-nimbus-sans-bold
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			color: '#FFFFFF', // text-white color
		},
	},
	Berkeley: {
		backgroundColorCover: 'bg-[#003262]',
		backgroundColor: 'bg-[#F0F2F5]',
		// titleFont: 'text-3xl leading-[120%] font-sans font-bold whitespace-nowrap',
		// titleFontColor: 'text-[#003262]',
		titleFontCSS: {
			fontSize: '24pt', // text-3xl in points (assuming 1rem is 1pt)
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			fontWeight: 'bold', // font-bold
			fontFamily: 'sans-serif', // font-sans (assuming sans-serif as a default)
			whiteSpace: 'nowrap', // whitespace-nowrap
			color: '#003262', // text-[#003262] color
		},
		// subtopicFont: 'text-xl font-semibold leading-[120%] font-sans',
		// subtopicFontColor: 'text-[#525252]',
		subtopicFontCSS: {
			fontSize: '18pt', // text-xl in points (assuming 1rem is 1pt)
			fontWeight: 'bold', // font-semibold
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			fontFamily: 'sans-serif', // font-sans (assuming sans-serif as a default)
			color: '#525252', // text-[#525252] color
		},
		// contentFont: 'text-base font-normal font-sans leading-[120%]',
		// contentFontColor: 'text-[#1B1B1B]',
		contentFontCSS: {
			fontSize: '12pt', // text-base in points (assuming 1rem is 1pt)
			fontWeight: 'normal', // font-normal
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			fontFamily: 'sans-serif', // font-sans (assuming sans-serif as a default)
			color: '#1B1B1B', // text-[#1B1B1B] color
		},
		userNameFont: 'text-sm font-normal font-sans leading-[120%]',
		userNameFontColor: 'text-white',
		// headFont: 'text-4xl font-bold font-sans leading-[120%]',
		// headFontColor: 'text-white',
		headFontCSS: {
			fontSize: '32pt', // text-4xl in points (assuming 1rem is 1pt)
			fontWeight: 'bold', // font-bold
			fontFamily: 'sans-serif', // font-sans (assuming sans-serif as a default)
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			color: '#FFFFFF', // text-white color
		},
	},
	Harvard: {
		backgroundColorCover: 'bg-[#F0F0F2]',
		backgroundColor: 'bg-[#F0F0F2]',
		// titleFont:
		//   "text-3xl font-normal font-['Georgia'] leading-[120%] whitespace-nowrap",
		// titleFontColor: 'text-neutral-800 ',
		titleFontCSS: {
			fontSize: '24pt', // text-3xl in points (assuming 1rem is 1pt)
			fontWeight: 'normal', // font-normal
			fontFamily: 'Georgia, sans-serif', // font-['Georgia']
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			whiteSpace: 'nowrap', // whitespace-nowrap
			color: '#374151', // text-neutral-800 color
		},
		// subtopicFont: "text-xl font-bold font-['Arial'] leading-[120%]",
		// subtopicFontColor: 'text-neutral-700',
		subtopicFontCSS: {
			fontSize: '18pt', // Assuming 'xxl' represents 2.625rem (converted to points)
			fontWeight: 'bold', // font-bold
			fontFamily: 'Arial, sans-serif', // font-['Arial']
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			color: '#4A5568', // text-neutral-700 color
		},
		// contentFont:
		//   "opacity-70 text-base font-normal font-['Arial'] leading-loose",
		// contentFontColor: 'text-neutral-700 ',
		contentFontCSS: {
			opacity: 0.7, // opacity-70
			fontSize: '12pt', // text-base in points (assuming 1rem is 1pt)
			fontWeight: 'normal', // font-normal
			fontFamily: 'Arial, sans-serif', // font-['Arial']
			lineHeight: 'normal', // leading-loose, assuming 'normal' or '1.5' depending on your design
			color: '#4A5568', // text-neutral-700 color
		},
		userNameFont: "opacity-70 text-sm font-normal font-['Arial'] leading-loose",
		userNameFontColor: 'text-neutral-700',
		// headFont: "text-4xl font-normal font-['Gorgia'] leading-[120%]",
		// headFontColor: 'text-neutral-800',
		headFontCSS: {
			fontSize: '32pt', // text-4xl in points (assuming 1rem is 1pt)
			fontWeight: 'normal', // font-normal
			fontFamily: 'Georgia, sans-serif', // font-['Gorgia']
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			color: '#374151', // text-neutral-800 color
		},
	},
	MIT: {
		backgroundColorCover: 'bg-[#F0F0F2]',
		backgroundColor: 'bg-[#F0F0F2]',
		titleFontCSS: {
			fontSize: '24pt', // text-3xl in points
			fontWeight: 'bold', // font-bold
			fontFamily: "'creato-medium', sans-serif", // font-creato-medium
			lineHeight: 1, // leading-[100%] is equivalent to a line height of 1},
			color: '#000', // text-black color
		},
		subtopicFontCSS: {
			fontSize: '18pt', // text-xl in points
			fontWeight: 'normal', // font-normal
			fontFamily: "'creato-medium', sans-serif", // font-creato-medium
			textTransform: 'uppercase', // Uppercase for font style
			lineHeight: 1.5, // leading-[150%] is equivalent to a line height of 1.5
			letterSpacing: '0.15rem', // tracking-[0.15rem]},
			color: '#111827', // text-neutral-900 color
		},
		contentFontCSS: {
			fontSize: '12pt', // base size sent from backend
			fontWeight: 'normal', // font-normal
			fontFamily: "'creato-medium', sans-serif", // font-creato-medium
			lineHeight: 1.4, // leading-[140%]
			letterSpacing: '0.025rem', // tracking-[0.025rem]
			color: '#111827', // text-neutral-900 color
		},
		userNameFont:
			'text-sm font-normal font-creato-medium leading-[140%] tracking-[0.026rem]',
		userNameFontColor: 'text-[#3D3D3D]',
		headFontCSS: {
			fontSize: '32pt', // text-4xl in points
			fontWeight: 'normal', // font-normal
			fontFamily: "'creato-medium', sans-serif", // font-creato-medium
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			letterSpacing: '-0.0125rem', // tracking-tight
			color: '#374151', // text-neutral-800 color},
		},
	},
	Princeton: {
		backgroundColorCover: 'bg-[#F0F0F2]',
		backgroundColor: 'bg-[#F0F0F2]',
		titleFontCSS: {
			fontSize: '24pt', // text-3xl in points
			fontWeight: 'bold', // font-bold
			fontFamily: "'creato-medium', sans-serif", // font-creato-medium
			lineHeight: 1, // leading-[100%] is equivalent to a line height of 1},
			color: '#000', // text-black color
		},
		subtopicFontCSS: {
			fontSize: '18pt', // text-xl in points
			fontWeight: 'normal', // font-normal
			fontFamily: "'creato-medium', sans-serif", // font-creato-medium
			textTransform: 'uppercase', // Uppercase for font style
			lineHeight: 1.5, // leading-[150%] is equivalent to a line height of 1.5
			letterSpacing: '0.15rem', // tracking-[0.15rem]},
			color: '#111827', // text-neutral-900 color
		},
		contentFontCSS: {
			fontSize: '12pt', // base size sent from backend
			fontWeight: 'normal', // font-normal
			fontFamily: "'creato-medium', sans-serif", // font-creato-medium
			lineHeight: 1.4, // leading-[140%]
			letterSpacing: '0.025rem', // tracking-[0.025rem]
			color: '#111827', // text-neutral-900 color
		},
		userNameFont:
			'text-sm font-normal font-creato-medium leading-[140%] tracking-[0.026rem]',
		userNameFontColor: 'text-[#3D3D3D]',
		headFontCSS: {
			fontSize: '32pt', // text-4xl in points
			fontWeight: 'normal', // font-normal
			fontFamily: "'creato-medium', sans-serif", // font-creato-medium
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			letterSpacing: '-0.0125rem', // tracking-tight
			color: '#374151', // text-neutral-800 color},
		},
	},
	Caltech: {
		backgroundColorCover: 'bg-[#F0F0F2]',
		backgroundColor: 'bg-[#F0F0F2]',
		titleFontCSS: {
			fontSize: '24pt', // text-3xl in points
			fontWeight: 'bold', // font-bold
			fontFamily: "'creato-medium', sans-serif", // font-creato-medium
			lineHeight: 1, // leading-[100%] is equivalent to a line height of 1},
			color: '#000', // text-black color
		},
		subtopicFontCSS: {
			fontSize: '18pt', // text-xl in points
			fontWeight: 'normal', // font-normal
			fontFamily: "'creato-medium', sans-serif", // font-creato-medium
			textTransform: 'uppercase', // Uppercase for font style
			lineHeight: 1.5, // leading-[150%] is equivalent to a line height of 1.5
			letterSpacing: '0.15rem', // tracking-[0.15rem]},
			color: '#111827', // text-neutral-900 color
		},
		contentFontCSS: {
			fontSize: '12pt', // base size sent from backend
			fontWeight: 'normal', // font-normal
			fontFamily: "'creato-medium', sans-serif", // font-creato-medium
			lineHeight: 1.4, // leading-[140%]
			letterSpacing: '0.025rem', // tracking-[0.025rem]
			color: '#111827', // text-neutral-900 color
		},
		userNameFont:
			'text-sm font-normal font-creato-medium leading-[140%] tracking-[0.026rem]',
		userNameFontColor: 'text-[#3D3D3D]',
		headFontCSS: {
			fontSize: '32pt', // text-4xl in points
			fontWeight: 'normal', // font-normal
			fontFamily: "'creato-medium', sans-serif", // font-creato-medium
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			letterSpacing: '-0.0125rem', // tracking-tight
			color: '#374151', // text-neutral-800 color},
		},
	},
	Columbia: {
		backgroundColorCover: 'bg-[#F0F0F2]',
		backgroundColor: 'bg-[#F0F0F2]',
		titleFontCSS: {
			fontSize: '24pt', // text-3xl in points
			fontWeight: 'bold', // font-bold
			fontFamily: "'creato-medium', sans-serif", // font-creato-medium
			lineHeight: 1, // leading-[100%] is equivalent to a line height of 1},
			color: '#000', // text-black color
		},
		subtopicFontCSS: {
			fontSize: '18pt', // text-xl in points
			fontWeight: 'normal', // font-normal
			fontFamily: "'creato-medium', sans-serif", // font-creato-medium
			textTransform: 'uppercase', // Uppercase for font style
			lineHeight: 1.5, // leading-[150%] is equivalent to a line height of 1.5
			letterSpacing: '0.15rem', // tracking-[0.15rem]},
			color: '#111827', // text-neutral-900 color
		},
		contentFontCSS: {
			fontSize: '12pt', // base size sent from backend
			fontWeight: 'normal', // font-normal
			fontFamily: "'creato-medium', sans-serif", // font-creato-medium
			lineHeight: 1.4, // leading-[140%]
			letterSpacing: '0.025rem', // tracking-[0.025rem]
			color: '#111827', // text-neutral-900 color
		},
		userNameFont:
			'text-sm font-normal font-creato-medium leading-[140%] tracking-[0.026rem]',
		userNameFontColor: 'text-[#3D3D3D]',
		headFontCSS: {
			fontSize: '32pt', // text-4xl in points
			fontWeight: 'normal', // font-normal
			fontFamily: "'creato-medium', sans-serif", // font-creato-medium
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			letterSpacing: '-0.0125rem', // tracking-tight
			color: '#374151', // text-neutral-800 color},
		},
	},
	Default: {
		// color: '#1f2937',
		// fontWeight: 'bold',
		// fontSize: '27pt',
		backgroundColorCover: 'bg-[#F0F0F2]',
		backgroundColor: 'bg-[#F0F0F2]',
		// titleFont: 'text-3xl font-bold font-creato-medium leading-[100%] ',
		// titleFontColor: 'text-black',
		titleFontCSS: {
			fontSize: '24pt', // text-3xl in points
			fontWeight: 'bold', // font-bold
			fontFamily: "'creato-medium', sans-serif", // font-creato-medium
			lineHeight: 1.5, // leading-[100%] is equivalent to a line height of 1},
			color: '#000', // text-black color
		},
		// subtopicFont:
		//   'text-xl font-normal font-creato-medium uppercase leading-[150%] tracking-[0.15rem]',
		// subtopicFontColor: 'text-neutral-900',
		subtopicFontCSS: {
			fontSize: '18pt', // text-xl in points
			fontWeight: 'normal', // font-normal
			fontFamily: "'creato-medium', sans-serif", // font-creato-medium
			textTransform: 'uppercase', // Uppercase for font style
			lineHeight: 1.5, // leading-[150%] is equivalent to a line height of 1.5
			letterSpacing: '0.15rem', // tracking-[0.15rem]},
			color: '#111827', // text-neutral-900 color
		},
		// contentFont:
		//   'text-opacity-70 text-base font-normal font-creato-medium leading-[140%] tracking-[0.025rem] ',
		// contentFontColor: 'text-neutral-900',
		contentFontCSS: {
			fontSize: '12pt', // base size sent from backend
			fontWeight: 'normal', // font-normal
			fontFamily: "'creato-medium', sans-serif", // font-creato-medium
			lineHeight: 1.2, // leading-[140%]
			letterSpacing: '0.025rem', // tracking-[0.025rem]
			color: '#111827', // text-neutral-900 color
		},
		userNameFont:
			'text-sm font-normal font-creato-medium leading-[140%] tracking-[0.026rem]',
		userNameFontColor: 'text-[#3D3D3D]',
		// headFont:
		//   'text-neutral-800 text-4xl font-normal font-creato-medium leading-[120%] tracking-tight',
		// headFontColor: 'text-neutral-800',
		headFontCSS: {
			fontSize: '32pt', // text-4xl in points
			fontWeight: 'normal', // font-normal
			fontFamily: "'creato-medium', sans-serif", // font-creato-medium
			lineHeight: 1.5, // leading-[120%] is equivalent to a line height of 1.2
			letterSpacing: '-0.0125rem', // tracking-tight
			color: '#374151', // text-neutral-800 color},
		},
	},
};

export default configData;
