'use client';

import { useUser } from '@/hooks/use-user';
import React, { useEffect, useRef, useState } from 'react';

const AuthButtons: React.FC = () => {
	const { uid } = useUser();

	return (
		<div className="flex items-center justify-center">
			{uid ? (
				<div className='navigation-button-wrap'>
					<a
						className='button-primary'
						data-wf-user-logout='Sign Up'
						data-wf-user-login='Sign Up'
						type='button'
						href='/dashboard'
						id='landing-dashboard'
					>
						Dashboard
					</a>
				</div>
			) : (
				<div className='navigation-button-wrap'>
					<a href='/signin' className='nav-link w-nav-link landing-sign-up' id='landing-sign-in'>
						Sign In
					</a>
					<a
						className='button-primary landing-sign-up'
						data-wf-user-logout='Sign Up'
						data-wf-user-login='Sign Up'
						type='button'
						href='/signup'
						id='landing-sign-up-0'
					>
						Sign Up
					</a>
				</div>
			)}
		</div>
	);
}

export default AuthButtons;