class DatabaseService {
    static async getUserCredits(username:string,idToken:string) {
      try {
        const response = await fetch(`/api/user/<string:uid>/credits`, {
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
  }
  
  export default DatabaseService;
  