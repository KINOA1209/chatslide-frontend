import { useEffect, useRef, useState } from 'react';
import { ChromePicker } from 'react-color';
import { createPortal } from 'react-dom';
import { MouseEvent } from 'react';

interface MiniColorPickerProps {
    color: string | null;
    setColor: (color: string) => void;
}

export default function MiniColorPicker({ color, setColor }: MiniColorPickerProps) {
    const [display, setDisplay] = useState(false);
    const [localColor, setLocalColor] = useState<string>(color || "white");
    const canvasRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setLocalColor(color || "white");
    }, [color]);

    function openColorPicker(e: MouseEvent<HTMLDivElement>) {
        setDisplay((old) => {
            return true;
        });
        const x = e.clientX - 225;
        const y = e.clientY - 244;
        setPosition({ x, y });
        if (canvasRef.current) {
            canvasRef.current.style.paddingLeft = `${x}px`;
            canvasRef.current.style.paddingTop = `${y}px`;
        }
    }

    function handleColorChange(color: any) {
        const rgba = color.rgb;
        const colorString = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
        setLocalColor(colorString);
    }

    useEffect(() => {
        if (canvasRef.current) {
            canvasRef.current.style.paddingLeft = `${position.x}px`;
            canvasRef.current.style.paddingTop = `${position.y}px`;
        }
    }, [display]);

    function handleClose() {
        setDisplay(false);
        setColor(localColor);
    }

    return (
        <div id='colorpicker' className='w-full h-full flex items-center justify-start'>
            <div className="w-5 h-5 border-2 border-black rounded-sm" style={{ backgroundColor: localColor }} onClick={e => { openColorPicker(e) }} ></div>
            {display && createPortal(
                <div className='w-[100vw] h-[100vh] fixed top-0 z-50' onClick={handleClose} ref={canvasRef}>
                    <div onClick={e => { e.stopPropagation() }}>
                        <ChromePicker
                            color={localColor}
                            onChange={(color: any) => { handleColorChange(color) }}
                        />
                    </div>
                </div>
                , document.body)}
        </div>
    );
}
