import * as Google from "expo-google-app-auth";
import * as GoogleSignIn from "expo-google-sign-in";
import { Alert } from "react-native";

export default class GoogleService {
  private static accessToken: string = "";

  public static async signOutAsync() {
    if (__DEV__) {
      try {
        await Google.logOutAsync({
          accessToken: this.accessToken,
          androidClientId:
            "373996144704-lb8cbsmuclh62v4rnf4qg2qi2fmb973f.apps.googleusercontent.com",
          androidStandaloneAppClientId:
            "373996144704-lb8cbsmuclh62v4rnf4qg2qi2fmb973f.apps.googleusercontent.com",
          scopes: ["profile", "email"],
        });
        console.log("google signed out");
      } catch (e) {
        alert("sign out failed: " + e);
      }
    } else {
      try {
        await GoogleSignIn.signOutAsync();
      } catch (e) {
        alert("sign out failed: " + e);
      }
    }
  }

  public static async initAsync(): Promise<void> {
    if (__DEV__) {
    } else {
      await GoogleSignIn
        .initAsync
        // {
        // clientId:
        //   "373996144704-20tcboru7a7e04ud6aeigm0r173m07g5.apps.googleusercontent.com",
        // }
        ();
    }
  }

  public static async autoSignInAsync(): Promise<{
    user: Google.GoogleUser | null;
    idToken: string | null;
  }> {
    if (__DEV__) {
      return {
        user: null,
        idToken: null,
      };
    } else {
      try {
        const user = await GoogleSignIn.signInSilentlyAsync();
        if (user === null) {
          return {
            user: null,
            idToken: null,
          };
        }

        return {
          user:
            {
              id: user?.uid,
              name: `${user?.firstName} ${user?.lastName}`,
              givenName: user?.firstName,
              familyName: user?.lastName,
              photoUrl: user?.photoURL,
              email: user?.email,
            } ?? null,
          idToken: user?.auth?.idToken ?? null,
        };
      } catch (e) {
        alert("auto sign in error: " + e);
        return {
          user: null,
          idToken: null,
        };
      }
    }
  }

  public static async signInAsync(): Promise<{
    user: Google.GoogleUser | null;
    idToken: string | null;
  }> {
    if (__DEV__) {
      try {
        const result = await Google.logInAsync({
          androidClientId:
            "373996144704-lb8cbsmuclh62v4rnf4qg2qi2fmb973f.apps.googleusercontent.com",
          androidStandaloneAppClientId:
            "373996144704-lb8cbsmuclh62v4rnf4qg2qi2fmb973f.apps.googleusercontent.com",
          scopes: ["profile", "email"],
        });
        if (result.type === "success") {
          if (result.accessToken === null) {
            this.accessToken = "";
          } else {
            this.accessToken = result.accessToken;
          }
          return { user: result.user, idToken: result.idToken };
        }
      } catch ({ message }) {
        alert("login error:" + message);
      }
      return { user: null, idToken: null };
    } else {
      // 앱 출시 모드
      try {
        const result = await GoogleSignIn.signInAsync();
        if (result.type === "success") {
          console.log(JSON.stringify(result.user));
          console.log(JSON.stringify(GoogleSignIn.getCurrentUser()));

          return {
            user:
              {
                id: result.user?.uid,
                name: `${result.user?.firstName} ${result.user?.lastName}`,
                givenName: result.user?.firstName,
                familyName: result.user?.lastName,
                photoUrl: result.user?.photoURL,
                email: result.user?.email,
              } ?? null,
            idToken: result.user?.auth?.idToken ?? null,
          };
        } else {
          return {
            user: null,
            idToken: null,
          };
        }
      } catch (e) {
        console.log("sign in error: ", e);

        return {
          user: null,
          idToken: null,
        };
      }
    }
  }
}
