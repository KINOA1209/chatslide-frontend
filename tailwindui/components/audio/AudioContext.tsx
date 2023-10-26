import { createContext, useState, useContext, ReactNode } from 'react';

type AudioContextType = {
    playingId: string | null;
    setPlayingId: (id: string | null) => void;
};

const defaultContextValue: AudioContextType = {
    playingId: null,
    setPlayingId: () => {} // an empty function just as a placeholder
};
  
const AudioContext = createContext<AudioContextType>(defaultContextValue);
  
export const useAudio = () => {
    return useContext(AudioContext);
};
  
type AudioContextProviderProps = {
    children: ReactNode;
};

export const AudioContextProvider: React.FC<AudioContextProviderProps> = ({ children }) => {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <AudioContext.Provider value={{ playingId, setPlayingId }}>
      {children}
    </AudioContext.Provider>
  );
};