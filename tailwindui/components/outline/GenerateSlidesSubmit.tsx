import React, { useState, useRef, useEffect, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import AuthService from '@/services/AuthService';
import 'react-toastify/dist/ReactToastify.css';
import Resource from '@/models/Resource';
import ResourceService from '@/services/ResourceService';
import { useSlides } from '@/hooks/use-slides';
import ProjectService from '@/services/ProjectService';

// this class has no UI, it is used to submit the outline to the backend when isSubmitting is true
const GenerateSlidesSubmit = ({
	outline,
	isGPT35,
	isSubmitting,
	setIsSubmitting,
}: {
	outline: OutlineDataType;
	isGPT35: boolean;
	isSubmitting: boolean;
	setIsSubmitting: (submitting: boolean) => void;
}) => {
	const router = useRouter();

  const { initSlides } = useSlides();

	useEffect(() => {
		if (isSubmitting) {
			handleSubmit();
		}
	}, [isSubmitting]);

	const updateOutlineSessionStorage = (updatedOutline: any) => {
		const entireOutline = JSON.parse(sessionStorage.outline);
		entireOutline.res = JSON.stringify({ ...updatedOutline });
		sessionStorage.setItem('outline', JSON.stringify(entireOutline));
	};

	const checkOutlineChanged = (updatedOutline: any) => {
		const entireOutline = JSON.parse(sessionStorage.outline);
		const originalOutline = JSON.parse(entireOutline.res);
		entireOutline.res = JSON.stringify({ ...updatedOutline });
		if (JSON.stringify(originalOutline) === entireOutline.res) {
			return false;
		} else {
			return true;
		}
	};

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
      const presentation_slides = JSON.stringify(resp.data.res)
			sessionStorage.setItem(
				'presentation_slides',
				JSON.stringify(resp.data.res),
			);
      initSlides(ProjectService.parseSlides(presentation_slides));
			router.push('workflow-review-slides');
		} else {
      setIsSubmitting(false);
			alert(
				`Server is busy now. Please try again later. Reference code: ` +
					sessionStorage.getItem('project_id'),
			);
			//console.log(response);
		}
	}

	const handleSubmit = async () => {
		let formData: any = {};

		console.log('outlineData', outline);

		// remove empty entries
		const outlineCopy = [...outline];
		for (let i = 0; i < outlineCopy.length; i++) {
			outlineCopy[i].content = outlineCopy[i].content.filter((s) => {
				return s.length > 0;
			});
		}

		if (checkOutlineChanged(outlineCopy) === true) {
			sessionStorage.removeItem('extraKnowledge');
			sessionStorage.removeItem('outline_item_counts');
		}

		updateOutlineSessionStorage(outlineCopy);

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
		const project_id =
			typeof window !== 'undefined'
				? sessionStorage.getItem('project_id')
				: null;
		const selectedResources =
			typeof window !== 'undefined'
				? JSON.parse(sessionStorage.getItem('selectedResources') || '')
				: null;
		const addEquations =
			typeof window !== 'undefined'
				? sessionStorage.getItem('addEquations')
				: null;
		const extraKnowledge =
			typeof window !== 'undefined'
				? sessionStorage.getItem('extraKnowledge')
				: null;
		const outline_item_counts =
			typeof window !== 'undefined'
				? sessionStorage.getItem('outline_item_counts')
				: null;
		const scenarioType =
			typeof window !== 'undefined'
				? sessionStorage.getItem('scenarioType')
				: null;
		const schoolTemplate =
		typeof window !== 'undefined'
			? sessionStorage.getItem('schoolTemplate')
			: null;
		const theme =
		typeof window !== 'undefined'
			? sessionStorage.getItem('theme')
			: null;
		const logo =
		typeof window !== 'undefined'
			? sessionStorage.getItem('selectedLogo_id')
			: null;
		formData = {
			res: JSON.stringify({ ...outlineCopy }),
			outlines: JSON.stringify({ ...outlineCopy }),
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
			template: schoolTemplate,
			theme: theme,
			logo: logo ? [logo] : [],
		};
		if (selectedResources && selectedResources.length > 0 && !extraKnowledge) {
			try {
				console.log('resources', selectedResources);
				console.log('querying vector database');
				const { userId, idToken: token } =
					await AuthService.getCurrentUserTokenAndId();
				const extraKnowledge = await ResourceService.queryResource(
					project_id || '',
					selectedResources.map((r: Resource) => r.id),
					outlineCopy,
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
				console.log('formData', formData);
			} catch (error) {
				console.error('Error querying vector database', error);
				// return;
			}
		} else {
			console.log('no need to query vector database');
		}

		try {
			const { userId, idToken: token } =
				await AuthService.getCurrentUserTokenAndId();
			await generateSlidesPreview(formData, token);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return <div></div>;
};

export default GenerateSlidesSubmit;
