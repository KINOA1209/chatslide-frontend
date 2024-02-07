import React, { useState, useEffect, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import ClickableLink from '@/components/ui/ClickableLink';
import ExportToPdfButton from './exportToPdfButton';
import dynamic from 'next/dynamic';
import { ShareToggleButton } from '@/components/slides/SlideButtons';
import AuthService from '../../services/AuthService';
import { TextLabel } from '../ui/GrayLabel';
import PostButton from '../button/PostButton';
import { FaTimes } from 'react-icons/fa';
import { useSlides } from '@/hooks/use-slides';
import VideoService from '@/services/VideoService';
import router from 'next/router';
import { useUser } from '@/hooks/use-user';
import { toast } from 'react-toastify';

const SlidesHTML = dynamic(() => import('@/components/slides/SlidesHTML'), {
  ssr: false,
});

type SlideVisualizerProps = {
  isGpt35: boolean;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
};

const SlideVisualizer: React.FC<SlideVisualizerProps> = ({
  isGpt35,
  isSubmitting,
  setIsSubmitting,
}) => {
  const [host, setHost] = useState('https://drlambda.ai');

  const { slides, setTranscripts, hasTranscript } = useSlides();
  const { token } = useUser();
  const [share, setShare] = useState(false);
  const [showShareLink, setShowShareLink] = useState(true);

  const exportSlidesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShare(sessionStorage.getItem('is_shared') === 'true');
    // console.log('share', sessionStorage.getItem('is_shared'));
  }, []);

  useEffect(() => {
    if (share) {
      setShowShareLink(true);
    }
  }, [share]);
  
  useEffect(() => {
    if (
      window.location.hostname !== 'localhost' &&
      window.location.hostname !== '127.0.0.1'
    ) {
      setHost('https://' + window.location.hostname);
    } else {
      setHost(window.location.hostname);
    }
  }, []);

  async function handleSubmitVideo() {
    console.log('submitting');

    const language = sessionStorage.getItem('language') || 'English';
    const foldername = sessionStorage.getItem('foldername') || '';

    const fetchData = async () => {
      try {
        const project_id = sessionStorage.getItem('project_id') || '';
        const job_id = await VideoService.generateVideo(project_id, foldername, language, token);
        sessionStorage.setItem('video_job_id', job_id);
        router.push('workflow-review-video');
      } catch (error) {
        console.error('Error in fetchData:', error);
        toast.error('We have some problem creating your video, please try again later.')
        // TODO: add toast prompts for user
      }
      setIsSubmitting(false);
    };

    if (isSubmitting) {
      fetchData();
    }
  }

  async function handleSubmitTranscript() {
    console.log('submitting');

    const html_filename = 'html_init.html';
    const foldername =
      typeof sessionStorage !== 'undefined'
        ? sessionStorage.getItem('foldername')
        : null;
    const topic =
      typeof sessionStorage !== 'undefined'
        ? sessionStorage.getItem('topic')
        : null;
    const language =
      typeof window !== 'undefined'
        ? sessionStorage.getItem('language')
        : 'English';

    const project_id =
      typeof window !== 'undefined' ? sessionStorage.getItem('project_id') : '';
    const formData = {
      html_filename: html_filename,
      foldername: foldername,
      topic: topic,
      project_id: project_id,
      language: language,
      json_list: slides,
      model_name: isGpt35 ? 'gpt-3.5-turbo' : 'gpt-4',
    };

    try {
      const response = await fetch('/api/transcript_json', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const resp = await response.json();
        setIsSubmitting(false);
        console.log(resp.data.res);
        const transcripts = resp.data.res;
        setTranscripts(transcripts);  // and auto-save
      } else {
        alert('Request failed: ' + response.status);
        console.log(response);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (isSubmitting) {
      if (!hasTranscript()) 
        handleSubmitTranscript();
      else
        handleSubmitVideo();
    }
  }, [isSubmitting]);

  return (
    <div className='flex flex-col justify-center items-center gap-4 my-4'>
      {/* buttons: export and scripts and share slides */}
      <div className='SlidesStep-6 flex flex-row justify-end items-center'>
        <ExportToPdfButton slides={slides} exportSlidesRef={exportSlidesRef} />
        <ShareToggleButton setShare={setShare} share={share} />
        <PostButton
          slides={slides}
          post_type='slide'
          setShare={setShare}
        />
      </div>
      {/* shareable link */}
      {share && showShareLink && (
        <div>
          <div className='w-[100] md:w-[40rem] flex-grow'>
            <TextLabel>View only link:</TextLabel>
            <div className='flex flex-row items-center gap-4'>
              <ClickableLink
                link={`${host}/shared/${sessionStorage.getItem('project_id')}`}
              />
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowShareLink(false)}
              >
                <FaTimes />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* slides and scripts contents */}
      <SlidesHTML
        exportSlidesRef={exportSlidesRef}
      />
    </div>
  );
};

export default SlideVisualizer;
