'use client';

import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import dynamic from 'next/dynamic';
import ProjectService from '@/services/ProjectService';
import { useSlides } from '@/hooks/use-slides';
import { Loading } from '@/components/ui/Loading';

const SlidesHTML = dynamic(() => import('@/components/slides/SlidesHTML'), {
	ssr: false,
});

interface PdfPageProps {
	project_id: string;
	page?: number;
}

const PdfPage: React.FC<PdfPageProps> = ({ project_id, page = 1 }) => {
	const [loading, setLoading] = useState(true);
	const { initSlides, setIsPresenting } = useSlides();

	useEffect(() => {
		const token = new URLSearchParams(window.location.search).get('token');

		if (token) {
			const init = async () => {
				const project = await ProjectService.getProjectDetails(
					token,
					project_id,
					false,
					'toPDF',
				);

				// Check if presentation_slides is defined before parsing
				if (project.presentation_slides) {
					const slides = ProjectService.parseSlides(
						project.presentation_slides,
					);
					initSlides(slides);
					setLoading(false);
					setIsPresenting(true);
				} else {
					console.error('presentation_slides is undefined.');
				}
			};
			init();
		} else {
			console.error('Token is undefined.');
		}
	}, []);

	if (loading) return <Loading />;

	return (
		<main className='grow'>
			<SlidesHTML isViewing={true} toPdf={true} />
		</main>
	);
};

export default PdfPage;
