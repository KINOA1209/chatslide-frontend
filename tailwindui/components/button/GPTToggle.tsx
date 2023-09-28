import React, { useEffect, useState } from 'react';
import Toggle from './Toggle';
import UserService from '../utils/UserService';
import PaywallModal from '@/components/forms/paywallModal'

interface GPTToggleProps {
    isGpt35: boolean;
    setIsGpt35: (value: boolean) => void;
}

const GPTToggle: React.FC<GPTToggleProps> = ({ isGpt35, setIsGpt35 }) => {
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [isPaidUser, setIsPaidUser] = useState(false);

    useEffect(() => {
        (async () => {
            const isPaidUser = await UserService.isPaidUser();
            setIsPaidUser(isPaidUser);
        })();
    }, []);

    const handleToggle = (value: boolean) => {
        console.log('handleToggle', value);
        console.log('isPaidUser', isPaidUser);
        if (!value && !isPaidUser) { // if switched to right (GPT-4) and user is not paid
            setShowPaymentModal(true);
        } else {
            setIsGpt35(value);
        }
    }

    return (
        <div>
            <Toggle
                isLeft={isGpt35}
                setIsLeft={handleToggle}
                leftText="GPT-3.5"
                rightText="🚀 GPT-4"
            />

            {showPaymentModal && <PaywallModal setShowModal={setShowPaymentModal} />}
        </div>
    );
}

export default GPTToggle;
