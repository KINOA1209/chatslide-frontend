'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BigGrayButton } from './DrlambdaButton';
import { SocialPostSlide } from '@/components/socialPost/socialPostHTML';
import Slide, { SlideKeys } from '@/models/Slide';
import AuthService from '@/services/AuthService';
import ProjectService from '@/services/ProjectService';
import { FaTwitter } from "react-icons/fa";

type RepostButtonProps = {
    slides: Slide[];
    post_type: string; //socialpost or slide
    setShare: (share:boolean) => void;
};

const RepostButton: React.FC<RepostButtonProps> = ({
    slides,
    post_type,
    setShare,
}) => {
    const [host, setHost] = useState('https://drlambda.ai');
    const [isProcessing, setIsProcessing] = useState(false);

    console.log(slides)

    const title = slides[0]?.head;

    const project_id =
    typeof window !== 'undefined' && sessionStorage.project_id != undefined
        ? sessionStorage.project_id
        : '';

    const res_scenario =
    typeof sessionStorage !== 'undefined'
        ? sessionStorage.getItem('scenarioType')
        : '';

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

    const handleRepostToTwitter = async () => {
        try{
            setIsProcessing(true);
            const { userId, idToken: token } = await AuthService.getCurrentUserTokenAndId();
            //const publicImageUrl = await ProjectService.getSlideTwitterImg(project_id);
            //console.log(publicImageUrl)
            await ProjectService.repostSlideShareLink(token, project_id, setShare)
            const shareLink = `${host}/shared/${project_id}`
            const twitterText = `${title}. Learn more at drlambda.ai!\n`
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}${encodeURIComponent(shareLink)}`;
            window.open(twitterUrl, '_blank');
            setIsProcessing(false);
        } catch (error) {
            console.error('Failed to process Twitter repost:', error);
        }
    };
    
    return (
        <div className='col-span-1 ml-3'>
            <BigGrayButton onClick={handleRepostToTwitter} isSubmitting={isProcessing}>
                <div className='flex flex-row items-center gap-x-2'>
                    Post on X (Twitter)
                </div>
            </BigGrayButton>
        </div>
    );

};

export default RepostButton