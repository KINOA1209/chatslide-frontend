export default class VoiceCloneService {
	static async submitConsent(
		voiceTalentName: string,
		audioData: File,
		token: string,
	) {
		const formData = new FormData();
		formData.append('voice_talent_name', voiceTalentName);
		formData.append('audiodata', audioData);

		const response = await fetch('/api/clone/consent', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		});

		if (response.ok) {
			const resp = await response.json();
			return resp.consent_id;
		} else {
			const errorResp = await response.json();
			throw new Error('Error when submitting consent: ' + errorResp.message);
		}
	}

	static async convertAudio(audioData: File, token: string) {
		const formData = new FormData();
		formData.append('audiodata', audioData);

		try {
			const response = await fetch('/api/clone/convert', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: formData,
			});

			if (response.ok) {
				const result = await response.json();
				return result.message;
			} else {
				const errorResp = await response.json();
				throw new Error('Error when converting audio: ' + errorResp.error);
			}
		} catch (error) {
			console.error('Error in convertAudio:', error);
			throw error;
		}
	}

	static async cloneVoice(
		consentId: string,
		audioData: File,
		name: string,
		token: string,
	) {
		// Create a new FormData object
		const formData = new FormData();
		formData.append('consent_id', consentId);
		formData.append('audiodata', audioData);
		formData.append('name', name);

		// Make the POST request with the constructed formData
		const response = await fetch('/api/clone/voice', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		});

		if (response.ok) {
			const resp = await response.json();
			return {
				message: resp.message,
				voice_id: resp.voice_id,
			};
		} else {
			const errorResp = await response.json();
			throw new Error('Error when cloning voice: ' + errorResp.message);
		}
	}

	static async getVoiceProfiles(token: string) {
		if (!token) {
			throw new Error('No token provided');
		}

		const response = await fetch('/api/voice/profiles', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (response.ok) {
			const resp = await response.json();
			return resp.data;
		} else {
			throw new Error('Error fetching voice profiles: ' + response.statusText);
		}
	}

	static async generateVoice(
		voiceId: string,
		text: string,
		locale: string = 'en-US',
		token: string,
	) {
		const data = {
			voice_id: voiceId,
			text: text,
			locale: locale,
		};

		const response = await fetch('/api/clone/generate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		});

		if (response.ok) {
			const audioBlob = await response.blob();
			const audioUrl = URL.createObjectURL(audioBlob);
			return {
				message: 'Success',
				audio_url: audioUrl,
			};
		} else {
			const errorResp = await response.json();
			throw new Error('Error when generating voice: ' + errorResp.message);
		}
	}

	static async deleteVoiceProfile(voice_id: string, token: string) {
		const response = await fetch(`/api/voice/profiles?voice_id=${voice_id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (response.ok) {
			const resp = await response.json();
			return resp.message;
		} else {
			const errorResp = await response.json();
			throw new Error(
				'Error when deleting voice profile: ' + errorResp.message,
			);
		}
	}

	static async downloadAudio(filename: string, token: string) {
		const response = await fetch(
			`/api/voice/download?filename=${encodeURIComponent(filename)}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		if (response.ok) {
			const audioBlob = await response.blob();
			const audioUrl = URL.createObjectURL(audioBlob);
			return audioUrl;
		} else {
			const errorResp = await response.json();
			throw new Error('Error when downloading audio: ' + errorResp.message);
		}
	}
}
