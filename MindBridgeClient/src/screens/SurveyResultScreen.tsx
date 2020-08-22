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
import ServerService from "../services/ServerService";

class SurveyResultScreen extends React.Component<Props> {

  private url: string = "";

  async componentDidMount() {
    const spouseCount: string = this.props.route.params.SpouseCount ?? "0";
    this.url = ServerService.GetSurveyResultUrl(
      this.props.route.params.SurveyResultId,
      this.props.route.params.SurveyResultCount,
      spouseCount,
    );
    console.log(this.url);
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
          source={{ uri: this.url }}
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
};

function mapStateToProps(state: any) {
  return {}
}

function mapDispatchToProps(dispatch: Function) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyResultScreen);