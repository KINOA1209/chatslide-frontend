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
import { FaTimes } from 'react-icons/fa';

const SlidesHTML = dynamic(() => import('@/components/slides/SlidesHTML'), {
  ssr: false,
});

const SharePage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const project_id = pathname?.split('/').pop();
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState<string>('');
  const [slides, setSlides] = useState<Slide[]>([]);
  const [showDescription, setShowDescription] = useState<boolean>(true);

  useEffect(() => {
    if (project_id) {
      sessionStorage.removeItem('foldername');
      setLoading(true);
      ProjectService.getSharedProjectDetails(project_id).then((project: Project) => {
        setSlides(project.parsed_slides);
        setDescription(project.description);
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
        <div className='flex flex-col items-center justify-center min-h-screen gap-8'>
          {showDescription && description &&
            <div className="flex sm:w-2/3 h-[10rem]text-gray-700 text-left m-2 gap-4">
                <div className="border border-gray-200 rounded-xl overflow-y-scroll p-2">
                {description}
              </div>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowDescription(false)}
              >
                <FaTimes />
              </button>
            </div>
          }
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
