import AuthService from './AuthService';

class UserService {
	static async initializeUser(token: string): Promise<boolean> {
		const headers = new Headers();
		console.log('Token: ', token);
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
			})
			if (resp.ok) {
				return true;
			} else {
				console.error(`Error updating username and email: ${resp.status}`);
				return false;
			}
		}
		catch (error) {
			console.error('Error in updateUsernameAndEmail:', error);
			return false;
		}
	}

	static async getUserCreditsAndTier(
		idToken: string,
	): Promise<{ credits: string; tier: string; expirationDate: string, username: string | null, email: string | null }> {
		if (!idToken) throw new Error('No idToken provided');

		try {
			const response = await fetch(`/api/user/credits`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${idToken}`,
				},
			});

			if (!response.ok) {  // user not found in db
				const { email, idToken } =
					await AuthService.getCurrentUserTokenAndEmail();
				console.error(
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
			const tier: string = data['tier'] || 'FREE';
			const expirationDate: string = data['expiration_date'] || '';
			const username: string = data['username'] || null;
			const email: string = data['email'] || null;

			console.log(`User credits: ${credits}`);

			return { credits, tier, expirationDate, username, email };
		} catch (error) {
			const { email, idToken } = await AuthService.getCurrentUserTokenAndEmail();
			console.error(`Failed to fetch user credits: ${email}`, error);
			return { credits: '0', tier: 'FREE', expirationDate: '', username: null, email: null };
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
}

export default UserService;
