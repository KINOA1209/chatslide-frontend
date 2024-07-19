import Position from '@/types/Position';
import PptxGenJS from 'pptxgenjs';
import { parseDOM } from 'htmlparser2';
import { ContentType } from './getPositions';
import { useRef } from 'react';
import { domToPng } from 'modern-screenshot';

const parseHtmlToTextOptions = (html: string, defaultSize: number) => {
	const dom = parseDOM(html);
	const textOptions: { text: string; options: any }[] = [];

	const rgb2hex = (rgbString: string) => {
		const rgbRegex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
		const result = rgbRegex.exec(rgbString);
		if (!result) return 'ffffff';
		const componentToHex = (component: number) => {
			const hex = component.toString(16);
			return hex.length === 1 ? '0' + hex : hex;
		};
		return (
			componentToHex(parseInt(result[1], 10)) +
			componentToHex(parseInt(result[2], 10)) +
			componentToHex(parseInt(result[3], 10))
		);
	};

	const styleToOptions = (style: string, options: any = {}) => {
		const styles = style.split(';').reduce((acc: any, style: string) => {
			const [key, value] = style.split(':').map((str) => str.trim());
			acc[key] = value;
			return acc;
		}, {});

		if (styles['font-size'])
			options.fontSize = parseInt(styles['font-size'], 10);
		if (styles['color']) options.color = rgb2hex(styles['color']);
		if (styles['font-family']) options.fontFace = styles['font-family'];
		if (styles['font-weight'] === 'bold') options.bold = true;
		if (styles['font-style'] === 'italic') options.italic = true;
		if (styles['text-decoration'] === 'underline') options.underline = true;

		return options;
	};

	const traverseNodes = (nodes: any, parentOptions: any = {}) => {
		nodes.forEach((node: any) => {
			const currentOptions = { ...parentOptions };

			if (node.type === 'text') {
				textOptions.push({
					text: node.data,
					options: currentOptions,
				});
			} else if (node.type === 'tag') {
				const style = node.attribs.style || '';
				const tagSpecificOptions: any = {
					bold: node.name === 'strong' || parentOptions.bold,
					italic: node.name === 'em' || parentOptions.italic,
					underline: node.name === 'u' || parentOptions.underline,
				};

				Object.assign(
					currentOptions,
					styleToOptions(style, tagSpecificOptions),
				);

				if (node.children && node.children.length) {
					traverseNodes(node.children, currentOptions);
				}
			}
		});
	};

	traverseNodes(dom, {
		fontSize: defaultSize,
		fontFace: 'DM Sans Regular',
		color: 'ffffff',
	});
	return textOptions;
};

export const addTextElement = (
	slide: PptxGenJS.Slide,
	contentType: ContentType,
	htmlString: string | string[],
	defaultSize: number,
	position: Position,
	transparency: number = 1,
) => {
	if (contentType === ContentType.GeneralContent) {
		const textOptions = parseHtmlToTextOptions(
			htmlString as string,
			defaultSize,
		);

		slide.addText(textOptions, {
			x: Number(position.x) / 96,
			y: Number(position.y) / 96,
			w: Number(position.width) / 96,
			h: Number(position.height) / 96,
			align: 'left',
			valign: 'top',
			transparency: transparency,
		});
	} else if (contentType === ContentType.ListContent) {
		let combinedTextOptions: { text: string; options: any }[] = [];

		const listItems = htmlString as string[];

		listItems.forEach((item) => {
			const textOptions = parseHtmlToTextOptions(item, defaultSize);
			combinedTextOptions = [
				...combinedTextOptions,
				...textOptions,
				{ text: '\n', options: {} },
			];
		});

		slide.addText(combinedTextOptions, {
			x: Number(position.x) / 96,
			y: Number(position.y) / 96,
			w: Number(position.width) / 96,
			h: Number(position.height) / 96,
			align: 'left',
			valign: 'top',
			transparency: transparency,
		});
	}
};

export const addLogoElement = (slide: PptxGenJS.Slide, position: Position) => {
	const logo_url = `http://localhost/images/template/square_version_logos/chatSlideSquareLogoWhiteTextWithBackground.svg`;

	slide.addImage({
		path: logo_url,
		x: Number(position.x) / 96,
		y: Number(position.y) / 96,
		w: 0.6,
		h: 0.6,
		altText: 'logo',
	});
};

const getImageData = async (
	ref: React.RefObject<HTMLImageElement>,
): Promise<string | undefined> => {
	if (ref.current) {
		try {
			const dataUrl = await domToPng(ref.current);
			return dataUrl;
		} catch (error) {
			console.error('Error capturing image:', error);
			return undefined;
		}
	} else {
		console.log('Waiting for images to load');
		return undefined;
	}
};

export const addImageElement = async (
	slide: PptxGenJS.Slide,
	imageUrl: string,
	imgRef: React.RefObject<HTMLImageElement>,
	position: Position,
	container_position: Position,
) => {
	if (imgRef) {
		const dispX = Math.max(
			Number(container_position.x) + Number(position.x),
			Number(container_position.x),
		);
		const dispY = Math.max(
			Number(container_position.y) + Number(position.y),
			Number(container_position.y),
		);

		const cropX = Math.abs(Math.min(0, Number(position.x)));
		const cropY = Math.abs(Math.min(0, Number(position.y)));

		const overlap_length = (s1: number, e1: number, s2: number, e2: number) => {
			return Math.max(0, Math.min(e2, e1) - Math.max(s2, s1));
		};

		const cropWidth = overlap_length(
			Number(container_position.x),
			Number(container_position.x) + Number(container_position.width),
			Number(container_position.x) + Number(position.x),
			Number(container_position.x) +
				Number(position.x) +
				Number(position.width),
		);
		const cropHeight = overlap_length(
			Number(container_position.y),
			Number(container_position.y) + Number(container_position.height),
			Number(container_position.y) + Number(position.y),
			Number(container_position.y) +
				Number(position.y) +
				Number(position.height),
		);

		const imgBase64Data = await getImageData(imgRef);

		slide.addImage({
			data: imgBase64Data,
			x: dispX / 96,
			y: dispY / 96,
			w: Number(position.width) / 96,
			h: Number(position.height) / 96,

			sizing: {
				type: 'crop',
				x: cropX / 96,
				y: cropY / 96,
				w: cropWidth / 96,
				h: cropHeight / 96,
			},

			altText: 'Image',
		});
	}
};

export const createGradientImage = (
	width: number,
	height: number,
	stColor: string,
	enColor: string,
	angle: number,
) => {
	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;

	const ctx = canvas.getContext('2d');
	if (!ctx) {
		throw new Error('Failed to get 2D context');
	}

	const radians = (angle * Math.PI) / 180;

	const x = width * Math.cos(radians);
	const y = height * Math.sin(radians);

	const gradient = ctx.createLinearGradient(0, 0, x, y);
	gradient.addColorStop(0, stColor);
	gradient.addColorStop(1, enColor);

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, width, height);

	return canvas.toDataURL('image/png');
};
