import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent,
} from "react-native";
import Constants from "expo-constants";
import { ScrollView } from "react-native-gesture-handler";
import { Paragraph } from "react-native-paper";
import { connect } from "react-redux";
import CombineAction from "../../CombineAction";
import Background from "../../components/Background";
import Card from "../../components/Card";
import Divider from "../../components/Divider";
import Title from "../../components/Title";
import { CardState, CardType } from "../../StateTypes";
import StackParamList from "../StackParamList";

class OverviewRoute extends React.Component<Props> {
  private OnClickHandler: (
    arg1: NativeSyntheticEvent<NativeTouchEvent>
  ) => void;

  constructor(props: any) {
    super(props);

    this.OnClickHandler = (e: NativeSyntheticEvent<NativeTouchEvent>): void => {
      //alert("hello");
      return;
    };
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FCDCFA" }}>
        <View style={styles.statusBar}></View>
        <ScrollView>
          <Background Title="모아보기"></Background>
          <View
            style={[
              { marginTop: -5, backgroundColor: "white", paddingTop: 5 },
              { paddingLeft: 20, paddingRight: 20 },
            ]}
          >
            <View style={styles.main}>
              <Title>{this.props.Card.OverviewSurveyCategory.Title}</Title>
              {this.props.Card.OverviewSurveyCategory.Cards.map(
                (val: CardType, ind) => (
                  <View style={styles.cardMargin} key={ind}>
                    <Card
                      Title={val.Title}
                      Subtitle={val.Subtitle}
                      Description={val.Description}
                      ButtonLabel={val.ButtonLabel}
                      InfoLabel={val.InfoLabel}
                      OnClick={this.OnClickHandler}
                    />
                  </View>
                )
              )}
              <Divider />
              <Title>{this.props.Card.OverviewVideoCategory.Title}</Title>
              {this.props.Card.OverviewVideoCategory.Cards.map(
                (val: CardType, ind) => (
                  <View style={styles.cardMargin} key={ind}>
                    <Card
                      Title={val.Title}
                      Subtitle={val.Subtitle}
                      Description={val.Description}
                      ButtonLabel={val.ButtonLabel}
                      InfoLabel=""
                      OnClick={this.OnClickHandler}
                    />
                  </View>
                )
              )}
              <Divider />
              <Title>{this.props.Card.OverviewColumnCategory.Title}</Title>
              {this.props.Card.OverviewColumnCategory.Cards.map(
                (val: CardType, ind) => (
                  <View style={styles.cardMargin} key={ind}>
                    <Card
                      Title={val.Title}
                      Subtitle={val.Subtitle}
                      Description={val.Description}
                      ButtonLabel={val.ButtonLabel}
                      InfoLabel=""
                      OnClick={this.OnClickHandler}
                    />
                  </View>
                )
              )}
              <Divider />
              <Title>알콩달콩 부부학교</Title>
              <View style={styles.advertiseText}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  “부부가 바로 서야 가정이 바로 선다”
                </Text>
                <Paragraph>
                  사회를 구성하는 가장 기초적인 단위는 가정이고 건강한 가정이
                  있어야 건강한 사회가 이룩될 수 있습니다.
                </Paragraph>
                <Paragraph>
                  알콜달콩부부학교는 두란노 어머니학교와 아버지학교에서 운영하는
                  부부학교입니다.
                </Paragraph>
              </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(OverviewRoute);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
  },

  cardMargin: {
    width: "100%",
    marginBottom: 20,
  },

  advertiseText: {
    marginBottom: 50,
  },

  statusBar: {
    backgroundColor: "#FCDCFA",
    width: "100%",
    height: Constants.statusBarHeight,
  },
});
