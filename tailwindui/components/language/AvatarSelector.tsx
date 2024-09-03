'use client';

import React, { useEffect, useState } from 'react';
import { ErrorMessage, Instruction, WarningMessage } from '../ui/Text';
import { DropDown } from '../button/DrlambdaButton';
import {
	AVATAR_ID,
	AVATAR_NAMES,
	GENDER_AVATAR,
	AVATAR_POSTURE,
	POSITION_NAMES,
	POSTURE_NAMES,
	SIZE_NAMES,
} from './avatarData';
import Image from 'next/image';
import { WrappableRow } from '../layout/WrappableRow';

const AvatarSelector: React.FC<{
	gender: 'female' | 'male';
	avatar?: AVATAR_ID;
	setAvatar: (avatar?: AVATAR_ID) => void;
	posture: string;
	setPosture: (posture: string) => void;
	size: string;
	setSize: (size: string) => void;
	position: string;
	setPosition: (position: string) => void;
}> = ({
	gender,
	avatar,
	setAvatar,
	posture,
	setPosture,
	size,
	setSize,
	position,
	setPosition,
}) => {
	useEffect(() => {
		// Set default avatar based on gender
		const defaultAvatar = GENDER_AVATAR[gender][0] as AVATAR_ID;
		setAvatar(defaultAvatar);
	}, [gender]);

	useEffect(() => {
		if (avatar) {
			const postures = AVATAR_POSTURE[avatar];
			if (postures && postures.length > 0) {
				setPosture(postures[0]);
			}
		}
	}, [avatar]);

	return (
		<>
			<WrappableRow type='grid'>
				<div className='flex flex-col gap-2'>
					<div>
						<Instruction>Avatar: </Instruction>
						<DropDown
							value={avatar}
							onChange={(e) => setAvatar(e.target.value as AVATAR_ID)}
						>
							<option key={''} value={''}>
								⏹️ None
							</option>
							{GENDER_AVATAR[gender].map((key) => (
								<option key={key} value={key}>
									{AVATAR_NAMES[key as AVATAR_ID]}
								</option>
							))}
						</DropDown>
					</div>

					{avatar && (
						<>
							<div>
								<Instruction>Posture: </Instruction>
								<DropDown
									value={posture}
									onChange={(e) => setPosture(e.target.value)}
								>
									{AVATAR_POSTURE[avatar].map((posture, index) => (
										<option key={index} value={posture}>
											{POSTURE_NAMES[posture]}
										</option>
									))}
								</DropDown>
							</div>
							<div>
								<Instruction>Position on Slides: </Instruction>
								<DropDown
									value={position}
									onChange={(e) => setPosition(e.target.value)}
								>
									{Object.entries(POSITION_NAMES).map(([key, name]) => (
										<option key={key} value={key}>
											{name}
										</option>
									))}
								</DropDown>
							</div>
							<div>
								<Instruction>Size: </Instruction>
								<DropDown
									value={size}
									onChange={(e) => setSize(e.target.value)}
								>
									{Object.entries(SIZE_NAMES).map(([key, name]) => (
										<option key={key} value={key}>
											{name}
										</option>
									))}
								</DropDown>
							</div>
						</>
					)}
				</div>
				{avatar && (
					<Image
						unoptimized={true}
						src={`/images/avatar/${avatar}-${posture}-thumbnail.png`}
						alt='avatar'
						width={256}
						height={256}
						className='w-64 h-64'
					/>
				)}
			</WrappableRow>
		</>
	);
};

export default AvatarSelector;
