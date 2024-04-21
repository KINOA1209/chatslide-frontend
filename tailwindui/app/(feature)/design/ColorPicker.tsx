import React, { useEffect, useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import rgbHex from 'rgb-hex';
interface ColorPickerProps {
	onCustomColorChange: (color: string) => void;
	initialColor: string; // Accept initial color prop
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
	onCustomColorChange,
	initialColor, // Receive initial color prop
}) => {
	const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
	const [color, setColor] = useState<string>(initialColor); // Initialize color with initialColor

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
		alignItems: 'start',
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
		position: 'absolute',
		zIndex: 2,
		top: '30px', // Adjusted to be below the button
		right: '450px', // Adjusted to be aligned with the button
	};

	const cover: React.CSSProperties = {
		position: 'fixed',
		top: '50px',
		right: '0px',
		bottom: '0px',
		left: '0px',
	};

	return (
		<div>
			<div style={buttonStyle} onClick={handleClick}>
				<div style={colorPreviewStyle}></div>
				<span>{color}</span>
			</div>
			{displayColorPicker ? (
				<div style={popover}>
					<div style={cover} onClick={handleClose} />
					<ChromePicker color={color} onChange={handleChange} />
				</div>
			) : null}
		</div>
	);
};
