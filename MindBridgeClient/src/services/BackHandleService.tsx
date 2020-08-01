import { BackHandler, Platform, ToastAndroid } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import StackParamList from "../screens/StackParamList";

export class BackHandleService {
    private static _instance: BackHandleService | null = null;
    public static getBackHandleService(): BackHandleService {
      if (this._instance !== null) {
        return this._instance;
      } else {
        this._instance = new BackHandleService();
        return this._instance;
      }
    }
    public static Navigate(name: any): void
    {
      if(name !== "Main")
      {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
        this._isMain = false;
      }
      if(this._mainNavigation)
        this._mainNavigation.navigate(name);
    }
    public static GoMain(): void
    {
      BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
      this._isMain = true;
    }
    private static _mainNavigation: StackNavigationProp<StackParamList, "Main">;
    public static registerNavigation(mainNavigation: StackNavigationProp<StackParamList, "Main">)
    {
      this._mainNavigation = mainNavigation;
    }
  
    private static _isMain = true;
    public static setIsMain(isMain: boolean)
    {
      this._isMain = isMain;
    }
    public static isMain(): boolean
    {
      return this._isMain;
    };
  
    private static exitApp: boolean = false;
    private static timeout: any;
  
    public static handleBackButton(): boolean 
    {
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
    };
  }