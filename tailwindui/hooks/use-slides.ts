import { useEffect, useMemo, useRef } from 'react';
import { createBearStore } from '@/utils/create-bear-store';
import Slide from '@/models/Slide';
import { TemplateKeys } from '@/components/slides/slideTemplates';

const useSlidesBear = createBearStore<Slide[]>()('slides', [], true);
const useSlideIndex = createBearStore<number>()('slideIndex', 0, true);
const useSlidesHistoryBear = createBearStore<Slide[][]>()('slidesHistory', [], true);
const useSlidesHistoryIndex = createBearStore<number>()('slidesHistoryIndex', 0, true);

export enum SlidesStatus {
  NotInited,
  Initing,
  Inited,
}

let slidesStatus: SlidesStatus = SlidesStatus.NotInited;

export const useSlides = () => {
  const { slides, setSlides } = useSlidesBear();
  const { slideIndex, setSlideIndex } = useSlideIndex();
  const { slidesHistory, setSlidesHistory } = useSlidesHistoryBear();
  const { slidesHistoryIndex, setSlidesHistoryIndex } = useSlidesHistoryIndex();

  const init = async () => {
    if (slidesStatus !== SlidesStatus.NotInited) return;
    slidesStatus = SlidesStatus.Initing;

    setSlides([]);
    setSlideIndex(0);
    setSlidesHistory([]);
    setSlidesHistoryIndex(0);

    console.log('-- init slides: ', { slidesStatus, slides })

    slidesStatus = SlidesStatus.Inited;
  }

  const addEmptyPage = (index: number) => {
    console.log('-- add empty page: ', { index })
    setSlides(prevSlides => {
      const newSlides = [...prevSlides];
      newSlides.splice(index, 0, new Slide());
      return newSlides;
    });

    updateSlideHistory();
  }

  const deleteSlidePage = (index: number) => {
    console.log('-- delete slide page: ', { index })
    setSlides(prevSlides => {
      const newSlides = [...prevSlides];
      newSlides.splice(index, 1);
      return newSlides;
    });

    updateSlideHistory();
  }

  const updateSlidePage = (index: number, slide: Slide) => {
    console.log('-- update slide page: ', { index, slide })
    setSlides(prevSlides => {
      const newSlides = [...prevSlides];
      newSlides[index] = slide;
      return newSlides;
    });

    updateSlideHistory();
  }

  const gotoPage = (index: number) => {
    console.log('-- goto page: ', { index })
    if (index < 0 || index >= slides.length) return;
    setSlideIndex(index);
  }

  useEffect(() => {
    void init();
  }, []);

  const updateSlideHistory = () => {
    console.log('-- slides changed, adding to history: ', { slides })
    if (slidesHistory.length >= 10) {  // Only keep 10 versions
      setSlidesHistory(prevHistory => prevHistory.slice(prevHistory.length - 9));
    }
    setSlidesHistory((prevHistory) => [...prevHistory, slides]);
    setSlidesHistoryIndex((prevIndex) => prevIndex + 1);
  }

  const undoChange = () => {
    if (slidesHistoryIndex > 0) {
      setSlidesHistoryIndex((prevIndex) => prevIndex - 1);
      setSlides(slidesHistory[slidesHistoryIndex - 1]);
    }
    console.log('Performing undo...');
    document.execCommand('undo', false, undefined); // Change null to undefined
  };

  const redoChange = () => {
    if (slidesHistoryIndex < slidesHistory.length - 1) {
      setSlidesHistoryIndex((prevIndex) => prevIndex + 1);
      setSlides(slidesHistory[slidesHistoryIndex + 1]);
    }
    // Add your redo logic here
    console.log('Performing redo...');
    document.execCommand('redo', false, undefined); // Change null to undefined
  };

  const changeTemplate = (newTemplate: TemplateKeys) => {
    console.log('Changing template to:', newTemplate);
    const newSlides = slides.map((slide, index) => {
      return { ...slide, template: newTemplate };
    });
    setSlides(newSlides);
    
    updateSlideHistory();
  }

  const initSlides = (slides: Slide[]) => {
    setSlides(slides);
  }

  return {
    slides, addEmptyPage, deleteSlidePage, updateSlidePage, changeTemplate, initSlides,
    slidesHistory, slidesHistoryIndex, undoChange, redoChange,
    slideIndex, gotoPage, slidesStatus
  };
};
