import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import StackParamList from "./StackParamList";

import Counter from "../components/Counter";
import WebView from "react-native-webview";
import { ActivityIndicator } from "react-native-paper";
import { LoginState } from "../StateTypes";
import { connect } from "react-redux";

class SurveyResultScreen extends React.Component<Props> {
  private OnClickTestHandler: (
    arg1: NativeSyntheticEvent<NativeTouchEvent>
  ) => void;

  private surveyResultUri: string = "http://gfs3456.cafe24.com/manage/TestResult"

  constructor(props: Props) {
    super(props);
    this.OnClickTestHandler = (
      e: NativeSyntheticEvent<NativeTouchEvent>
    ): void => {
      props.navigation.navigate("Test");
      return;
    };
  }

  state = {
    isWebViewLoaded: false,
  }

  render() {
    return (
      <View style={styles.main}>
        <WebView
          onLoad={() => {
            this.setState({ isWebViewLoaded: true });
          }}
          source={{ uri: `${this.surveyResultUri}/${this.props.route.params.SurveyResultId}/${this.props.LoginState.idToken}/${this.props.route.params.SurveyResultCount}` }}
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

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "whitesmoke",
  },

  asyncScreen: {
    position: "absolute",
    backgroundColor: "whitesmoke",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  webView: {
    flex: 1,
  }
});

type Props = StackScreenProps<StackParamList, "SurveyResult"> & {
  LoginState: LoginState
};

function mapStateToProps(state: any) {
  return {
    LoginState: state.Login
  }
}

function mapDispatchToProps(dispatch: Function) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyResultScreen);