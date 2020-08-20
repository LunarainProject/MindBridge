import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent, BackHandler, Alert
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import StackParamList from "./StackParamList";
import { WebView } from "react-native-webview";
import { ActivityIndicator } from "react-native-paper";
import { BackHandleService } from "../services/BackHandleService";
import { connect } from "react-redux";
import { LoginState } from "../StateTypes";
import { StackActions } from "@react-navigation/native";
import * as ScreenOrientation from 'expo-screen-orientation';
import Constants from 'expo-constants';
import { StatusBar } from "expo-status-bar";

class VideoWebScreen extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      isWebViewLoaded: false,
      orientation: 'portrait',
    };
  }

  private decodeData(data: string): string | null {
    //https://www.youtube.com/watch?v=CYIntGsjNMs&list=RDHCeb04sgqnU&index=2
    //https://youtu.be/CYIntGsjNMs

    let p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|attribution_link\?a=.+?watch.+?v(?:%|=)))((\w|-){11})(?:\S+)?$/;

    data = (decodeURIComponent(data));
    return (data.match(p)) ? RegExp.$1 : null ;
  }

  async changeLandscape() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
    setTimeout(() => {this.setState({ orientation : 'landscape'});}, 2000);
  }

  async changePortrait() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    setTimeout(() => {this.setState({ orientation : 'portrait'});}, 2000);
  }

  async componentDidMount() {
    let url = this.props.route.params.Url;
    let code = this.decodeData(url);
    if(code === null) {
      alert("비디오 오류가 발생했습니다. 오류 코드: "+url);
      this.props.navigation.goBack();
    } else {
      this.code = code;
    }
    await this.changeLandscape();
  }

  async componentWillUnmount() {
    await this.changePortrait();
  }

  private code: string = "";

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.statusBar}></View>
        <WebView
          onLoad={() => {
            this.setState({ isWebViewLoaded: true });
          }}
          source={{ uri:
            `http://www.youtube.com/embed/${this.code}`
          }}
          style={styles.webView}
        />
        {(!this.state.isWebViewLoaded || (this.state.orientation == 'portrait')) && (
          <View style={styles.asyncScreen}>
            <ActivityIndicator size="large" color="#F970B9" />
          </View>
        )}
        <StatusBar
            style="light"
        ></StatusBar>
      </View>
    );
  }
}

type State = {
  isWebViewLoaded: boolean;
  orientation: 'portrait'|'landscape';
};

type Props = StackScreenProps<StackParamList, "VideoWeb"> & {
  LoginState: LoginState
};

function mapStateToProps(state: any) {
  return {
  };
}

function mapDispatchToProps(dispatch: Function) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoWebScreen);

const styles = StyleSheet.create({

  asyncScreen: {
    position: "absolute",
    backgroundColor: "whitesmoke",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  statusBar: {
    backgroundColor: "black",
    width: "100%",
    height: Constants.statusBarHeight,
  },

  main: {
    flex: 1,
    backgroundColor: "whitesmoke",
  },

  webView: {
    flex: 1,
  }
});
