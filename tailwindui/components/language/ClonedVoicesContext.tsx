import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import VoiceCloneService from '@/services/VoiceService';
import { useUser } from '@/hooks/use-user'; 
import VoiceProfile from '@/models/VoiceProfile';

interface ClonedVoicesContextProps {
  clonedVoices: VoiceProfile[];
}

const ClonedVoicesContext = createContext<ClonedVoicesContextProps | undefined>(undefined);

const ClonedVoicesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [clonedVoices, setClonedVoices] = useState<VoiceProfile[]>([]);
  const { token } = useUser();
  useEffect(() => {
    const fetchVoiceProfiles = async () => {
      try {
        const profiles: VoiceProfile[] = await VoiceCloneService.getVoiceProfiles(token);
        setClonedVoices(profiles);
      } catch (error: any) {
        console.error('Error fetching voice profiles:', error.message);
      }
    };

    if (token) {
      fetchVoiceProfiles();
    }
  }, [token]);

  return (
    <ClonedVoicesContext.Provider value={{ clonedVoices }}>
      {children}
    </ClonedVoicesContext.Provider>
  );
};

const useClonedVoices = () => {
  const context = useContext(ClonedVoicesContext);
  if (!context) {
    throw new Error('useClonedVoices must be used within a ClonedVoicesProvider');
  }
  return context;
};

export { ClonedVoicesProvider, useClonedVoices};
