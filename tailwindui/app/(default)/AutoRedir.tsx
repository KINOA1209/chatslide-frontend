'use client';

import { useUser } from '@/hooks/use-user';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AutoRedir() {
	const { token } = useUser();
	const router = useRouter();

  useEffect(() => {
		const currentSearchParams = new URLSearchParams(window.location.search);
		const searchParamsString = currentSearchParams.toString();

		if (token) {
			router.push(
				'/dashboard' + (searchParamsString ? `?${searchParamsString}` : ''),
			);
		} else {
			router.push(
				'/landing' + (searchParamsString ? `?${searchParamsString}` : ''),
			);
		}
	}, [token]);

  return <></>
}
