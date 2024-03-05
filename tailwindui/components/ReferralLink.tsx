'use client';
import AuthService from '@/services/AuthService';
import { useState, useEffect, useRef, RefObject } from 'react';
import 'react-toastify/dist/ReactToastify.css';
// import 'aos/dist/aos.css'
import ClickableLink from '@/components/ui/ClickableLink';
import { useUser } from '@/hooks/use-user';
import { Explanation } from './ui/Text';

const ReferralLink: React.FC = () => {
	const [host, setHost] = useState('https://drlambda.ai');
	const [referralLink, setReferralLink] = useState('');
	const { token, email } = useUser();

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

	useEffect(() => {
		const fetchReferral = async (token: string) => {
			if (!token) return;

			fetch(`/api/user/create_referral_code`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
				.then((response) => {
					if (response.ok) {
						return response.json();
					} else {
						throw (response.status, response);
					}
				})
				.then((data) => {
					const code = data['referral_code'];
					setReferralLink('/referral/' + code);
				})
				.catch((error) => console.error);
		};
		fetchReferral(token);
	}, []);

	return (
		<div className='w-full'>
			<ClickableLink link={host + referralLink} />
			<Explanation>
				You and your friend will both get 50 ⭐️credits.
			</Explanation>
		</div>
	);
};

export default ReferralLink;
