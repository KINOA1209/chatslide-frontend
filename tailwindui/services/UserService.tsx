import { getRewardfulReferralId } from '@/components/integrations/Rewardful';
import AuthService from './AuthService';
import { isChatslide } from '@/utils/getHost';
import { User } from '@/models/User';

class UserService {
	static async initializeUser(token: string): Promise<boolean> {
		const headers = new Headers();
		// console.log('Token: ', token);
		if (token) {
			headers.append('Authorization', `Bearer ${token}`);
		}
		headers.append('Content-Type', 'application/json');

		const user = await AuthService.getCurrentUser();
		const username = user.attributes['name'];
		const email = user.attributes['email'];

		const userData = {
			username: username,
			email: email,
			is_admin: false,
		};

		console.log('New user initializing...');
		try {
			const createUserResponse = await fetch('/api/create_user', {
				method: 'POST',
				headers: headers,
				body: JSON.stringify(userData),
			});
			if (createUserResponse.status === 201) {
				console.log('Initialized successfully.');
				return true;
			} else if (createUserResponse.status === 200) {
				console.log('User already initialized before.');
				return true;
			} else {
				console.error(
					`Failed to initialize user: ${username}`,
					createUserResponse.status,
					createUserResponse.statusText,
				);
				const errorData = await createUserResponse.json();
				throw new Error(errorData.message);
			}
		} catch (error) {
			console.error('Error initializing user:', error);
			throw error;
		}
	}

	static async checkSurveyFinished(token: string): Promise<boolean> {
    if(localStorage.getItem('survey_status') === 'completed') {
      return true;
    }

		try {
			const response = await fetch('/api/user/check_survey_status', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				const data = await response.json();
				if (data.survey_status === 'incomplete') {
					console.log('The user had not completed the survey before');
					return false; // show survey
				} else {
					console.log('The user had completed the survey before');
          localStorage.setItem('survey_status', 'completed');
					return true; // skip showing survey
				}
			} else {
				console.error('HTTP Error:', response.statusText);
				return true; // skip showing survey
			}
		} catch (error) {
			console.error('Error:', error);
			return true; // skip showing survey
		}
	}

