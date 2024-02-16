// YourConfig.tsx

export type ThemeElements = {
	backgroundColorCover: string;
	backgroundColor: string;
	backgroundColorCoverImg0?: string;
	backgroundUrlCoverImg1?: string;
	backgroundUrlCoverImg0?: string;
	backgroundUrlCol_1_img_0?: string;
	backgroundUrlCol_2_img_0?: string;
	backgroundUrlCol_3_img_0?: string;
	backgroundUrlCol_1_img_1?: string;
	backgroundUrlCol_2_img_1?: string;
	backgroundUrlCol_2_img_2?: string;
	backgroundUrlCol_3_img_3?: string;
	titleFontCSS: React.CSSProperties;
	subtopicFontCSS: React.CSSProperties;
	contentFontCSS: React.CSSProperties;
	userNameFont: string;
	userNameFontColor: string;
	headFontCSS: React.CSSProperties;
	contentFontCSS_non_vertical_content: React.CSSProperties;
};

export type ThemeConfig = {
	Stanford: ThemeElements;
	Berkeley: ThemeElements;
	Harvard: ThemeElements;
	MIT: ThemeElements;
	Princeton: ThemeElements;
	Caltech: ThemeElements;
	Columbia: ThemeElements;
	JHU: ThemeElements;
	UChicago: ThemeElements;
	Yale: ThemeElements;
	UPenn: ThemeElements;
	Default: ThemeElements;
	Fun_Education_004: ThemeElements;
	Business_002: ThemeElements;
};

