'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const Referral = () => {
	const searchParams = useSearchParams();
	const code = searchParams.get('code');
	const router = useRouter();
	useEffect(() => {
		if (code) {
			router.replace(`/signup?referral=${code}`);
		}
	}, [code, router]);

	return (
		<div className='flex items-center justify-center min-h-screen'>
			<div className='text-lg'>Redirecting...</div>
		</div>
	);
};

export default Referral;
