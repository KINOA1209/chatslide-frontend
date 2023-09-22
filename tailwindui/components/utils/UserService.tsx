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
  