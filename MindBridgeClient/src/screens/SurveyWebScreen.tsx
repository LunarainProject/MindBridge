import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent, BackHandler
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import StackParamList from "./StackParamList";
import { WebView } from "react-native-webview";
import { ActivityIndicator } from "react-native-paper";
import { BackHandleService } from "../services/BackHandleService";

export default class SurveyWebScreen extends React.Component<Props, State> {
  private OnClickTestHandler: (
    arg1: NativeSyntheticEvent<NativeTouchEvent>
  ) => void;

  private surveyUri: string = "http://gfs3456.cafe24.com/manage/ee/1/1";

  constructor(props: Props) {
    super(props);

    this.OnClickTestHandler = (
      e: NativeSyntheticEvent<NativeTouchEvent>
    ): void => {
      props.navigation.navigate("Test");
      return;
    };

    this.state = {
      isWebViewLoaded: false,
    };
  }

  componentWillUnmount() {
    BackHandler.addEventListener("hardwareBackPress", BackHandleService.getBackHandleService().handleBackButton);
    BackHandleService.getBackHandleService().SetIsMain(true);
  }

  render() {
    return (
      <View style={styles.main}>
        <WebView
          onLoad={() => {
            this.setState({ isWebViewLoaded: true });
          }}
          source={{ uri: this.surveyUri }}
          style={styles.webView}
        />
        {!this.state.isWebViewLoaded && (
          <View style={styles.asyncScreen}>
            <ActivityIndicator size="large" color="#F970B9" />
          </View>
        )}
      </View>
    );
  }
}

type State = {
  isWebViewLoaded: boolean;
};

type Props = StackScreenProps<StackParamList, "SurveyWeb">;

const styles = StyleSheet.create({

  asyncScreen: {
    position: "absolute",
    backgroundColor: "whitesmoke",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  main: {
    flex: 1,
    backgroundColor: "whitesmoke",
  },

  webView: {
    flex: 1,
  }
});
