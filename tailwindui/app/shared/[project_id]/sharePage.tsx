'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Footer, { WorkflowFooter } from '@/components/ui/footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/ui/header';
import dynamic from 'next/dynamic';
import ProjectService from '@/services/ProjectService';
import Slide from '@/models/Slide';
import Project from '@/models/Project';

const SlidesHTML = dynamic(() => import('@/components/slides/SlidesHTML'), {
	ssr: false,
});

const SharePage: React.FC = () => {
	const router = useRouter();
	const pathname = usePathname();
	const project_id = pathname?.split('/').pop();
	const [loading, setLoading] = useState(true);

	const [slides, setSlides] = useState<Slide[]>([]);

  useEffect(() => {
    if (project_id) {
      sessionStorage.removeItem('foldername');
      setLoading(true);
      ProjectService.getSharedProjectDetails(project_id).then((project: Project) => {
        setSlides(project.parsed_slides);
        setLoading(false);
      });
    }
  }, [project_id]);

	return (
		<main className='grow'>
			<Header loginRequired={false} isLanding={false} />
			<ToastContainer />
			{loading ? (
        <div className='flex items-center justify-center min-h-screen'>Loading...</div>
			) : (
				<div className='flex items-center justify-center min-h-screen'>
					<div>
						<SlidesHTML
							slides={slides}
							setSlides={setSlides}
							isViewing={true}
						/>
					</div>
				</div>
			)}

			<WorkflowFooter />
		</main>
	);
};

export default SharePage;
