import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import dynamic from 'next/dynamic';
import { ThemeObject } from '@/components/socialPost/socialPostThemeChanger';

const SocialPostHTML = dynamic(
	() => import('@/components/socialPost/socialPostHTML'),
	{ ssr: false },
);

type SocialPostVisualizerProps = {
	borderColorOptions: ThemeObject[];
	res_scenario: string;
};
const SocialPostVisualizer: React.FC<SocialPostVisualizerProps> = ({
	borderColorOptions,
	res_scenario,
}) => {
	return (
		<div>
			<div className='px-4 sm:px-6 flex flex-col justify-center items-center gap-4'>
				<SocialPostHTML
					borderColorOptions={borderColorOptions}
					res_scenario={res_scenario}
				/>
			</div>
		</div>
	);
};

export default SocialPostVisualizer;
