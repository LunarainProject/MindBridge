import { BackHandler, Platform, ToastAndroid } from "react-native";

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
  
    private _isMain = true;
  
    public SetIsMain(isMain: boolean): void {
      this._isMain = isMain;
    }
  
    public isMain = (): boolean => {
      return this._isMain;
    };
  
    private exitApp: boolean = false;
    private timeout: any;
  
    public handleBackButton = (): boolean => {
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