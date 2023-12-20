import { toPng } from 'html-to-image';

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

