'use client';

import {
	LeftTurnArrowIcon,
	RightTurnArrowIcon,
	SpinIcon,
} from '@/app/(feature)/icons';
import React, {
	MouseEventHandler,
	ReactNode,
	useState,
	MouseEvent,
} from 'react';
import PaywallModal from '../forms/paywallModal';
import { useRouter } from 'next/navigation';
import { GrayLabel } from '../ui/GrayLabel';

type DrlambdaButtonProps = {
	children: ReactNode;
	onClick: MouseEventHandler<HTMLButtonElement>;
	isSubmitting?: boolean;
	isPaidUser?: boolean;
	isPaidFeature?: boolean;
	showArrow?: boolean;
	bgColor?: string;
};

const DrlambdaButton: React.FC<DrlambdaButtonProps> = ({
	children,
	onClick,
	isSubmitting,
	isPaidUser,
	isPaidFeature = false,
	showArrow = true,
	bgColor,
}) => {
	const [showPaywallModal, setShowPaywallModal] = useState(false);

	function getButtonBg() {
		if (isSubmitting) {
			return 'bg-gray-600';
		}
		if (bgColor) {
			return bgColor;
		}
		if (isPaidFeature) {
			return 'bg-Purple';
		}
		return 'bg-Blue';
	}

	function checkPaidUser(event: MouseEvent<HTMLButtonElement>) {
		if (isPaidFeature && !isPaidUser) {
			event.preventDefault();
			setShowPaywallModal(true);
		} else {
			onClick(event);
		}
	}

	return (
		<>
			{showPaywallModal && (
				<PaywallModal
					setShowModal={setShowPaywallModal}
					message='Upgrade to unlock more features. 🚀'
				/>
			)}
			<button
				disabled={isSubmitting}
				onClick={checkPaidUser}
				className={`min-w-[10rem] lg:min-w-[12rem] px-2 h-[36px] sm:h-[36px] ${getButtonBg()} disabled:animate-pulse rounded-xl sm:rounded-3xl flex justify-center items-center gap-2 cursor-pointer }`}
			>
				<span className='text-white font-semibold tracking-tight whitespace-nowrap'>
					{isPaidFeature && !isPaidUser && '🔒 '}
					{isPaidFeature && isPaidUser && '🚀 '}
					{children}
				</span>
				{/* Replace with the actual icon component or element */}
				{!isSubmitting && showArrow && <RightTurnArrowIcon />}
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
			href={link}
			target={newWindow ? '_blank' : '_self'}
			rel={newWindow ? 'noopener noreferrer' : undefined} // Important for security reasons
			className={`min-w-[10rem] lg:w-[12rem] h-[36px] sm:h-[36px] ${style} rounded-3xl flex justify-center items-center gap-2 cursor-pointer`}
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

type DrLambdaBackButtonProps = {
	href: string;
};

export const DrLambdaBackButton: React.FC<DrLambdaBackButtonProps> = ({
	href,
}) => {
	const router = useRouter();
	return (
		<div
			className='h-[36px] sm:h-[36px] flex-row justify-center items-center gap-4 cursor-pointer flex'
			onClick={() => router.push(href)}
		>
			<LeftTurnArrowIcon></LeftTurnArrowIcon>
			<div className='text-center self-center text-gray-700 font-medium font-creato-medium leading-normal tracking-[0.035rem] whitespace-nowrap hidden sm:block'>
				Back
			</div>
		</div>
	);
};

export const BigBlueButton: React.FC<DrlambdaButtonProps> = ({
	children,
	onClick,
	isSubmitting = false,
	isPaidUser,
	isPaidFeature = false,
}) => {
	return (
		<button
			className='btn w-[100px] sm:w-[120px] h-[36px] sm:h-[36px] sm:gap-x-2 text-white sm:font-semibold bg-Blue disabled:bg-gray-600 disabled:animate-pulse whitespace-nowrap rounded-xl'
			onClick={onClick}
			disabled={isSubmitting}
		>
			{children}
		</button>
	);
};

export const BigGrayButton: React.FC<DrlambdaButtonProps> = ({
	children,
	onClick,
	isSubmitting = false,
	isPaidUser,
	isPaidFeature = false,
}) => {
	return (
		<button
			className='btn min-w-[100px] sm:min-w-[120px] h-[36px] sm:h-[36px] sm:gap-x-2 text-gray-800 text-sm bg-gray-300 disabled:bg-gray-600 disabled:animate-pulse whitespace-nowrap rounded-xl'
			onClick={onClick}
			disabled={isSubmitting}
		>
			{children}
		</button>
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
			className='btn w-[100px] sm:w-[120px] h-[36px] sm:h-[36px] sm:gap-x-2 text-Blue sm:font-semibold bg-white disabled:text-gray-600 disabled:animate-pulse whitespace-nowrap rounded-xl'
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
	isSubmitting = false,
	isPaidUser,
	isPaidFeature = false,
}) => {
	function getButtonStyle() {
		if (isSubmitting) {
			return 'border-gray-600 text-gray-600';
		}
		return 'border-Blue text-Blue';
	}
	return (
		<button
			onClick={onClick}
			className={`mx-2 border border-1 ${getButtonStyle()} rounded text-Blue px-3 py-1`}
			disabled={isSubmitting}
		>
			{children}
		</button>
	);
};
