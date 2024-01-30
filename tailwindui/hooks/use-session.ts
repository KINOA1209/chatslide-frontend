import { useEffect, useMemo, useRef } from 'react';
import { createBearStore } from '@/utils/create-bear-store';
import ChatHistory from '@/models/ChatHistory';

const usePromo = createBearStore<string>()('promo', '', true);
const useOpenSideBar = createBearStore<boolean>()('openSideBar', false, true);
const useOpenAIAgent = createBearStore<boolean>()('openAIAgent', false, true);

export enum SessionStatus {
	NotInited,
	Initing,
	Inited,
}

let sessionStatus: SessionStatus = SessionStatus.NotInited;

export const useSession = () => {
  const { promo, setPromo } = usePromo();
  const { openSideBar, setOpenSideBar } = useOpenSideBar();
  const { openAIAgent, setOpenAIAgent } = useOpenAIAgent();


	const initSession = async () => {
    if (sessionStatus !== SessionStatus.NotInited) return;
    sessionStatus = SessionStatus.Initing;
  }

  useEffect(() => {
    void initSession();
  }, []);
    

	// console.log('-- useUser: ', {user, session, isPaidUser})

  return { promo, setPromo, openSideBar, setOpenSideBar, openAIAgent, setOpenAIAgent, sessionStatus };
};
