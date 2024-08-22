'use client';

import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation';
import useHydrated from '@/hooks/use-hydrated';

export const PaidToast: React.FC = () => {
	const params = useSearchParams();

	useEffect(() => {
		const paid = params.get('paid');
		if (paid === 'false') {
			toast.error('Payment cancelled.');
		}
	}, [params]);

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	return <ToastContainer />;
};
