// pages/blog/[title]/page.tsx
import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import styles from './Markdown.module.css';
import remarkGfm from 'remark-gfm';
import Head from 'next/head';

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

// Define the type for the component props
interface BlogPostProps {
	metadata: Metadata;
	content: string;
}

function LinkRenderer(props: any) {
	return (
		<a href={props.href} target='_blank' rel='noreferrer'>
			{props.children}
		</a>
	);
}

const BlogPost: React.FC<BlogPostProps> = ({ metadata, content }) => {
	if (!content) {
		// Content not found, show error message or handle appropriately
		return (
			<div>
				Post not found. Please check the URL or go back to the{' '}
				<a href='/'>homepage</a>.
			</div>
		);
	}

	return (
		<div>
			{/* <h1>{title}</h1> */}
			<Head>
				<title>{metadata?.title} - DrLambda Blog</title>
				<meta name='description' content={metadata?.description} />
				{/* You can add more meta tags here */}
			</Head>

			<ReactMarkdown
				className={styles.markdown}
				remarkPlugins={[remarkGfm]}
				components={{ link: LinkRenderer }}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
};

// Define the type for getServerSideProps context parameter
export const getServerSideProps: GetServerSideProps = async (context) => {
	const slug = context.params?.slug as string;

	// Fetch markdown content based on slug
	const content = await getMarkdown(slug);

	const metadata = await getMeta(slug);

	return { props: { metadata, content } };
};

export default BlogPost;
