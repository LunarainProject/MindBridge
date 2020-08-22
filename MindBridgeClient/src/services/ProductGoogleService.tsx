import * as Google from "expo-google-app-auth";
import * as GoogleSignIn from "expo-google-sign-in";
import { Alert } from "react-native";
import { IGoogleService } from "./IGoogleService";

export default class ProductGoogleService implements IGoogleService {
  private static productService: ProductGoogleService | null = null;
  public static getProductGoogleService(): ProductGoogleService {
    if (ProductGoogleService.productService === null) {
      ProductGoogleService.productService = new ProductGoogleService();
    }
    return ProductGoogleService.productService;
  }

  public async signOutAsync() {
    try {
      await GoogleSignIn.signOutAsync();
    } catch (e) {
      alert("sign out failed: " + e);
    }
  }

  public async initAsync(): Promise<void> {
    await GoogleSignIn.initAsync();
  }

  public async autoSignInAsync(): Promise<{
    user: Google.GoogleUser | null;
    idToken: string | null;
  }> {
    try {
      const user = await GoogleSignIn.signInSilentlyAsync();
      if (user === null) {
        return {
          user: null,
          idToken: null,
        };
      }

      let name;
      const str = (user?.firstName ?? "") + (user?.lastName ?? "");
      const check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
      if (check.test(str)) {
        //korean
        name = `${user?.lastName}${user?.firstName}`;
      } else {
        name = `${user?.firstName} ${user?.lastName}`;
      }

      return {
        user:
          {
            id: user?.uid,
            name: name,
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

  public async signInAsync(): Promise<{
    user: Google.GoogleUser | null;
    idToken: string | null;
  }> {
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
