'use client';

import React, {
	useState,
	ChangeEvent,
	FormEvent,
	useEffect,
	useRef,
	RefObject,
} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from '@/services/AuthService';
import UserService from '@/services/UserService';
import Promo from './signup/Promo';

const SignupForm: React.FC = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const nextUri = searchParams?.get('next');

	const [email, setEmail] = useState('');
	// const [username, setUsername] = useState("");
	const [password, setPassword] = useState('');

	const [emailError, setEmailError] = useState('');

	const [isFocused, setIsFocused] = useState(false);
	const [rule1Error, setRule1Error] = useState(false);

	const passwordRef = useRef<HTMLInputElement>(null);
	const rule1 = useRef<HTMLParagraphElement>(null);
	const [showPromo, setShowPromo] = useState(false);
	const [referralValue, setReferralValue] = useState('');

	const [submitting, setSubmitting] = useState(false);

	const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  useEffect(() => {
    const handlePromoChange = (promo: string) => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('promo', promo);
      }
    };

    const promo = searchParams?.get('referral');
    if (promo) {
      handlePromoChange(promo);
      setReferralValue(promo);
      setShowPromo(true);
    }
  }, []);

	function handleEmailChange(event: any) {
		const value = event.target.value;
		setEmail(value);

		// Validate the email (example: using a regular expression)
		// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailFormat.test(value)) {
			// email.match(emailFormat)
			setEmailError('Please enter a valid email address.');
		} else {
			setEmailError('');
		}
		// For apppy promo code
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('email', value);
		}
	}

	const validatePassword = (pwd: string): boolean => {
		// Validate the password
		var validated = true;
		if (rule1.current) {
			if (pwd.length < 8) {
				rule1.current.style.color = 'red';
				setRule1Error(true);
				validated = false;
			} else {
				setRule1Error(false);
				rule1.current.style.color = 'green';
				setPassword(passwordRef.current?.value || '');
			}
		}
		return validated;
	};

	function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		validatePassword(value);
	}

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// const username = (event.target as HTMLFormElement).username.value;
		const email = (event.target as HTMLFormElement).email.value;
		if (password === '') {
			// Invalid password
			return;
		}

		try {
			setSubmitting(true);
			await AuthService.signupNoCode(email, password, email);
			const { user } = await AuthService.signIn(email, password);
			console.log(user);

			const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();

			await UserService.initializeUser(idToken); // in our db
			if (referralValue) {
				const { status, message } = await UserService.applyPromoCode(
					referralValue,
					idToken,
				);
				// console.log(status, message);
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
				}
			}
			router.push('/dashboard');
		} catch (error: any) {
			console.log('Error:', error);

			if (
				error.message == 'PreSignUp failed with error Email already exists.'
			) {
				error.message =
					'Email already exists. Please sign in or reset your password.';
			}
			toast.error(error.message, {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
		} finally {
			setSubmitting(false);
		}
	};

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const referralCode = queryParams.get('referral');
		if (referralCode) {
			// If the 'referral' query parameter exists, set it as the input value
			const promoInput = document.getElementById('promo') as HTMLInputElement;
			if (promoInput) {
				promoInput.value = referralCode;
				// Manually trigger the change event so that the localStorage is updated
				promoInput.dispatchEvent(new Event('change'));
			}
		}
	}, []);

	return (
		<form onSubmit={handleSubmit}>
			<ToastContainer />

			<Promo
				showPromo={showPromo}
				setShowPromo={setShowPromo}
				referralValue={referralValue}
				setReferralValue={setReferralValue}
			/>
			<div className='flex flex-wrap -mx-3 mb-4'>
				<div className='w-full px-3'>
					<label
						className='block text-gray-800 text-sm font-medium mb-1'
						htmlFor='email'
					>
						Email <span className='text-red-600'>*</span>
					</label>
					<input
						id='email'
						type='email'
						pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
						value={email}
						onChange={handleEmailChange}
						className='form-input w-full text-gray-800'
						placeholder='Enter your email address'
						required
					/>
					{emailError && (
						<div className='text-sm text-red-500'>{emailError}</div>
					)}
				</div>
			</div>
			<div className='flex flex-wrap -mx-3 mb-4'>
				<div className='w-full px-3'>
					<label
						className='block text-gray-800 text-sm font-medium mb-1'
						htmlFor='password'
					>
						Password <span className='text-red-600'>*</span>
					</label>
					<div className='text-sm text-gray-500'>
						{/* <p>&emsp;&emsp;Password must</p> */}
						{isFocused || rule1Error ? (
							<p ref={rule1}>&emsp;&emsp;Be a minimum of 8 characters</p>
						) : (
							<></>
						)}
					</div>
					<input
						id='password'
						type='password'
						onChange={handlePasswordChange}
						className='form-input w-full text-gray-800 mt-3'
						placeholder='Enter your password'
						minLength={8}
						maxLength={16}
						required
						ref={passwordRef}
						onFocus={(e) => {
							setIsFocused(true);
						}}
						onBlur={(e) => {
							setIsFocused(false);
						}}
					/>
				</div>
			</div>
			<div className='flex flex-wrap -mx-3 mt-6'>
				<div className='w-full px-3'>
					<button
						className='btn text-white font-bold bg-Blue w-full disabled:from-gray-200 disabled:to-gray-200 disabled:text-gray-400'
						disabled={submitting}
					>
						{!submitting ? 'Sign up' : 'Signing up...'}
					</button>
				</div>
			</div>
			<div className='text-sm text-gray-500 text-center mt-3'>
				<input type='checkbox' id='agree' name='agree' checked /> By creating an
				account, you agree to the{' '}
				<a className='underline' href='/terms'>
					terms & conditions
				</a>
				, and our{' '}
				<a className='underline' href='/privacy'>
					privacy policy
				</a>
				.
			</div>
		</form>
	);
};

export default SignupForm;