const themeConfigData: ThemeConfig = {
	Stanford: {
		backgroundColorCover: 'bg-[#8C1515]',
		backgroundColor: 'bg-[#F0E9E9]',
		titleFontCSS: {
			fontSize: '24pt', // text-3xl in points
			fontWeight: 'bold', // font-bold
			fontFamily: 'Nimbus Sans Bold', // font-nimbus-sans-bold
			lineHeight: 1.2, // leading-[110%] is equivalent to a line height of 1.1
			whiteSpace: 'nowrap', // whitespace-nowrap},
			color: '#8C1515', // text-[#8C1515] color
		},
		subtopicFontCSS: {
			opacity: 0.7, // opacity-70
			fontWeight: 'bold', // font-nimbus-sans-bold
			fontSize: '16pt', // text-xl in points
			fontStyle: 'normal', // font-normal
			lineHeight: 1.2, // leading-[150%] is equivalent to a line height of 1.5
			color: '#EF4444', // text-red-800 color
		},
		contentFontCSS: {
			fontSize: '12pt', // text-base in points (assuming 1rem is 1pt)
			fontWeight: 'normal', // font-normal
			fontFamily: 'Nimbus Sans Regular', // font-nimbus-sans-regular
			lineHeight: 1.2, // leading-9 is equivalent to a line height of 1.5
			color: '#4B5563', // text-zinc-800 color
			display: 'list-item',
		},
		userNameFont: 'text-sm font-nimbus-sans-regular font-normal leading-[120%]',
		userNameFontColor: 'text-white',
		headFontCSS: {
			fontSize: '32pt', // text-4xl in points (assuming 1rem is 1pt)
			fontWeight: 'bold', // font-bold
			fontFamily: 'Nimbus Sans Bold', // font-nimbus-sans-bold
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			color: '#FFFFFF', // text-white color
		},
		contentFontCSS_non_vertical_content: {
			fontSize: '12pt', // text-base in points (assuming 1rem is 1pt)
			fontWeight: 'normal', // font-normal
			fontFamily: 'Nimbus Sans Regular', // font-nimbus-sans-regular
			lineHeight: 1.2, // leading-9 is equivalent to a line height of 1.5
			color: '#4B5563', // text-zinc-800 color
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
			fontSize: '16pt', // text-xl in points (assuming 1rem is 1pt)
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
			display: 'list-item',
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
		contentFontCSS_non_vertical_content: {
			fontSize: '12pt', // text-base in points (assuming 1rem is 1pt)
			fontWeight: 'normal', // font-normal
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			fontFamily: 'sans-serif', // font-sans (assuming sans-serif as a default)
			color: '#1B1B1B', // text-[#1B1B1B] color
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
			fontFamily: 'Georgia', // font-['Georgia']
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			whiteSpace: 'nowrap', // whitespace-nowrap
			color: '#374151', // text-neutral-800 color
		},
		// subtopicFont: "text-xl font-bold font-['Arial'] leading-[120%]",
		// subtopicFontColor: 'text-neutral-700',
		subtopicFontCSS: {
			fontSize: '16pt', // Assuming 'xxl' represents 2.625rem (converted to points)
			fontWeight: 'bold', // font-bold
			fontFamily: 'Arial', // font-['Arial']
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
			fontFamily: 'Arial', // font-['Arial']
			lineHeight: 1.2, // leading-loose, assuming 'normal' or '1.5' depending on your design
			color: '#4A5568', // text-neutral-700 color
			display: 'list-item',
		},
		userNameFont: "opacity-70 text-sm font-normal font-['Arial'] leading-loose",
		userNameFontColor: 'text-neutral-700',
		// headFont: "text-4xl font-normal font-['Gorgia'] leading-[120%]",
		// headFontColor: 'text-neutral-800',
		headFontCSS: {
			fontSize: '32pt', // text-4xl in points (assuming 1rem is 1pt)
			fontWeight: 'normal', // font-normal
			fontFamily: 'Georgia', // font-['Gorgia']
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			color: '#374151', // text-neutral-800 color
		},
		contentFontCSS_non_vertical_content: {
			opacity: 0.7, // opacity-70
			fontSize: '12pt', // text-base in points (assuming 1rem is 1pt)
			fontWeight: 'normal', // font-normal
			fontFamily: 'Arial', // font-['Arial']
			lineHeight: 1.2, // leading-loose, assuming 'normal' or '1.5' depending on your design
			color: '#4A5568', // text-neutral-700 color
		},
	},
	MIT: {
		backgroundColorCover: 'bg-[#750014]',
		backgroundColor: 'bg-[#F0F0F2]',
		titleFontCSS: {
			fontSize: '24pt', // text-3xl in points
			fontWeight: 'bold', // font-bold
			fontFamily: 'Creato Display Medium', // font-creato-medium
			lineHeight: 1.2, // leading-[100%] is equivalent to a line height of 1},
			color: '#750014', // text-black color
		},
		subtopicFontCSS: {
			fontSize: '16pt', // text-xl in points
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Medium', // font-creato-medium
			textTransform: 'uppercase', // Uppercase for font style
			lineHeight: 1.2, // leading-[150%] is equivalent to a line height of 1.5
			letterSpacing: '0.15rem', // tracking-[0.15rem]},
			color: '#111827', // text-neutral-900 color
		},
		// contentFont:
		//   'text-opacity-70 text-base font-normal font-creato-medium leading-[140%] tracking-[0.025rem] ',
		// contentFontColor: 'text-neutral-900',
		contentFontCSS: {
			fontSize: '12pt', // base size sent from backend
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Regular', // font-creato-medium
			lineHeight: 1.2, // leading-[140%]
			letterSpacing: '0.025rem', // tracking-[0.025rem]
			color: '#111827', // text-neutral-900 color
			display: 'list-item',
		},
		userNameFont:
			'text-sm font-normal font-creato-medium leading-[140%] tracking-[0.026rem]',
		userNameFontColor: 'text-[#F0F0F2]',
		// headFont:
		//   'text-neutral-800 text-4xl font-normal font-creato-medium leading-[120%] tracking-tight',
		// headFontColor: 'text-neutral-800',
		headFontCSS: {
			fontSize: '32pt', // text-4xl in points
			fontWeight: 'bold', // font-normal
			fontFamily: 'Creato Display Medium', // font-creato-medium
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			letterSpacing: '-0.0125rem', // tracking-tight
			color: '#F0F0F2', // text-neutral-800 color},
		},

		contentFontCSS_non_vertical_content: {
			fontSize: '12pt', // base size sent from backend
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Regular', // font-creato-medium
			lineHeight: 1.2, // leading-[140%]
			letterSpacing: '0.025rem', // tracking-[0.025rem]
			color: '#111827', // text-neutral-900 color
		},
	},
	Princeton: {
		backgroundColorCover: 'bg-[#FF671F]',
		backgroundColor: 'bg-[#F0F0F2]',
		titleFontCSS: {
			fontSize: '24pt', // text-3xl in points
			fontWeight: 'bold', // font-bold
			fontFamily: 'Creato Display Medium', // font-creato-medium
			lineHeight: 1.2, // leading-[100%] is equivalent to a line height of 1},
			color: '#FF671F', // text-black color
		},

		subtopicFontCSS: {
			fontSize: '16pt', // text-xl in points
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Medium', // font-creato-medium
			textTransform: 'uppercase', // Uppercase for font style
			lineHeight: 1.2, // leading-[150%] is equivalent to a line height of 1.5
			letterSpacing: '0.15rem', // tracking-[0.15rem]},
			color: '#111827', // text-neutral-900 color
		},

		contentFontCSS: {
			fontSize: '12pt', // base size sent from backend
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Regular', // font-creato-medium
			lineHeight: 1.2, // leading-[140%]
			letterSpacing: '0.025rem', // tracking-[0.025rem]
			color: '#111827', // text-neutral-900 color
			display: 'list-item',
		},
		userNameFont:
			'text-sm font-normal font-creato-medium leading-[140%] tracking-[0.026rem]',
		userNameFontColor: 'text-[#000]',

		headFontCSS: {
			fontSize: '32pt', // text-4xl in points
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Medium', // font-creato-medium
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			letterSpacing: '-0.0125rem', // tracking-tight
			color: '#000', // text-neutral-800 color},
		},

		contentFontCSS_non_vertical_content: {
			fontSize: '12pt', // base size sent from backend
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Regular', // font-creato-medium
			lineHeight: 1.2, // leading-[140%]
			letterSpacing: '0.025rem', // tracking-[0.025rem]
			color: '#111827', // text-neutral-900 color
		},
	},
	Caltech: {
		backgroundColorCover: 'bg-[#F25422]',
		backgroundColor: 'bg-[#F0F0F2]',
		titleFontCSS: {
			fontSize: '24pt', // text-3xl in points
			fontWeight: 'bold', // font-bold
			fontFamily: 'Creato Display Medium', // font-creato-medium
			lineHeight: 1.2, // leading-[100%] is equivalent to a line height of 1},
			color: '#F25422', // text-black color
		},
		subtopicFontCSS: {
			fontSize: '16pt', // text-xl in points
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Medium', // font-creato-medium
			textTransform: 'uppercase', // Uppercase for font style
			lineHeight: 1.2, // leading-[150%] is equivalent to a line height of 1.5
			letterSpacing: '0.15rem', // tracking-[0.15rem]},
			color: '#111827', // text-neutral-900 color
		},

		contentFontCSS: {
			fontSize: '12pt', // base size sent from backend
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Regular', // font-creato-medium
			lineHeight: 1.2, // leading-[140%]
			letterSpacing: '0.025rem', // tracking-[0.025rem]
			color: '#111827', // text-neutral-900 color
			display: 'list-item',
		},
		userNameFont:
			'text-sm font-normal font-creato-medium leading-[140%] tracking-[0.026rem]',
		userNameFontColor: 'text-[#F0F0F2]',

		headFontCSS: {
			fontSize: '32pt', // text-4xl in points
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Medium', // font-creato-medium
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			letterSpacing: '-0.0125rem', // tracking-tight
			color: '#F0F0F2', // text-neutral-800 color},
		},

		contentFontCSS_non_vertical_content: {
			fontSize: '12pt', // base size sent from backend
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Regular', // font-creato-medium
			lineHeight: 1.2, // leading-[140%]
			letterSpacing: '0.025rem', // tracking-[0.025rem]
			color: '#111827', // text-neutral-900 color
		},
	},
	Columbia: {
		// color: '#1f2937',
		// fontWeight: 'bold',
		// fontSize: '27pt',
		backgroundColorCover: 'bg-[#B9D9EB]',
		backgroundColor: 'bg-[#B9D9EB]',
		// titleFont: 'text-3xl font-bold font-creato-medium leading-[100%] ',
		// titleFontColor: 'text-black',
		titleFontCSS: {
			fontSize: '24pt', // text-3xl in points
			fontWeight: 'bold', // font-bold
			fontFamily: 'Creato Display Medium', // font-creato-medium
			lineHeight: 1.2, // leading-[100%] is equivalent to a line height of 1},
			color: '#000', // text-black color
		},
		// subtopicFont:
		//   'text-xl font-normal font-creato-medium uppercase leading-[150%] tracking-[0.15rem]',
		// subtopicFontColor: 'text-neutral-900',
		subtopicFontCSS: {
			fontSize: '16pt', // text-xl in points
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Medium', // font-creato-medium
			textTransform: 'uppercase', // Uppercase for font style
			lineHeight: 1.2, // leading-[150%] is equivalent to a line height of 1.5
			letterSpacing: '0.15rem', // tracking-[0.15rem]},
			color: '#111827', // text-neutral-900 color
		},
		// contentFont:
		//   'text-opacity-70 text-base font-normal font-creato-medium leading-[140%] tracking-[0.025rem] ',
		// contentFontColor: 'text-neutral-900',
		contentFontCSS: {
			fontSize: '12pt', // base size sent from backend
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Regular', // font-creato-medium
			lineHeight: 1.2, // leading-[140%]
			letterSpacing: '0.025rem', // tracking-[0.025rem]
			color: '#111827', // text-neutral-900 color
			display: 'list-item',
		},
		userNameFont:
			'text-sm font-normal font-creato-medium leading-[140%] tracking-[0.026rem]',
		userNameFontColor: 'text-[#000]',
		// headFont:
		//   'text-neutral-800 text-4xl font-normal font-creato-medium leading-[120%] tracking-tight',
		// headFontColor: 'text-neutral-800',
		headFontCSS: {
			fontSize: '32pt', // text-4xl in points
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Medium', // font-creato-medium
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			letterSpacing: '-0.0125rem', // tracking-tight
			color: '#000', // text-neutral-800 color},
		},

		contentFontCSS_non_vertical_content: {
			fontSize: '12pt', // base size sent from backend
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Regular', // font-creato-medium
			lineHeight: 1.2, // leading-[140%]
			letterSpacing: '0.025rem', // tracking-[0.025rem]
			color: '#111827', // text-neutral-900 color
		},
	},
	JHU: {
		// color: '#1f2937',
		// fontWeight: 'bold',
		// fontSize: '27pt',
		backgroundColorCover: 'bg-[#002D72]',
		backgroundColor: 'bg-[#F0F0F2]',
		// titleFont: 'text-3xl font-bold font-creato-medium leading-[100%] ',
		// titleFontColor: 'text-black',
		titleFontCSS: {
			fontSize: '24pt', // text-3xl in points
			fontWeight: 'bold', // font-bold
			fontFamily: 'Creato Display Medium', // font-creato-medium
			lineHeight: 1.2, // leading-[100%] is equivalent to a line height of 1},
			color: '#002D72', // text-black color
		},
		// subtopicFont:
		//   'text-xl font-normal font-creato-medium uppercase leading-[150%] tracking-[0.15rem]',
		// subtopicFontColor: 'text-neutral-900',
		subtopicFontCSS: {
			fontSize: '16pt', // text-xl in points
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Medium', // font-creato-medium
			textTransform: 'uppercase', // Uppercase for font style
			lineHeight: 1.2, // leading-[150%] is equivalent to a line height of 1.5
			letterSpacing: '0.15rem', // tracking-[0.15rem]},
			color: '#111827', // text-neutral-900 color
		},
		// contentFont:
		//   'text-opacity-70 text-base font-normal font-creato-medium leading-[140%] tracking-[0.025rem] ',
		// contentFontColor: 'text-neutral-900',
		contentFontCSS: {
			fontSize: '12pt', // base size sent from backend
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Regular', // font-creato-medium
			lineHeight: 1.2, // leading-[140%]
			letterSpacing: '0.025rem', // tracking-[0.025rem]
			color: '#111827', // text-neutral-900 color
			display: 'list-item',
		},
		userNameFont:
			'text-sm font-normal font-creato-medium leading-[140%] tracking-[0.026rem]',
		userNameFontColor: 'text-[#F0F0F2]',
		// headFont:
		//   'text-neutral-800 text-4xl font-normal font-creato-medium leading-[120%] tracking-tight',
		// headFontColor: 'text-neutral-800',
		headFontCSS: {
			fontSize: '32pt', // text-4xl in points
			fontWeight: 'bold', // font-normal
			fontFamily: 'Creato Display Medium', // font-creato-medium
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			letterSpacing: '-0.0125rem', // tracking-tight
			color: '#F0F0F2', // text-neutral-800 color},
		},

		contentFontCSS_non_vertical_content: {
			fontSize: '12pt', // base size sent from backend
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Regular', // font-creato-medium
			lineHeight: 1.2, // leading-[140%]
			letterSpacing: '0.025rem', // tracking-[0.025rem]
			color: '#111827', // text-neutral-900 color
		},
	},
	UChicago: {
		backgroundColorCover: 'bg-[#800]',
		backgroundColor: 'bg-[#F0F0F2]',
		titleFontCSS: {
			fontSize: '24pt', // text-3xl in points
			fontWeight: 'bold', // font-bold
			fontFamily: 'Creato Display Medium', // font-creato-medium
			lineHeight: 1.2, // leading-[100%] is equivalent to a line height of 1},
			color: '#800', // text-black color
		},

		subtopicFontCSS: {
			fontSize: '16pt', // text-xl in points
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Medium', // font-creato-medium
			textTransform: 'uppercase', // Uppercase for font style
			lineHeight: 1.2, // leading-[150%] is equivalent to a line height of 1.5
			letterSpacing: '0.15rem', // tracking-[0.15rem]},
			color: '#111827', // text-neutral-900 color
		},

		contentFontCSS: {
			fontSize: '12pt', // base size sent from backend
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Regular', // font-creato-medium
			lineHeight: 1.2, // leading-[140%]
			letterSpacing: '0.025rem', // tracking-[0.025rem]
			color: '#111827', // text-neutral-900 color
			display: 'list-item',
		},
		userNameFont:
			'text-sm font-normal font-creato-medium leading-[140%] tracking-[0.026rem]',
		userNameFontColor: 'text-[#F0F0F2]',
		// headFont:
		//   'text-neutral-800 text-4xl font-normal font-creato-medium leading-[120%] tracking-tight',
		// headFontColor: 'text-neutral-800',
		headFontCSS: {
			fontSize: '32pt', // text-4xl in points
			fontWeight: 'bold', // font-normal
			fontFamily: 'Creato Display Medium', // font-creato-medium
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			letterSpacing: '-0.0125rem', // tracking-tight
			color: '#F0F0F2', // text-neutral-800 color},
		},

		contentFontCSS_non_vertical_content: {
			fontSize: '12pt', // base size sent from backend
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Regular', // font-creato-medium
			lineHeight: 1.2, // leading-[140%]
			letterSpacing: '0.025rem', // tracking-[0.025rem]
			color: '#111827', // text-neutral-900 color
		},
	},
	Yale: {
		backgroundColorCover: 'bg-[#03346A]',
		backgroundColor: 'bg-[#F0F0F2]',

		titleFontCSS: {
			fontSize: '24pt', // text-3xl in points
			fontWeight: 'bold', // font-bold
			fontFamily: 'Creato Display Medium', // font-creato-medium
			lineHeight: 1.2, // leading-[100%] is equivalent to a line height of 1},
			color: '#03346A', // text-black color
		},

		subtopicFontCSS: {
			fontSize: '16pt', // text-xl in points
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Medium', // font-creato-medium
			textTransform: 'uppercase', // Uppercase for font style
			lineHeight: 1.2, // leading-[150%] is equivalent to a line height of 1.5
			letterSpacing: '0.15rem', // tracking-[0.15rem]},
			color: '#111827', // text-neutral-900 color
		},

		contentFontCSS: {
			fontSize: '12pt', // base size sent from backend
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Regular', // font-creato-medium
			lineHeight: 1.2, // leading-[140%]
			letterSpacing: '0.025rem', // tracking-[0.025rem]
			color: '#111827', // text-neutral-900 color
			display: 'list-item',
		},
		userNameFont:
			'text-sm font-normal font-creato-medium leading-[140%] tracking-[0.026rem]',
		userNameFontColor: 'text-[#F0F0F2]',

		headFontCSS: {
			fontSize: '32pt', // text-4xl in points
			fontWeight: 'bold', // font-normal
			fontFamily: 'Creato Display Medium', // font-creato-medium
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			letterSpacing: '-0.0125rem', // tracking-tight
			color: '#F0F0F2', // text-neutral-800 color},
		},

		contentFontCSS_non_vertical_content: {
			fontSize: '12pt', // base size sent from backend
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Regular', // font-creato-medium
			lineHeight: 1.2, // leading-[140%]
			letterSpacing: '0.025rem', // tracking-[0.025rem]
			color: '#111827', // text-neutral-900 color
		},
	},
	UPenn: {
		backgroundColorCover: 'bg-[#011F5B]',
		backgroundColor: 'bg-[#F0F0F2]',
		titleFontCSS: {
			fontSize: '24pt', // text-3xl in points
			fontWeight: 'bold', // font-bold
			fontFamily: 'Creato Display Medium', // font-creato-medium
			lineHeight: 1.2, // leading-[100%] is equivalent to a line height of 1},
			color: '#011F5B', // text-black color
		},
		subtopicFontCSS: {
			fontSize: '16pt', // text-xl in points
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Medium', // font-creato-medium
			textTransform: 'uppercase', // Uppercase for font style
			lineHeight: 1.2, // leading-[150%] is equivalent to a line height of 1.5
			letterSpacing: '0.15rem', // tracking-[0.15rem]},
			color: '#111827', // text-neutral-900 color
		},
		contentFontCSS: {
			fontSize: '12pt', // base size sent from backend
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Regular', // font-creato-medium
			lineHeight: 1.2, // leading-[140%]
			letterSpacing: '0.025rem', // tracking-[0.025rem]
			color: '#111827', // text-neutral-900 color
			display: 'list-item',
		},
		userNameFont:
			'text-sm font-normal font-creato-medium leading-[140%] tracking-[0.026rem]',
		userNameFontColor: 'text-[#F0F0F2]',

		headFontCSS: {
			fontSize: '32pt', // text-4xl in points
			fontWeight: 'bold', // font-normal
			fontFamily: 'Creato Display Medium', // font-creato-medium
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			letterSpacing: '-0.0125rem', // tracking-tight
			color: '#F0F0F2', // text-neutral-800 color},
		},

		contentFontCSS_non_vertical_content: {
			fontSize: '12pt', // base size sent from backend
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Regular', // font-creato-medium
			lineHeight: 1.2, // leading-[140%]
			letterSpacing: '0.025rem', // tracking-[0.025rem]
			color: '#111827', // text-neutral-900 color
		},
	},
	Default: {
		backgroundColorCover: 'bg-[#F0F0F2]',
		backgroundColor: 'bg-[#F0F0F2]',
		// backgroundUrlCover: 'https://via.placeholder.com/1200x800',
		titleFontCSS: {
			fontSize: '24pt', // text-3xl in points
			fontWeight: 'bold', // font-bold
			fontFamily: 'Creato Display Bold', // font-creato-medium
			lineHeight: 1.2, // leading-[100%] is equivalent to a line height of 1},
			color: '#000', // text-black color
		},

		subtopicFontCSS: {
			fontSize: '16pt', // text-xl in points
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Medium', // font-creato-medium
			textTransform: 'uppercase', // Uppercase for font style
			lineHeight: 1.2, // leading-[150%] is equivalent to a line height of 1.5
			letterSpacing: '0.15rem', // tracking-[0.15rem]},
			color: '#111827', // text-neutral-900 color
		},
		contentFontCSS: {
			fontSize: '12pt', // base size sent from backend
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Regular', // font-creato-medium
			lineHeight: 1.2, // leading-[140%]
			letterSpacing: '0.025rem', // tracking-[0.025rem]
			color: '#111827', // text-neutral-900 color
			display: 'list-item',
		},
		userNameFont:
			'text-sm font-normal font-creato-medium leading-[140%] tracking-[0.026rem]',
		userNameFontColor: 'text-[#3D3D3D]',

		headFontCSS: {
			fontSize: '40pt', // text-4xl in points
			fontWeight: 'bold', // font-normal
			fontFamily: 'Creato Display Bold', // font-creato-medium
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			letterSpacing: '-0.0125rem', // tracking-tight
			color: '#374151', // text-neutral-800 color},
		},

		contentFontCSS_non_vertical_content: {
			fontSize: '12pt', // base size sent from backend
			fontWeight: 'normal', // font-normal
			fontFamily: 'Creato Display Regular', // font-creato-medium
			lineHeight: 1.2, // leading-[140%]
			letterSpacing: '0.025rem', // tracking-[0.025rem]
			color: '#111827', // text-neutral-900 color
		},
	},
	Fun_Education_004: {
		backgroundUrlCoverImg1:
			'/images/template/Fun_Education_004/BackgroundElements.png',
		backgroundUrlCoverImg0:
			'/images/template/Fun_Education_004/BackgroundElements.png',
		backgroundUrlCol_1_img_0:
			'/images/template/Fun_Education_004/BackgroundElementsCol1_2_3_img_0.png',
		backgroundUrlCol_2_img_0:
			'/images/template/Fun_Education_004/BackgroundElementsCol1_2_3_img_0.png',
		backgroundUrlCol_3_img_0:
			'/images/template/Fun_Education_004/BackgroundElementsCol1_2_3_img_0.png',
		backgroundUrlCol_2_img_1:
			'/images/template/Fun_Education_004/BackgroundElementsCol_2_img_1.png',
		backgroundUrlCol_1_img_1:
			'/images/template/Fun_Education_004/BackgroundElementsCol_1_img_1.png',
		backgroundUrlCol_2_img_2:
			'/images/template/Fun_Education_004/BackgroundElementsCol_2_img_2.png',
		backgroundUrlCol_3_img_3:
			'/images/template/Fun_Education_004/BackgroundElementsCol_3_img_3.png',

		backgroundColorCover: 'bg-[#FFFFFF]', //Lin: with a background image and shapes of color #01B99F, #4747F3, #FFC8FF, #FF846C, #FECEB7
		backgroundColor: 'bg-[#FFFFFF]', //Lin: Text box color #E4F9F6, shapes of color #01B99F, #4747F3, #FFC8FF, #FF846C, #FECEB7
		backgroundColorCoverImg0: '#ACEAE1',
		titleFontCSS: {
			fontSize: '24pt', // text-3xl in points
			fontWeight: 'bold', // font-bold,(Lin: 700)
			fontFamily: 'Caveat', // font-nimbus-sans-bold
			lineHeight: 1.2, // leading-[110%] is equivalent to a line height of 1.1
			whiteSpace: 'nowrap', // whitespace-nowrap},
			color: '#4B4B4B', // text-[#8C1515] color
		},
		subtopicFontCSS: {
			opacity: 1, // opacity-70
			fontWeight: 'normal', // font-nimbus-sans-bold (Lin: 500)
			fontFamily: 'Helvetica Neue', // font-nimbus-sans-bold
			fontSize: '16pt', // text-xl in points
			fontStyle: 'normal', // font-normal
			lineHeight: 1, // leading-[150%] is equivalent to a line height of 1.5
			color: '#BCBCBC', // text-red-800 color
		},
		contentFontCSS: {
			fontSize: '12pt', // text-base in points (assuming 1rem is 1pt)
			fontWeight: 'normal', // font-normal (Lin: 400)
			fontFamily: 'Helvetica Neue', // font-nimbus-sans-regular
			lineHeight: 1.3, // leading-9 is equivalent to a line height of 1.5
			color: '#4B4B4B', // text-zinc-800 color
			display: 'list-item',
		},
		userNameFont: 'text-sm font-creato-regular  font-normal leading-[100%]',
		userNameFontColor: 'text-[#868686]', //(Lin: color #868686)
		headFontCSS: {
			fontSize: '48pt', // text-4xl in points (assuming 1rem is 1pt)
			fontWeight: 'normal', // font-bold, (Lin: 700)
			fontFamily: 'Caveat', // font-nimbus-sans-bold
			lineHeight: 1.2, // leading-[120%] is equivalent to a line height of 1.2
			color: '#2E2E2E', // text-white color
		},
		contentFontCSS_non_vertical_content: {
			fontSize: '12pt', // text-base in points (assuming 1rem is 1pt)
			fontWeight: 'normal', // font-normal
			fontFamily: 'Helvetica Neue', // font-nimbus-sans-regular
			lineHeight: 1.3, // leading-9 is equivalent to a line height of 1.5
			color: '#4B4B4B', // text-zinc-800 color
		},
	},
	Business_002: {
		backgroundUrlCoverImg0:
			'/images/template/Business_002/cover_img_0_layout/BackgroundImg.png',
		backgroundColorCover: '',
		backgroundColor: 'bg-[#D2D2D2]',
		backgroundColorCoverImg0: '#2E2E2E',
		titleFontCSS: {
			fontSize: '24pt',
			fontWeight: 'bold',
			fontFamily: 'Big Shoulders Text',
			lineHeight: 1.2,
			whiteSpace: 'nowrap',
			color: '#2E2E2E',
		},
		subtopicFontCSS: {
			opacity: 1,
			fontWeight: 'bold',
			fontFamily: 'Arimo',
			fontSize: '16pt',
			fontStyle: 'normal',
			lineHeight: 1,
			color: '#6B7A2D',
		},
		contentFontCSS: {
			fontSize: '12pt',
			fontWeight: 'normal',
			fontFamily: 'Arimo',
			lineHeight: 1.3,
			color: '#2E2E2E',
			display: 'list-item',
		},
		userNameFont:
			'text-[16pt] font-Creato-Display-Medium font-normal leading-[100%]',
		userNameFontColor: 'text-[#6B7A2D]',
		headFontCSS: {
			fontSize: '48pt',
			fontWeight: 'bold',
			fontFamily: 'Big Shoulders Text',
			lineHeight: 1.2,
			color: '#2E2E2E',
		},
		contentFontCSS_non_vertical_content: {
			fontSize: '12pt',
			fontWeight: 'normal',
			fontFamily: 'Arimo',
			lineHeight: 1.3,
			color: '#2E2E2E',
		},
	},
};

export default themeConfigData;
