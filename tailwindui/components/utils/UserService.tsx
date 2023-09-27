import AuthService from "./AuthService";


class DatabaseService {
    static async getUserCredits(idToken:string) {
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
        const credits = data.credits;
  
        return credits;
      } catch (error) {
        console.error('Failed to fetch user credits:', error);
        throw error;
      }
    }

    static async getUserTier() {
        try {
            const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
    
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
            return data['tier'] || 'FREE'; // Return a default tier if none is found, or handle accordingly
    
        } catch (error) {
            console.error('Failed to get user tier:', error);
            return 'FREE'; // Return an empty string or some default value or handle accordingly
        }
    }
    
    static async getUserHistoricalInput(idToken:string) {
      try {
        const response = await fetch(`/api/user/historical_input`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${idToken}`,
          },
      });
        if (response.status === 200){
          const data = await response.json();
          if (data.message){
            return null;
          }else{
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

  export default DatabaseService;
  