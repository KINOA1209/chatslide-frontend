import { ElementDefaultValues } from './ElementsDefaultInfo';
import Slide from '@/models/Slide';
import Position from '@/types/Position';

export enum ContentType {
	GeneralContent,
	ListContent,
}

export const getHeadPosition = (slide: Slide) => {
	return slide.head_position === undefined ||
		Object.keys(slide.head_position).length === 0
		? ElementDefaultValues.titlePos
		: slide.head_position;
};

export const getLogoPosition = (slide: Slide) => {
	return slide.logo_numeric_position === undefined ||
		Object.keys(slide.logo_numeric_position).length === 0
		? ElementDefaultValues.Logo_img_position[slide.logo_position]
		: slide.logo_numeric_position;
};

export const getTopicPosition = (slide: Slide) => {
	return slide.title_position === undefined ||
		Object.keys(slide.title_position).length === 0
		? slide.layout === 'Cover_img_1_layout' ||
			slide.layout === 'Col_1_img_1_layout' ||
			slide.layout === 'Col_2_img_1_layout'
			? ElementDefaultValues.topicPos.With_Image
			: ElementDefaultValues.topicPos.Without_Image
		: slide.title_position;
};

export const getSubTopicPosition = (slide: Slide) => {
	return slide.subtopic_position === undefined ||
		Object.keys(slide.subtopic_position).length === 0
		? slide.layout === 'Cover_img_1_layout' ||
			slide.layout === 'Col_1_img_1_layout' ||
			slide.layout === 'Col_2_img_1_layout'
			? ElementDefaultValues.subtopicPos.With_Image
			: ElementDefaultValues.subtopicPos.Without_Image
		: slide.subtopic_position;
};

export const getContentPositions = (slide: Slide) => {
	if (slide.content_positions === undefined)
		return ElementDefaultValues.contentPos[slide.layout];
	return slide.content_positions.map((ctn_position, index) => {
		return ctn_position === undefined || Object.keys(ctn_position).length === 0
			? (ElementDefaultValues.contentPos[slide.layout][index] as Position)
			: ctn_position;
	});
};

export const getImgContainerPositions = (slide: Slide) => {
	if (slide.image_container_positions === undefined)
		return ElementDefaultValues.imgContainerPos[slide.layout];
	return slide.image_container_positions.map((ctn_position, index) => {
		return ctn_position === undefined || Object.keys(ctn_position).length === 0
			? (ElementDefaultValues.imgContainerPos[slide.layout][index] as Position)
			: ctn_position;
	});
};

export const getImagePositions = async (slide: Slide) => {
	const imgContainerPositions = getImgContainerPositions(slide);

	const loadImage = (src: string): Promise<HTMLImageElement> => {
		return new Promise((resolve) => {
			const img = new Image();
			img.src = src;
			img.onload = () => resolve(img);
		});
	};

	const imagePositionsPromises = slide.images.map(async (imgSrc, index) => {
		if (
			slide.image_positions === undefined ||
			slide.image_positions.length === 0 ||
			Object.keys(slide.image_positions[index]).length === 0
		) {
			const img = await loadImage(imgSrc);
			const ctnSize = imgContainerPositions[index];
			const initW = Number(ctnSize.width);
			const initH = Number(ctnSize.width) * (img.height / img.width);
			const initX = 0;
			const initY = (Number(ctnSize.height) - initH) / 2;

			return { x: initX, y: initY, width: initW, height: initH };
		} else {
			return slide.image_positions[index];
		}
	});

	return Promise.all(imagePositionsPromises);
};
