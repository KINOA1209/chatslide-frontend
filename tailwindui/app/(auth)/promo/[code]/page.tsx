'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const Referral = () => {
	const pathname = usePathname();
	const code = pathname ? pathname.split('/').pop() : null;
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
