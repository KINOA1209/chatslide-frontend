interface ToggleOption {
	key: string; // Unique identifier for each option
	text?: string; // Display text for the toggle
	element?: React.ReactNode; // Custom React node (optional)
}

interface MultiwayToggleProps {
	options: ToggleOption[]; // Array of options for the toggle
	selectedKey: string; // Currently selected option key
	setSelectedKey: (key: string) => void; // Function to update the selected option
}

const MultiwayToggle: React.FC<MultiwayToggleProps> = ({
	options,
	selectedKey,
	setSelectedKey,
}) => {
	return (
		<div className='toggle flex justify-center items-center'>
			<div className='flex items-center rounded-md border bg-gray-200 sm:px-0.5 py-0.5 my-1'>
				{options.map((option) => (
					<div
						key={option.key}
						className={`cursor-pointer min-w-[50px] md:min-w-[100px] h-[36px] px-1 md:px-2 py-1 flex justify-center items-center rounded-md ${selectedKey === option.key ? 'bg-white text-[#5168F6]' : ''}`}
						onClick={() => setSelectedKey(option.key)}
					>
						<div
							className={`flex flex-row gap-2 font-semibold sm:font-bold break-words items-center justify-center ${selectedKey === option.key ? 'text-[#5168F6]' : 'text-[#707C8A]'}`}
						>
							{option.text || option.element}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default MultiwayToggle;
