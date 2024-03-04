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
	project_id: string;
	page?: number;
}

const SharePage: React.FC<SharePageProps> = ({ project_id, page = 1 }) => {
	const [loading, setLoading] = useState(true);
	const { initSlides } = useSlides();

	useEffect(() => {
		const token = new URLSearchParams(window.location.search).get(
			'token',
		) as string;
		const init = async () => {
			const project = await ProjectService.getProjectDetails(token, project_id);
			const slides = ProjectService.parseSlides(project.presentation_slides);
			initSlides(slides);
			setLoading(false);
		};
		init();
	}, []);

	return (
		<main className='grow'>
			<SlidesHTML
				isViewing={true}
				initSlideIndex={page as number}
				toPdf={true}
			/>
		</main>
	);
};

export default SharePage;
