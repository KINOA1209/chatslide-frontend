'use client';


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
import { addIdToRedir } from '../../utils/redirWithId';
import Project from '@/models/Project';
import { PaletteKeys, TemplateKeys } from '../slides/slideTemplates';

// this class has no UI, it is used to submit the outline to the backend when isSubmitting is true
const GenerateSlidesSubmit = ({
	outlines,
	isGPT35,
	isSubmitting,
	setIsSubmitting,
	template,
	palette,
	imageAmount,
	imageLicense,
	logo_ids,
	background_ids,
}: {
	outlines: Outlines;
	isGPT35: boolean;
	isSubmitting: boolean;
	setIsSubmitting: (submitting: boolean) => void;
	template: TemplateKeys;
	palette: PaletteKeys;
	imageAmount: string;
	imageLicense: string;
	logo_ids: string[];
	background_ids: string[];
}) => {
	const router = useRouter();
	const { token } = useUser();
	const { initSlides } = useSlides();
	const { project, updateProject, bulkUpdateProject } = useProject();

	useEffect(() => {
		if (isSubmitting) {
			handleSubmit();
		}
	}, [isSubmitting]);

	async function generateSlides(formData: any, token: string) {
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
			initSlides(ProjectService.parseSlides(presentation_slides));
			bulkUpdateProject({
				description: resp.data.description,
				keywords: resp.data.keywords,
				additional_images: resp.data.additional_images,
				presentation_slides: presentation_slides,
			} as Project);
			router.push(addIdToRedir('/slides'));
		} else {
			setIsSubmitting(false);
			console.error('Error when generating slides:', response.status);
			toast.error(
				'Server is busy now. Please try again later. Reference code: ' +
				project?.id,
			);
		}
	}

	const handleSubmit = async () => {
		let formData: any = {};

		if (!project) {
			console.error('Project not found');
			return;
		}

		const project_id = project.id;
		const selectedResources = project.resources || [];

		formData = {
			outlines: JSON.stringify({ ...outlines }),
			audience: project.audience,
			foldername: project.foldername,
			topic: project.topic,
			language: project.language,
			project_id: project.id,
			extraKnowledge: project.extra_knowledge,
			outline_item_counts: project.outline_item_counts,
			// model_name: isGPT35 ? 'gpt-3.5-turbo' : 'gpt-4',
			scenario_type: project.scenario_type,
			// endIndex: 2,  // generate first 2 sections only
			template: template,
			palette: palette,
			imageLicense: imageLicense,
			logo_ids: logo_ids,
			background_ids: background_ids,
		};

		// if we have resources, but no extra knowledge, we need to query the vector database
		if (!project.extra_knowledge && (selectedResources.length > 0 || project.search_online)) {
			try {
				console.log('resources', selectedResources);
				console.log('querying vector database');
				const extraKnowledge = await ResourceService.queryResource(
					project_id,
					selectedResources.map((r: Resource) => r.id),
					outlines,
					project.search_online || '',
					token,
				);
				formData.extraKnowledge = extraKnowledge.data.res;
				formData.outline_item_counts = extraKnowledge.data.outline_item_counts;
				updateProject(
					'extra_knowledge',
					JSON.stringify(extraKnowledge.data.res),
				);
				updateProject(
					'outline_item_counts',
					extraKnowledge.data.outline_item_counts,
				);
				console.log('formData', formData);
			} catch (error) {
				console.error('Error querying vector database', error);
				// continue without extra knowledge
			}
		} else {
			console.log('no need to query vector database');
		}

		try {
			await generateSlides(formData, token);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return <div></div>;
};

export default GenerateSlidesSubmit;
