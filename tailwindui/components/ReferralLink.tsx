"use client"
import AuthService from '@/components/utils/AuthService';
import { useState, useEffect, useRef, RefObject } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'aos/dist/aos.css'
import ClickableLink from '@/components/ui/ClickableLink';


const ReferralLink: React.FC = () =>  {
    const [host, setHost] = useState('https://drlambda.ai');
    const [referralLink, setReferralLink] = useState('');

    useEffect(() => {
        if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
            setHost('https://' + window.location.hostname);
        } else {
            setHost(window.location.hostname);
        }
    }, [])

    useEffect(() => {
        const fetchReferral = async () => {
            const { userId, idToken: token } = await AuthService.getCurrentUserTokenAndId();
            const user = await AuthService.getCurrentUser();
            const email = user.attributes.email;
            fetch(`/api/user/create_referral_code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 'email': email }),
            }).then(response => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    throw response.status, response;
                }
            }).then(data => {
                const code = data['referral_code'];
                setReferralLink('/signup?referral=' + code);
            }).catch(error => console.error);
        }
        fetchReferral();
    }, [])

    const sendEmail = () => {
        var subject = 'Invitation to DrLambda';
        var emailBody = `Hey there!\nI wanted to recommend you check out DrLambda, an AI-powered tool for automatic slide generation. I think you'll really like it. You can get 50 extra credit by using my link:\n${host + referralLink}`;
        window.location.href = "mailto:" + "?subject=" + subject + "&body=" + emailBody;
    }

    const handleShare = async () => {
        const shareData = {
            text: `Hey there!\nI wanted to recommend you check out DrLambda, an AI-powered tool for automatic slide generation. I think you'll really like it. You can get 50 extra credit by using my link:\n${host + referralLink}`,
        };
        await navigator.share(shareData);
    }

    return (
        <div className='w-fit mx-auto'>
            <ClickableLink link={host + referralLink} />
            <div className='text-center mt-5 text-[#707C8A] text-[16px]'>
                You get <b>50</b> credit for free when someone registers using your referral link.<br className='hidden md:inline' />
                Meanwhile, we will also gift your friend <b>50</b> credit for gratitude.
            </div>
        </div>
    );
}

export default ReferralLink;