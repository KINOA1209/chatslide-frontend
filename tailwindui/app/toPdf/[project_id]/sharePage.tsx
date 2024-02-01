'use client';

import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import dynamic from 'next/dynamic';
import ProjectService from '@/services/ProjectService';
import Project from '@/models/Project';
import { useSlides } from '@/hooks/use-slides';

const SlidesHTML = dynamic(() => import('@/components/slides/SlidesHTML'), {
	ssr: false,
});

interface SharePageProps {
  project: Project,
  page?: number
}

const SharePage: React.FC<SharePageProps> = ({ project, page=1 }) => {
  const [loading, setLoading] = useState(true);
  const { initSlides } = useSlides();

  useEffect(() => {
    console.log('project', project)
    const slides = ProjectService.parseSlides(project.presentation_slides);
    initSlides(slides);
    setLoading(false);
  }, []);

	return (
		<main className='grow'>
			{loading ? (
        <div className='flex items-center justify-center min-h-screen'>Loading...</div>
			) : (
      <SlidesHTML
        isViewing={true}
        isPresenting={true}
        initSlideIndex={page as number}
        toPdf={true}
      />
			)}

		</main>
	);
};

export default SharePage;
