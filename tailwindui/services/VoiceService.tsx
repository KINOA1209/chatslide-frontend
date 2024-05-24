export default class VoiceCloneService {
    static async cloneVoice(formData : any, token: string) {
      const response = await fetch('/api/voice/clone', {
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

    static async generateVoice(data: any, token: string) {
      const response = await fetch('/api/voice/generate', {
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
          throw new Error('Error when deleting voice profile: ' + errorResp.message);
        }
      }
  }
  