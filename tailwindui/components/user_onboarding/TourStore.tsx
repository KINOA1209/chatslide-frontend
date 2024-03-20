// tourStore.ts
import { create } from 'zustand';

interface TourStore {
	isTourActive: boolean;
	isNextEnabled: boolean; // New state for controlling the next button
	startTour: () => void;
	setIsTourActive: (active: boolean) => void;
	setIsNextEnabled: (enabled: boolean) => void; // New setter function
}

const useTourStore = create<TourStore>((set) => ({
	isTourActive: false,
	isNextEnabled: false, // Initial state for isNextEnabled
	startTour: () => set({ isTourActive: true }),
	setIsTourActive: (active) => set({ isTourActive: active }),
	setIsNextEnabled: (enabled) => set({ isNextEnabled: enabled }), // Setter for isNextEnabled
}));

export default useTourStore;
