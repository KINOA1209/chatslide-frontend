import LANGUAGES from "@/components/language/languageData";


export const getUserCountryCode = async () => {
	return fetch('https://ipapi.co/json/') // Ensure to return the promise here
		.then((response) => response.json())
		.then((data) => {
			return data.country_code; // This returns the country code
		})
		.catch((error) => {
			console.error('Error fetching IP data:', error);
			return 'US'; // Make sure to resolve the promise with 'US' in case of error
		});
}


export const getUserLanguage = async () => {
	const countryCode = await getUserCountryCode();
	// if country code is a Spanish speaking country, use Spanish
	if (['AR', 'BO', 'CL', 'CO', 'CR', 'CU', 'DO', 'EC', 'GT', 'HN', 'MX', 'NI', 'PA', 'PE', 'PR', 'PY', 'SV', 'UY', 'VE'].includes(countryCode)) {
		return 'Spanish';
	}

	// if country code is a German speaking country, use German
  if (['AT', 'CH', 'DE', 'LU'].includes(countryCode)) {
		return 'German';
	}

	// if country code is a French speaking country, including African ones, use French
	if (['BE', 'FR', 'BJ', 'BF', 'BI', 'CM', 'CD', 'CF', 'CG', 'CI', 'DJ', 'GA', 'GN', 'GW', 'ML', 'NE', 'RW', 'SN', 'TG'].includes(countryCode)) {
		return 'French';
	}

  // if country code is USA, Canada, use American English
  if (['US', 'CA'].includes(countryCode)) {
    return 'English';
  }

	if (['IN'].includes(countryCode)) {
		return 'British English';
	}

	// if country code is a Arabic speaking country, use Arabic
	if (['AE', 'BH', 'DZ', 'EG', 'IQ', 'JO', 'KW', 'LB', 'LY', 'MA', 'OM', 'QA', 'SA', 'SD', 'SY', 'TN', 'YE'].includes(countryCode)) {
		return 'Arabic';
	}

	// find language code from country code in LANGUAGES
	const language = LANGUAGES.find((lang) => lang.code.includes(countryCode));

	return language?.englishName || 'British English';
}

export const userInEU = () => {
	const euCountries = [
		'AT', 'BE', 'BG', 'CY', 'CZ', 'DE',
		'DK', 'EE', 'ES', 'FI', 'FR', 'GR',
		'HR', 'HU', 'IE', 'IT', 'LT', 'LU',
		'LV', 'MT', 'NL', 'PL', 'PT', 'RO',
		'SE', 'SI', 'SK',
	];

	return getUserCountryCode().then((countryCode) => {
		return euCountries.includes(countryCode);
	});
}
