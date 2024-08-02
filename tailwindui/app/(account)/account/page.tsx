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
import DrlambdaButton, {
	BigBlueButton,
	InversedBigBlueButton,
} from '@/components/button/DrlambdaButton';
import { NewInputBox } from '@/components/ui/InputBox';
import {
	FaInbox,
	FaKey,
	FaMoneyBill,
	FaRegStar,
	FaStar,
	FaUser,
} from 'react-icons/fa';
import { useUser } from '@/hooks/use-user';
import useHydrated from '@/hooks/use-hydrated';
import SessionStorage from '@/utils/SessionStorage';
import Card from '@/components/ui/Card';
import {
	BigTitle,
	Explanation,
	Instruction,
	Title,
} from '@/components/ui/Text';
import { Panel } from '@/components/layout/Panel';
import { Column } from '@/components/layout/Column';
import { getBrand } from '@/utils/getHost';
import { UnlimitedUpgrade } from '@/components/slides/card/UnlimitedUpgrade';
import { trackRewardfulConversion } from '@/components/integrations/Rewardful';
import { WrappableRow } from '@/components/layout/WrappableRow';
import SubscriptionModal from '../SubscriptionModal';
import Modal from '@/components/ui/Modal';
import { Router } from 'next/router';

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

						<InversedBigBlueButton
							id='update-email'
							onClick={handleSubmitUsernameAndEmail}
							isSubmitting={isSubmitting}
							width='8rem'
						>
							Update
						</InversedBigBlueButton>
					</div>
				</div>
			</div>
			<div className='w-full'>
				<Instruction>🔐 Change Password</Instruction>
				<div className='items-center justify-center flex flex-row'>
					<InversedBigBlueButton
						id='change-password'
						onClick={() => {
							window.location.href = '/reset-password';
						}}
						width='12rem'
					>
						Change Password
					</InversedBigBlueButton>
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

						<InversedBigBlueButton
							id='update-username'
							onClick={handleSubmitUsernameAndEmail}
							isSubmitting={isSubmitting}
							width='8rem'
						>
							Update
						</InversedBigBlueButton>
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

// unused
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

					<InversedBigBlueButton
						id='update-oai-key'
						onClick={updateKey}
						isSubmitting={isSubmitting}
						width='8rem'
					>
						Update
					</InversedBigBlueButton>
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
			<div className='w-full mx-auto justify-center flex flex-row gap-x-2'>
				<NewInputBox
					id='promo_code'
					value={promo}
					onChange={setPromo}
					autoSelect
					placeholder='Promo code'
					maxLength={50}
					width='200px'
					icon={<FaStar className='text-gray-600' />}
				/>

				<InversedBigBlueButton
					id='apply-promo'
					onClick={applyPromo}
					isSubmitting={isSubmitting}
					width='8rem'
				>
					Apply
				</InversedBigBlueButton>
			</div>
		</div>
	);
};

const Affiliate = () => {
	const { user, token } = useUser();
	const [rewardfulCode, setRewardfulCode] = useState(
		user?.rewardful_code || '',
	);
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		setRewardfulCode(user?.rewardful_code || '');
	}, [user]);

	async function handleUpdateRewardfulCode() {
		setIsSubmitting(true);
		try {
			await UserService.updateRewardfulCode(rewardfulCode, token);
			toast.success('Rewardful code updated successfully');
		} catch (error) {
			toast.error('Failed to update rewardful code');
		}
		setIsSubmitting(false);
	}

	return (
		<Card>
			<BigTitle>💸 Join Affiliate Program</BigTitle>
			<Instruction>
				<div className='flex flex-col gap-y-1'>
					<span>
						Share your love for {getBrand()} and make real money by inviting
						your friends, audiences, and connections to join!
					</span>
					<span>
						You will get <strong>30%</strong> commission on all their purchases,
						including the recurring ones.{' '}
					</span>
					<span>
						Keep track of your conversions and earnings real-time and get paid
						monthly.{' '}
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

			<Title center={false}>Already joined? </Title>
			<Instruction>
				Put your Rewardful code here, the code will be added to all of your
				shared projects. And you will get paid on every converted paying user
				through your shared contents.
			</Instruction>
			<div className='w-full justify-center flex flex-row'>
				<div className='flex grow max-w-[60rem] flex-row gap-4 justify-center mt-2'>
					<NewInputBox
						id='rewardful_code'
						value={rewardfulCode}
						onChange={setRewardfulCode}
						autoSelect
						placeholder='Rewardful Code'
						maxLength={50}
						icon={<FaMoneyBill className='text-gray-600' />}
					/>
					<InversedBigBlueButton
						onClick={handleUpdateRewardfulCode}
						isSubmitting={isSubmitting}
						width='8rem'
					>
						Update
					</InversedBigBlueButton>
				</div>
			</div>

			{rewardfulCode && (
				<Explanation>
					<span>Your share link will look like: </span>
					<u>https://chatslide.ai/shared/your-project?via={rewardfulCode}</u>
					<br />
					<span>
						You will get paid on every converted paying user joining through
						this link.
					</span>
					<br />
					<a href='/affiliate' className='text-blue-600'>
						Learn more.{' '}
					</a>
				</Explanation>
			)}
		</Card>
	);
};

