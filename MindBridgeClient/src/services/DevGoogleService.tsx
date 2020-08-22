import * as Google from "expo-google-app-auth";
import * as GoogleSignIn from "expo-google-sign-in";
import { Alert } from "react-native";
import { IGoogleService } from "./IGoogleService";

export default class DevGoogleService implements IGoogleService {
  private static accessToken: string = "";

  private static devService: DevGoogleService | null = null;
  public static getDevGoogleService(): DevGoogleService {
    if (DevGoogleService.devService === null) {
      DevGoogleService.devService = new DevGoogleService();
    }
    return DevGoogleService.devService;
  }

  public async signOutAsync() {
    try {
      await Google.logOutAsync({
        accessToken: DevGoogleService.accessToken,
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
  }

  public async initAsync(): Promise<void> {
  }

  public async autoSignInAsync(): Promise<{
    user: Google.GoogleUser | null;
    idToken: string | null;
  }> {
      return {
        user: null,
        idToken: null,
      };
    }

  public async signInAsync(): Promise<{
    user: Google.GoogleUser | null;
    idToken: string | null;
  }> {
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
            DevGoogleService.accessToken = "";
          } else {
            DevGoogleService.accessToken = result.accessToken;
          }
          return { user: result.user, idToken: result.idToken };
        }
      } catch ({ message }) {
        alert("login error:" + message);
      }
      return { user: null, idToken: null };
  }
}
