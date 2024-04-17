import { BigBlueButton } from "@/components/button/DrlambdaButton";
import Card from "@/components/ui/Card";
import { BigTitle, Instruction } from "@/components/ui/Text";
import { useUser } from "@/hooks/use-user";
import UserService from "@/services/UserService";
import { isChatslide } from "@/utils/getHost";
import { userInEU } from "@/utils/userLocation";
import { useEffect, useState } from "react";

export const UnlimitedUpgrade: React.FC<{
}> = ({ }) => {

	const { tier, email, token, credits } = useUser();
	const [useEuro, setUseEuro] = useState(false);

	const isLifetime = tier.includes('LIFETIME');

	useEffect(() => {
		userInEU().then((inEU) => {
			setUseEuro(inEU);
		});
	}, []);

	async function upgradeToUnlimited() {
		const url = await UserService.checkout(
			'PRO_LIFETIME',
			email,
			!useEuro ? '$' : '€',
			token,
			isChatslide()
		)
		if (url) {
			// open a new tab
			window.open(url, '_blank');
		}
	}

	if (isLifetime && credits != 'Unlimited')
		return (
			<Card>
				<BigTitle>✅ Upgrade to Unlimited</BigTitle>
				<Instruction>
					🤫 Shhhh, snatch a lifetime deal now. Only available until May 11, 2024. <br />
					Get a lifetime upgrade to our Unlimited credits plan at a discounted price.
				</Instruction>
					<BigBlueButton
						onClick={upgradeToUnlimited}
					>
						✅ Claim Now
					</BigBlueButton>
			</Card>
		)

	return <></>;
}