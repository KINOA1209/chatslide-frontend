import AuthService from "./AuthService";


class UserService {
    
    // static async forceUpdateUserInfo() {
    //     console.log('Force updating user info');
    //     const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
    //     localStorage.removeItem('userCredits');
    //     localStorage.removeItem('userTier');
    //     UserService.getUserCredits(idToken);
    //     UserService.getUserTier(idToken);
    // }


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

    static async getUserTier(idToken?: string): Promise<string> {
        try {
            // Try to get the user tier from localStorage first
            const savedTier = localStorage.getItem('userTier');

            if (savedTier) {
                return savedTier;
            }

            if (!idToken) {
                const tokens = await AuthService.getCurrentUserTokenAndId();
                idToken = tokens.idToken;
            }

            const response = await fetch(`/api/get-user-subscription`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const tier = data['tier'] || 'FREE';

            // Save the retrieved user tier to localStorage
            localStorage.setItem('userTier', tier);

            console.log(`User tier: ${tier}`);

            return tier;

        } catch (error) {
            console.error('Failed to get user tier:', error);
            return 'FREE'; // Return a default value or handle accordingly
        }
    }

    static async isPaidUser() {
        const tier = await UserService.getUserTier();
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
