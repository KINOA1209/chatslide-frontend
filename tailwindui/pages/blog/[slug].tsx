// pages/blog/[title]/page.tsx
import React from 'react';
import { GetServerSideProps } from 'next';
import { getMarkdown, getMeta, Metadata } from './getMarkdown';
import ReactMarkdown from 'react-markdown';
import styles from "./Markdown.module.css";
import remarkGfm from "remark-gfm";
import Head from 'next/head';

// Define the type for the component props
interface BlogPostProps {
  metadata: Metadata;
  content: string;
}

function LinkRenderer(props: any) {
  return (
    <a href={props.href} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  );
}

const BlogPost: React.FC<BlogPostProps> = ({ metadata, content }) => {
  if (!content) {
    // Content not found, show error message or handle appropriately
    return <div>Post not found. Please check the URL or go back to the <a href='/'>homepage</a>.</div>;
  }

  return (
    <div>
      {/* <h1>{title}</h1> */}
      <Head>
       
        <title>{metadata?.title} - DrLambda Blog</title>
        <meta name="description" content={metadata?.description} />
        {/* You can add more meta tags here */}
      </Head>

      <ReactMarkdown
        className={styles.markdown}
        remarkPlugins={[remarkGfm]}
        components={{ link: LinkRenderer }}
      >{content}</ReactMarkdown>
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
