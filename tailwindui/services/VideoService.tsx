export default class VideoService {
	static async generateVideo(
		project_id: string,
		foldername: string | null,
		language: string | null,
		userToken: string,
	): Promise<boolean> {
		try {
			const response = await fetch('/api/generate_video', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userToken}`, // Replace this with your actual auth header
				},
				body: JSON.stringify({ project_id: project_id, foldername: foldername, language: language }),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return true;
		} catch (error) {
			throw error;
		}
	}
}
