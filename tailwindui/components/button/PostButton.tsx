'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BigGrayButton, BigGrayDropDown } from './DrlambdaButton';
import { SocialPostSlide } from '@/components/socialPost/socialPostHTML';
import Slide, { SlideKeys } from '@/models/Slide';
import AuthService from '@/services/AuthService';
import ProjectService from '@/services/ProjectService';
import PostPlatformConfigs from '@/components/button/PostPlatformConfig'
import { useUser } from '@/hooks/use-user';
import { FaFacebook } from 'react-icons/fa';

type PostButtonProps = {
  slides: Slide[] | SocialPostSlide[];
  post_type?: string; //socialpost or slide
  platforms?: string[];
  setShare: (share: boolean) => void;
  description?: string;
  keywords?: string[];
};

const PostDropDown: React.FC<PostButtonProps> = ({
  slides,
  post_type = 'slide',
  platforms = ['twitter', 'facebook', 'reddit', 'linkedin'],
  setShare,
  description = "Check out our latest content",
  keywords = ['DrLambda', 'presentation', 'slides', 'ai_agent']
}) => {
  const [host, setHost] = useState('https://drlambda.ai');
  const { token } = useUser();

  //console.log(slides)
  if (slides.length > 0 && 'head' in slides[0]) {
    let title = slides[0].head;
    // remove all quill tags
    title = title?.replace(/<[^>]*>?/gm, '');
  }

  const project_id =
    typeof window !== 'undefined' && sessionStorage.project_id != undefined
      ? sessionStorage.project_id
      : '';

  useEffect(() => {
    if (
      window.location.hostname !== 'localhost' &&
      window.location.hostname !== '127.0.0.1'
    ) {
      setHost('https://' + window.location.hostname);
    } else {
      // setHost(window.location.hostname);
      setHost('https://dev.drlambda.ai');
    }
  }, []);

  const handlePost = async (platform: string) => {
    try {
      await ProjectService.SlideShareLink(token, project_id, setShare)
      const shareLink = `${host}/shared/${project_id}`
      const hashTags = keywords.map((keyword) => `#${keyword}`).join(' ');
      const postText = `${description}. Learn more at drlambda.ai!\n${hashTags}\n`
      const platformConfig = PostPlatformConfigs[platform as keyof typeof PostPlatformConfigs];
      const text = platformConfig.textTemplate(postText, shareLink);
      const url = `${platformConfig.shareUrl}${text}`
      window.open(url, '_blank');
    } catch (error) {
      console.error('Failed to process Twitter post:', error);
    }
  };

  const options = platforms.map((platform) => ({
    value: platform,
    label: (
      <div className='flex flex-row items-center'>
        Post to {PostPlatformConfigs[platform as keyof typeof PostPlatformConfigs].displayName}
        {platform === 'facebook' && <FaFacebook />} {/* Render Facebook icon */}
      </div>
    ),
  }));

  return (
    <BigGrayDropDown
      onChange={(event) => handlePost(event.target.value)}
      displayText='Post to Social Media'
    >
      {platforms.map((platform) => (
        <option key={platform} value={platform}>
          Post to {PostPlatformConfigs[platform as keyof typeof PostPlatformConfigs].displayName}
        </option>
      ))}
    </BigGrayDropDown>
  );

};

export default PostDropDown;
