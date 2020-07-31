import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent,
  BackHandler,
} from "react-native";
import { connect } from "react-redux";
import Divider from "../../components/Divider";
import SurveyCard from "../../components/SurveyCard";
import Title from "../../components/Title";
import { CardCategoryType, CardState, CardType } from "../../StateTypes";
import StackParamList from "../StackParamList";
import Constants from "expo-constants";
import { ScrollView } from "react-native-gesture-handler";
import Background from "../../components/Background";
import { BackHandleService } from "../../services/BackHandleService";

class SurveyRoute extends React.Component<Props> {
  private OnClickHandler: (
    arg1: NativeSyntheticEvent<NativeTouchEvent>
  ) => void;

  constructor(props: any) {
    super(props);

    this.OnClickHandler = (e: NativeSyntheticEvent<NativeTouchEvent>): void => {
      this.props.navigation.navigate("SurveyWeb");
      BackHandler.removeEventListener(
        "hardwareBackPress",
        BackHandleService.getBackHandleService().handleBackButton
      );
      BackHandleService.getBackHandleService().SetIsMain(false);
    };
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FCDCFA" }}>
        <View style={styles.statusBar}></View>
        <ScrollView>
          <Background Title="테스트"></Background>
          <View
            style={[
              { marginTop: -5, backgroundColor: "white", paddingTop: 5 },
              { paddingLeft: 20, paddingRight: 20 },
            ]}
          >
            <View style={styles.main}>
              {this.props.Card.SurveyCategories.map(
                (category: CardCategoryType, ind) => (
                  <View key={ind}>
                    <Title>{category.Title}</Title>
                    {category.Cards.map((card: CardType, card_ind) => (
                      <View style={styles.cardMargin} key={card_ind}>
                        <SurveyCard
                          Title={card.Title}
                          Subtitle={card.Subtitle}
                          ButtonLabel={card.ButtonLabel}
                          InfoLabel={card.InfoLabel}
                          OnClick={this.OnClickHandler}
                        />
                      </View>
                    ))}
                    <Divider />
                  </View>
                )
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

type Props = StackScreenProps<StackParamList, "Main"> & {
  Card: CardState;
};

function mapStateToProps(state: any) {
  return {
    Card: state.Card,
  };
}

function mapDispatchToProps(dispatch: Function) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyRoute);

const styles = StyleSheet.create({
  main: {
    marginBottom: 50,
  },

  cardMargin: {
    width: "100%",
    marginBottom: 20,
  },

  statusBar: {
    backgroundColor: "#FCDCFA",
    width: "100%",
    height: Constants.statusBarHeight,
  },
});
