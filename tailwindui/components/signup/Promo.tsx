import React, { useState } from 'react';

interface PromoComponentProps {
	showPromo: boolean;
	setShowPromo: React.Dispatch<React.SetStateAction<boolean>>;
	referralValue: string;
	setReferralValue: React.Dispatch<React.SetStateAction<string>>;
  text?: string;
}

const PromoComponent: React.FC<PromoComponentProps> = ({
	showPromo,
	setShowPromo,
	referralValue,
	setReferralValue,
  text = 'You are going to get more credits with promo code!',
}) => {
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
							<div className='max-w-sm mx-auto'>
								<input
									id='promo'
									type='text'
									value={referralValue}
									onChange={(e) => setReferralValue(e.target.value)}
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
