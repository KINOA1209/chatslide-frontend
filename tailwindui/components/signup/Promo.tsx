'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SessionStorage from '../utils/SessionStorage';
import { GrayLabel } from '../ui/GrayLabel';

interface PromoComponentProps {
	text?: string;
}

const PromoComponent: React.FC<PromoComponentProps> = ({
	text = 'You are going to get more credits with this code!',
}) => {
	const [referralValue, setReferralValue] = useState('');
	const [showPromo, setShowPromo] = useState(false);
	const searchParams = useSearchParams();

	useEffect(() => {
		const handlePromoChange = (promo: string) => {
			SessionStorage.setItem('promo', promo);
		};

		const promo =
			searchParams?.get('referral') || SessionStorage.getItem('promo');
		if (promo) {
			handlePromoChange(promo);
			setReferralValue(promo);
			setShowPromo(true);
		}
	}, []);

	return (
		<>
			<div className='mb-6'>
				{showPromo ? (
					<div className='flex flex-wrap -mx-3 mb-4'>
						<div className='w-full px-3'>
							<label
								className='block text-green-600 font-medium mb-1'
								htmlFor='promo'
							>
								{text}
							</label>
							<div className='max-w-sm mx-auto flex flex-row'>
								<input
									id='promo'
									type='text'
									value={referralValue}
									onChange={(e) => {
										setReferralValue(e.target.value);
										SessionStorage.setItem('promo', e.target.value);
									}}
									className='form-input w-full text-gray-800'
								/>
							</div>
						</div>
					</div>
				) : (
					<span
						className='text-blue-500 cursor-pointer'
						onClick={() => setShowPromo(true)}
					>
						Have a promo or referral code?
					</span>
				)}
			</div>
		</>
	);
};

export default PromoComponent;
