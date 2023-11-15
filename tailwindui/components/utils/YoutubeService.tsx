import * as ytdl from 'ytdl-core';

import { parse } from 'url';

class YoutubeService {
    private getYoutubeVideoId(url: string): string | null {
        // Parse the URL
        const parsedUrl = parse(url, true);

        // Extract the "v" parameter from the query string
        const videoId = parsedUrl.query.v as string;

        return videoId || null;
    }

    async getYoutubeInfo(url: string): Promise<{ title: string; thumbnail: string } | null> {
        try {
            const videoId = this.getYoutubeVideoId(url);

            if (!videoId) {
                console.error('Invalid YouTube URL or Video ID');
                return null;
            }

            const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
            const videoInfo = await ytdl.getInfo(videoUrl);

            const title = videoInfo.videoDetails.title;
            const thumbnail = videoInfo.videoDetails.thumbnails[0].url;

            return { title, thumbnail };
        } catch (error) {
            console.error('Error fetching YouTube data:', error);
            return null;
        }
    }
}


