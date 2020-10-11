import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent,
  BackHandler, Dimensions, Alert
} from "react-native";
import { connect } from "react-redux";
import Divider from "../../components/Divider";
import SurveyCard from "../../components/SurveyCard";
import Title from "../../components/Title";
import { CardCategoryType, CardState, CardType, LoginState } from "../../StateTypes";
import StackParamList from "../StackParamList";
import Constants from "expo-constants";
import { ScrollView } from "react-native-gesture-handler";
import Background from "../../components/Background";
import { BackHandleService } from "../../services/BackHandleService";
import { Card } from "react-native-paper";

class SurveyRoute extends React.Component<Props> {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FCDCFA" }}>
        <View style={styles.statusBar}></View>
        <ScrollView>
          <Background Title="테스트">
          <View style={styles.main}>
              {this.props.Card.SurveyCategories.map(
                (category: CardCategoryType, ind) => (
                  <View key={ind}>
                    <Title>{category.Title}</Title>
                    {category.Cards.map((card: CardType, card_ind) => (
                      <View style={styles.cardMargin} key={card_ind}>
                        <SurveyCard
                          Image={card.Image}
                          Title={card.Title}
                          Subtitle={card.Subtitle}
                          ButtonLabel={card.ButtonLabel}
                          InfoLabel={card.InfoLabel}
                          OnClick={() => {
                            if(this.props.Login.loggedIn) {
                              BackHandleService.Navigate("SurveyWeb", null, {SurveyId: card.Id});
                            } else {
                              Alert.alert(
                                "알콩달콩",
                                "로그인 후 사용하실 수 있습니다. 둘러보기를 그만두고 로그인하시겠습니까?",
                                [
                                  {
                                    text: "취소",
                                    onPress: () => { },
                                    style: "cancel",
                                  },
                                  {
                                    text: "확인",
                                    onPress: () => {
                                      BackHandleService.MainGoBack();
                                    },
                                  },
                                ],
                                { cancelable: false }
                              );
                            }
                             
                           } }
                        />
                      </View>
                    ))}
                    <Divider />
                  </View>
                )
              )}
            </View>
          </Background>
        </ScrollView>
      </View>
    );
  }
}

type Props = StackScreenProps<StackParamList, "Main"> & {
  Card: CardState;
  Login: LoginState;
};

function mapStateToProps(state: any) {
  return {
    Card: state.Card,
    Login: state.Login,
  };
}

function mapDispatchToProps(dispatch: Function) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyRoute);

const height = Dimensions.get("screen").height - 326;


const styles = StyleSheet.create({
  main: {
    marginBottom: 50,
    marginLeft: 20, marginRight: 20,
    minHeight: height,
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
