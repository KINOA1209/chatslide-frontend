import { useUser } from "@/hooks/use-user";
import { ToastContainer, toast } from "react-toastify";
import { BigBlueButton } from "./DrlambdaButton";
import UserService from "@/services/UserService";

export const EarlyAccessButton: React.FC<{
	project_id?: string;
	feature: string;
}> = ({ project_id = '', feature }) => {
	const { username, token } = useUser();

	return (
		<>
			<ToastContainer />
			<BigBlueButton
				onClick={() => {
					UserService.submitFeedback(
						5,
						`${username} wants to join the pilot program for ${feature} feature`,
						project_id,
						token,
					);
					toast.success(`You are added to the ${feature} waitlist, thank you!`);
				}}
			>
				Join Waitlist
			</BigBlueButton>
		</>
	);
};


export const FeedbackButton: React.FC<{
	project_id?: string;
	feature: string;
}> = ({ project_id = '', feature }) => {
	const { username, token } = useUser();

	return (
		<>
			<ToastContainer />
			<BigBlueButton
				onClick={() => {
					UserService.submitFeedback(
						5,
						`${username} wants to join the pilot program for ${feature} feature`,
						project_id,
						token,
					);
					toast.success(`You are added to the ${feature} waitlist, thank you!`);
				}}
			>
				Join Waitlist
			</BigBlueButton>
		</>
	);
};