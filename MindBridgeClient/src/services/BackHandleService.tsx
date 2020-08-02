import { AppState, BackHandler, Platform, ToastAndroid } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import StackParamList from "../screens/StackParamList";

export class BackHandleService {
  public static Navigate(
    name: any,
    navigation: any = this._mainNavigation
  ): void {
    if (name !== "Main" && this._isMain) {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        this.handleBackButton
      );
      this._isMain = false;
    }
    if (navigation) navigation.navigate(name);
  }

  //Managed by handler in MainScreen.
  public static _handleFocus() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      BackHandleService.handleBackButton
    );
    BackHandleService._isMain = true;
  }

  private static _mainNavigation: StackNavigationProp<StackParamList, "Main">;
  public static registerNavigation(
    mainNavigation: StackNavigationProp<StackParamList, "Main">
  ) {
    this._mainNavigation = mainNavigation;
  }

  private static _isMain = true;

  private static exitApp: boolean = false;
  private static timeout: any;
  public static handleBackButton(): boolean {
    if (this.exitApp == undefined || !this.exitApp) {
      (Platform.select({
        android: () => {
          ToastAndroid.show("한번 더 누르시면 종료됩니다.", ToastAndroid.SHORT);
        },
      }) as Function)();

      this.exitApp = true;

      this.timeout = setTimeout(
        () => {
          this.exitApp = false;
        },
        2000 // 2초
      );
    } else {
      clearTimeout(this.timeout);
      this.exitApp = false;
      BackHandler.exitApp(); // 앱 종료
    }
    return true;
  }

  public static _handleAppStateChange(nextAppState: any) {
    if (this._isMain) {
      if (
        this._appState.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("add handler again");
        BackHandler.addEventListener(
          "hardwareBackPress",
          this.handleBackButton
        );
      } else if (nextAppState === "background") {
        console.log("remove handler");
        BackHandler.removeEventListener(
          "hardwareBackPress",
          this.handleBackButton
        );
      }
    }

    this._appState = nextAppState;
  }
  
  public static MainScreenDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
    this._mainNavigation.addListener("focus", this._handleFocus);
  }
  public static MainScreenWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
    this._mainNavigation.removeListener("focus", this._handleFocus);
  }

  private static _appState = AppState.currentState;
}
