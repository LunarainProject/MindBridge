import React from "react";
import {
  StyleSheet,
  View,
  Text,
  NativeSyntheticEvent,
  NativeTouchEvent, Dimensions
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import StackParamList from "./StackParamList";

import Counter from "../components/Counter";
import WebView from "react-native-webview";
import { ActivityIndicator, Button } from "react-native-paper";
import { LoginState, SurveyState } from "../StateTypes";
import { connect } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import CombineAction from "../CombineAction";
import SurveyResultCard from "../components/SurveyResultCard";

class SpouseHistoryScreen extends React.Component<Props> {

  componentDidMount() {
    const pkgId = this.props.route.params.SurveyResultId;
    if(pkgId != "") {
      this.props.retrieveSpouse(pkgId);
    }
    
  }

  render() {
    return (
      <View style={styles.main}>
        {/* <Text allowFontScaling={false} style={{fontSize: 30, marginBottom: 20, fontWeight: "bold"}}>서베이 히스토리</Text> */}
        <ScrollView>
          <View style={styles.cardMargin}>
            <Text allowFontScaling={false} >
              나의 테스트 결과와 비교할 배우자의 테스트 결과를 골라 주세요.
            </Text>
          </View>
          <View style={styles.cardMargin}>
            <Button
              onPress={() => {
                this.props.navigation.navigate("SurveyResult", {
                  SurveyResultId: this.props.route.params.SurveyResultId,
                  SurveyResultCount: this.props.route.params.SurveyResultCount,
                  SpouseCount: "-1",
                })
              }}
              mode="outlined"
              style={{
                borderColor: "#F970B9",
                backgroundColor: "#F970B911",
                borderWidth: 1,
              }}
              labelStyle={{ color: "#F970B9" }}
            >
              내 테스트 결과만 보기
            </Button>
          </View>                            
        {this.props.Survey.SpouseResultCards.length == 0 ? (
          <View style={{flex: 1, justifyContent: "center", alignItems: 'center'}}>
            <Text allowFontScaling={false} >
              아직 배우자의 테스트 결과가 없습니다.
            </Text>
          </View>
        ) :
        this.props.Survey.SpouseResultCards.map((card, ind) => (
          <View style={styles.cardMargin} key={ind}>
            <SurveyResultCard
              image={card.Image}
              key={ind}
              Title={card.Title}
              Date={card.Date}
              OnClick={() => {
                this.props.navigation.navigate("SurveyResult", {
                  SurveyResultId: this.props.route.params.SurveyResultId,
                  SurveyResultCount: this.props.route.params.SurveyResultCount,
                  SpouseCount: card.Count,
                })
              }}
            />
          </View>
        ))}
        
        </ScrollView>
      </View>
    );
  }
}

const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: "whitesmoke",
  },

  cardMargin: {
    width: width - 40,
    marginBottom: 10,
  }
});

type Props = StackScreenProps<StackParamList, "SpouseHistory"> & {
  Survey: SurveyState;
  retrieveSpouse: (pkgId: string) => void;
};

function mapStateToProps(state: any) {
  return {
    Survey: state.Survey,
  };
}

function mapDispatchToProps(dispatch: Function) {
  return {
    retrieveSpouse: (pkgId: string) => {
      dispatch(CombineAction.RetrieveSpouseResultsThunk(pkgId));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SpouseHistoryScreen);