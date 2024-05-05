'use client';
import AuthService from '@/services/AuthService';
import { useState, useEffect, useRef, RefObject } from 'react';
import 'react-toastify/dist/ReactToastify.css';
// import 'aos/dist/aos.css'
import ClickableLink from '@/components/ui/ClickableLink';
import { useUser } from '@/hooks/use-user';
import { Explanation } from './ui/Text';
import { getOrigin } from '@/utils/getHost';

const ReferralLink: React.FC = () => {
	const [host, setHost] = useState(getOrigin());
	const { token, user } = useUser();

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

	return (
		<div className='w-full'>
			<ClickableLink link={host + '/referral/' + user?.referral_code} />
			<Explanation>
				You and your friend will both get 50 ⭐️credits.
			</Explanation>
		</div>
	);
};

export default ReferralLink;
