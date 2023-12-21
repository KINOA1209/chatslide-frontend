import { toCanvas, toPng } from 'html-to-image';
import { domToPng, domToCanvas } from 'modern-screenshot';
import { jsPDF } from 'jspdf';

const areAllImagesLoaded = (container: HTMLElement) => {
	return true;
};

export async function downloadImage(
	topic: string,
	ref: React.RefObject<HTMLDivElement>,
): Promise<void> {
	if (ref.current && areAllImagesLoaded(ref.current)) {
		try {
			// await new Promise((resolve) => setTimeout(resolve, 1000));
			console.log('ref', ref.current);
			const dataUrl = await domToPng(ref.current);
			const link = document.createElement('a');
			link.href = dataUrl;
			link.download = (topic ? topic : 'drlambda') + '.png';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (error) {
			console.error('Error capturing image:', error);
		}
	} else {
		console.log('Waiting for images to load');
	}
}

export async function generatePdf(
	topic: string,
	ref: React.RefObject<HTMLDivElement>,
	pageCount: number,
): Promise<File | null> {
	if (ref.current && areAllImagesLoaded(ref.current)) {
		try {
			const canvas = await domToCanvas(ref.current);
			const fullCanvasHeight = canvas.height;
			const fullCanvasWidth = canvas.width;
			const pageHeightPx = fullCanvasHeight / pageCount;

			console.log('page size', pageHeightPx, fullCanvasWidth);

			const pdf = new jsPDF({
				orientation: fullCanvasWidth > pageHeightPx ? 'landscape' : 'portrait',
				unit: 'px',
				format: [pageHeightPx, fullCanvasWidth],
			});

			for (let y = 0; y < fullCanvasHeight; y += pageHeightPx) {
				// Create a temporary canvas to draw the sliced part
				const tempCanvas = document.createElement('canvas');
				const tempCtx = tempCanvas.getContext('2d');

				tempCanvas.width = fullCanvasWidth;
				tempCanvas.height = Math.min(pageHeightPx, fullCanvasHeight - y);

				// Draw the sliced part of the main canvas onto the temporary canvas
				tempCtx?.drawImage(
					canvas,
					0,
					y,
					fullCanvasWidth,
					tempCanvas.height,
					0,
					0,
					fullCanvasWidth,
					tempCanvas.height,
				);

				// Add the sliced part to the PDF
				if (y > 0) pdf.addPage();
				const imageData = tempCanvas.toDataURL('image/png', 1); // 1 is
				pdf.addImage(
					imageData,
					'PNG',
					0,
					0,
					fullCanvasWidth,
					tempCanvas.height,
				);
			}

			// Generate PDF as Blob
			const pdfBlob = pdf.output('blob');

			// Create a File object from the Blob
			const pdfFile = new File(
				[pdfBlob],
				(topic ? topic : 'drlambda') + '.pdf',
				{ type: 'application/pdf' },
			);
			return pdfFile;
		} catch (error) {
			console.error('Error capturing image:', error);
			return null;
		}
	} else {
		console.log('Waiting for images to load');
		return null;
	}
}
