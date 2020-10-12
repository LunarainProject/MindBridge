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
import { LoginState, SurveyState } from "../StateTypes";
import { StackActions } from "@react-navigation/native";
import ServerService from "../services/ServerService";
import CombineAction from "../CombineAction";

class SurveyWebScreen extends React.Component<Props, State> {


  state = {
      isWebViewLoaded: false,
    };
  
  render() {
    return (
      <View style={styles.main}>
        <WebView
          onLoad={() => {
            this.setState({ isWebViewLoaded: true });
          }}
          source={{ uri: ServerService.GetSurveyStartUrl(
            this.props.route.params.SurveyId
          )}}
          style={styles.webView}
          onMessage={(event: any) => {
            switch (event.nativeEvent.data) {
              case 'mindbridge': {
                Alert.alert(
                  "알콩달콩",
                  "테스트가 완료되었습니다. 테스트 결과를 보시겠습니까?",
                  [
                    {
                      text: "취소",
                      onPress: () => {
                        this.props.navigation.goBack();
                      },
                      style: "cancel"
                    },
                    { text: "확인", onPress: () => {
                      /*  back handler problem fix */
                      this.props.navigation.dispatch(
                        StackActions.replace("SurveyHistory")
                      );

                      this.props.retrieveResults();

                      setTimeout(() => {
                        const recent = this.props.Survey.SurveyResultCards
                          .filter(card => card.Id === this.props.route.params.SurveyId)
                          .sort((a, b) => (parseInt(a.Count) - parseInt(b.Count)))
                          [0];

                        if(recent === undefined) {
                          this.props.navigation.dispatch(
                            StackActions.replace("SurveyHistory")
                          );
                        }
                        if(recent.IsCoupled) {
                          this.props.navigation.navigate("SpouseHistory", { SurveyResultId: recent.Id, SurveyResultCount: recent.Count});
                        } else {
                          this.props.navigation.navigate("SurveyResult", { SurveyResultId: recent.Id, SurveyResultCount: recent.Count});
                        }
                      }, 500);
                      
                    }}
                  ],
                  { cancelable: false }
                );
                break;
              }
          }}}
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

type Props = StackScreenProps<StackParamList, "SurveyWeb"> & {
  LoginState: LoginState
  Survey: SurveyState;
  retrieveResults: () => void;
};

function mapStateToProps(state: any) {
  return {
    LoginState: state.Login,
    Survey: state.Survey,
  };
}

function mapDispatchToProps(dispatch: Function) {
  return {
    retrieveResults: () => {
      dispatch(CombineAction.RetrieveResultsThunk());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyWebScreen);

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
