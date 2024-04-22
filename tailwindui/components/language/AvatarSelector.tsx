'use client';

import React, { useEffect, useState } from 'react';
import { ErrorMessage, Instruction, WarningMessage } from '../ui/Text';
import { DropDown } from '../button/DrlambdaButton';
import { AVATAR_NAMES, AVATAR_OPTIONS, POSITION_NAMES, POSTURE_NAMES, SIZE_NAMES } from './avatarData';
import Image from 'next/image';
import { WrappableRow } from '../layout/WrappableRow';


const AvatarSelector: React.FC<{
	avatar: string;
	setAvatar: (avatar: string) => void;
	posture: string;
	setPosture: (posture: string) => void;
	size: string;
	setSize: (size: string) => void;
	position: string;
	setPosition: (position: string) => void;
}> = ({
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
			if (avatar == 'None') {
				setPosture('');
			}
			setPosture('casual-sitting');
		}, [avatar]);

		return (
			<>
			<WrappableRow type='grid'>
					<div className='flex flex-col gap-2'>
						<div>
							<Instruction>Avatar: </Instruction>
							<DropDown value={avatar} onChange={(e) => setAvatar(e.target.value)}>
								<option key={''} value={''}>⏹️ None</option>
								{Object.entries(AVATAR_OPTIONS).map(([key, value]) => (
									<option key={key} value={key} disabled={AVATAR_NAMES[key].includes('coming')}
									>{AVATAR_NAMES[key]}</option>
								))}
							</DropDown>

						</div>

						{avatar != '' && <>
							<div>
								<Instruction>Posture: </Instruction>
								<DropDown value={posture} onChange={(e) => setPosture(e.target.value)}>
									{AVATAR_OPTIONS[avatar].map((posture) => (
										<option key={posture} value={posture}>{POSTURE_NAMES[posture]}</option>
									))}
								</DropDown>
							</div>
							<div>
								<Instruction>Position on Slides: </Instruction>
								<DropDown value={position} onChange={(e) => setPosition(e.target.value)}>
									{Object.entries(POSITION_NAMES).map(([key, name]) => (
										<option key={key} value={key}>{name}</option>
									))}
								</DropDown>
							</div>
							<div>
								<Instruction>Size: </Instruction>
								<DropDown value={size} onChange={(e) => setSize(e.target.value)}>
									{Object.entries(SIZE_NAMES).map(([key, name]) => (
										<option key={key} value={key}>{name}</option>
									))}
								</DropDown>
							</div>
						</>
						}
					</div>
					{avatar != '' &&
						<Image
							unoptimized={true}
							src={`/images/avatar/${avatar}-${posture}-thumbnail.png`}
							alt='avatar'
							width={256}
							height={256}
						className='w-64 h-64' />
					}
			</WrappableRow>
			</>
		);
	};

export default AvatarSelector;