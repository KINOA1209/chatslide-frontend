import '@/components/slides/drag_resize/dragAndResizeCSS.css';

type ResizeSliderProps = {
    zoomLevel:number;
    setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
    applyZoom: () => void;
}
  
const ResizeSlider: React.FC<ResizeSliderProps> = ({
    zoomLevel,
    setZoomLevel,
    applyZoom,
}) => {
    return (
        <div 
            className="zoom-control p-2 bg-white rounded-lg shadow flex items-center justify-between"
            style={{
                position: 'absolute',
                bottom: '0',
                left: '0', 
                width: '100%', 
                zIndex: '53', 
            }}
        >
            <input
                type="range"
                min="10"
                max="500"
                value={zoomLevel}
                onChange={(e) => setZoomLevel(Number(e.target.value))}
                className="slider"
            />
            <span className="text-gray-700">{`${zoomLevel}%`}</span>
            <button
                onClick={applyZoom}
                className="text-white bg-purple-500 hover:bg-purple-600 rounded px-4 py-1 mx-2"
            >
                Done
            </button>
        </div>
    );
};
  
  export default ResizeSlider;
  