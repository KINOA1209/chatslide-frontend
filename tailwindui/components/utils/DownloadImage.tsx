import { toCanvas, toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';


const areAllImagesLoaded = (container: HTMLElement) => {
  // const images = container.getElementsByTagName('img');
  // for (let i = 0; i < images.length; i++) {
  //   if (!images[i].complete || images[i].naturalWidth === 0) {
  //     return false;
  //   }
  // }
  return true;
};

export async function downloadImage(topic: string, ref: React.RefObject<HTMLDivElement>): Promise<void> {
  if (ref.current && areAllImagesLoaded(ref.current)) {
    try {
      const dataUrl = await toPng(ref.current);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = (topic ? topic : 'drlambda') + '.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error capturing image:', error);
    }
  }
  else {
    console.log('Waiting for images to load')
  }
};


export async function downloadPdf(topic: string, ref: React.RefObject<HTMLDivElement>, pageCount: number): Promise<void> {
  if (ref.current && areAllImagesLoaded(ref.current)) {
    try {
      const canvas = await toCanvas(ref.current);
      const fullCanvasHeight = canvas.height;
      const fullCanvasWidth = canvas.width;
      const pageHeightPx = fullCanvasHeight / pageCount; 

      console.log('page size', pageHeightPx, fullCanvasWidth)

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
        tempCtx?.drawImage(canvas, 0, y, fullCanvasWidth, tempCanvas.height, 0, 0, fullCanvasWidth, tempCanvas.height);

        // Add the sliced part to the PDF
        if (y > 0) pdf.addPage();
        const imageData = tempCanvas.toDataURL('image/png', 1);  // 1 is
        pdf.addImage(imageData, 'PNG', 0, 0, fullCanvasWidth, tempCanvas.height);
      }

      // Save the PDF
      pdf.save((topic ? topic : 'drlambda') + '.pdf');
      
    } catch (error) {
      console.error('Error capturing image:', error);
    }
  }
  else {
    console.log('Waiting for images to load')
  }
};
