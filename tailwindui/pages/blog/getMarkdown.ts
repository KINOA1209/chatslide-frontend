import path from 'path';

export async function getMarkdown(slug: string): Promise<string> {

  let fs;
  if (typeof window === 'undefined') {
    // This code runs on the server only
    fs = require('fs');
  }

  const postsDirectory = path.join(process.cwd(), 'pages/blog/posts');
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const markdown = fs.readFileSync(fullPath, 'utf8');
  return markdown;
}

export interface Metadata {
  title: string;
  description: string;
}


export async function getMeta(slug: string): Promise<Metadata | null> {
  try {
    const postsDirectory = path.join(process.cwd(), 'pages/blog/posts');
    const fullPath = path.join(postsDirectory, `${slug}.json`);

    let fs;
    if (typeof window === 'undefined') {
      // This code runs on the server only
      fs = require('fs');
    }

    // Check if the file exists
    if (!fs.existsSync(fullPath)) {
      return null; // or throw an error, depending on your preference
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const json = JSON.parse(fileContents); // Parse the JSON string
    return json;
  } catch (error) {
    console.error('Error reading metadata:', error);
    return null; // Return null or handle the error as per your application's needs
  }
}