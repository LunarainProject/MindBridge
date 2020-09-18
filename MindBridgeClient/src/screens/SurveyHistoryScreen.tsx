import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  BackHandler,
} from "react-native";
import { connect } from "react-redux";
import CombineAction from "../CombineAction";
import { BackHandleService } from "../services/BackHandleService";
import { LoginState, SurveyState } from "../StateTypes";
import StackParamList from "./StackParamList";
import SurveyResultCard from "../components/SurveyResultCard";
import { ScrollView } from "react-native-gesture-handler";
import ServerService from "../services/ServerService";
import ActionTypes from "../actions/ActionTypes";

class SurveyHistoryScreen extends React.Component<Props> {

  componentDidMount() {
    this.props.retrieveResults();
  }

  render() {
    return (
      <View style={styles.main}>
        {/* <Text allowFontScaling={false} style={{fontSize: 30, marginBottom: 20, fontWeight: "bold"}}>서베이 히스토리</Text> */}
        <ScrollView>
        {this.props.Survey.SurveyResultCards.length == 0 ? (
          <View style={{flex: 1, justifyContent: "center", alignItems: 'center'}}>
            <Text allowFontScaling={false} >
              아직 테스트 결과가 없습니다.
            </Text>
          </View>
        ) :
        this.props.Survey.SurveyResultCards.map((card, ind) => (
          <View style={styles.cardMargin} key={ind}>
            <SurveyResultCard
              image={card.Image}
              key={ind}
              Title={card.Title}
              Date={card.Date}
              OnClick={() => {
                if(card.IsCoupled) {
                  this.props.navigation.navigate("SpouseHistory", { SurveyResultId: card.Id, SurveyResultCount: card.Count});
                } else {
                  this.props.navigation.navigate("SurveyResult", { SurveyResultId: card.Id, SurveyResultCount: card.Count});
                }
              }}
            />
          </View>
        ))
        }
        
        </ScrollView>
      </View>
    );
  }
}

type Props = StackScreenProps<StackParamList, "SurveyHistory"> & {
  Survey: SurveyState;
  retrieveResults: () => void;
};

function mapStateToProps(state: any) {
  return {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SurveyHistoryScreen);

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "whitesmoke",
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
  },

  cardMargin: {
    width: width - 40,
    marginBottom: 10,
  }
});
