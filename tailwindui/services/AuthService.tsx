import { Auth as AmplifyAuth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { setUserToken, setCredits, setTier, setUsername, setEmail, unsetUser } from '@/store/userSlice';

import awsConfig from '../aws-exports';

AmplifyAuth.configure(awsConfig);

class AuthService {
  async googleSignIn() {
    const signInWindow = window.open("", "_blank");

    try {
      const credentials = await AmplifyAuth.federatedSignIn({
        provider: CognitoHostedUIIdentityProvider.Google,
      });

      if (signInWindow) {
        signInWindow.close();
      }

      const uid = credentials.identityId;
      const token = credentials.sessionToken;

      return { uid, token };
    } catch (error) {
      console.error(error);

      if (signInWindow) {
        signInWindow.close();
      }


      throw error;
    }
  }

  async sendCode(email: string, password: string, name: string) {
    try {
      const { user } = await AmplifyAuth.signUp({
        username: email,
        password,
        attributes: {
          email: email,
          name: name,  // name is display name, different from useranme (id and email)
        },
        autoSignIn: { // optional - enables auto sign in after user is confirmed
          enabled: true,
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async signupNoCode(email: string, password: string, name: string) {
    try {
      const { user } = await AmplifyAuth.signUp({
        username: email,
        password,
        attributes: {
          email: email,
          name: name,  // name is display name, different from useranme (id and email)
        },
        autoSignIn: { // optional - enables auto sign in after user is confirmed
          enabled: true,
        }
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async resendConfirmationCode(username: string) {
    try {
      await AmplifyAuth.resendSignUp(username);
      console.log('code resent successfully');
    } catch (err) {
      console.log('error resending code: ', err);
    }
  }

  async confirmSignUp(email: string, code: string) {
    try {
      await AmplifyAuth.confirmSignUp(email, code, { forceAliasCreation: false });
      return true;
    } catch (error) {
      console.error('Error confirming sign up: ', error);
      throw error;
    }
  }

  async signIn(email: string, password: string) {
    try {
      const user = await AmplifyAuth.signIn(email, password);
      return user;
    } catch (error) {
      console.error('Error signing in: ', error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const user = await AmplifyAuth.currentAuthenticatedUser();
      return user;
    } catch (error) {
      // console.error('Error getting current user: ', error);
      return null;
    }
  }

  async getCurrentUserDisplayName() {
    const user = await this.getCurrentUser();
    if (user) {
      try {
        // console.log(user.attributes['name']);
        const name = user.attributes['name'];
        return name;
      }
      catch (error) {
        console.error('Error getting current user display name: ', error);
        return user.username;
      }
    }
  }

  async getCurrentUserEmail() {
    const user = await this.getCurrentUser();
    if (user) {
      try {
        // console.log(user.attributes['email'])
        const email = user.attributes['email'];
        return email;
      }
      catch (error) {
        console.error('Error getting current user email: ', error);
        return null;
      }
    }
  }



  async getCurrentUserTokenAndId() {
    try {
      const user = await AmplifyAuth.currentAuthenticatedUser();
      const session = await AmplifyAuth.currentSession();

      const userId = user.username;
      const idToken = session.getIdToken().getJwtToken();

      console.log('User ID:', userId);
      // console.log('ID Token:', idToken);

      return { userId, idToken };
    } catch (error) {
      console.error('Error getting user token and id: ', error);
      throw error;
    }
  }

  async signOut() {
    try {
      await AmplifyAuth.signOut();
      console.log('User has been signed out');
    } catch (error) {
      console.error('Error signing out user: ', error);
    }
  }

  async forgotPassword(email: string) {
    try {
      await AmplifyAuth.forgotPassword(email);
      console.log('Code sent successfully');
    } catch (error) {
      console.error('Error sending code: ', error);
      throw error;
    }
  }

  async forgotPasswordSubmit(email: string, code: string, newPassword: string) {
    try {
      await AmplifyAuth.forgotPasswordSubmit(email, code, newPassword);
      console.log('Password updated successfully');
    } catch (error) {
      console.error('Error updating password: ', error);
      throw error;
    }
  }

  async updateName(name: string) {
    try {
      const user = await AmplifyAuth.currentAuthenticatedUser();
      const result = await AmplifyAuth.updateUserAttributes(user, {
        name: name
      });
      console.log(result); // SUCCESS
    } catch (err) {
      console.log(err);
    }
  };
}

export default new AuthService();
