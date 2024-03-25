'use client';
import AuthService from '@/services/AuthService';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef, RefObject, use } from 'react';
import Pricing from '@/components/landing/pricing';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserService from '@/services/UserService';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ReferralLink from '@/components/ReferralLink';
import { FeedbackForm } from '@/components/ui/feedback';
import { BigBlueButton } from '@/components/button/DrlambdaButton';
import { InputBox } from '@/components/ui/InputBox';
import {
	FaInbox,
	FaKey,
	FaLock,
	FaMailBulk,
	FaUser,
	FaVoicemail,
} from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { useUser } from '@/hooks/use-user';
import useHydrated from '@/hooks/use-hydrated';
import SessionStorage from '@/utils/SessionStorage';
import Card from '@/components/ui/Card';
import { BigTitle, Explanation, Instruction } from '@/components/ui/Text';
import { Panel } from '@/components/layout/Panel';
import { Title } from 'chart.js';
import { Column } from '@/components/layout/Column';

const Profile = () => {
	const { username, email, token, setUsername } = useUser();
	const [editUsername, setEditUsername] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	function userFirstName(): string {
		return username?.split(' ')[0];
	}

	useEffect(() => {
		console.log('Username updated: ', username);
		setEditUsername(username);
	}, [username]);

	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditUsername(e.target.value);
	};

	const handleSubmitUsername = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
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

		await fetch(`/api/user/update_username`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ username: editUsername }),
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw (response.status, response);
				}
			})
			.then((data) => {
				const status = data['status'];
				const message = data['message'];
				if (status === 'success') {
					toast.success('Username successfully updated', {
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
			})
			.catch((error) => {
				toast.error(error, {
					position: 'top-center',
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});
			});

		setIsSubmitting(false);
		setUsername(editUsername);
	};

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
				<div className='w-full justify-center flex flex-row'>
					<div className='w-full flex grow max-w-[60rem] justify-center'>
						<InputBox>
							<FaInbox className='text-gray-600' />
							<input
								id='email'
								type='text'
								className='w-full border-0 p-0 focus:outline-none focus:ring-0 cursor-text text-gray-800 bg-gray-100'
								// disabled
								value={email}
								readOnly
							/>
							<FaLock className='text-gray-600' />
						</InputBox>
					</div>
				</div>
			</div>
			<form onSubmit={handleSubmitUsername}>
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
							<BigBlueButton onClick={() => { }} isSubmitting={isSubmitting}>
								Update
							</BigBlueButton>
						</div>
					</div>
				</div>
			</form>
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
				Paste your own OpenAI key here so that generation does not cost
				credits:
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
