import React, { useEffect, useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';

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
		const newHexColor = newColor.hex;
		setColor(newHexColor);
		onCustomColorChange(newHexColor); // Pass the color to the parent component
	};
	// Update the color state when the initialColor prop changes
	useEffect(() => {
		setColor(initialColor);
	}, [initialColor]);

	const buttonStyle: React.CSSProperties = {
		// width: '200px',
		// height: '40px',
		backgroundColor: color,
		color: '#FFFFFF',
		padding: '8px',
		border: '1px solid #CCCCCC',
		display: 'flex',
		justifyContent: 'space-between',
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
		width: '20px',
		height: '20px',
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
