import {VideoJobCreation, VideoJobStatus} from "@/models/VideoJobStatus";

export default class VideoService {
	// Returns a promise of the video generation job as a string, which could be used later to query the job status.
	static async generateVideo(
		project_id: string,
		foldername: string | null,
		language: string | null,
		userToken: string,
	): Promise<string> {
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

		const job_creation = await response.json() as VideoJobCreation;
		return job_creation.job_id;
	}

	// Returns the VideoJobStatus object which has both status and video url if the job is completed.
	static async getVideoJobStatus(job_id: string, userToken: string): Promise<VideoJobStatus> {
		const response = await fetch(`/api/video_job_status?job_id=${job_id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userToken}`, // Replace this with your actual auth header
			},
		});

		if (!response.ok) {
			throw new Error(`Error fetching video job ${job_id} status: ${response.status}`);
		}

		return await response.json() as VideoJobStatus;
	}
}
