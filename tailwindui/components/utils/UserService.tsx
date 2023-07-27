class DatabaseService {
    static async getUserCredits(username:string) {
      try {
        const response = await fetch(`/api/user/${username}/credits`);
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
  