import AuthService from "./AuthService";


class UserService {

    static async initializeUser() {
        const { userId, idToken: token } = await AuthService.getCurrentUserTokenAndId();
        const headers = new Headers();
        if (token) {
            headers.append('Authorization', `Bearer ${token}`);
        }
        headers.append('Content-Type', 'application/json');

        const user = await AuthService.getCurrentUser()
        const username = user.attributes['name'];
        const email = user.attributes['email'];

        const userData = {
            username: username,
            email: email,
            is_admin: false,
        };

        console.log("New user initializing...");
        try {
            const createUserResponse = await fetch('/api/create_user', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(userData)
            });
            if (createUserResponse.ok) {
                console.log("Initialized successfully.")
            } else {
                console.error('Failed to initialize user:', createUserResponse.status);
                const errorData = await createUserResponse.json();
                console.log('Error message:', errorData.message);
            }
        } catch (error) {
            console.error('Error initializing user:', error);
        }
    }

    static async getUserCreditsAndTier(idToken: string): Promise<{ credits: number, tier: string }> {
        try {

            const response = await fetch(`/api/user/credits`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
            }

            const data = await response.json();
            const credits: number = data.credits;
            const tier: string = data['tier'] || 'FREE';

            console.log(`User credits: ${credits}`);

            return { credits, tier };

        } catch (error) {
            console.error('Failed to fetch user credits:', error);
            return { credits: 0, tier: 'FREE' }; // Return a default value or handle accordingly
        }
    }

    static async isPaidUser() {
        const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
        const { credits, tier } = await UserService.getUserCreditsAndTier(idToken);
        const isPaid = ['PRO_MONTHLY', 'PLUS_MONTHLY', 'PRO_YEARLY', 'PLUS_YEARLY'].includes(tier);
        console.log(`User is ${isPaid ? '' : 'not '}a paid user`);
        return isPaid;
    }

    static async getUserHistoricalInput(idToken: string) {
        try {
            const response = await fetch(`/api/user/historical_input`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                },
            });
            if (response.status === 200) {
                const data = await response.json();
                if (data.message) {
                    return null;
                } else {
                    return data
                }
            } else {
                throw new Error(`Error status: ${response.status}`);
            }
        } catch (error) {
            console.error('Failed to fetch user historical inputs:', error);
            throw error;
        }
    }
}

export default UserService;
