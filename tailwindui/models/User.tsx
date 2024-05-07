export type User = {
	id: string;
	name: string;
	email: string;
	credits: string;
	referral_code?: string;
	subscription_tier: string;
  expiration_date?: string;
  rewardful_code?: string;
  openai_api_key?: string;
}
