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
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isSubmitting?: boolean;
  isPaidUser?: boolean;
  isPaidFeature?: boolean;
  showArrow?: boolean;
  bgColor?: string;
  disabled?: boolean;
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
      return 'bg-Blue';
    }
    return 'bg-Blue';
  }

  function checkPaidUser(event: MouseEvent<HTMLButtonElement>) {
    if (isPaidFeature && !isPaidUser) {
      event.preventDefault();
      setShowPaywallModal(true);
    } else {
      if (onClick)
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
        className={`min-w-[10rem] lg:min-w-[12rem] px-2 h-[36px] sm:h-[36px] ${getButtonBg()} disabled:animate-pulse rounded-3xl flex justify-center items-center gap-2 cursor-pointer }`}
      >
        {isSubmitting && <SpinIcon />}
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
      className='h-[36px] sm:h-[36px] flex-row justify-center items-center gap-4 cursor-pointer flex rounded-3xl bg-white bg-opacity-0'
      onClick={() => router.push(href)}
    >
      <LeftTurnArrowIcon></LeftTurnArrowIcon>
      <div className='text-center self-center text-gray-700 font-medium font-creato-medium leading-normal tracking-[0.035rem] whitespace-nowrap hidden sm:block'>
        Dashboard
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
}) => {
  return (
    <button
      className={`btn w-[100px] sm:w-[120px] h-[36px] sm:h-[36px] sm:gap-x-2 text-white sm:font-semibold bg-Blue ${isSubmitting && 'animate-pulse'} disabled:bg-gray-600 whitespace-nowrap rounded-xl`}
      onClick={onClick}
      disabled={isSubmitting || disabled}
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

type DrlambdaDropDownProps = {
  children: ReactNode;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  displayText?: string;
  width?: string;
  style?: 'button' | 'input';
  defaultValue?: string;
  disabled?: boolean;
};

export const DropDown: React.FC<DrlambdaDropDownProps> = ({
  children,
  onChange,
  displayText,
  width = '12rem',
  style = 'button',
  defaultValue = 'default',
  disabled = false,
}) => {
  const styleClassName = style === 'button' ?
    'bg-gray-300 border-none rounded-xl' :
    'border border-2 border-gray-200 bg-gray-100 rounded-lg' ;
  return (
    <select
      className={`shadow-lg h-[36px] flex ${styleClassName} text-sm py-0 overflow-visible disabled:text-gray-600 disabled:animate-pulse`}
      onChange={onChange}
      defaultValue={defaultValue}
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
  disabled = false,
  isSubmitting = false,
  isPaidUser,
  isPaidFeature = false,
}) => {
  function getButtonStyle() {
    if (isSubmitting || disabled) {
      return 'border-gray-600 text-gray-600';
    }
    return 'border-Blue text-Blue';
  }
  return (
    <button
      onClick={onClick}
      className={`mx-2 border border-1 ${getButtonStyle()} rounded text-Blue px-3 py-1`}
      disabled={isSubmitting || disabled}
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
      <DrlambdaButton
        onClick={onClick}
        showArrow={false}
      >

        📍 User Guide
      </DrlambdaButton>
    </div>
  );
};
