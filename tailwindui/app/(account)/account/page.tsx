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

const Profile = () => {
	const [username, setUsername] = useState<string>('');
	const [editUsername, setEditUsername] = useState('');
	const [email, setEmail] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	function userFirstName(): string {
		return username.split(' ')[0];
	}

	const fetchUser = async () => {
		const user = await AuthService.getCurrentUser();
		setEmail(user.attributes.email);
		setUsername(
			user.attributes.name ? user.attributes.name : user.attributes.email,
		);
	};

	useEffect(() => {
		fetchUser();
	}, []);

	// useEffect(() => {
	//     UserService.forceUpdateUserInfo();
	// }, []);

	useEffect(() => {
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
		const { userId, idToken: token } =
			await AuthService.getCurrentUserTokenAndId();

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
		fetchUser();
	};

	return (
		<div className='w-full px-4 sm:px-6'>
			<div className='mb-8 w-full'>
				<div className='w-fit text-[#525C6A] text-[17px] font-bold'>
					Profile
				</div>
				<div className='w-fit text-[#212121] text-[50px] md:text-[80px] font-light'>
					Hi, {userFirstName()}
				</div>
			</div>
			<div className='w-fit mx-auto'>
				<div className='w-full'>
					<label
						className='block text-[14px] mb-1 text-gray-700'
						htmlFor='email'
					>
						Email
					</label>

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
				<form onSubmit={handleSubmitUsername}>
					<div className='w-full mt-4'>
						<label
							className='block text-[14px] mb-1 text-gray-700'
							htmlFor='username'
						>
							Username
						</label>
						<div className='flex w-full flex-row gap-4 justify-center mt-2'>
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
							<BigBlueButton onClick={() => {}} isSubmitting={isSubmitting}>
								Update
							</BigBlueButton>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

const Referral = () => {
	return (
		<div className='w-full px-4 sm:px-6'>
			<div className='mb-8 w-full'>
				<div className='w-fit text-[#363E4A] text-[17px] font-bold'>
					Referral
				</div>
				<div className='w-fit text-[#212121] text-[80px]'>
					50<span className='text-[24px]'>credit/invite</span>
				</div>
				<ReferralLink />
			</div>
		</div>
	);
};

const OpenAIKey = () => {
	const [key, setKey] = useState('sk-......');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const fetchKey = async () => {
		const { userId, idToken: token } =
			await AuthService.getCurrentUserTokenAndId();
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
		const { userId, idToken: token } =
			await AuthService.getCurrentUserTokenAndId();
		await UserService.updateOpenaiApiKey(token, key);
		setIsSubmitting(false);
		console.log(isSubmitting);
	};

	useEffect(() => {
		fetchKey();
	}, []);

	return (
		<div className='w-full px-4 sm:px-6'>
			<div className='mb-8 w-full'>
				<div className='w-fit text-[#363E4A] text-[17px] font-bold'>
					Your OpenAI Key
				</div>
				<div>
					Paste your own OpenAI key here so that generation does not cost
					credits:
				</div>
				<div className='w-full justify-center flex flex-row'>
					<div className='flex grow max-w-[60rem] flex-row gap-4 justify-center mt-2'>
						<InputBox onClick={(e) => (e.target as HTMLInputElement)?.select()}>
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
		</div>
	);
};

const ApplyPromo = () => {
	const searchParams = useSearchParams();
	const [promo, setPromo] = useState(searchParams?.get('promo') || '');
	const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // if promo in search params, call applyPromo
    if (promo) {
      applyPromo();
    }
  }, []);

	const applyPromo = async () => {
		setIsSubmitting(true);
		console.log(isSubmitting);
		const { userId, idToken: token } =
			await AuthService.getCurrentUserTokenAndId();
		const { status, message } = await UserService.applyPromoCode(
			promo,
			token,
			true,
		);
		if (status == 200) {
			toast.success(message, {
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
	};

	return (
		<div className='w-full px-4 sm:px-6'>
			<div className='mb-8 w-full'>
				<div className='w-fit text-[#363E4A] text-[17px] font-bold'>
					Apply Promo Code or License Key
				</div>
				<div className='w-full justify-center flex flex-row'>
					<div className='flex w-[30rem] flex-row gap-4 justify-center mt-2'>
						<InputBox onClick={(e) => (e.target as HTMLInputElement)?.select()}>
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
		</div>
	);
};

const CreditHistory = () => {
	const [credits, setCredits] = useState(0);

	useEffect(() => {
		const fetchCredit = async () => {
			const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
			UserService.getUserCreditsAndTier(idToken)
				.then((fetched) => {
					setCredits(fetched.credits);
					// setTier(fetched.tier)
				})
				.catch(() => setCredits(0));
		};
		fetchCredit();
	}, []);

	return (
		<div className='w-full px-4 sm:px-6'>
			<div className='mb-8 w-full'>
				<div className='w-fit text-[#363E4A] text-[17px] font-bold'>
					Credit Balance
				</div>
				<div className='w-fit text-[#212121] text-[80px]'>{credits}</div>
			</div>
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

	return (
		<div className='flex flex-col items-center gap-[70px] mx-auto w-full'>
			<ToastContainer />
			{/* <div className='fixed w-full top-0 h-[130px] md:h-[160px] bg-[#E7E9EB] flex flex-col z-20 max-w-none 2xl:max-w-[80%]'> */}
			{/* <div className='grow flex flex-row mb-2 items-end'>
                    <div className='text-[#363E4A] text-[16px] mx-1 md:mx-5 cursor-pointer' onClick={e => { toSection(0) }} onMouseMove={e => { handleMouseOver(0) }} onMouseOut={handleMouseOut} ref={tab1Ref}>Account Settings</div>
                    <div className='text-[#363E4A] text-[16px] mx-1 md:mx-5 cursor-pointer' onClick={e => { toSection(1) }} onMouseMove={e => { handleMouseOver(1) }} onMouseOut={handleMouseOut} ref={tab4Ref}>Credits</div>
                    <div className='text-[#363E4A] text-[16px] mx-1 md:mx-5 cursor-pointer' onClick={e => { toSection(2) }} onMouseMove={e => { handleMouseOver(2) }} onMouseOut={handleMouseOut} ref={tab3Ref}>Subscription</div>
                </div> */}
			{/* <div className='w-full flex flex-row'>
                    <div className='border-b-2 w-fit border-black h-0 overflow-hidden text-[16px] mx-1 md:mx-5 transition-all duration-300' ref={tabUnderlineRef}></div>
                </div> */}
			{/* </div> */}
			<section
				id='profile'
				className='w-full mt-[20px] md:mt-0 max-w-[100%] lg:max-w-[80%]'
			>
				<Profile />
			</section>
			{/* <div className='w-full max-w-none 2xl:max-w-[80%]'><PasswordModule /></div> */}
			{bar}
			<section id='credit' className='w-full max-w-[100%] lg:max-w-[80%]'>
				<CreditHistory />
			</section>
			<section id='referral' className='w-full max-w-[100%] lg:max-w-[80%]'>
				<Referral />
			</section>
			<section id='openai' className='w-full max-w-[100%] lg:max-w-[80%]'>
				<OpenAIKey />
			</section>
			<section id='promo' className='w-full max-w-[100%] lg:max-w-[80%]'>
				<ApplyPromo />
			</section>
			{bar}
			{/* <section id='subscription' className='w-full'>
				<Subscription />
      </section> */}
		</div>
	);
}
