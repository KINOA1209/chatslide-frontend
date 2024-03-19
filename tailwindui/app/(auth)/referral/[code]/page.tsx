'use client';

import { Blank } from '@/components/ui/Loading';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const Referral = () => {
  const code = usePathname().split('/').pop();
	const router = useRouter();
	useEffect(() => {
		if (code) {
			router.replace(`/signup?referral=${code}`);
		}
	}, [code, router]);

	return (
		<Blank>Redirecting...</Blank>
	);
};

export default Referral;
