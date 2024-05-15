'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import Resource from '@/models/Resource';
import ResourceService from '@/services/ResourceService';
import { useSlides } from '@/hooks/use-slides';
import ProjectService from '@/services/ProjectService';
import { toast } from 'react-toastify';
import { useUser } from '@/hooks/use-user';
import { useProject } from '@/hooks/use-project';
import Project from '@/models/Project';
import SlidesService from '@/services/SlidesService';
import Slide from '@/models/Slide';
import { getBrand } from '@/utils/getHost';
import {
	convertPlainTextToOutlines,
} from '@/components/outline/OutlineUtils';

// this class has no UI, it is used to submit the outline to the backend when isSubmitting is true
const GenerateSlidesSubmit = ({
	outlines,
	outlinesPlainText,
	isGPT35,
	isSubmitting,
	setIsSubmitting,
	viewMode,
}: {
	outlines: Outlines;
	outlinesPlainText: string;
	isGPT35: boolean;
	isSubmitting: boolean;
	setIsSubmitting: (submitting: boolean) => void;
	viewMode: string;
}) => {
	const router = useRouter();
	const { token } = useUser();
	const { initSlides } = useSlides();
	const { project, updateProject, bulkUpdateProject, updateOutlines } =
		useProject();

	useEffect(() => {
		if (isSubmitting) {
			//console.log(outlinesPlainText)
			handleSubmit();
		}
	}, [isSubmitting]);

	async function generateSlides(formData: any, token: string) {
		try {
			bulkUpdateProject({
				has_scripts: false, // in case it is re-generated
				presentation_slides: '',
				parsed_slides: [] as Slide[],
			} as Project);
			const { presentation_slides, description, keywords } =
				await SlidesService.generateSlides(formData, token);
			// initSlides(ProjectService.parseSlides(presentation_slides));  // do this when generating slides
			bulkUpdateProject({
				description: description,
				keywords: keywords,
				presentation_slides: presentation_slides,
			} as Project);
			// router.push(addIdToRedir('/slides'));
		} catch (e) {
			setIsSubmitting(false);
			console.error('Error generating slides:', e);
			toast.error(
				'Server is busy now. Please try again later. Reference code: ' +
					project?.id,
			);
		}
	}

	const fetchData = async (language: string) => {
		try {
			const convertedOutlineJSON = await convertPlainTextToOutlines(
				token,
				outlinesPlainText,
				language,
				isGPT35 ? 'gpt-3.5-turbo' : 'gpt-4',
			);
			updateOutlines(
				Object.values(JSON.parse(convertedOutlineJSON.data.outlines)),
			);
			bulkUpdateProject({
				outlines: convertedOutlineJSON.data.outlines,
			} as Project);
			return Object.values(JSON.parse(convertedOutlineJSON.data.outlines));
		} catch (error) {
			console.error('Failed to convert plain text to outlines:', error);
			toast.error(
				'Failed to convert plain text to outlines. Please try again later.',
			);
			return null;
		}
	};

	const handleSubmit = async () => {
		let formData: any = {};

		if (!project) {
			console.error('Project not found');
			return;
		}

		const project_id = project.id;
		const selectedResources = project.resources || [];
		let convertedOutlines = null;
		if (viewMode === 'page') {
			convertedOutlines = await fetchData(project.language);
			if (!convertedOutlines) {
				setIsSubmitting(false);
				return;
			}
		}
		//console.log('before submitting', outlines)
		//console.log('before submitting converted', convertedOutlines)
		formData = {
			outlines: JSON.stringify(
				convertedOutlines ? { ...convertedOutlines } : { ...outlines },
			),
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
			logo: project.logo,
			brand: getBrand(),
			add_citations: project.add_citations,
		};
		bulkUpdateProject({
			has_scripts: false, // in case it is re-generated
		} as Project);

		// if we have resources, but no extra knowledge, we need to query the vector database
		if (
			!project.extra_knowledge &&
			(selectedResources.length > 0 || project.search_online)
		) {
			try {
				console.log('resources', selectedResources);
				console.log('querying vector database');
				const extraKnowledge = await ResourceService.queryResource(
					project_id,
					selectedResources.map((r: Resource) => r.id),
					convertedOutlines || outlines,
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
