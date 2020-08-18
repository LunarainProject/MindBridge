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

class TipWebScreen extends React.Component<Props, State> {

  private columnUri: string = "http://gfs3456.cafe24.com/manage/ColumnScreen";

  constructor(props: Props) {
    super(props);
    this.state = {
      isWebViewLoaded: false,
    };
  }
  
  render() {
    return (
      <View style={styles.main}>
        <WebView
          onLoad={() => {
            this.setState({ isWebViewLoaded: true });
          }}
          source={{ uri: `${this.columnUri}/${this.props.route.params.ColumnId}`}}
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

type Props = StackScreenProps<StackParamList, "TipWeb"> & {
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

export default connect(mapStateToProps, mapDispatchToProps)(TipWebScreen);

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
