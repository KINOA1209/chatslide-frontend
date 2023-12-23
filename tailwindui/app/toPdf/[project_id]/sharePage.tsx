'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Slide } from '@/components/slides/SlidesHTML';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dynamic from 'next/dynamic';
import ProjectService from '@/services/ProjectService';

const SlidesHTML = dynamic(() => import('@/components/slides/SlidesHTML'), {
	ssr: false,
});

const SharePage: React.FC = () => {
	const pathname = usePathname();
	const project_id = pathname?.split('/').pop();
	const [loading, setLoading] = useState(true);
  const page = useSearchParams()?.get('page') || 0;
  const [slides, setSlides] = useState<Slide[]>([]);

	useEffect(() => {
		if (project_id) {
      sessionStorage.removeItem('foldername');
      setLoading(true);
      ProjectService.getFolderName(project_id).then( () => {
        setLoading(false);
      });
		}
	}, [project_id]);

	return (
		<main className='grow'>
			{loading ? (
				<div>Loading...</div>
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
