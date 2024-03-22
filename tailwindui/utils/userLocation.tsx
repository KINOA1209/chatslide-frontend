export const userInEU = () => {
	return fetch('https://ipapi.co/json/') // Ensure to return the promise here
		.then((response) => response.json())
		.then((data) => {
			const euCountries = [
				'AT', 'BE', 'BG', 'CY', 'CZ', 'DE',
				'DK', 'EE', 'ES', 'FI', 'FR', 'GR',
				'HR', 'HU', 'IE', 'IT', 'LT', 'LU',
				'LV', 'MT', 'NL', 'PL', 'PT', 'RO',
				'SE', 'SI', 'SK',
			];

			return euCountries.includes(data.country_code); // This returns true or false
		})
		.catch((error) => {
			console.error('Error fetching IP data:', error);
			return false; // Make sure to resolve the promise with false in case of error
		});
}
