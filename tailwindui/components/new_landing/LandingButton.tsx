'use client';

import { useUser } from '@/hooks/use-user';

const LandingButton = () => {
	const { token } = useUser();

	return (
		<div>
			<button
				className='md:bottom-[48%] w-[16rem] h-[3.75rem] py-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:scale-110 rounded-lg justify-center items-center gap-2.5 flex z-10 text-center text-zinc-100 text-m md:text-xl font-creato-medium capitalize tracking-wide'
				onClick={() => {
					if (token) {
						window.location.href = '/dashboard'; // Example action to navigate
					} else {
						window.location.href = '/signup'; // Example action to navigate
					}
				}}
			>
				{token ? 'Start Now' : 'Start for Free'}
			</button>
			<div className='flex items-center justify-center font-creato-medium my-2'>
				💙 Loved by 190,000+ happy users
			</div>
		</div>
	);
};

export default LandingButton;
