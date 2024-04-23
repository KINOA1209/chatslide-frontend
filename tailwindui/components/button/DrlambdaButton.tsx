'use client';

import { SpinIcon } from '@/app/(feature)/icons';
import Select from 'react-select';
import React, {
	MouseEventHandler,
	ReactNode,
	useState,
	MouseEvent,
} from 'react';
import PaywallModal from '../paywallModal';
import { useRouter } from 'next/navigation';
import { GrayLabel, PlusLabel } from '../ui/GrayLabel';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import UserService from '@/services/UserService';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

type DrlambdaButtonProps = {
	children: ReactNode;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	isSubmitting?: boolean;
	isPaidUser?: boolean;
	isPaidFeature?: boolean;
	showArrow?: boolean;
	bgColor?: string;
	disabled?: boolean;
	isFlashing?: boolean;
	id?: string;
	customizeStyle?: React.CSSProperties;
};

const DrlambdaButton: React.FC<DrlambdaButtonProps> = ({
	children,
	onClick,
	isSubmitting,
	isPaidUser,
	isPaidFeature = false,
	showArrow = true,
	bgColor,
	isFlashing = false,
	id = '',
}) => {
	const [showPaywallModal, setShowPaywallModal] = useState(false);

	function getButtonBg() {
		if (isFlashing) {
			return 'flash-bg';
		}
		if (isSubmitting) {
			// return 'bg-gray-600';
			return 'bg-[#FFFFFF]';
		}
		if (bgColor) {
			return bgColor;
		}
		if (isPaidFeature) {
			// return 'bg-Blue';
			return 'bg-[#FFFFFF]';
		}
		// return 'bg-Blue';
		return 'bg-[#FFFFFF]';
	}

	function checkPaidUser(event: MouseEvent<HTMLButtonElement>) {
		if (isPaidFeature && !isPaidUser) {
			event.preventDefault();
			setShowPaywallModal(true);
		} else {
			if (onClick) onClick(event);
		}
	}

	return (
		<>
			<PaywallModal
				showModal={showPaywallModal}
				setShowModal={setShowPaywallModal}
				message='Upgrade to unlock more features. 🚀'
			/>
			<button
				id={'primary-' + id}
				disabled={isSubmitting}
				onClick={checkPaidUser}
				className={`sm:min-w-[8rem] lg:min-w-[12rem] px-2 h-[36px] sm:h-[36px] ${getButtonBg()} disabled:animate-pulse rounded-[0.4375rem] flex justify-center items-center gap-4 cursor-pointer }`}
			>
				{isSubmitting && <SpinIcon />}
				<span className='text-[#5168F6] font-semibold tracking-tight whitespace-nowrap flex flex-row gap-2'>
					{children}
					{isPaidFeature && !isPaidUser && <PlusLabel />}
					{/* {isPaidFeature && isPaidUser && '🚀 '} */}
				</span>
				{/* Replace with the actual icon component or element */}
				{/* {!isSubmitting && showArrow && <RightTurnArrowIcon />} */}
				{!isSubmitting && showArrow && (
					<FaChevronRight style={{ color: '#5168F6' }} />
				)}
			</button>
		</>
	);
};

export default DrlambdaButton;

type DrlambdaLinkProps = {
	link: string;
	text: string;
	style?: string;
	newWindow?: boolean;
	label?: string;
	secondaryColor?: boolean;
};

export const DrlambdaLink: React.FC<DrlambdaLinkProps> = ({
	link,
	text,
	style,
	newWindow = true,
	label = '',
	secondaryColor = false,
}) => {
	if (!style) {
		if (secondaryColor) {
			style = 'border border-2 border-Blue text-Blue';
		} else {
			style = 'bg-Blue text-white  ';
		}
	}

	return (
		<a
			id={text.replace(/[^A-Za-z0-9]/g, '_')}
			href={link}
			target={newWindow ? '_blank' : '_self'}
			rel={newWindow ? 'noopener noreferrer' : undefined} // Important for security reasons
			className={`sm:min-w-[8rem] lg:w-[12rem] h-[36px] sm:h-[36px] ${style} rounded-3xl flex justify-center items-center gap-2 cursor-pointer`}
		>
			<div className='flex flex-row justify-center items-center'>
				<span className='font-semibold tracking-tight whitespace-nowrap'>
					{text}
				</span>
				{label && <GrayLabel>{label}</GrayLabel>}
			</div>
		</a>
	);
};

type BackButtonProps = {
	href: string;
	dark?: boolean;
	text?: string;
};

export const BackButton: React.FC<BackButtonProps> = ({
	href,
	dark = false,
	text = 'Dashboard',
}) => {
	const router = useRouter();
	return (
		<div
			id={text.replace(/[^A-Za-z0-9]/g, '_')}
			className='h-[36px] sm:h-[36px] sm:min-w-[6rem] lg:min-w-[12rem] flex-row justify-center items-center gap-4 cursor-pointer flex rounded-3xl bg-white bg-opacity-0'
			onClick={() => router.push(href)}
		>
			<FaChevronLeft style={{ color: dark ? '#222222' : '#FFFFFF' }} />
			<div
				className={`text-center self-center ${
					dark ? 'text-neural-800' : 'text-white'
				} font-medium font-creato-medium leading-normal tracking-[0.035rem] whitespace-nowrap hidden sm:block`}
			>
				{text}
			</div>
		</div>
	);
};

