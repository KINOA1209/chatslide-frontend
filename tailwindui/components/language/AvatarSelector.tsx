'use client';

import React, { useEffect, useState } from 'react';
import { ErrorMessage, Instruction, WarningMessage } from '../ui/Text';
import { DropDown } from '../button/DrlambdaButton';
import { AVATAR_NAMES, AVATAR_OPTIONS, POSTURE_NAMES  } from './avatarData';
import Image from 'next/image';


const AvatarSelector: React.FC<{
	avatar: string;
	setAvatar: (avatar: string) => void;
	posture: string;
	setPosture: (posture: string) => void;
}> = ({
	avatar,
	setAvatar,
	posture,
	setPosture,
}) => {

	useEffect(() => {
		if (avatar == 'None') {
			setPosture('');
		}
		setPosture('casual-sitting');
	}, [avatar]);
		
		return (
			<>
				<div className='grid grid-cols-3 flex-wrap justify-start gap-2'>
					<div>
						<Instruction>Avatar: </Instruction>
						<DropDown value={avatar} onChange={(e) => setAvatar(e.target.value)} width='16rem'>
							<option key={''} value={''}>❌ None</option>
							{Object.entries(AVATAR_OPTIONS).map(([key, value])=> (
								<option key={key} value={key}>{AVATAR_NAMES[key]}</option>
							))}
						</DropDown>

					</div>

					{avatar != '' && <>
						<div>
							<Instruction>Posture: </Instruction>
							<DropDown value={posture} onChange={(e) => setPosture(e.target.value as 'female' | 'male')} width='16rem'>
								{AVATAR_OPTIONS[avatar].map((posture) => (
									<option key={posture} value={posture}>{POSTURE_NAMES[posture]}</option>
								))}
							</DropDown>
						</div>
						<Image
							unoptimized={true}
							src={`/images/avatar/${avatar}-${posture}-thumbnail.png`}
							alt='avatar'
							width={128}
							height={128}
							className='w-32 h-32' />
					</>}
				</div>

			</>
		);
	};

export default AvatarSelector;