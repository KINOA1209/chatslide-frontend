'use client';
import AuthService from '@/services/AuthService';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef, RefObject, use } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserService from '@/services/UserService';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ReferralLink from '@/components/ReferralLink';
import { BigBlueButton } from '@/components/button/DrlambdaButton';
import { NewInputBox } from '@/components/ui/InputBox';
import { FaInbox, FaKey, FaUser } from 'react-icons/fa';
import { useUser } from '@/hooks/use-user';
import useHydrated from '@/hooks/use-hydrated';
import SessionStorage from '@/utils/SessionStorage';
import Card from '@/components/ui/Card';
import { BigTitle, Explanation, Instruction } from '@/components/ui/Text';
import { Panel } from '@/components/layout/Panel';
import { Column } from '@/components/layout/Column';
import { getBrand } from '@/utils/getHost';
import { UnlimitedUpgrade } from '@/components/slides/card/UnlimitedUpgrade';
import { trackRewardfulConversion } from '@/components/integrations/Rewardful';

const Profile = () => {
	const { username, email, token, setUsername, user } = useUser();
	const [editUsername, setEditUsername] = useState(username);
	const [editEmail, setEditEmail] = useState(email);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const params = useSearchParams();

	useEffect(() => {
		const paid = params.get('paid');
		if (paid === 'true') {
			toast.success('Payment successful!');
			trackRewardfulConversion(email);
		} else if (paid === 'false') {
			toast.error('Payment cancelled.');
		}
	}, []);

	function userFirstName(): string {
		return username?.split(' ')[0];
	}

	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditUsername(e.target.value);
	};

	const handleSubmitUsernameAndEmail = async () => {
		setIsSubmitting(true);

		// Set the character limit for editUsername
		const maxCharacterLimit = 50;
		if (editUsername.length > maxCharacterLimit) {
			toast.error('Username must be 50 characters or less.', {
				position: 'top-center',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
			return;
		}

		await AuthService.updateName(editUsername);
		// await AuthService.updateEmail(editEmail);

		const ok = await UserService.updateUsernameAndEmail(
			editUsername,
			editEmail,
			token,
		);
		if (ok) {
			toast.success('Successfully updated', {
				position: 'top-center',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
		}
		setIsSubmitting(false);
		setUsername(editUsername);
	};

	return (
		<>
			<div className='w-full'>
				<BigTitle>Hi, {userFirstName()}</BigTitle>
			</div>
			<div className='w-full'>
				<Instruction>📭 Email</Instruction>
				<Explanation>
					Changing this will not affect your login email. This is only for us to
					reach you.
				</Explanation>
				<div className='w-full justify-center flex flex-row mt-2'>
					<div className='w-full flex grow gap-4 max-w-[60rem] justify-center'>

            <NewInputBox
              id='email'
              value={editEmail}
              onChange={setEditEmail}
              autoSelect
              placeholder='Email'
              maxLength={50}
              icon={<FaInbox className='text-gray-600' />}
            />

						<BigBlueButton
							id='update-email'
							onClick={handleSubmitUsernameAndEmail}
							isSubmitting={isSubmitting}
						>
							Update
						</BigBlueButton>
					</div>
				</div>
			</div>
			<div className='w-full'>
				<Instruction>🔐 Change Password</Instruction>
				<div className='items-center justify-center flex flex-row'>
					<BigBlueButton
						id='change-password'
						onClick={() => {
							window.location.href = '/reset-password';
						}}
					>
						Change Password
					</BigBlueButton>
				</div>
			</div>
			<div className='w-full'>
				<Instruction>🏷️ Username</Instruction>

				<div className='w-full justify-center flex flex-row'>
					<div className='flex w-full max-w-[60rem] flex-row gap-4 justify-center mt-2'>

            <NewInputBox
              id='username'
              value={editUsername}
              onChange={setEditUsername}
              autoSelect
              placeholder='Username'
              maxLength={50}
              icon={<FaUser className='text-gray-600' />}
            />

						<BigBlueButton
							id='update-username'
							onClick={handleSubmitUsernameAndEmail}
							isSubmitting={isSubmitting}
						>
							Update
						</BigBlueButton>
					</div>
				</div>
			</div>
		</>
	);
};

const Referral = () => {
	return (
		<div className='w-full'>
			<Instruction>👍 Referral</Instruction>
			<div className='w-full justify-center flex grow flex-row'>
				<div className='max-w-[60rem] w-full'>
					<ReferralLink />
				</div>
			</div>
		</div>
	);
};

const OpenAIKey = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { token, user } = useUser();
  const [key, setKey] = useState(user?.openai_api_key || 'sk-...');

  useEffect(() => {
    setKey(user?.openai_api_key || 'sk-...');
  }, [user]);

	const updateKey = async () => {
		setIsSubmitting(true);
		console.log(isSubmitting);
		await UserService.updateOpenaiApiKey(token, key);
		toast.success('OpenAI key updated!', {
			position: 'top-center',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
		});
		setIsSubmitting(false);
		console.log(isSubmitting);
	};

	return (
		<div className='w-full'>
			<Instruction>🔑 Your OpenAI Key</Instruction>
			<Explanation>
				Paste your own OpenAI key here so you can still generate when you run
				out of credits (paid users only):
			</Explanation>
			<div className='w-full justify-center flex flex-row'>
				<div className='flex grow max-w-[60rem] flex-row gap-4 justify-center mt-2'>
          <NewInputBox
            id='openai_api_key'
            value={key}
            onChange={setKey}
            autoSelect
            placeholder='sk-...'
            maxLength={100}
            icon={<FaKey className='text-gray-600' />}
          />

					<BigBlueButton
						id='update-oai-key'
						onClick={updateKey}
						isSubmitting={isSubmitting}
					>
						Update
					</BigBlueButton>
				</div>
			</div>
		</div>
	);
};

const ApplyPromo = () => {
	const searchParams = useSearchParams();
	const [promo, setPromo] = useState(
		searchParams?.get('promo') || SessionStorage.getItem('promo'),
	);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { token, updateCreditsAndTier } = useUser();

	useEffect(() => {
		// if promo in search params, call applyPromo
		if (promo) {
			applyPromo();
		}
	}, []);

	const applyPromo = async () => {
		setIsSubmitting(true);
		console.log(isSubmitting);
		const { status, message } = await UserService.applyPromoCode(
			promo,
			token,
			true,
		);
		if (status == 200) {
			toast.success('Your code is successfully applied!', {
				position: 'top-center',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
		} else {
			toast.error(message, {
				position: 'top-center',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
		}
		setIsSubmitting(false);
		updateCreditsAndTier();
	};

	return (
		<div className='w-full'>
			<div className='text-green-600 text-md py-1'>
				🌟 Apply Promo Code or License Key
			</div>
			<div className='w-full justify-center flex flex-row'>
				<div className='flex grow max-w-[60rem] flex-row gap-4 justify-center mt-2'>
          <NewInputBox
            id='promo_code'
            value={promo}
            onChange={setPromo}
            autoSelect
            placeholder='Enter promo code'
            maxLength={50}
            icon={<FaKey className='text-gray-600' />}
          />

					<BigBlueButton
						id='apply-promo'
						onClick={applyPromo}
						isSubmitting={isSubmitting}
					>
						Apply
					</BigBlueButton>
				</div>
			</div>
		</div>
	);
};

const CreditHistory = () => {
	const { credits } = useUser();

	return (
		<div className='w-full'>
			<Instruction>⭐️ Credit Balance</Instruction>
			<BigTitle>
				<>{credits}</>
			</BigTitle>
		</div>
	);
};

export default function Account() {
	// To add a new section
	// Add tabRef for header animation
	// Add section ref for scrollIntoView in function toSection
	// Add IntersectionObserver in function observeElements

	const bar = <div className='w-full h-0 border-b-2 border-[#CAD0D3]'></div>;

	const router = useRouter();
	const { isPaidUser } = useUser();

	useEffect(() => {
		AOS.init({
			once: true,
			disable: 'phone',
			duration: 700,
			easing: 'ease-out-cubic',
		});
	});

	// avoid hydration error during development caused by persistence
	if (!useHydrated()) return <></>;

	return (
		<Column>
			<Panel>
				<ToastContainer />
				<Card>
					<Profile />
				</Card>
				{/* <div className='w-full max-w-none 2xl:max-w-[80%]'><PasswordModule /></div> */}
				<Card>
					{/* id is for better locating the section */}
					<div id='credit'>
						<CreditHistory />
					</div>
					<div id='referral'>
						<Referral />
					</div>
					<div id='openai'>
						<OpenAIKey />
					</div>
					<div id='promo'>
						<ApplyPromo />
					</div>
				</Card>

				<UnlimitedUpgrade />

				<Card>
					<BigTitle>💸 Earn Money with {getBrand()}</BigTitle>
					<Instruction>
						<div className='flex flex-col gap-y-1'>
							<span>
								Share your love for {getBrand()} and make real money by inviting
								your friends and connections to join!
							</span>
							<span>
								Your friends will get <strong>60%</strong> off on their first
								purchase and you will get <strong>30%</strong> commission on all
								their purchases.{' '}
							</span>
							<span>
								Keep track of your conversions and earnings real-time and get
								paid monthly.{' '}
							</span>
						</div>
					</Instruction>
					<Instruction>
						<a href='/affiliate' className='text-blue-600'>
							Learn more about affiliate program.{' '}
						</a>
					</Instruction>
					<BigBlueButton
						onClick={() => {
							router.push('https://chatslide.getrewardful.com/');
						}}
					>
						💸 Start Earning Now
					</BigBlueButton>
				</Card>
			</Panel>
		</Column>
	);
}