export const BigBlueButton: React.FC<DrlambdaButtonProps> = ({
	children,
	onClick,
	isSubmitting = false,
	disabled = false,
	isPaidUser,
	isPaidFeature = false,
	id,
}) => {
	return (
		<button
			id={id}
			className={`btn h-[36px] sm:h-[36px] w-[12rem] mx-auto sm:gap-x-2 text-white sm:font-semibold bg-Blue ${
				isSubmitting && 'animate-pulse'
			} disabled:bg-gray-600 whitespace-nowrap rounded-xl`}
			onClick={onClick}
			disabled={isSubmitting || disabled}
		>
			{children}
		</button>
	);
};

export const EarlyAccessButton: React.FC<{
	username: string;
	project_id?: string;
	token: string;
	feature: string;
}> = ({ username, project_id = '', token, feature }) => {
	return (
		<>
			<ToastContainer />
			<BigBlueButton
				onClick={() => {
					UserService.submitFeedback(
						5,
						`${username} wants to join the pilot program for ${feature} feature`,
						project_id,
						token,
					);
					toast.success(`You are added to the ${feature} waitlist, thank you!`);
				}}
			>
				Join Waitlist
			</BigBlueButton>
		</>
	);
};

export const BigGrayButton: React.FC<DrlambdaButtonProps> = ({
	children,
	onClick,
	isSubmitting = false,
	isPaidUser,
	isPaidFeature,
	id,
}) => {
	const [paywallModal, setShowPaywallModal] = useState(false);

	return (
		<div id={id}>
			<PaywallModal
				showModal={paywallModal}
				setShowModal={setShowPaywallModal}
				message='Upgrade to unlock more features. 🚀'
			/>
			<button
				className='btn min-w-[100px] sm:min-w-[120px] h-[36px] sm:h-[36px] sm:gap-x-2 text-gray-800 text-sm bg-gray-300 disabled:bg-gray-600 disabled:animate-pulse whitespace-nowrap rounded-xl'
				onClick={(e) => {
					if (isPaidFeature && !isPaidUser) {
						setShowPaywallModal(true);
					} else {
						onClick && onClick(e);
					}
				}}
				disabled={isSubmitting}
			>
				{children}
			</button>
		</div>
	);
};

type DrlambdaDropDownProps = {
	children: ReactNode;
	onChange?: React.ChangeEventHandler<HTMLSelectElement>;
	displayText?: string;
	width?: string;
	style?: 'button' | 'input';
	value?: string;
	disabled?: boolean;
};

export const DropDown: React.FC<DrlambdaDropDownProps> = ({
	children,
	onChange,
	displayText,
	width = '12rem',
	style = 'input',
	value = 'default',
	disabled = false,
}) => {
	const styleClassName =
		style === 'button'
			? 'bg-gray-300 border-none rounded-xl'
			: 'border border-2 border-gray-200 rounded-lg';
	return (
		<select
			className={`h-[36px] flex ${styleClassName} text-sm py-0 overflow-visible disabled:text-gray-600 disabled:animate-pulse`}
			onChange={onChange}
			value={value}
			style={{ width: width }}
			disabled={disabled}
		>
			{displayText && (
				<option value='default' disabled>
					{displayText}
				</option>
			)}
			{children}
		</select>
	);
};

export const InversedBigBlueButton: React.FC<DrlambdaButtonProps> = ({
	children,
	onClick,
	isSubmitting = false,
	isPaidUser,
	isPaidFeature = false,
}) => {
	return (
		<button
			className='btn h-[36px] sm:h-[36px] w-[12rem] mx-auto sm:gap-x-2 text-Blue sm:font-semibold bg-gray-200 disabled:text-gray-600 disabled:animate-pulse whitespace-nowrap rounded-xl'
			onClick={onClick}
			disabled={isSubmitting}
		>
			{children}
		</button>
	);
};

export const SmallBlueButton: React.FC<DrlambdaButtonProps> = ({
	children,
	onClick,
	disabled = false,
	isSubmitting = false,
	isPaidUser,
	isPaidFeature = false,
	customizeStyle,
}) => {
	function getButtonStyle() {
		if (isSubmitting || disabled) {
			return 'border-gray-200 text-gray-600';
		}
		return 'border-Blue text-Blue';
	}
	return (
		<button
			onClick={onClick}
			className={`border border-2 ${getButtonStyle()} rounded-lg text-Lavender px-3 py-1`}
			disabled={isSubmitting || disabled}
			style={customizeStyle}
		>
			{children}
		</button>
	);
};

interface UserOnboardingButtonProps {
	onClick: () => void;
}
export const UserOnboardingButton: React.FC<UserOnboardingButtonProps> = ({
	onClick,
}) => {
	return (
		<div className='hidden sm:fixed bottom-[6rem] right-4 z-50'>
			<DrlambdaButton onClick={onClick} showArrow={false} id='user_guide'>
				📍 User Guide
			</DrlambdaButton>
		</div>
	);
};
