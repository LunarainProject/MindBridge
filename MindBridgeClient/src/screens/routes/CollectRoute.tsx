import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent,
} from "react-native";
import { Paragraph } from "react-native-paper";
import Card from "../../components/Card";
import Divider from "../../components/Divider";
import Title from "../../components/Title";

export default class CollectRoute extends React.Component {
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
      <View style={styles.main}>
        <Title>테스트</Title>
        <View style={styles.cardMargin}>
          <Card
            Title="부부행동 유형 테스트"
            Subtitle="행동이 관계에 얼마나 영향이 있을까요?"
            Description="사소한 행동 하나가 미치는 영향"
            ButtonLabel="무료 테스트하기"
            InfoLabel="40문항"
            OnClick={this.OnClickHandler}
          />
        </View>
        <View style={styles.cardMargin}>
          <Card
            Title="부부 관계성 테스트 모음"
            Subtitle="우리 결혼 생활은 행복한 걸까?"
            Description="부부관계 건강검진 풀세트"
            ButtonLabel="무료 테스트하기"
            InfoLabel="8종"
            OnClick={this.OnClickHandler}
          />
        </View>
        <Divider />
        <Title>추천 영상</Title>
        <View style={styles.cardMargin}>
          <Card
            Title="온기 있는 집"
            Subtitle="가족을 긴장시키는 아빠, 해결책은?"
            Description="김성목, 한은경 부부 이야기"
            ButtonLabel="보러가기"
            InfoLabel=""
            OnClick={this.OnClickHandler}
          />
        </View>
        <Divider />
        <Title>추천 칼럼</Title>
        <View style={styles.cardMargin}>
          <Card
            Title="온기 있는 집"
            Subtitle="가족을 긴장시키는 아빠, 해결책은?"
            Description="김성목, 한은경 부부 이야기"
            ButtonLabel="보러가기"
            InfoLabel=""
            OnClick={this.OnClickHandler}
          />
        </View>
        <View style={styles.cardMargin}>
          <Card
            Title="온기 있는 집"
            Subtitle="가족을 긴장시키는 아빠, 해결책은?"
            Description="김성목, 한은경 부부 이야기"
            ButtonLabel="보러가기"
            InfoLabel=""
            OnClick={this.OnClickHandler}
          />
        </View>
        <Divider />
        <Title>알콩달콩 부부학교</Title>
        <View style={styles.advertiseText}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            “부부가 바로 서야 가정이 바로 선다”
          </Text>
          <Paragraph>
            사회를 구성하는 가장 기초적인 단위는 가정이고 건강한 가정이 있어야
            건강한 사회가 이룩될 수 있습니다.
          </Paragraph>
          <Paragraph>
            알콜달콩부부학교는 두란노 어머니학교와 아버지학교에서 운영하는
            부부학교입니다.
          </Paragraph>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },

  cardMargin: {
    width: "100%",
    marginBottom: 20,
  },

  advertiseText: {
    marginBottom: 50,
  },
});
