import { useEffect, useMemo, useRef } from 'react';
import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import { Auth as AmplifyAuth } from '@aws-amplify/auth';
import { createBearStore } from '@/utils/create-bear-store';
import UserService from '@/services/UserService';
import AuthService from '@/services/AuthService';

// todo: user, session is not persistable since they(classes) are not serializable
// const useUserBear = createBearStore<CognitoUser | undefined>()(
// 	'user',
// 	undefined,
// 	false,
// );
// const useSessionBear = createBearStore<CognitoUserSession | undefined>()(
// 	'session',
// 	undefined,
// 	false,
// );
const useTokenBear = createBearStore<string>()('token', '', true);
const useUidBear = createBearStore<string>()('uid', '', true);
const useUsernameBear = createBearStore<string>()('username', '', true);
const useEmailBear = createBearStore<string>()('email', '', true);
const useIsPaidUserBear = createBearStore<boolean>()('isPaidUser', false, true);
const useCreditsBear = createBearStore<number>()('credits', 0, true);
const useTierBear = createBearStore<string>()('tier', '', true);

enum UserStatus {
	NotInited,
	Initing,
	Inited,
}

let userStatus: UserStatus = UserStatus.NotInited;

export const useUser = () => {
	// const { user, setUser } = useUserBear();
	// const { session, setSession } = useSessionBear();
  const { token, setToken } = useTokenBear();
  const { uid, setUid } = useUidBear();
  const { credits, setCredits } = useCreditsBear();
  const { tier, setTier } = useTierBear();
	const { isPaidUser, setIsPaidUser } = useIsPaidUserBear();
  const { username, setUsername } = useUsernameBear();
  const { email, setEmail } = useEmailBear();

	const initUser = async () => {
		// console.log('-- initing user: ', {userStatus, user})

		// avoid re-init user in cross components
		if (userStatus !== UserStatus.NotInited) return;
		userStatus = UserStatus.Initing;

		try {
      const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
      let username = await AuthService.getCurrentUserDisplayName();
      username = username?.split('@')[0] || 'User';
      const email = await AuthService.getCurrentUserEmail();
			const { credits, tier } =
				await UserService.getUserCreditsAndTier(idToken);
			const isPaidUser = [
				'PRO_MONTHLY',
				'PLUS_MONTHLY',
				'PRO_YEARLY',
				'PLUS_YEARLY',
			].includes(tier);

			console.log('-- initUser: ', {
        username: username,
        userId: userId,
        idToken: idToken,
        email: email,
        credits: credits,
        tier: tier,
        isPaidUser: isPaidUser,
      });
      
      setCredits(credits);
      setTier(tier);
      setUid(userId);
      setToken(idToken);
			setIsPaidUser(isPaidUser);
      setUsername(username);
      setEmail(email);
			userStatus = UserStatus.Inited;
		} catch (e) {
			console.error(e);
			userStatus = UserStatus.NotInited;
		}
	};

  const updateCreditsAndTier = async () => {
    const { credits, tier } = await UserService.getUserCreditsAndTier(token);
    const isPaidUser = [
      'PRO_MONTHLY',
      'PLUS_MONTHLY',
      'PRO_YEARLY',
      'PLUS_YEARLY',
    ].includes(tier);
    setCredits(credits);
    setTier(tier);
    setIsPaidUser(isPaidUser);
  }
  
	useEffect(() => {
		void initUser();
	}, []);

	// console.log('-- useUser: ', {user, session, isPaidUser})

  return { username, token, uid, email, credits, tier, isPaidUser, updateCreditsAndTier, setUsername };
};
