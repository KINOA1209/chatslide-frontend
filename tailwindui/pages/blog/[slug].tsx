// pages/blog/[title]/page.tsx
import React from 'react';
import { GetServerSideProps } from 'next';

// Define the type for the component props
interface BlogPostProps {
  title: string;
  content: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, content }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};

// Define the type for getServerSideProps context parameter
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Access the dynamic 'slug' parameter
  const slug = context.params?.slug;

  // Fetch data based on slug, replace with your data fetching logic
  // For now, just using the slug as the title for demonstration
  const title = `Title for ${slug}`;
  const content = `Content for ${slug}`; // Placeholder content

  // Check if title is undefined and handle it appropriately
  if (!title) {
    // You can redirect, return a 404 page, or handle it as needed
    return {
      notFound: true, // This will render your 404 page
    };
  }

  return { props: { title, content } };
};

export default BlogPost;
