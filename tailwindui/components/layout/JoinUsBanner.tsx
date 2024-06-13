'use client';

import { useUser } from '@/hooks/use-user';
import Link from 'next/link';
import useHydrated from '@/hooks/use-hydrated';

export const JoinUsBanner: React.FC = () => {
	const { token } = useUser();
	const isHydrated = useHydrated();

	// avoid hydration error during development caused by persistence
	if (!isHydrated) return <></>;

	if (token && token !== '') {
		return null;
	}

	// Get current URL query parameters
	const currentQueryParams = new URLSearchParams(window.location.search);

	// Add the ref parameter
	currentQueryParams.set('ref', 'shared');

	// Create the new URL with combined parameters
	const newUrl = `/signup?${currentQueryParams.toString()}`;

	return (
		<Link href={newUrl}>
			<div
				className='flex items-center justify-center bg-Blue text-white text-sm sm:text-lg leading-10 tracking-wide'
				id='join-us-banner'
			>
				Join 210k happy users to create professional slides! 🚀 Start with 20⭐️ credits.
			</div>
		</Link>
	);
};
