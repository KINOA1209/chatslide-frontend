import Resource from '@/models/Resource';
import moment from 'moment';

export default class WebService {
	static async getWebpageInfo(
		url: string,
		userToken: string,
	): Promise<Resource | null> {
		try {
			const response = await fetch('/api/scrape_webpage', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userToken}`, // Replace this with your actual auth header
				},
				body: JSON.stringify({ url: url }),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			const timestamp = moment().format('MMM D, YYYY');

			console.log('data', data.data);
			return {
				id: data.data.id,
				name: data.data.name,
				thumbnail_url: data.data.thumbnail_url,
				type: 'webpage',
				timestamp: timestamp,
			};
		} catch (error) {
			throw error;
		}
	}
}
