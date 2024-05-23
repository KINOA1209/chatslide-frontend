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
  }
  