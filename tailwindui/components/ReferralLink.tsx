"use client"
import AuthService from '@/components/utils/AuthService';
import { useState, useEffect, useRef, RefObject } from 'react';
import 'react-toastify/dist/ReactToastify.css';
// import 'aos/dist/aos.css'
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
                setReferralLink('/referral/' + code);
            }).catch(error => console.error);
        }
        fetchReferral();
    }, [])

    return (
        <div className='w-fit mx-auto'>
            <ClickableLink link={host + referralLink} />
            <div className='text-center mt-5 text-[#707C8A] text-[16px]'>
                You get and your friend will both get 50 ⭐️credits.
            </div>
        </div>
    );
}

export default ReferralLink;