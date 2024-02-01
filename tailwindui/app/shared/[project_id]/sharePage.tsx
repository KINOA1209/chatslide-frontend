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
import { SocialPostSlide } from '@/components/socialPost/socialPostHTML';
import { useSlides } from '@/hooks/use-slides';

const SlidesHTML = dynamic(() => import('@/components/slides/SlidesHTML'), {
  ssr: false,
});

const SocialPostHTML = dynamic(() => import('@/components/socialPost/socialPostHTML'), {
  ssr: false,
});

interface SharePageProps {
  project: Project
}


const SharePage: React.FC<SharePageProps> = ({ project }) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const { initSlides } = useSlides();
  const [showDescription, setShowDescription] = useState<boolean>(true);
  const [projectType, setProjectType] = useState<'presentation' | 'socialpost'>('presentation');
  const [socialPosts, setSocialPosts] = useState<SocialPostSlide[]>([]);
  const [postType, setPostType] = useState<string>('casual_topic');
  const borderColorOptions = [
		{
			border_start: '#FF7A41',
			border_end: '#D63300',
			cover_start: '#B83700 0%',
			cover_end: 'rgba(0, 0, 0, 0.00)',
		},
		{
			border_start: '#FFBE41',
			border_end: '#D68000',
			cover_start: '#AB8C1E 0%',
			cover_end: 'rgba(0, 0, 0, 0.00)',
		},
		{
			border_start: '#96EB2C',
			border_end: '#23830B',
			cover_start: '#579C00 0%',
			cover_end: 'rgba(0, 0, 0, 0.00)',
		},
		{
			border_start: '#FB42FF',
			border_end: '#767EFF',
			cover_start: '#9F4FC9 0%',
			cover_end: 'rgba(0, 0, 0, 0.00)',
		},
		{
			border_start: '#41C6FF',
			border_end: '#0055D6',
			cover_start: '#2593C8 0%',
			cover_end: 'rgba(0, 0, 0, 0.00)',
		},
		{
			border_start: '#937C67',
			border_end: '#4F361F',
			cover_start: '#725947 0%',
			cover_end: 'rgba(0, 0, 0, 0.00)',
		}, // default
		{
			border_start: '#D0BF9E',
			border_end: '#AC9067',
			cover_start: '#725E16 0%',
			cover_end: 'rgba(0, 0, 0, 0.00)',
		},
		{
			border_start: '#AFC593',
			border_end: '#62735D',
			cover_start: '#52702D 0%',
			cover_end: 'rgba(0, 0, 0, 0.00)',
		},
		{
			border_start: '#CCACCD',
			border_end: '#66589D',
			cover_start: '#593F66 0%',
			cover_end: 'rgba(0, 0, 0, 0.00)',
		},
		{
			border_start: '#9DC0CE',
			border_end: '#556379',
			cover_start: '#214150 0%',
			cover_end: 'rgba(0, 0, 0, 0.00)',
		},
	];

  useEffect(() => {
    console.log('project', project)
    if (project.content_type === 'presentation') {
      const slides = ProjectService.parseSlides(project.presentation_slides);
      setProjectType('presentation')
      initSlides(slides);
      setLoading(false);
    } else if (project.content_type === 'social_posts') {
      setProjectType('socialpost')
      setPostType(project.post_type)
      setSocialPosts(project.parsed_socialPosts)
    }
  }, []);
  
  return (
    <main className='grow'>
      <Header loginRequired={false} isLanding={false} />
      <ToastContainer />
      {loading ? (
        <div className='flex items-center justify-center min-h-screen'>Loading...</div>
      ) : (
        <div className='flex flex-col items-center justify-center min-h-screen gap-8'>
          {showDescription && project.description &&
            <div className="flex sm:w-2/3 h-[10rem]text-gray-700 text-left m-2 gap-4">
                <div className="border border-gray-200 rounded-xl overflow-y-scroll p-2">
                  <h1 className="text-2xl font-bold">{project.topic}</h1>
                  <h2 className="text-lg font-semibold">Created using DrLambda</h2>
                  {project.description}
              </div>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowDescription(false)}
              >
                <FaTimes />
              </button>
            </div>
          }
          {projectType === 'presentation' &&
            <div>
              <SlidesHTML
                isViewing={true}
              />
            </div>
          }

          {projectType === 'socialpost' &&
            <div>
              <SocialPostHTML
                socialPostSlides={socialPosts}
                setSocialPostSlides={setSocialPosts}
                isViewing={true}
                borderColorOptions={borderColorOptions}
                res_scenario={postType}
              />
            </div>
          }
        </div>
      )}

      <WorkflowFooter />
    </main>
  );
};

export default SharePage;
