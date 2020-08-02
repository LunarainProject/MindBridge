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

class SurveyHistoryScreen extends React.Component<Props> {
  render() {
    return (
      <View style={styles.main}>
        {/* <Text style={{fontSize: 30, marginBottom: 20, fontWeight: "bold"}}>서베이 히스토리</Text> */}
        <ScrollView>
        {this.props.Survey.SurveyResultCards.map((card, ind) => (
          <View style={styles.cardMargin} key={ind}>
            <SurveyResultCard
              key={ind}
              Title={card.Title}
              Date={card.Date}
              OnClick={() => {this.props.navigation.navigate("SurveyResult", { SurveyResultId: card.Id})}}
            />
          </View>
        ))}
        </ScrollView>
      </View>
    );
  }
}

type Props = StackScreenProps<StackParamList, "SurveyHistory"> & {
  Survey: SurveyState;
};

function mapStateToProps(state: any) {
  return {
    Survey: state.Survey,
  };
}
function mapDispatchToProps(dispatch: Function) {
  return {};
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
