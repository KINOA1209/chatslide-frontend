'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BigGrayButton } from './DrlambdaButton';
import { SocialPostSlide } from '@/components/socialPost/socialPostHTML';
import Slide, { SlideKeys } from '@/models/Slide';
import AuthService from '@/services/AuthService';
import ProjectService from '@/services/ProjectService';
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from 'react-icons/fa';
import PostPlatformConfigs from '@/components/button/PostPlatformConfig'

type PostButtonProps = {
    slides: Slide[] | SocialPostSlide[];
    post_type: string; //socialpost or slide
    platform: string;
    setShare: (share:boolean) => void;
};

const PostButton: React.FC<PostButtonProps> = ({
    slides,
    post_type,
    platform,
    setShare,
}) => {
    const [host, setHost] = useState('https://drlambda.ai');
    const [isProcessing, setIsProcessing] = useState(false);
    const platformConfig = PostPlatformConfigs[platform as keyof typeof PostPlatformConfigs];

    //console.log(slides)
    const title = "Check out our latest content"
    if(slides.length > 0 && 'head' in slides[0]){
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
            setHost(window.location.hostname);
            //setHost('https://dev.drlambda.ai');
        }
    }, []);

    const handlePost = async () => {
        try{
            setIsProcessing(true);
            const { userId, idToken: token } = await AuthService.getCurrentUserTokenAndId();
            await ProjectService.SlideShareLink(token, project_id, setShare)
            const shareLink = `${host}/shared/${project_id}`
            const postText = `${title}. Learn more at drlambda.ai!\n`
            const text = platformConfig.textTemplate(postText, shareLink);
            const url = `${platformConfig.shareUrl}${text}`
            window.open(url, '_blank');
            setIsProcessing(false);
        } catch (error) {
            console.error('Failed to process Twitter post:', error);
        }
    };
    
    return (
        <div className='col-span-1 ml-3'>
            <BigGrayButton onClick={handlePost} isSubmitting={isProcessing}>
                <div className='flex flex-row items-center gap-x-2'>
                Post on {platform === 'twitter' ? '𝕏' : platform.charAt(0).toUpperCase() + platform.slice(1)} / {platformConfig.icon}
                </div>
            </BigGrayButton>
        </div>
    );

};

export default PostButton