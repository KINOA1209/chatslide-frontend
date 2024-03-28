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
import { InputBox } from '@/components/ui/InputBox';
import {
	FaInbox,
	FaKey,
	FaUser,
} from 'react-icons/fa';
import { useUser } from '@/hooks/use-user';
import useHydrated from '@/hooks/use-hydrated';
import SessionStorage from '@/utils/SessionStorage';
import Card from '@/components/ui/Card';
import { BigTitle, Explanation, Instruction } from '@/components/ui/Text';
import { Panel } from '@/components/layout/Panel';
import { Column } from '@/components/layout/Column';

const Profile = () => {
	const { username, email, token, setUsername } = useUser();
	const [editUsername, setEditUsername] = useState(username);
	const [editEmail, setEditEmail] = useState(email);
	const [isSubmitting, setIsSubmitting] = useState(false);

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
			token);
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
	}

	return (
		<>
			<div className='w-full'>
				<BigTitle>
					Hi, {userFirstName()}
				</BigTitle>
			</div>
			<div className='w-full'>
				<Instruction>
					📭 Email
				</Instruction>
				<Explanation>
					Changing this will not affect your login email. This is only for us to reach you.
				</Explanation>
				<div className='w-full justify-center flex flex-row mt-2'>
					<div className='w-full flex grow gap-4 max-w-[60rem] justify-center'>
						<InputBox>
							<FaInbox className='text-gray-600' />
							<input
								id='email'
								type='text'
								className='w-full border-0 p-0 focus:outline-none focus:ring-0 cursor-text text-gray-800 bg-gray-100'
								value={editEmail}
								onChange={(e) => setEditEmail(e.target.value)}
							/>
						</InputBox>
						<BigBlueButton onClick={handleSubmitUsernameAndEmail} isSubmitting={isSubmitting}>
							Update
						</BigBlueButton>
					</div>
				</div>
			</div>
			<div className='w-full'>
				<Instruction>
					🔐 Change Password
				</Instruction>
				<div className='items-center justify-center flex flex-row'>
					<BigBlueButton onClick={() => {
						window.location.href = '/reset-password';
					}}>
						Change Password
					</BigBlueButton>
				</div>
			</div>
			<div className='w-full'>
				<Instruction>
					🏷️ Username
				</Instruction>

				<div className='w-full justify-center flex flex-row'>
					<div className='flex w-full max-w-[60rem] flex-row gap-4 justify-center mt-2'>
						<InputBox>
							<FaUser className='text-gray-600' />
							<input
								id='username'
								type='text'
								className='w-full border-0 p-0 focus:outline-none focus:ring-0 cursor-text text-gray-800 bg-gray-100'
								onChange={(e) => handleUsernameChange(e)}
								value={editUsername}
							/>
						</InputBox>
						<BigBlueButton onClick={handleSubmitUsernameAndEmail} isSubmitting={isSubmitting}>
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
			<Instruction>
				👍 Referral
			</Instruction>
			<div className='w-full justify-center flex grow flex-row'>
				<div className='max-w-[60rem] w-full'>
					<ReferralLink />
				</div>
			</div>
		</div>
	);
};

const OpenAIKey = () => {
	const [key, setKey] = useState('sk-......');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { token } = useUser();

	const fetchKey = async () => {
		UserService.getOpenaiApiKey(token)
			.then((data) => {
				if (data) setKey(data);
			})
			.catch((error) => {
				console.error(error);
			});
	};

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

	useEffect(() => {
		if (token) {
			// update only when useUser() is ready
			fetchKey();
		}
	}, [token]);

	return (
		<div className='w-full'>
			<Instruction>
				🔑 Your OpenAI Key
			</Instruction>
			<Explanation>
				Paste your own OpenAI key here so you can still generate when you run out of credits (paid users only):
			</Explanation>
			<div className='w-full justify-center flex flex-row'>
				<div className='flex grow max-w-[60rem] flex-row gap-4 justify-center mt-2'>
					<InputBox>
						<FaKey className='text-gray-600' />
						<input
							id='key'
							type='text'
							className='w-full border-0 p-0 focus:outline-none focus:ring-0 cursor-text text-gray-800 bg-gray-100'
							onChange={(e) => setKey(e.target.value)}
							onClick={(e) => (e.target as HTMLInputElement)?.select()}
							value={key}
						/>
					</InputBox>

					<BigBlueButton onClick={updateKey} isSubmitting={isSubmitting}>
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
			toast.success("Your code is successfully applied!", {
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
					<InputBox>
						<input
							id='promo'
							type='text'
							className='w-full border-0 p-0 focus:outline-none focus:ring-0 cursor-text text-gray-800 bg-gray-100'
							onChange={(e) => setPromo(e.target.value)}
							onClick={(e) => (e.target as HTMLInputElement)?.select()}
							value={promo}
						/>
					</InputBox>

					<BigBlueButton onClick={applyPromo} isSubmitting={isSubmitting}>
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
			<Instruction>
				⭐️ Credit Balance
			</Instruction>
			<BigTitle><>{credits}</></BigTitle>
		</div>
	);
};

export default function Account() {
	// To add a new section
	// Add tabRef for header animation
	// Add section ref for scrollIntoView in function toSection
	// Add IntersectionObserver in function observeElements

	const bar = <div className='w-full h-0 border-b-2 border-[#CAD0D3]'></div>;
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
					{ /* id is for better locating the section */}
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
			</Panel>
		</Column>
	);
}
