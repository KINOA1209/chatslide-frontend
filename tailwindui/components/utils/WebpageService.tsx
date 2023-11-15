import * as cheerio from 'cheerio';

class WebService {
  async getTitleFromUrl(url: string): Promise<string> {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch URL: ${response.statusText}`);
      }

      const htmlText = await response.text();
      const title = this.getTitleFromHtml(htmlText);

      // Use a default identifier if title is null
      const defaultIdentifier = this.getDefaultIdentifier(url);

      return title || defaultIdentifier;
    } catch (error: any) {
      console.error(`Error fetching URL: ${error.message}`);
      return '';
    }
  }

  private getTitleFromHtml(html: string): string | null {
    const $ = cheerio.load(html);
    const title = $('title').text();

    return title || null;
  }

  private getDefaultIdentifier(url: string): string {
    const parsedUrl = new URL(url);
    const pathWithoutSlashes = parsedUrl.pathname.replace(/\//g, '_');
    return `${parsedUrl.hostname}_${pathWithoutSlashes}`;
  }
}