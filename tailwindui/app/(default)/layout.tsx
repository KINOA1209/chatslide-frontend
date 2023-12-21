'use client';

import { useEffect } from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';

import Footer from '@/components/ui/footer';
import useHydrated from '@/hooks/use-hydrated';

export default function DefaultLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	useEffect(() => {
		AOS.init({
			once: true,
			disable: 'phone',
			duration: 700,
			easing: 'ease-out-cubic',
		});
	});

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return;

	return (
		<>
			<main className='grow'>
				{children}
				{/* <Footer /> */}
			</main>
		</>
	);
}
