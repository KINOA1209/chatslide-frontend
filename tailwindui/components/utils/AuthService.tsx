import { Auth as AmplifyAuth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';

import awsConfig from '../../aws-exports';

AmplifyAuth.configure(awsConfig);

class AuthService {
    async googleSingIn() {
        const credentials = await AmplifyAuth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });
        const uid = credentials.identityId;
        const token = credentials.sessionToken;
        return { uid, token };
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
            console.error('Error signing up: ', error);
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

    // listenToAutoSignInEvent() {
    //     Hub.listen('auth', ({ payload }) => {
    //         const { event } = payload;
    //         if (event === 'autoSignIn') {
    //             const user = payload.data;
    //             // assign user
    //         } else if (event === 'autoSignIn_failure') {
    //             // redirect to sign in page
    //         }
    //     })
    // }

    async signIn(email: string, password: string) {
        try {
            const credential = await AmplifyAuth.signIn(email, password);
            const token = credential.getSignInUserSession().accessToken.jwtToken;
            const uid = credential.userSub;
            return { uid, token };
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
            console.error('Error getting current user: ', error);
            return null;
        }
    }

    async getCurrentUserDisplayName() {
        const user = await this.getCurrentUser();
        try {
            // console.log(user.attributes['name']);
            return user.attributes['name'];
        }
        catch (error) {
            console.error('Error getting current user display name: ', error);
            return user.username;
        }
    }

    async getCurrentUserTokenAndId() {
        try {
            const user = await AmplifyAuth.currentAuthenticatedUser();
            const session = await AmplifyAuth.currentSession();

            const userId = user.username;
            const idToken = session.getIdToken().getJwtToken();

            console.log('User ID:', userId);
            console.log('ID Token:', idToken);

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
}

export default new AuthService();
