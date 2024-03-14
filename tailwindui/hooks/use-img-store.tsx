import { create } from 'zustand';

interface ImageStore {
	sourceImage: string | null;
	setSourceImage: (sourceImage: string | null) => void;
}

export const useImageStore = create<ImageStore>((set) => ({
	sourceImage: null,
	setSourceImage: (sourceImage) => set({ sourceImage }),
}));