	static async applyPromoCode(
		promo: string,
		token: string,
		promoOnly: boolean = false,
	): Promise<{ status: number; message: string }> {
		if (!promo || !token) {
			return { status: 400, message: 'Invalid promo code or token.' };
		}
		try {
			const response = await fetch(`/api/user/apply_code`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ code: promo, promoOnly: promoOnly }),
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					// console.log(data)
					const status = data['status'];
					const message = data['message'];
					// console.log(status, message)
					if (status === 'success') {
						return { status: 200, message };
					} else {
						return { status: 400, message };
					}
				});

			return response;
		} catch (error) {
			console.error(error);
			return { status: 400, message: 'Error applying promo code.' };
		}
	}

	static async updateUsernameAndEmail(
		username: string,
		email: string,
		token: string,
	): Promise<boolean> {
		try {
			const resp = await fetch(`/api/user/update_username`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					username: username,
					email: email,
				}),
			});
			if (resp.ok) {
				return true;
			} else {
				console.error(`Error updating username and email: ${resp.status}`);
				return false;
			}
		} catch (error) {
			console.error('Error in updateUsernameAndEmail:', error);
			return false;
		}
	}

	static async getUserCreditsAndTier(idToken: string): Promise<User> {
		if (!idToken) throw new Error('No idToken provided');

		try {
			const response = await fetch(`/api/user/credits`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${idToken}`,
				},
			});

			if (!response.ok) {
				// user not found in db
				const { email, idToken } =
					await AuthService.getCurrentUserTokenAndEmail();
				console.warn(
					`Failed to fetch user credits: ${email}, initializing user...`,
					response.status,
				);
				const resp = await UserService.initializeUser(idToken); // if user does not exist in db, initialize the user
				if (resp) return UserService.getUserCreditsAndTier(idToken); // try again
			}

			const data = await response.json();
			const creditNum: number = data.credits;
			let credits = creditNum.toString();
			if (creditNum > 10000) {
				credits = 'Unlimited';
			}
			let tier: string = data['tier'] || 'FREE';
			let expirationDate: string = data['expiration_date'] || '';
			if (expirationDate) {
				// local date with only month and day
				expirationDate = new Date(expirationDate).toLocaleDateString('en-US', {
					month: 'short',
					day: 'numeric',
				});
			}
			if (tier.includes('CANCELLED_')) {
				if (expirationDate && new Date(expirationDate) > new Date()) {
					tier = tier.replaceAll('CANCELLED_', '');
				}
			}

			const username: string = data['username'] || null;
			const email: string = data['email'] || null;

			const openai_api_key: string = data['openai_api_key'] || null;
			const rewardful_code: string = data['rewardful_code'] || null;
			const referral_code: string = data['referral_code'] || null;

			console.log(
				`User credits: ${credits}, expiration date: ${expirationDate}, tier: ${tier}`,
			);

			return {
				id: '',
				name: username,
				email: email,
				credits: credits,
				subscription_tier: tier,
				expiration_date: expirationDate,
				rewardful_code: rewardful_code,
				referral_code: referral_code,
				openai_api_key: openai_api_key,
        ltd_upgrade_price: data['ltd_upgrade_price'],
			};
		} catch (error) {
			throw error;
		}
	}

	static async getUserHistoricalInput(idToken: string) {
		try {
			const response = await fetch(`/api/user/historical_input`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${idToken}`,
				},
			});
			if (response.status === 200) {
				const data = await response.json();
				if (data.message) {
					return null;
				} else {
					return data;
				}
			} else {
				throw new Error(`Error status: ${response.status}`);
			}
		} catch (error) {
			console.error('Failed to fetch user historical inputs:', error);
		}
	}

	// for stripe
	static async createStripePortalSession(idToken: string): Promise<string> {
		try {
			const response = await fetch(`/api/create-portal-session`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${idToken}`,
				},
			});

			if (response.ok) {
				return await response.text();
			} else {
				throw new Error(`Error ${response.status}: ${await response.text()}`);
			}
		} catch (error) {
			console.error('Error in createPortalSession:', error);
			throw error; // Rethrow the error so that it can be handled by the caller
		}
	}

	// stripe checkout
	static async checkout(
		plan: string,
		email: string,
		currency: string,
		token: string,
	) {
		const requestData = {
			tier: plan,
			email: email,
			currency: currency === '$' ? 'usd' : 'eur',
			is_chatslide: isChatslide(),
			client_reference_id: await getRewardfulReferralId(),
		};

		const response = await fetch('/api/create-checkout-session', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
			},
			body: JSON.stringify(requestData),
		});

		if (response.ok) {
			const url = await response.text();
			return url;
		} else {
			throw new Error('Failed to create checkout session');
		}
	}

	// update user's openai api key, send request to /api/user/update_openai_api_key endpoint
	static async updateOpenaiApiKey(
		idToken: string,
		newKey: string,
	): Promise<boolean> {
		try {
			const response = await fetch(`/api/user/update_openai_api_key`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${idToken}`,
				},
				body: JSON.stringify({ openai_key: newKey }), // Change here
			});

			if (response.ok) {
				return true;
			} else {
				throw new Error(`Error ${response.status}: ${await response.text()}`);
			}
		} catch (error) {
			console.error('Error in updateOpenaiApiKey:', error);
			throw error; // Rethrow the error so that it can be handled by the caller
		}
	}

	// get user's openai api key, send request to /api/user/get_open_ai_key endpoint
	static async getOpenaiApiKey(idToken: string): Promise<string> {
		try {
			const response = await fetch(`/api/user/get_openai_api_key`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${idToken}`,
				},
			});

			if (response.ok) {
				const data = await response.json();
				return data.openai_key; // this could be an empty string
			} else {
				throw new Error(`Error ${response.status}: ${await response.text()}`);
			}
		} catch (error) {
			console.error('Error in getOpenaiApiKey:', error);
			throw error; // Rethrow the error so that it can be handled by the caller
		}
	}

	static async submitFeedback(
		rating: number,
		text: string,
		project_id: string,
		token: string,
	): Promise<boolean> {
		const headers = new Headers();
		if (token) {
			headers.append('Authorization', `Bearer ${token}`);
		}
		headers.append('Content-Type', 'application/json');

		const feedbackData = {
			rating: rating,
			feedbackText: text,
			project_id: project_id,
		};

		const response = await fetch('/api/feedback', {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(feedbackData), // Sending the data as JSON string in the request body
		});

		if (response.ok) {
			return true;
		} else {
			// Handle error cases
			const data = await response.json();
			console.error('Fail to submit ', data.message);
			return false;
		}
	}

	static async updateRewardfulCode(
		code: string,
		idToken: string,
	): Promise<boolean> {
		try {
			const response = await fetch(`/api/user/rewardful_code`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${idToken}`,
				},
				body: JSON.stringify({ code: code }),
			});

			if (response.ok) {
				return true;
			} else {
				throw new Error(`Error ${response.status}: ${await response.text()}`);
			}
		} catch (error) {
			console.error('Error in updateRewardfulCode:', error);
			throw error; // Rethrow the error so that it can be handled by the caller
		}
	}
}

export default UserService;
