import VideoJobStatus from '@/models/VideoJobStatus';

export default class VideoService {
	// Returns a promise of the video generation job as a string, which could be used later to query the job status.
	static async generateVideo(
		project_id: string,
		foldername: string | null,
		voice: string | null,
		userToken: string,
		style: string,
		avatar: string,
		avatarStyle: string,
		avatarSize: string,
		avatarPosition: string,
		bgm: string,
		bgmVolume: number,
		creditCost: number,
    transitionType: string,
	): Promise<void> {
		fetch('/api/export/generate_video', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userToken}`, // Replace this with your actual auth header
			},
			body: JSON.stringify({
				project_id: project_id,
				foldername: foldername,
				voice: voice,
				style: style,
				has_avatar: avatar !== '',
				avatar: avatar,
				avatar_style: avatarStyle,
				avatar_size: avatarSize,
				avatar_position: avatarPosition,
				background_music: bgm,
				bgm_volume: bgmVolume,
				credit_cost: creditCost,
        transition_type: transitionType,
			}),
		});
	}

	// Returns the VideoJobStatus object which has both status and video url if the job is completed.
	static async getVideoJobStatus(
		project_id: string,
		userToken: string,
	): Promise<VideoJobStatus> {
		const response = await fetch(
			`/api/video_job_status?project_id=${project_id}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userToken}`, // Replace this with your actual auth header
				},
			},
		);

		if (!response.ok) {
			throw new Error(
				`Error fetching video job ${project_id} status: ${response.status}`,
			);
		}

		const json = await response.json();
		return {
			job_status: json.data.job_status,
			video_url: json.data.video_url,
		};
	}

	static async getTTS(
		text: string,
		voice: string,
		style: string,
		foldername: string,
		token: string,
	): Promise<string> {
		const response = await fetch('/api/generate_audio_single_slide', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				text: text,
				voice: voice,
				style: style,
				foldername: foldername,
			}),
		});

		if (!response.ok) {
			throw new Error(`HTTP error in getTTS! status: ${response.status}`);
		}

		const data = await response.json();
		return `/api/audio?foldername=${foldername}&filename=${data.data.filename}`;
	}

	static async hasRunningVideoJob(
		project_id: string,
		token: string,
	): Promise<boolean> {
		const response = await fetch(
			`/api/has_running_video_job?project_id=${project_id}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			},
		);

		if (!response.ok) {
			return false;
		}

		const json = await response.json();
		return json.data.has_running_job;
	}
}
