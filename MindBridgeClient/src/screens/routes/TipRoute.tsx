import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent,
  Dimensions,
} from "react-native";
import Card from "../../components/Card";
import Tab from "../../components/Tab";
import Title from "../../components/Title";
import StackParamList from "../StackParamList";

export default class TipRoute extends React.Component {
  private OnClickTestHandler: (
    arg1: NativeSyntheticEvent<NativeTouchEvent>
  ) => void;

  constructor(props: any) {
    super(props);

    this.OnClickTestHandler = (
      e: NativeSyntheticEvent<NativeTouchEvent>
    ): void => {
      props.navigation.navigate("Test");
      return;
    };
  }

  render() {
    return (
      <View style={styles.main}>
        <Tab
          tabs={tabs}
          style={{}}
          tabWidth={(Dimensions.get("screen").width - 40) / 2}
          onChange={() => {}}
        ></Tab>
      </View>
    );
  }
}

class Video extends React.Component {
  render() {
    return (
      <View style={[styles.background, styles.paddingContainer]}>
        <Title>실전 팁 영상</Title>
        <View style={styles.cardMargin}>
          <Card
            Title="온기 있는 집"
            Subtitle="가족을 긴장시키는 아빠, 해결책은?"
            Description="김성목, 한은경 부부 이야기"
            ButtonLabel="보러가기"
            InfoLabel=""
            OnClick={() => {}}
          />
        </View>
        <View style={styles.cardMargin}>
          <Card
            Title="온기 있는 집"
            Subtitle="가족을 긴장시키는 아빠, 해결책은?"
            Description="김성목, 한은경 부부 이야기"
            ButtonLabel="보러가기"
            InfoLabel=""
            OnClick={() => {}}
          />
        </View>
      </View>
    );
  }
}

class Column extends React.Component<Props> {
  render() {
    return (
      <View style={[styles.background, styles.paddingContainer]}>
        <Title>실전 팁 칼럼</Title>
        <View style={styles.cardMargin}>
          <Card
            Title="바람을 피우는 이유"
            Subtitle={'"바람기는 타고나는 것" 진실일까, 거짓일까?'}
            Description="바람기에 대한 모든 것"
            ButtonLabel="보러가기"
            InfoLabel=""
            OnClick={() => {}}
          />
        </View>
        <View style={styles.cardMargin}>
        <Card
            Title="바람을 피우는 이유"
            Subtitle={'"바람기는 타고나는 것" 진실일까, 거짓일까?'}
            Description="바람기에 대한 모든 것"
            ButtonLabel="보러가기"
            InfoLabel=""
            OnClick={() => {}}
          />
        </View>
      </View>
    );
  }
}

type Props = StackScreenProps<StackParamList, "Main">;

const video = <Video />;
const column = <Column />;

const tabs = [
  { title: "부부가행복하게사는법", route: video },
  { title: "행복한부부칼럼", route: column },
];

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },

  background: {
    flex: 1,
    backgroundColor: "white",
  },
  cardMargin: {
    width: "100%",
    marginBottom: 20,
  },

  paddingContainer: {
    paddingTop: 20,
    paddingBottom: 50,
  },
});
