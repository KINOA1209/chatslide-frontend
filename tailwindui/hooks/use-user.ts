import { useEffect, useMemo, useRef } from 'react';
import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import { Auth as AmplifyAuth } from '@aws-amplify/auth';
import { createBearStore } from '@/utils/create-bear-store';
import UserService from '@/services/UserService';

// todo: user, session is not persistable since they(classes) are not serializable
const useUserBear = createBearStore<CognitoUser | undefined>()(
	'user',
	undefined,
	false,
);
const useSessionBear = createBearStore<CognitoUserSession | undefined>()(
	'session',
	undefined,
	false,
);
const useIsPaidUserBear = createBearStore<boolean>()('isPaidUser', false, true);

enum UserStatus {
	NotInited,
	Initing,
	Inited,
}

let userStatus: UserStatus = UserStatus.NotInited;

export const useUser = () => {
	const { user, setUser } = useUserBear();
	const { session, setSession } = useSessionBear();
	const { isPaidUser, setIsPaidUser } = useIsPaidUserBear();

	const initUser = async () => {
		// console.log('-- initing user: ', {userStatus, user})

		// avoid re-init user in cross components
		if (userStatus !== UserStatus.NotInited) return;
		userStatus = UserStatus.Initing;

		try {
			const newUser = await AmplifyAuth.currentAuthenticatedUser();
			const session = await AmplifyAuth.currentSession();

			const userId = newUser.username;
			const idToken = session.getIdToken().getJwtToken();

			const { credits, tier } =
				await UserService.getUserCreditsAndTier(idToken);
			const isPaidUser = [
				'PRO_MONTHLY',
				'PLUS_MONTHLY',
				'PRO_YEARLY',
				'PLUS_YEARLY',
			].includes(tier);

			console.log('-- initUser: ', { user: newUser, session, isPaidUser });
			setUser(newUser);
			setSession(session);
			setIsPaidUser(isPaidUser);
			userStatus = UserStatus.Inited;
		} catch (e) {
			console.error(e);
			userStatus = UserStatus.NotInited;
		}
	};

	useEffect(() => {
		void initUser();
	}, []);

	// console.log('-- useUser: ', {user, session, isPaidUser})

	return { user, session, isPaidUser };
};
