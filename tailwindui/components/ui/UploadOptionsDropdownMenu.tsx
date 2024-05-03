import React, { useState } from 'react';
import Link from 'next/link';
import { MdOutlineOpenInNew, MdOutlineDelete } from 'react-icons/md';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { MdOutlineLaptopMac } from 'react-icons/md';
import { FiHelpCircle } from 'react-icons/fi';
interface UploadOptionsDropdownMenuProps {
	setIsDropdownVisible: (value: boolean) => void;
}

const UploadOptionsDropdownMenu: React.FC<UploadOptionsDropdownMenuProps> = ({
	setIsDropdownVisible,
}) => {
	const [showFileSupportExplain, setShowFileSupportExplain] = useState(false);
	return (
		<>
			{
				<div
					className='absolute top-full right-0 bg-white shadow-md rounded-md border border-2 border-gray-200 mt-1 w-full'
					style={{
						zIndex: 999,
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					{/* From local */}
					{
						<button
							className='block px-[10px] py-[9px] text-sm text-[#182230] rounded-md  hover:bg-zinc-100 w-full text-left'
							onClick={() => {
								setIsDropdownVisible(false);
							}}
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'flex-start',
								gap: 'var(--spacing-lg, 12px)',
								borderBottom:
									'1px solid var(--Colors-Border-border-secondary, #EAECF0)',
							}}
						>
							<MdOutlineLaptopMac></MdOutlineLaptopMac>
							<span>From Local</span>
							<button
								onMouseEnter={() => setShowFileSupportExplain(true)}
								onMouseLeave={() => setShowFileSupportExplain(false)}
							>
								<FiHelpCircle></FiHelpCircle>
							</button>
							{showFileSupportExplain && (
								<div
									style={{
										position: 'absolute',
										width: '100%',
										top: '100%',
										right: 0,
										display: 'inline-flex',
										padding: '4px 8px',
										justifyContent: 'center',
										alignItems: 'center',
										gap: '6px',
										borderRadius: '8px',
										background: 'var(--Grey-800, #1D222A)',
									}}
								>
									<span
										style={{
											color: '#CAD0D3',
											fontFamily: 'Creato Display Medium',
											fontSize: '12px',
											fontStyle: 'normal',
											fontWeight: ' 400',
											lineHeight: '20px',
										}}
									>
										Supported file formats: PDF, TXT, DOCX, PPTX, PNG, JPEG, MP4
										(max file size: 10MB)
									</span>
								</div>
							)}
						</button>
					}

					{/* From cloud */}
					{
						<button
							className='block px-[10px] py-[9px] text-sm text-[#182230] rounded-md  hover:bg-zinc-100 w-full text-left'
							onClick={() => {
								setIsDropdownVisible(false);
							}}
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'flex-start',
								gap: 'var(--spacing-lg, 12px)',
								borderBottom:
									'1px solid var(--Colors-Border-border-secondary, #EAECF0)',
							}}
						>
							<MdOutlineCloudUpload></MdOutlineCloudUpload>
							<span>From Cloud</span>
						</button>
					}
				</div>
			}
		</>
	);
};

export default UploadOptionsDropdownMenu;
