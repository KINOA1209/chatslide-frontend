import { useEffect, useMemo, useRef } from 'react';
import { Auth as AmplifyAuth } from '@aws-amplify/auth';
import { createBearStore } from '@/utils/create-bear-store';
import UserService from '@/services/UserService';
import AuthService from '@/services/AuthService';
import mixpanel from 'mixpanel-browser';
import { User } from '@/models/User';

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
const useUserBear = createBearStore<User | null>()('user', null, true, false);

export enum UserStatus {
	NotInited,
	Initing,
	Inited,
	Failed,
}

let userStatus: UserStatus = UserStatus.NotInited;

const PAID_TIERS = [
	'PLUS_ONETIME',
	'PRO_ONETIME',
	'PLUS_MONTHLY',
	'PLUS_YEARLY',
	'PLUS_LIFETIME',
	'PRO_MONTHLY',
	'PRO_YEARLY',
	'PRO_LIFETIME',
	'ULTIMATE_ONETIME',
	'ULTIMATE_MONTHLY',
	'ULTIMATE_YEARLY',
	'ULTIMATE_LIFETIME',
];

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

	const { user, setUser } = useUserBear(); // for other attributes of User

	const initUser = async () => {
		// console.log('-- initing user: ', {userStatus, user})

		// avoid re-init user in cross components
		if (userStatus == UserStatus.Inited || userStatus == UserStatus.Initing)
			return;

		userStatus = UserStatus.Initing;

		for (let attempt = 0; attempt < 2; attempt++) {
			try {
				const { uid, email, idToken } =
					await AuthService.getCurrentUserTokenAndEmail();
				if (!idToken) {
					console.warn('User not logged in');
					userStatus = UserStatus.Failed;
					return;
				}
				let username = await AuthService.getCurrentUserDisplayName();

				const user = await UserService.getUserCreditsAndTier(idToken);
				console.log(' -- initUser: ', user);
				setUser(user);

				const {
					name: usernameInDB,
					email: emailInDb,
					credits,
					subscription_tier,
					expiration_date,
				} = user;

				if (usernameInDB && emailInDb) {
					if (usernameInDB !== username || !emailInDb.includes('@')) {
						// db info is not up to date, due to bad initing
						UserService.updateUsernameAndEmail(username, email, idToken); // async but dont await
					}
				}

				const isPaidUser = PAID_TIERS.includes(subscription_tier);

				username = username?.split('@')[0] || 'User';

				mixpanel.init('22044147cd36f20bf805d416e1235329', {
					debug: false,
					track_pageview: true,
					persistence: 'localStorage',
					ignore_dnt: true,
				});

				mixpanel.identify(uid);

				if (window.clarity) {
					window.clarity('set', 'usernameInDB', usernameInDB);
					window.clarity('set', 'userEmail', emailInDb);
					window.clarity('set', 'tier', subscription_tier);
				} else {
          console.warn('clarity not loaded, are you in local?');
        }

				setCredits(credits);
				setTier(subscription_tier);
				setUid(uid);
				setToken(idToken);
				setIsPaidUser(isPaidUser);
				if (expiration_date) setExpirationDate(expiration_date);
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
		console.log(' -- updating credits and tier');
		const { credits, subscription_tier, expiration_date } =
			await UserService.getUserCreditsAndTier(token);
		const isPaidUser = PAID_TIERS.includes(subscription_tier);
		setCredits(credits);
		setTier(subscription_tier);
		setIsPaidUser(isPaidUser);
		if (expiration_date) setExpirationDate(expiration_date);
	};

	const updateCreditsFE = (delta: number): number => {
		console.log('updating credits by ', delta);
		if (credits === 'Unlimited') return 1000000;
		const creditsNum = parseInt(credits);
		setCredits((credits) => (creditsNum + delta).toString());
		return creditsNum + delta;
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
		user,
		username,
		token,
		// uid,  // this is different from the uid in decoded from token if user logs in with google, use token and decode it in backend
		email,
		credits,
		updateCreditsFE,
		tier,
		expirationDate,
		isPaidUser,
		updateCreditsAndTier,
		setUsername,
		userStatus,
		signOut,
	};
};
