import { useEffect, useMemo, useRef } from 'react';
import { createBearStore } from '@/utils/create-bear-store';
import Slide from '@/models/Slide';
import { TemplateKeys } from '@/components/slides/slideTemplates';
import { useUser } from './use-user';

const useSlidesBear = createBearStore<Slide[]>()('slides', [], true);
const useSlideIndex = createBearStore<number>()('slideIndex', 0, true);
const useSlidesHistoryBear = createBearStore<Slide[][]>()('slidesHistory', [], true);
const useSlidesHistoryIndex = createBearStore<number>()('slidesHistoryIndex', 0, true);
const useVersion = createBearStore<number>()('version', 0, true);

export enum SlidesStatus {
  NotInited,
  Initing,
  Inited,
}

export enum SaveStatus {
  UpToDate,
  Saving,
}

let slidesStatus: SlidesStatus = SlidesStatus.NotInited;
let saveStatus: SaveStatus = SaveStatus.UpToDate;

export const useSlides = () => {
  const { slides, setSlides } = useSlidesBear();
  const { slideIndex, setSlideIndex } = useSlideIndex();
  const { slidesHistory, setSlidesHistory } = useSlidesHistoryBear();
  const { slidesHistoryIndex, setSlidesHistoryIndex } = useSlidesHistoryIndex();
  const { version, setVersion } = useVersion();
  const { token } = useUser();

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

  useEffect(() => {
    void init();
  }, []);

  const addEmptyPage = (index: number) => {
    console.log('-- add empty page: ', { index })
    setSlides(prevSlides => {
      const newSlides = [...prevSlides];
      newSlides.splice(index, 0, new Slide());
      return newSlides;
    });

    updateVersion();
    updateSlideHistory();
    saveSlides();
  }

  const deleteSlidePage = (index: number) => {
    console.log('-- delete slide page: ', { index })
    setSlides(prevSlides => {
      const newSlides = [...prevSlides];
      newSlides.splice(index, 1);
      return newSlides;
    });

    updateVersion();
    updateSlideHistory();
    saveSlides();
  }

  const updateSlidePage = (index: number, slide: Slide) => {
    console.log('-- update slide page: ', { index, slide })
    setSlides(prevSlides => {
      const newSlides = [...prevSlides];
      newSlides[index] = slide;
      return newSlides;
    });

    updateSlideHistory();
    saveSlides();
  }

  const gotoPage = (index: number) => {
    console.log('-- goto page: ', { index })
    if (index < 0 || index >= slides.length) return;
    setSlideIndex(index);
  }

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
    saveSlides();
  }

  const initSlides = (slides: Slide[]) => {
    setSlides(slides);
  }

  const updateVersion = () => {  // helps force update slide container
    setVersion((prevVersion) => prevVersion + 1);
  }

  const saveSlides = async () => {
    saveStatus = SaveStatus.Saving;

    const foldername = sessionStorage.getItem('foldername');
    const project_id = sessionStorage.getItem('project_id');
    const formData = {
      foldername: foldername,
      final_slides: slides,
      project_id: project_id,
    };

    console.log('Saving slides:', formData);

    // Send a POST request to the backend to save finalSlides
    fetch('/api/save_slides', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          saveStatus = SaveStatus.UpToDate;
          console.log('Auto-save successful.');
        } else {
          // Handle save error
          console.error('Auto-save failed.');
        }
      })
      .catch((error) => {
        // Handle network error
        console.error('Auto-save failed:', error);
      });
  };

  return {
    slides, addEmptyPage, deleteSlidePage, updateSlidePage, changeTemplate, initSlides,
    slidesHistory, slidesHistoryIndex, undoChange, redoChange,
    slideIndex, gotoPage, slidesStatus, 
    version, updateVersion, saveStatus
  };
};
