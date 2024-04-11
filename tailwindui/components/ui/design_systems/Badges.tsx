import './variables.css';
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
import { IconType } from 'react-icons/lib';

interface IconProps {
	icon: IconType | ReactNode;
	style?: React.CSSProperties;
}

// Component to render icons dynamically
const Icon: React.FC<IconProps> = ({ icon: IconComponent, style }) => {
	if (typeof IconComponent === 'function') {
		const Component = IconComponent as IconType; // Cast to IconType
		return <Component style={style} />;
	} else if (React.isValidElement(IconComponent)) {
		return <span style={style}>{IconComponent}</span>; // Render ReactNode directly
	} else {
		return null;
	}
};

interface DesignSystemBadgesProps {
	size: 'sm' | 'md' | 'lg';
	text: string;
	bgColor: string;
	borderColor: string;
	borderRadius: string;
	textColor: string;
	iconColor: string;
	iconLeading?: React.ReactNode | IconType;
	iconTrailing?: React.ReactNode | IconType;
}

const DesignSystemBadges: React.FC<DesignSystemBadgesProps> = ({
	size,
	text,
	bgColor,
	borderColor,
	borderRadius,
	textColor,
	iconColor,
	iconLeading,
	iconTrailing,
}) => {
	// Define the CSS variables for spacing and colors
	const CSSConfigs = {
		sm: {
			paddingTop: '2px',
			paddingBottom: '2px',
			paddingLeft: '4px',
			paddingRight: '6px',
			borderRadius: '4px',
		},
		md: {
			paddingTop: '2px',
			paddingBottom: '2px',
			paddingLeft: '6px',
			paddingRight: '8px',
			borderRadius: '4px',
		},
		lg: {
			paddingTop: '4px',
			paddingBottom: '4px',
			paddingLeft: '8px',
			paddingRight: '10px',
			borderRadius: '4px',
		},
	};

	// CSS properties for the button
	const buttonStyles: React.CSSProperties = {
		display: 'inline-flex',
		padding: `${CSSConfigs[size]?.paddingTop || 'var(--spacing-md)'} ${
			CSSConfigs[size]?.paddingRight || 'var(--spacing-md)'
		} ${CSSConfigs[size]?.paddingBottom || 'var(--spacing-md)'} ${
			CSSConfigs[size]?.paddingLeft || 'var(--spacing-md)'
		}`,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 'var(--spacing-xs)',
		borderRadius: `${borderRadius || 'var(--radius-sm)'}`,
		border: `1px solid ${borderColor}`,
		background: `${bgColor}`,
		boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
	};

	const textStyles = {
		sm: {
			color: `${textColor}`,
			fontFamily: 'Creato Display Medium',
			fontSize: '12px',
			fontStyle: 'normal',
			fontWeight: 500,
			lineHeight: '18px' /* 150% */,
		},
		md: {
			color: `${textColor}`,
			fontFamily: 'Creato Display Medium',
			fontSize: '12px',
			fontStyle: 'normal',
			fontWeight: 500,
			lineHeight: '18px' /* 150% */,
		},
		lg: {
			color: `${textColor}`,
			fontFamily: 'Creato Display Medium',
			fontSize: '14px',
			fontStyle: 'normal',
			fontWeight: 500,
			lineHeight: '20px' /* 150% */,
		},
	};

	const iconStyles: React.CSSProperties = {
		width: '12px', // Adjust as needed
		height: '12px', // Adjust as needed
		color: iconColor,
	};

	return (
		<button style={buttonStyles}>
			{iconLeading && (
				<Icon
					icon={iconLeading}
					style={{ ...iconStyles, marginRight: '4px' }}
				/>
			)}
			<span style={{ ...textStyles[size], whiteSpace: 'nowrap' }}>{text}</span>
			{iconTrailing && (
				<Icon
					icon={iconTrailing}
					style={{ ...iconStyles, marginLeft: '4px' }}
				/>
			)}
		</button>
	);
};

export default DesignSystemBadges;
