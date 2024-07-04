import Modal from '@/components/ui/Modal';

interface SubscriptionModalProps {
	showManageSubscription: boolean;
	setShowManageSubscription: (show: boolean) => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
	showManageSubscription,
	setShowManageSubscription,
}) => {
	return (
		<Modal
			showModal={showManageSubscription}
			setShowModal={setShowManageSubscription}
			title='Manage Subscription'
			description='You can manage your subscription by chatting with our support agent on the lower left.'
			onConfirm={() => {
				setShowManageSubscription(false);
			}}
		/>
	);
};

export default SubscriptionModal;
