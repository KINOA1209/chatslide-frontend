import AuthService from "./AuthService";
import {
  ISignUpResult,
  CognitoUser,
  MFAOption,
  CognitoUserSession,
  CognitoUserAttribute,
  NodeCallback,
} from "amazon-cognito-identity-js";

class UserService {
  static async initializeUser(token: string): Promise<boolean> {
    const headers = new Headers();
    console.log("Token: ", token);
    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }
    headers.append("Content-Type", "application/json");

    const user = await AuthService.getCurrentUser();
    const username = user.attributes["name"];
    const email = user.attributes["email"];

    const userData = {
      username: username,
      email: email,
      is_admin: false,
    };

    console.log("New user initializing...");
    try {
      const createUserResponse = await fetch("/api/create_user", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(userData),
      });
      if (createUserResponse.status === 201) {
        console.log("Initialized successfully.");
        return true;
      } else if (createUserResponse.status === 200) {
        console.log("User already initialized before.");
        return true;
      } else {
        console.error(
          `Failed to initialize user: ${username}`,
          createUserResponse.status,
          createUserResponse.statusText
        );
        const errorData = await createUserResponse.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error("Error initializing user:", error);
      throw error;
    }
  }

  static async applyPromoCode(
    promo: string,
    token: string
  ): Promise<{ status: number; message: string }> {
    try {
      const response = await fetch(`/api/user/apply_code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code: promo }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log(data)
          const status = data["status"];
          const message = data["message"];
          // console.log(status, message)
          if (status === "success") {
            return { status: 200, message };
          } else {
            return { status: 400, message };
          }
        });

      return response;
    } catch (error) {
      console.error(error);
      return { status: 400, message: "Error applying promo code." };
    }
  }

  static async getUserCreditsAndTier(
    idToken: string
  ): Promise<{ credits: number; tier: string }> {
    if (!idToken) throw new Error("No idToken provided");

    try {
      const response = await fetch(`/api/user/credits`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (!response.ok) {
        const { userId, idToken } =
          await AuthService.getCurrentUserTokenAndId();
        console.error(
          `Failed to fetch user credits: ${userId}, initializing user...`,
          response.status
        );
        const resp = await UserService.initializeUser(idToken); // if user does not exist in db, initialize the user
        if (resp) return UserService.getUserCreditsAndTier(idToken); // try again
      }

      const data = await response.json();
      const credits: number = data.credits;
      const tier: string = data["tier"] || "FREE";

      console.log(`User credits: ${credits}`);

      return { credits, tier };
    } catch (error) {
      const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
      console.error(`Failed to fetch user credits: ${userId}`, error);
      throw new Error(`Error fetching user credits: ${error}`);
    }
  }

  static async isPaidUser() {
    const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
    const { credits, tier } = await UserService.getUserCreditsAndTier(idToken);
    const isPaid = [
      "PRO_MONTHLY",
      "PLUS_MONTHLY",
      "PRO_YEARLY",
      "PLUS_YEARLY",
    ].includes(tier);
    console.log(`User is ${isPaid ? "" : "not "}a paid user`);
    return isPaid;
  }

  static async getUserHistoricalInput(idToken: string) {
    try {
      const response = await fetch(`/api/user/historical_input`, {
        method: "GET",
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
      console.error("Failed to fetch user historical inputs:", error);
    }
  }

  // for stripe
  static async createStripePortalSession(idToken: string): Promise<string> {
    try {
      const response = await fetch(`/api/create-portal-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (response.ok) {
        return await response.text();
      } else {
        throw new Error(`Error ${response.status}: ${await response.text()}`);
      }
    } catch (error) {
      console.error("Error in createPortalSession:", error);
      throw error; // Rethrow the error so that it can be handled by the caller
    }
  }

  // update user's openai api key, send request to /api/user/update_openai_api_key endpoint
  static async updateOpenaiApiKey(
    idToken: string,
    newKey: string
  ): Promise<boolean> {
    try {
      const response = await fetch(`/api/user/update_openai_api_key`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
      console.error("Error in updateOpenaiApiKey:", error);
      throw error; // Rethrow the error so that it can be handled by the caller
    }
  }

  // get user's openai api key, send request to /api/user/get_open_ai_key endpoint
  static async getOpenaiApiKey(idToken: string): Promise<string> {
    try {
      const response = await fetch(`/api/user/get_open_ai_key`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json(); // Change here
        return data.openai_key; // Assuming the key is in the "openai_key" field
      } else {
        throw new Error(`Error ${response.status}: ${await response.text()}`);
      }
    } catch (error) {
      console.error("Error in getOpenaiApiKey:", error);
      throw error; // Rethrow the error so that it can be handled by the caller
    }
  }
}

export default UserService;
