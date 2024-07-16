import Slide from '@/models/Slide';
import PptxGenJS from 'pptxgenjs';
import { getHost } from '../getHost';
import Position from '@/types/Position';
import {
	ContentType,
	getContentPositions,
	getHeadPosition,
	getImagePositions,
	getImgContainerPositions,
	getLogoPosition,
	getSubTopicPosition,
	getTopicPosition,
} from './getPositions';
import { ElementDefaultValues } from './ElementsDefaultInfo';
import {
	addImageElement,
	addLogoElement,
	addTextElement,
	createGradientImage,
} from './addElements';

export const generatePPTX = async (slides: Slide[]) => {
	const pptx = new PptxGenJS();

	const host = getHost();

	for (const slide of slides) {
		const slideView = pptx.addSlide();
		const gradientDataUrl = createGradientImage(
			960,
			540,
			'#7E96F7',
			'#A389F7',
			45,
		);

		slideView.background = { data: gradientDataUrl };

		if (slide.layout === 'Cover_img_0_layout') {
			const head_content = slide.head;
			const head_position: Position = getHeadPosition(slide);
			const logo_position: Position = getLogoPosition(slide);
			const username_position: Position = ElementDefaultValues.usernamePos;

			addTextElement(
				slideView,
				ContentType.GeneralContent,
				head_content,
				30,
				head_position,
			);
			addTextElement(
				slideView,
				ContentType.GeneralContent,
				'Created using ChatSlide',
				12,
				username_position,
				0.5,
			);
			addLogoElement(slideView, logo_position);
		} else if (slide.layout === 'Cover_img_1_layout') {
			const head_content = slide.head;
			const head_position: Position = getHeadPosition(slide);
			const logo_position: Position = getLogoPosition(slide);
			const username_position: Position = ElementDefaultValues.usernamePos;
			const image_container_position: Position[] =
				getImgContainerPositions(slide);
			const image_position: Position[] = await getImagePositions(slide);
			addTextElement(
				slideView,
				ContentType.GeneralContent,
				head_content,
				30,
				head_position,
			);
			addTextElement(
				slideView,
				ContentType.GeneralContent,
				'Created using ChatSlide',
				12,
				username_position,
				0.5,
			);
			addLogoElement(slideView, logo_position);
			await addImageElement(
				slideView,
				slide.images[0],
				image_position[0],
				image_container_position[0],
			);
		} else if (slide.layout === 'Col_1_img_0_layout') {
			const topic_content = slide.title;
			const subtopic_content = slide.subtopic;
			const content = slide.content;

			const topic_position = getTopicPosition(slide);
			const subtopic_position = getSubTopicPosition(slide);
			const content_positions = getContentPositions(slide);
			const logo_position: Position = getLogoPosition(slide);

			addTextElement(
				slideView,
				ContentType.GeneralContent,
				topic_content,
				14,
				topic_position,
			);
			addTextElement(
				slideView,
				ContentType.GeneralContent,
				subtopic_content,
				24,
				subtopic_position,
			);
			addTextElement(
				slideView,
				ContentType.ListContent,
				content,
				16,
				content_positions[0],
			);
			addLogoElement(slideView, logo_position);
		} else if (slide.layout === 'Col_2_img_0_layout') {
			const topic_content = slide.title;
			const subtopic_content = slide.subtopic;
			const content = slide.content;

			const topic_position = getTopicPosition(slide);
			const subtopic_position = getSubTopicPosition(slide);
			const content_positions = getContentPositions(slide);

			const logo_position: Position = getLogoPosition(slide);

			addTextElement(
				slideView,
				ContentType.GeneralContent,
				topic_content,
				14,
				topic_position,
			);
			addTextElement(
				slideView,
				ContentType.GeneralContent,
				subtopic_content,
				24,
				subtopic_position,
			);
			content.forEach(async (ctn, index) => {
				addTextElement(
					slideView,
					ContentType.GeneralContent,
					ctn,
					16,
					content_positions[index],
				);
			});
			addLogoElement(slideView, logo_position);
		} else if (slide.layout === 'Col_3_img_0_layout') {
			const topic_content = slide.title;
			const subtopic_content = slide.subtopic;
			const content = slide.content;

			const topic_position = getTopicPosition(slide);
			const subtopic_position = getSubTopicPosition(slide);
			const content_positions = getContentPositions(slide);
			const logo_position: Position = getLogoPosition(slide);

			addTextElement(
				slideView,
				ContentType.GeneralContent,
				topic_content,
				14,
				topic_position,
			);
			addTextElement(
				slideView,
				ContentType.GeneralContent,
				subtopic_content,
				24,
				subtopic_position,
			);
			content.forEach(async (ctn, index) => {
				addTextElement(
					slideView,
					ContentType.GeneralContent,
					ctn,
					14,
					content_positions[index],
				);
			});
			addLogoElement(slideView, logo_position);
		} else if (slide.layout === 'Col_2_img_1_layout') {
			const topic_content = slide.title;
			const subtopic_content = slide.subtopic;
			const content = slide.content;

			const topic_position = getTopicPosition(slide);
			const subtopic_position = getSubTopicPosition(slide);
			const content_positions = getContentPositions(slide);
			const logo_position: Position = getLogoPosition(slide);

			const image_container_position: Position[] =
				getImgContainerPositions(slide);
			const image_position: Position[] = await getImagePositions(slide);

			addTextElement(
				slideView,
				ContentType.GeneralContent,
				topic_content,
				14,
				topic_position,
			);
			addTextElement(
				slideView,
				ContentType.GeneralContent,
				subtopic_content,
				24,
				subtopic_position,
			);
			addTextElement(
				slideView,
				ContentType.ListContent,
				content,
				14,
				content_positions[0],
			);
			await addImageElement(
				slideView,
				slide.images[0],
				image_position[0],
				image_container_position[0],
			);
			addLogoElement(slideView, logo_position);
		} else if (slide.layout === 'Col_1_img_1_layout') {
			const topic_content = slide.title;
			const subtopic_content = slide.subtopic;
			const content = slide.content;

			const topic_position = getTopicPosition(slide);
			const subtopic_position = getSubTopicPosition(slide);
			const content_positions = getContentPositions(slide);
			const logo_position: Position = getLogoPosition(slide);

			const image_container_position: Position[] =
				getImgContainerPositions(slide);
			const image_position: Position[] = await getImagePositions(slide);

			addTextElement(
				slideView,
				ContentType.GeneralContent,
				topic_content,
				14,
				topic_position,
			);
			addTextElement(
				slideView,
				ContentType.GeneralContent,
				subtopic_content,
				24,
				subtopic_position,
			);
			addTextElement(
				slideView,
				ContentType.ListContent,
				content,
				14,
				content_positions[0],
			);
			await addImageElement(
				slideView,
				slide.images[0],
				image_position[0],
				image_container_position[0],
			);
			addLogoElement(slideView, logo_position);
		} else if (slide.layout === 'Col_2_img_2_layout') {
			const topic_content = slide.title;
			const subtopic_content = slide.subtopic;
			const content = slide.content;

			const topic_position = getTopicPosition(slide);
			const subtopic_position = getSubTopicPosition(slide);
			const content_positions = getContentPositions(slide);
			const logo_position: Position = getLogoPosition(slide);

			const images = slide.images;
			const image_container_position: Position[] =
				getImgContainerPositions(slide);
			const image_position: Position[] = await getImagePositions(slide);

			addTextElement(
				slideView,
				ContentType.GeneralContent,
				topic_content,
				14,
				topic_position,
			);
			addTextElement(
				slideView,
				ContentType.GeneralContent,
				subtopic_content,
				24,
				subtopic_position,
			);
			content.forEach(async (ctn, index) => {
				addTextElement(
					slideView,
					ContentType.GeneralContent,
					ctn,
					14,
					content_positions[index],
				);
			});

			images.forEach(async (img, index) => {
				await addImageElement(
					slideView,
					img,
					image_position[index],
					image_container_position[index],
				);
			});

			await addImageElement(
				slideView,
				slide.images[0],
				image_position[0],
				image_container_position[0],
			);
			addLogoElement(slideView, logo_position);
		} else if (slide.layout === 'Col_3_img_3_layout') {
			const topic_content = slide.title;
			const subtopic_content = slide.subtopic;
			const content = slide.content;

			const topic_position = getTopicPosition(slide);
			const subtopic_position = getSubTopicPosition(slide);
			const content_positions = getContentPositions(slide);
			const logo_position: Position = getLogoPosition(slide);

			const images = slide.images;
			const image_container_position: Position[] =
				getImgContainerPositions(slide);
			const image_position: Position[] = await getImagePositions(slide);

			addTextElement(
				slideView,
				ContentType.GeneralContent,
				topic_content,
				14,
				topic_position,
			);
			addTextElement(
				slideView,
				ContentType.GeneralContent,
				subtopic_content,
				24,
				subtopic_position,
			);
			content.forEach(async (ctn, index) => {
				addTextElement(
					slideView,
					ContentType.GeneralContent,
					ctn,
					14,
					content_positions[index],
				);
			});

			images.forEach(async (img, index) => {
				await addImageElement(
					slideView,
					img,
					image_position[index],
					image_container_position[index],
				);
			});

			await addImageElement(
				slideView,
				slide.images[0],
				image_position[0],
				image_container_position[0],
			);
			addLogoElement(slideView, logo_position);
		} else if (slide.layout === 'Full_img_only_layout') {
		}
	}

	pptx.writeFile({ fileName: 'Presentation.pptx' });
};
