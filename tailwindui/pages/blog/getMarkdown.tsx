import fs from 'fs';
import path from 'path';

export async function getMarkdown(slug: string): Promise<string> {
  const postsDirectory = path.join(process.cwd(), 'pages/blog/posts');
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const markdown = fs.readFileSync(fullPath, 'utf8');
  return markdown;
}
