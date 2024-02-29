import { useEffect, useMemo, useRef } from 'react';
import { Auth as AmplifyAuth } from '@aws-amplify/auth';
import { createBearStore } from '@/utils/create-bear-store';
import UserService from '@/services/UserService';
import AuthService from '@/services/AuthService';

const useTokenBear = createBearStore<string>()('token', '', true, false);
const useUidBear = createBearStore<string>()('uid', '', true, false);
const useUsernameBear = createBearStore<string>()('username', '', true, false);
const useEmailBear = createBearStore<string>()('email', '', true, false);
const useIsPaidUserBear = createBearStore<boolean>()(
	'isPaidUser',
	false,
	true,
	false,
);
const useCreditsBear = createBearStore<string>()('credits', '', true, false);
const useTierBear = createBearStore<string>()('tier', '', true, false);
const useExpirationDateBear = createBearStore<string>()(
	'expirationDate',
	'',
	true,
	false,
);

export enum UserStatus {
	NotInited,
	Initing,
	Inited,
	Failed,
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
	const { expirationDate, setExpirationDate } = useExpirationDateBear();

	const initUser = async () => {
		// console.log('-- initing user: ', {userStatus, user})

		// avoid re-init user in cross components
		if (userStatus == UserStatus.Inited || userStatus == UserStatus.Initing)
			return;

		userStatus = UserStatus.Initing;

		for (let attempt = 0; attempt < 2; attempt++) {
			try {
				const { userId, idToken } =
					await AuthService.getCurrentUserTokenAndId();
				if (!userId || !idToken) {
					console.warn('User not logged in');
					userStatus = UserStatus.Failed;
					return;
				}
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

				// Break out of the loop if successful
				break;
			} catch (e) {
				console.error(`Failed to init user: ${e}, attempt ${attempt + 1}/2...`);

				// If it's the second attempt, throw the error
				if (attempt === 1) {
					userStatus = UserStatus.Failed;
					throw e;
				}

				// Otherwise, retry the block after a delay (you can adjust the delay as needed)
				await new Promise((resolve) => setTimeout(resolve, 500));
			}
		}
	};

	const updateCreditsAndTier = async () => {
		const { credits, tier, expirationDate } =
			await UserService.getUserCreditsAndTier(token);
		const isPaidUser = [
			'PRO_MONTHLY',
			'PLUS_MONTHLY',
			'PRO_YEARLY',
			'PLUS_YEARLY',
		].includes(tier);
		setCredits(credits);
		setTier(tier);
		setIsPaidUser(isPaidUser);
		setExpirationDate(expirationDate);
	};

	useEffect(() => {
		void initUser();
	}, []);

	const signOut = async () => {
		await AmplifyAuth.signOut();
		setToken('');
		setUid('');
		setCredits('0');
		setTier('');
		setIsPaidUser(false);
		setUsername('');
		setEmail('');
	};

	// console.log('-- useUser: ', {user, session, isPaidUser})

	return {
		username,
		token,
		uid,
		email,
		credits,
		tier,
		expirationDate,
		isPaidUser,
		updateCreditsAndTier,
		setUsername,
		userStatus,
		signOut,
	};
};
