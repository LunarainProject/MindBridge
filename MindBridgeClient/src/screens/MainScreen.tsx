import React from "react";
import {
  Platform,
  StyleSheet,
  View,
  Button,
  Image,
  NativeSyntheticEvent,
  NativeTouchEvent,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import StackParamList from "./StackParamList";
import { Surface, Text, Headline, BottomNavigation } from "react-native-paper";

import CollectRoute from "./routes/CollectRoute";
import SurveyRoute from "./routes/SurveyRoute";
import TipRoute from "./routes/TipRoute";
import AdvertiseRoute from "./routes/AdvertiseRoute";
import MoreRoute from "./routes/MoreRoute";
import Background from "../components/Background";

export default class MainScreen extends React.Component<Props> {

  state = {
    index: 0,
  };

  private OnClickTestHandler: (
    arg1: NativeSyntheticEvent<NativeTouchEvent>
  ) => void;

  private CollectRoute   = () => this.DrawBackground(<CollectRoute />, "모아보기");
  private SurveyRoute    = () => this.DrawBackground(<SurveyRoute />, "테스트");
  private TipRoute       = () => this.DrawBackground(<TipRoute />, "팁");
  private AdvertiseRoute = () => this.DrawBackground(<AdvertiseRoute />, "부부학교");
  private MoreRoute      = () => this.DrawBackground(<MoreRoute />, "더보기");

  private DrawBackground = (childcontent: any, title: string) => {
    return <Background Title={title}>{childcontent}</Background>;
  };

  private routes = [
    { key: "collect", title: "모아보기", icon: "history" },
    { key: "survey", title: "테스트", icon: "album" },
    { key: "tip", title: "팁", icon: "history" },
    { key: "advertise", title: "부부학교", icon: "album" },
    { key: "more", title: "더보기", icon: "history" },
  ];

  private renderScene = BottomNavigation.SceneMap({
    collect: this.CollectRoute,
    survey: this.SurveyRoute,
    tip: this.TipRoute,
    advertise: this.AdvertiseRoute,
    more: this.MoreRoute,
  });

  private renderIcon = ({route, focused, color}: any) => {
    console.log(route);
    switch(route.key)
    {
      case "collect":
        return <Image style={{width: 20, height: 20, resizeMode: 'contain'}} source={{uri: require("../drawables/icon_collect.png")}} />
      default:
        return <Image style={{width: 20, height: 20, resizeMode: 'contain'}} source={{uri: require("../drawables/icon_more.png")}} />
    }
  }

  private setIndex = (index: number) => {
    this.setState({ index });
  };

  constructor(props: Props) {
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
        <View />
        <BottomNavigation
          shifting={false}
          labeled={true}
          navigationState={{
            index: this.state.index,
            routes: this.routes,
          }}
          onIndexChange={this.setIndex}
          renderScene={this.renderScene}
          renderIcon={this.renderIcon}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "whitesmoke",
  },
});

type Props = StackScreenProps<StackParamList, "Main">;
