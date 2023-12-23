'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import dynamic from 'next/dynamic';
import ProjectService from '@/services/ProjectService';
import Slide from '@/models/Slide';

const SlidesHTML = dynamic(() => import('@/components/slides/SlidesHTML'), {
	ssr: false,
});

const SharePage: React.FC = () => {
	const pathname = usePathname();
	const project_id = pathname?.split('/').pop();
	const [loading, setLoading] = useState(true);
  const page = useSearchParams()?.get('page') || 0;
  const token = useSearchParams()?.get('token') || '';
  const [slides, setSlides] = useState<Slide[]>([]);

	useEffect(() => {
		if (project_id) {
      setLoading(true);
      ProjectService.getProjectDetails(token, project_id).then((data) => {
        setSlides(JSON.parse(data.presentation_slides));
        setLoading(false);
      });
		}
	}, [project_id]);

	return (
		<main className='grow'>
			{loading ? (
        <div className='flex items-center justify-center min-h-screen'>Loading...</div>
			) : (
      <SlidesHTML
        slides={slides}
        setSlides={setSlides}
        isViewing={true}
        isPresenting={true}
        initSlideIndex={page as number}
      />
			)}

		</main>
	);
};

export default SharePage;
