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

import OverviewRoute from "./routes/OverviewRoute";
import SurveyRoute from "./routes/SurveyRoute";
import TipRoute from "./routes/TipRoute";
import AdvertiseRoute from "./routes/AdvertiseRoute";
import MoreRoute from "./routes/MoreRoute";
import Background from "../components/Background";
import ScrollBackground from "../components/ScrollBackground";
import CombineAction from "../CombineAction";
import { connect } from "react-redux";

class MainScreen extends React.Component<Props> {
  state = {
    index: 0,
  };

  private OnClickTestHandler: (
    arg1: NativeSyntheticEvent<NativeTouchEvent>
  ) => void;

  private OverviewRoute = () =>
    this.DrawBackground(<OverviewRoute {...this.props}/>, "모아보기", true, true);
  private SurveyRoute = () => this.DrawBackground(<SurveyRoute {...this.props}/>, "테스트", true, true);
  private TipRoute = () => this.DrawBackground(<TipRoute {...this.props}/>, "부부생활 팁", true);
  private AdvertiseRoute = () =>
    this.DrawBackground(<AdvertiseRoute {...this.props}/>, "알콩달콩 부부학교");
  private MoreRoute = () => this.DrawBackground(<MoreRoute {...this.props}/>, "더보기");

  private DrawBackground = (childContent: any, title: string, scroll: boolean = false, childMargin: boolean = false) => {
    return scroll?
      <ScrollBackground ChildMargin={childMargin} Title={title}>{childContent}</ScrollBackground> :
      <Background ChildMargin={childMargin} Title={title}>{childContent}</Background>
  };

  private routes = [
    { key: "Overview", title: "모아보기" },
    { key: "survey", title: "테스트" },
    { key: "tip", title: "부부팁" },
    { key: "advertise", title: "부부학교" },
    { key: "more", title: "더보기" },
  ];

  private renderScene = BottomNavigation.SceneMap({
    Overview: this.OverviewRoute,
    survey: this.SurveyRoute,
    tip: this.TipRoute,
    advertise: this.AdvertiseRoute,
    more: this.MoreRoute,
  });

  private renderIcon = ({ route, focused, color }: any) => {
    switch (route.key) {
      case "Overview":
        return (
          <Icon Focused={focused} Source={require("../drawables/icon_overview.png")} />
        );
      case "survey":
        return (
          <Icon Focused={focused} Source={require("../drawables/icon_survey.png")} />
        );
      case "tip":
        return (
          <Icon Focused={focused} Source={require("../drawables/icon_tip.png")} />
        );
      case "advertise":
        return (
          <Icon Focused={focused} Source={require("../drawables/icon_advertise.png")} />
        );
      case "more":
      default:
        return (
          <Icon Focused={focused} Source={require("../drawables/icon_more.png")} />
        );
    }
  };

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

  componentDidMount() {
    this.props.SetFakeData();
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

type Props = StackScreenProps<StackParamList, "Main"> & {
  SetFakeData: () => void;
};

function mapStateToProps(state: any) {
  return {
  };
};

function mapDispatchToProps(dispatch: Function) {
  return {
    SetFakeData: () => {
      dispatch(CombineAction.SetFakeData());
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

class Icon extends React.Component<IconProps> {
  private styles = StyleSheet.create({
    container: {
      position: "relative"
    },
    
    focusedStyle: {
      width: "100%",
      height: "100%",
      backgroundColor: 'rgba(255, 255, 255, 0)',
      position: 'absolute',
    },

    blurredStyle: {
      width: "100%",
      height: "100%",
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      position: 'absolute',
    },
  });

  render() {
    return (
      <View style={this.styles.container}>
        <Image
          style={{ width: 23, height: 23, resizeMode: "contain" }}
          source={this.props.Source}
        />
        <View style={this.props.Focused? this.styles.focusedStyle: this.styles.blurredStyle}/>
      </View>
    )
  }
};

type IconProps = {
  Focused: boolean,
  Source: any,
}