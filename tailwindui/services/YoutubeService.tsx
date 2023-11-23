import Resource from '@/models/Resource';
import { parse } from 'url';

export default class YoutubeService {
  private static getYoutubeVideoId(url: string): string | null {
    // Parse the URL
    const parsedUrl = parse(url, true);

    // Extract the "v" parameter from the query string
    const videoId = parsedUrl.query.v as string;

    console.log('videoId', videoId)

    return videoId || null;
  }

  static async getYoutubeInfo(url: string, userToken: string): Promise<Resource | null> {
    try {
      const response = await fetch('/api/save_youtube_url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}` // Replace this with your actual auth header
        },
        body: JSON.stringify({ youtube_url: url })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json()
      console.log('data', data.data)
      return { id: data.data.id, name: data.data.name, thumbnail_url: data.data.thumbnail_url, type: 'youtube' };
    } catch (error) {
      throw error;
    }
  }
}
