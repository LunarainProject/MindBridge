import * as Google from "expo-google-app-auth";

export default class GoogleService {

  private static accessToken: string = "";

  public static async signOutAsync()
  {
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
  };

  public static async signInAsync(): Promise<{ user: Google.GoogleUser | null, idToken: string | null}> {
    try {
      const result = await Google.logInAsync({
        androidClientId: 
        "373996144704-lb8cbsmuclh62v4rnf4qg2qi2fmb973f.apps.googleusercontent.com",
        androidStandaloneAppClientId: 
        "373996144704-lb8cbsmuclh62v4rnf4qg2qi2fmb973f.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });
      if (result.type === "success") {
        if(result.accessToken === null) {
          this.accessToken = "";
        } else {
          this.accessToken = result.accessToken;
        }
        return { user: result.user, idToken: result.idToken };
      }
    } catch ({ message }) {
      alert("login error:" + message);
    }
    return { user: null , idToken: null };
  }

}