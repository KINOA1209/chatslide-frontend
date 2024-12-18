'use client';
import React, { useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import SocialPostVisualizer from '@/components/socialPost/socialPostVisualizer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useRouter } from 'next/navigation';
import WorkflowStepsBanner from '@/components/layout/WorkflowStepsBanner';
import { SocialPostSlide } from '@/models/SocialPost';
import { ThemeObject } from '@/components/socialPost/socialPostThemeChanger';
import useHydrated from '@/hooks/use-hydrated';
import SessionStorage from '@/utils/SessionStorage';
import { useProject } from '@/hooks/use-project';
import { useSocialPosts } from '@/hooks/use-socialpost';

export default function SocialMediaTemplate() {
	const router = useRouter();
	const contentRef = useRef<HTMLDivElement>(null);
	const borderColorOptions = [
		{
			border_start: '#FF7A41',
			border_end: '#D63300',
			cover_start: '#B83700 0%',
			cover_end: 'rgba(0, 0, 0, 0.00)',
		},
		{
			border_start: '#FFBE41',
			border_end: '#D68000',
			cover_start: '#AB8C1E 0%',
			cover_end: 'rgba(0, 0, 0, 0.00)',
		},
		{
			border_start: '#96EB2C',
			border_end: '#23830B',
			cover_start: '#579C00 0%',
			cover_end: 'rgba(0, 0, 0, 0.00)',
		},
		{
			border_start: '#FB42FF',
			border_end: '#767EFF',
			cover_start: '#9F4FC9 0%',
			cover_end: 'rgba(0, 0, 0, 0.00)',
		},
		{
			border_start: '#41C6FF',
			border_end: '#0055D6',
			cover_start: '#2593C8 0%',
			cover_end: 'rgba(0, 0, 0, 0.00)',
		},
		{
			border_start: '#937C67',
			border_end: '#4F361F',
			cover_start: '#725947 0%',
			cover_end: 'rgba(0, 0, 0, 0.00)',
		}, // default
		{
			border_start: '#D0BF9E',
			border_end: '#AC9067',
			cover_start: '#725E16 0%',
			cover_end: 'rgba(0, 0, 0, 0.00)',
		},
		{
			border_start: '#AFC593',
			border_end: '#62735D',
			cover_start: '#52702D 0%',
			cover_end: 'rgba(0, 0, 0, 0.00)',
		},
		{
			border_start: '#CCACCD',
			border_end: '#66589D',
			cover_start: '#593F66 0%',
			cover_end: 'rgba(0, 0, 0, 0.00)',
		},
		{
			border_start: '#9DC0CE',
			border_end: '#556379',
			cover_start: '#214150 0%',
			cover_end: 'rgba(0, 0, 0, 0.00)',
		},
	];

	const { socialPosts, setSocialPosts } = useSocialPosts();
	const { project, initProject, updateProject } = useProject();
	const res_scenario = project?.post_type || 'casual_topic';

	function getCover(scenario: string | null): ThemeObject {
		switch (scenario) {
			case 'casual_topic':
				return borderColorOptions[6];
			case 'serious_subject':
				return borderColorOptions[6];
			case 'reading_notes':
				return borderColorOptions[6];
			default:
				return borderColorOptions[6];
		}
	}

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	return (
		<section>
			<div
				style={{
					backgroundImage:
						socialPosts.length === 0
							? `linear-gradient(180deg, ${
									getCover(res_scenario).cover_start
								}, ${getCover(res_scenario).cover_end} 50%)`
							: `linear-gradient(180deg, ${socialPosts[0]?.theme?.cover_start}, ${socialPosts[0]?.theme?.cover_end} 50%)`,
				}}
			>
				{/* flex col container for steps, title, etc */}
				<WorkflowStepsBanner
					currentIndex={1}
					isSubmitting={false}
					setIsSubmitting={() => {}}
					isPaidUser={true}
					nextIsPaidFeature={false}
					lastStep={true}
					nextStep={false}
					nextText={'Next'}
          contentType={'social_posts'}
				/>

				<ToastContainer enableMultiContainer containerId={'slides'} />

				<div className='mt-[1rem] max-w-4xl mx-auto px-6' ref={contentRef}>
					<SocialPostVisualizer
						borderColorOptions={borderColorOptions}
						res_scenario={res_scenario || 'casual_topic'}
					/>
				</div>
			</div>
		</section>
	);
}