const CreditHistory = () => {
	const { credits, tier, token } = useUser();
	const router = useRouter();
	// const [stripeLink, setStripeLink] = useState('');
	const [showManageSubscription, setShowManageSubscription] = useState(false);

	// useEffect(() => {
	// 	async function fetchStripeLink() {
	//     if(!token) return;
	// 		const link = await UserService.createStripePortalSession(token);
	// 		setStripeLink(link);
	// 	}
	// 	fetchStripeLink();
	// }, [token]);

	return (
		<div className='w-full'>
			<Instruction>⭐️ Credit Balance</Instruction>

			{showManageSubscription && (
				<SubscriptionModal
					showManageSubscription={showManageSubscription}
					setShowManageSubscription={setShowManageSubscription}
				/>
			)}

			<WrappableRow type='flex' justify='between'>
				<BigTitle>
					<>{credits}</>
				</BigTitle>
				<InversedBigBlueButton
					onClick={() => {
						setShowManageSubscription(!showManageSubscription);
					}}
					width='12rem'
				>
					Mange Subscription
				</InversedBigBlueButton>
			</WrappableRow>

			<Instruction>⭐️ Subscription Tier</Instruction>
			<BigTitle>{tier.replace('_', ' ')}</BigTitle>
      
		</div>
	);
};

const DangerZone = () => {
	const { token, signOut } = useUser();
	const [showModal, setShowModal] = useState(false);
	const router = useRouter();

	function deleteAndSignOut(reason: string) {
		UserService.deleteUser(token, reason);
		signOut();
		router.push('/landing');
	}

	const ConfirmModal: React.FC<{}> = () => {
		const [reason, setReason] = useState('');

		return (
			<Modal
				title='Delete Account and Sign Out'
				description='Would you like to share why you want to delete your account?'
				showModal={showModal}
				setShowModal={setShowModal}
				hasInputArea
				inputValue={reason}
				setInputValue={setReason}
			>
				{reason && (
					<Instruction>
						<div
							onClick={() => deleteAndSignOut(reason)}
							className='text-red-600'
						>
							Confirm Deletion
						</div>
					</Instruction>
				)}
			</Modal>
		);
	};

	if (!token) {
		return null;
	}

	return (
		<Card>
			{showModal && <ConfirmModal />}
			<Instruction>🔥 Danger Zone</Instruction>
			<Instruction>
				<span
					className='text-red-600 cursor-pointer'
					onClick={() => {
						setShowModal(true);
					}}
				>
					Delete Account and Sign Out
				</span>
			</Instruction>
		</Card>
	);
};

export default function Account() {
	// To add a new section
	// Add tabRef for header animation
	// Add section ref for scrollIntoView in function toSection
	// Add IntersectionObserver in function observeElements

	const bar = <div className='w-full h-0 border-b-2 border-[#CAD0D3]'></div>;

	const router = useRouter();
	const { user } = useUser();

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
					{/* <div id='openai'>
						<OpenAIKey />
					</div> */}
					<div id='promo'>
						<ApplyPromo />
					</div>
				</Card>

				<UnlimitedUpgrade />

				<Affiliate />

				<DangerZone />
			</Panel>
		</Column>
	);
}
