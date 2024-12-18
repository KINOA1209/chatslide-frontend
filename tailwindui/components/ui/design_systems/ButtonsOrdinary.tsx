'use client';
import PaywallModal from '@/components/paywallModal';
import { useRouter } from 'next/navigation';
import React, {
	MouseEventHandler,
	ReactNode,
	useState,
	MouseEvent,
} from 'react';
import { GrayLabel, PlusLabel } from '../../ui/GrayLabel';
import { SpinIcon } from '@/app/(feature)/icons';

interface DesignSystemButtonProps {
	children?: ReactNode;
	size: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
	hierarchy: 'primary' | 'secondary' | 'tertiary';
	buttonStatus?: 'enabled' | 'disabled';
	iconLeft?: React.ReactNode;
	iconRight?: React.ReactNode;
	// text: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	isSubmitting?: boolean;
	isPaidUser?: boolean;
	isPaidFeature?: boolean;
	id?: string;
	customButtonStyles?: React.CSSProperties;
	customTextStyles?: React.CSSProperties;
	customIconStyles?: React.CSSProperties;
	width?: string;
  maxWidth?: string;
}

const DesignSystemButton: React.FC<DesignSystemButtonProps> = ({
	children,
	size,
	hierarchy,
	buttonStatus = 'enabled',
	iconLeft,
	iconRight,
	// text,
	onClick,
	isSubmitting,
	isPaidUser,
	isPaidFeature = false,
	id = '',
	customButtonStyles,
	customIconStyles,
	customTextStyles,
	width = '100%',
  maxWidth = '100%'
}) => {
	// Define the CSS variables for spacing and colors
	const [showPaywallModal, setShowPaywallModal] = useState(false);
	function checkPaidUser(event: MouseEvent<HTMLButtonElement>) {
		if (isPaidFeature && !isPaidUser) {
			event.preventDefault();
			setShowPaywallModal(true);
		} else {
			if (onClick) onClick(event);
		}
	}
	const spacing = {
		sm: {
			paddingTop: '5px',
			paddingBottom: '5px',
			paddingLeft: '12px',
			paddingRight: '12px',
		},
		md: {
			paddingTop: '10px',
			paddingBottom: '10px',
			paddingLeft: '14px',
			paddingRight: '14px',
		},
		lg: {
			paddingTop: '10px',
			paddingBottom: '10px',
			paddingLeft: '16px',
			paddingRight: '16px',
		},
		xl: {
			paddingTop: '12px',
			paddingBottom: '12px',
			paddingLeft: '18px',
			paddingRight: '18px',
		},
		'2xl': {
			paddingTop: '16px',
			paddingBottom: '16px',
			paddingLeft: '22px',
			paddingRight: '22px',
		},
	};

	const bgColors = {
		primary: '#444CE7',
		secondary: '#EFF4FF',
		tertiary: '#F9FAFB',
		// Add more colors as needed
	};
	const fontColors = {
		primary: {
			enabled: '#FFFFFF',
			disabled: '#98A2B3',
		},
		secondary: {
			enabled: '#444CE7',
			disabled: '#98A2B3',
		},
		tertiary: {
			enabled: '#444CE7',
			disabled: '#98A2B3',
		},
	};
	// CSS properties for the button
	const buttonStyles: React.CSSProperties = {
		display: 'inline-flex',
		padding: `${spacing[size]?.paddingTop || spacing.md.paddingTop} ${
			spacing[size]?.paddingRight || spacing.md.paddingRight
		} ${spacing[size]?.paddingBottom || spacing.md.paddingBottom} ${
			spacing[size]?.paddingLeft || spacing.md.paddingLeft
		}`,
		justifyContent: 'center',
		width: width,
    maxWidth: maxWidth,
		alignItems: 'center',
		gap: 'var(--spacing-xs, 4px)',
		borderRadius: 'var(--radius-md, 8px)',
		border: `1px solid var(--Component-colors-Components-Buttons-${hierarchy}-button-${hierarchy}-border, ${bgColors[hierarchy]})`,
		background: `var(--Component-colors-Components-Buttons-${hierarchy}-button-${hierarchy}-bg, ${bgColors[hierarchy]})`,
		boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
	};

	const textStyles = {
		sm: {
			color: `var(--Component-colors-Components-Buttons-${hierarchy}-button-${hierarchy}-fg, ${fontColors[hierarchy][buttonStatus]})`,
			// fontFamily: 'Inter Medium',
			fontSize: '14px',
			fontStyle: 'normal',
			fontWeight: 600,
			lineHeight: '24px' /* 150% */,
		},
		md: {
			color: `var(--Component-colors-Components-Buttons-${hierarchy}-button-${hierarchy}-fg, ${fontColors[hierarchy][buttonStatus]})`,
			// fontFamily: 'Inter SemiBold',
			fontSize: '14px',
			fontStyle: 'normal',
			fontWeight: 600,
			lineHeight: '20px' /* 150% */,
		},
		lg: {
			color: `var(--Component-colors-Components-Buttons-${hierarchy}-button-${hierarchy}-fg, ${fontColors[hierarchy][buttonStatus]})`,
			// fontFamily: 'Inter SemiBold',
			fontSize: '16px',
			fontStyle: 'normal',
			fontWeight: 600,
			lineHeight: '24px' /* 150% */,
		},
		xl: {
			color: `var(--Component-colors-Components-Buttons-${hierarchy}-button-${hierarchy}-fg, ${fontColors[hierarchy][buttonStatus]})`,
			// fontFamily: 'Inter SemiBold',
			fontSize: '16px',
			fontStyle: 'normal',
			fontWeight: 600,
			lineHeight: '24px' /* 150% */,
		},
		'2xl': {
			color: `var(--Component-colors-Components-Buttons-${hierarchy}-button-${hierarchy}-fg, ${fontColors[hierarchy][buttonStatus]})`,
			// fontFamily: 'Inter SemiBold',
			fontSize: '18px',
			fontStyle: 'normal',
			fontWeight: 600,
			lineHeight: '28px' /* 150% */,
		},
	};

	const iconStyles: React.CSSProperties = {
		width: '24px', // Adjust as needed
		height: '24px', // Adjust as needed
		color: `var(--Component-colors-Components-Buttons-${hierarchy}-button-${hierarchy}-fg, ${fontColors[hierarchy][buttonStatus]})`,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	};

	return (
		<>
			<PaywallModal
				showModal={showPaywallModal}
				setShowModal={setShowPaywallModal}
				message='Upgrade to unlock more features 🚀'
				trigger={'button/' + id}
			/>
			<button
				id={'primary-' + id}
				className='disabled:cursor-not-allowed'
				disabled={isSubmitting || buttonStatus === 'disabled'}
				onClick={checkPaidUser}
				style={{ ...buttonStyles, ...customButtonStyles }}
			>
				{isSubmitting ? (
					<SpinIcon />
				) : (
					iconLeft && (
						<span style={{ ...iconStyles, ...customIconStyles }}>
							{iconLeft}
						</span>
					)
				)}
				<span
					className='flex flex-row items-center gap-x-2'
					style={{ ...textStyles[size], ...customTextStyles }}
				>
					{/* {text} */}
					{children}
					{isPaidFeature && !isPaidUser && <PlusLabel />}
				</span>

				{iconRight && (
					<span style={{ ...iconStyles, ...customIconStyles }}>
						{iconRight}
					</span>
				)}
			</button>
		</>
	);
};

export default DesignSystemButton;
