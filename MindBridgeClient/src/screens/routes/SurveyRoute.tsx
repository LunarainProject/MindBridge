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
import Divider from "../../components/Divider";
import SurveyCard from "../../components/SurveyCard";
import Title from "../../components/Title";
import StackParamList from "../StackParamList";

export default class SurveyRoute extends React.Component<Props> {
  private OnClickHandler: (
    arg1: NativeSyntheticEvent<NativeTouchEvent>
  ) => void;

  constructor(props: any) {
    super(props);

    this.OnClickHandler = (
      e: NativeSyntheticEvent<NativeTouchEvent>
    ): void => {
      this.props.navigation.navigate("SurveyWeb");
      return;
    };
  }

  render() {
    return (
      <View style={styles.main}>
        <Title>부부행동 유형 테스트</Title>
        <View style={styles.cardMargin}>
            <SurveyCard
              Title="부부행동 유형 테스트"
              Subtitle="우리 부부는 서로에게 어떻게 행동할까?"
              ButtonLabel="무료 테스트하기"
              InfoLabel="40문항"
              OnClick={this.OnClickHandler}
            />
          </View>

          <Divider/>

          <Title>부부 관계성 테스트</Title>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((val) => (
          <View style={styles.cardMargin} key={val}>
            <SurveyCard
              Title="부부 존경지수 테스트"
              Subtitle="나의 결혼생활은 얼마나 행복할까?"
              ButtonLabel="무료 테스트하기"
              InfoLabel="8+6문항"
              OnClick={this.OnClickHandler}
            />
          </View>
        ))}
      </View>
    );
  }
}

type Props = StackScreenProps<StackParamList, "Main">;

const styles = StyleSheet.create({
  main: {
    marginBottom: 50
  },

  cardMargin: {
    width: "100%",
    marginBottom: 20,
  },
});
