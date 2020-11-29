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
        iosClientId: "500481310176-lft49ekir2fbet9vm4u6qmcrlqlrfdl6.apps.googleusercontent.com",
        androidClientId: "500481310176-t8l7tr9jhvg8v0jc2a8f378oqsdirrbn.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });
      //console.log("google signed out");
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
          iosClientId: "500481310176-lft49ekir2fbet9vm4u6qmcrlqlrfdl6.apps.googleusercontent.com",
          androidClientId: "500481310176-t8l7tr9jhvg8v0jc2a8f378oqsdirrbn.apps.googleusercontent.com",
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
