import React, { useState, useRef, useEffect, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import Resource from '@/models/Resource';
import ResourceService from '@/services/ResourceService';
import { useSlides } from '@/hooks/use-slides';
import ProjectService from '@/services/ProjectService';
import { toast } from 'react-toastify';
import { useUser } from '@/hooks/use-user';
import { useProject } from '@/hooks/use-project';
import { redirWithId } from '../utils/redirWithId';

// this class has no UI, it is used to submit the outline to the backend when isSubmitting is true
const GenerateSlidesSubmit = ({
	outlines,
	isGPT35,
	isSubmitting,
	setIsSubmitting,
	template,
	imageAmount,
	imageLicense,
	logo_ids,
	background_ids,
}: {
	outlines: Outlines;
	isGPT35: boolean;
	isSubmitting: boolean;
	setIsSubmitting: (submitting: boolean) => void;
	template: string;
	imageAmount: string;
	imageLicense: string;
	logo_ids: string[];
	background_ids: string[];
}) => {
	const router = useRouter();
	const { token } = useUser();
	const { initSlides } = useSlides();
	const { project, updateProject } = useProject();

	useEffect(() => {
		if (isSubmitting) {
			handleSubmit();
		}
	}, [isSubmitting]);

	async function generateSlidesPreview(formData: any, token: string) {
		const response = await fetch('/api/generate_slides', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});

		if (response.ok) {
			const resp = await response.json();
			const presentation_slides = JSON.stringify(resp.data.res);
			sessionStorage.setItem(
				'presentation_slides',
				JSON.stringify(resp.data.res),
			);
			initSlides(ProjectService.parseSlides(presentation_slides));
			updateProject('presentation_slides', presentation_slides);
			updateProject('description', resp.data.description);
			updateProject('keywords', resp.data.keywords);
			redirWithId('workflow-review-slides');
		} else {
			setIsSubmitting(false);
			toast.error(
				'Server is busy now. Please try again later. Reference code: ' +
					project?.id,
			);
		}
	}

	const handleSubmit = async () => {
		let formData: any = {};

		sessionStorage.removeItem('extraKnowledge');
		sessionStorage.removeItem('outline_item_counts');

		const audience =
			typeof window !== 'undefined' ? sessionStorage.getItem('audience') : null;
		const foldername =
			typeof window !== 'undefined'
				? sessionStorage.getItem('foldername')
				: null;
		const topic =
			typeof window !== 'undefined' ? sessionStorage.getItem('topic') : null;
		const language =
			typeof window !== 'undefined'
				? sessionStorage.getItem('language')
				: 'English';
		const project_id = project?.id || '';
		const selectedResources =
			typeof window !== 'undefined'
				? JSON.parse(sessionStorage.getItem('selectedResources') || '')
				: null;
		const addEquations =
			typeof window !== 'undefined'
				? sessionStorage.getItem('addEquations')
				: null;
		const extraKnowledge = project?.extra_knowledge || null;
		const outline_item_counts = project?.outline_item_counts || null;
		const scenarioType =
			typeof window !== 'undefined'
				? sessionStorage.getItem('scenarioType')
				: null;
		const searchOnline =
			typeof window !== 'undefined'
				? sessionStorage.getItem('search_online')
				: null;

		formData = {
			outlines: JSON.stringify({ ...outlines }),
			audience: audience,
			foldername: foldername,
			topic: topic,
			language: language,
			project_id: project_id,
			addEquations: addEquations,
			extraKnowledge: extraKnowledge,
			outline_item_counts: outline_item_counts,
			model_name: isGPT35 ? 'gpt-3.5-turbo' : 'gpt-4',
			scenario_type: scenarioType,
			// endIndex: 2,  // generate first 2 sections only
			template: template,
			logo_ids: logo_ids,
			background_ids: background_ids,
		};
		if (
			(selectedResources && selectedResources.length > 0 && !extraKnowledge) ||
			(!extraKnowledge && searchOnline !== null)
		) {
			try {
				console.log('resources', selectedResources);
				console.log('querying vector database');
				const extraKnowledge = await ResourceService.queryResource(
					project_id || '',
					selectedResources.map((r: Resource) => r.id),
					outlines,
					searchOnline || '',
					token,
				);
				sessionStorage.setItem(
					'extraKnowledge',
					JSON.stringify(extraKnowledge.data.res),
				);
				sessionStorage.setItem(
					'outline_item_counts',
					JSON.stringify(extraKnowledge.data.outline_item_counts),
				);
				formData.extraKnowledge = extraKnowledge.data.res;
				formData.outline_item_counts = extraKnowledge.data.outline_item_counts;
				updateProject(
					'extra_knowledge',
					JSON.stringify(extraKnowledge.data.res),
				);
				updateProject(
					'outline_item_counts',
					JSON.stringify(extraKnowledge.data.outline_item_counts),
				);
				console.log('formData', formData);
			} catch (error) {
				console.error('Error querying vector database', error);
				// return;
			}
		} else {
			console.log('no need to query vector database');
		}

		try {
			await generateSlidesPreview(formData, token);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return <div></div>;
};

export default GenerateSlidesSubmit;
