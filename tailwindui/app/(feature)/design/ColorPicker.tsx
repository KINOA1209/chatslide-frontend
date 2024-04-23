import { SmallBlueButton } from '@/components/button/DrlambdaButton';
import React, { useEffect, useRef, useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import rgbHex from 'rgb-hex';

interface ColorPickerProps {
	onCustomColorChange: (color: string) => void;
	initialColor: string; // Accept initial color prop
	resetColorPicker: () => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
	onCustomColorChange,
	initialColor, // Receive initial color prop
	resetColorPicker,
}) => {
	const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
	const [color, setColor] = useState<string>(initialColor); // Initialize color with initialColor
	const colorPickerRef = useRef<HTMLDivElement>(null); // Reference to the color picker div

	const handleClick = () => {
		setDisplayColorPicker(!displayColorPicker);
	};

	const handleClose = () => {
		setDisplayColorPicker(false);
	};

	const handleChange = (newColor: ColorResult) => {
		const newRgbColor = newColor.rgb;

		const newHexColor =
			'#' + rgbHex(newRgbColor.r, newRgbColor.g, newRgbColor.b, newRgbColor.a);
		setColor(newHexColor);
		onCustomColorChange(newHexColor); // Pass the color to the parent component
	};

	// Update the color state when the initialColor prop changes
	useEffect(() => {
		setColor(initialColor);
	}, [initialColor]);

	// Function to determine the brightness of a color
	const getBrightness = (color: string) => {
		const hexColor = color.substring(1); // Remove the '#' from the hex color
		const rgbColor = parseInt(hexColor, 16); // Convert hex to RGB
		const r = (rgbColor >> 16) & 255;
		const g = (rgbColor >> 8) & 255;
		const b = rgbColor & 255;
		return (r * 299 + g * 587 + b * 114) / 1000; // Calculate brightness according to W3C formula
	};

	// Determine whether to use white or black font color based on color brightness
	const fontColor = getBrightness(color) > 128 ? '#000000' : '#FFFFFF';

	const buttonStyle: React.CSSProperties = {
		// width: '200px',
		// height: '40px',
		// backgroundColor: color,
		// color: fontColor, // Use dynamically determined font color
		padding: '8px',
		border: '1px solid #CCCCCC',
		display: 'flex',
		// justifyContent: 'space-between',
		alignItems: 'center',
		cursor: 'pointer',
		width: '15rem',
		height: '36px',
		borderRadius: '8px',
		borderColor: '#e5e7eb',
		borderWidth: '2px',
		fontSize: '14px',
	};

	const colorPreviewStyle: React.CSSProperties = {
		width: '16px',
		height: '16px',
		backgroundColor: color,
		marginRight: '8px',
	};

	const popover: React.CSSProperties = {
		// position: 'absolute',
		// zIndex: 2,
		// top: '30px', // Adjusted to be below the button
		// right: '450px', // Adjusted to be aligned with the button
		position: 'fixed',
		zIndex: 2,
		top: '40%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	};

	const cover: React.CSSProperties = {
		position: 'fixed',
		top: '50px',
		right: '0px',
		bottom: '0px',
		left: '0px',
	};

	// Event listener to close color picker when clicking outside of it
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				colorPickerRef.current &&
				!colorPickerRef.current.contains(event.target as Node)
			) {
				setDisplayColorPicker(false);
			}
		};

		window.addEventListener('mousedown', handleClickOutside);
		return () => {
			window.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div ref={colorPickerRef}>
			<div style={buttonStyle} onClick={handleClick}>
				<div style={colorPreviewStyle}></div>
				<span>{color}</span>
			</div>
			<div style={{ width: '15rem' }}>
				<SmallBlueButton
					customizeStyle={{ width: '100%', marginTop: '4px' }}
					onClick={resetColorPicker}
				>
					Reset
				</SmallBlueButton>
			</div>

			{displayColorPicker && (
				<>
					<div className='my-2 mx-1'>
						<ChromePicker color={color} onChange={handleChange} />
					</div>
					{/* confirm button */}
					<div className='grid grid-cols-2 gap-2'>
						<SmallBlueButton
							onClick={() => {
								setDisplayColorPicker(false);
							}}
						>
							Confirm
						</SmallBlueButton>
					</div>
				</>
			)}
		</div>
	);
};
