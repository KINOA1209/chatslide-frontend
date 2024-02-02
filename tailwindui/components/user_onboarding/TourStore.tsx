// tourStore.ts
import { create } from 'zustand';

interface TourStore {
	isTourActive: boolean;
	startTour: () => void;
	setIsTourActive: (active: boolean) => void;
}

const useTourStore = create<TourStore>((set) => ({
	isTourActive: false,
	startTour: () => set({ isTourActive: true }),
	setIsTourActive: (active) => set({ isTourActive: active }),
}));

export default useTourStore;
