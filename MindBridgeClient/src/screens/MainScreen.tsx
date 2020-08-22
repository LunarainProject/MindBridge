import React from "react";
import {
  Platform,
  StyleSheet,
  View,
  Button,
  Image,
  NativeSyntheticEvent,
  NativeTouchEvent,
  ToastAndroid,
  BackHandler,
  AppState,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import StackParamList from "./StackParamList";
import {
  Surface,
  Text,
  Headline,
  BottomNavigation,
  Provider,
  DefaultTheme,
} from "react-native-paper";
import Constants from "expo-constants";

import OverviewRoute from "./routes/OverviewRoute";
import SurveyRoute from "./routes/SurveyRoute";
import TipRoute from "./routes/TipRoute";
import AdvertiseRoute from "./routes/AdvertiseRoute";
import MoreRoute from "./routes/MoreRoute";
import CombineAction from "../CombineAction";
import { connect } from "react-redux";
import { BackHandleService } from "../services/BackHandleService";
import { StatusBar } from "expo-status-bar";

class MainScreen extends React.Component<Props> {
  state = {
    index: 0,
    appState: AppState.currentState,
  };

  private OverviewRoute = () => <OverviewRoute {...this.props} setIndex={this.setIndex} />;
  private SurveyRoute = () => <SurveyRoute {...this.props} />;
  private TipRoute = () => <TipRoute {...this.props} />;
  private AdvertiseRoute = () => <AdvertiseRoute {...this.props} />;
  private MoreRoute = () => <MoreRoute {...this.props} />;

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
          <Icon
            Focused={focused}
            Source={require("../drawables/icon_overview.png")}
          />
        );
      case "survey":
        return (
          <Icon
            Focused={focused}
            Source={require("../drawables/icon_survey.png")}
          />
        );
      case "tip":
        return (
          <Icon
            Focused={focused}
            Source={require("../drawables/icon_tip.png")}
          />
        );
      case "advertise":
        return (
          <Icon
            Focused={focused}
            Source={require("../drawables/icon_advertise.png")}
          />
        );
      case "more":
      default:
        return (
          <Icon
            Focused={focused}
            Source={require("../drawables/icon_more.png")}
          />
        );
    }
  };

  private setIndex = (index: number) => {
    this.setState({ index });
  };

  constructor(props: Props) {
    super(props);
    BackHandleService.registerNavigation(props.navigation);
  }

  componentDidMount() {
    console.log("main screen init");
    this.props.InitUserInfo();
    this.props.InitSpouseInfo();
    this.props.InitSurvey();
    this.props.InitOverview();
    this.props.InitResults();
    this.props.InitTip();

    BackHandleService.focusCallback = () => {
      this.props.InitUserInfo();
      this.props.InitSpouseInfo();
      this.props.InitSurvey();
      this.props.InitOverview();
      this.props.InitTip();
    }

    AppState.addEventListener("change", this._handler);
    BackHandleService.MainScreenDidMount();
  }

  private _handler = (nextAppState: any) => {
    BackHandleService._handleAppStateChange(nextAppState);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handler);
    BackHandleService.MainScreenWillUnmount();
  }

  render() {
    return (
      <View style={styles.main}>
        <View />
        <StatusBar
            style="dark"
        ></StatusBar>
        <Provider theme={white_theme}>
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
        </Provider>
      </View>
    );
  }
}

const white_theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "white",
    surface: "white",
  },
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#FCDCFA",
  },

  statusBar: {
    backgroundColor: "#FCDCFA",
    width: "100%",
    height: Constants.statusBarHeight,
  },
});

type Props = StackScreenProps<StackParamList, "Main"> & {
  InitResults: () => void;
  InitSurvey: () => void;
  InitUserInfo: () => void;
  InitSpouseInfo: () => void;
  InitOverview: () => void;
  InitTip: () => void;
};

function mapStateToProps(state: any) {
  return {};
}

function mapDispatchToProps(dispatch: Function) {
  return {
    InitResults: (): void => {
      dispatch(CombineAction.RetrieveResultsThunk());
    },
    InitSurvey: (): void => {
      dispatch(CombineAction.RetrieveSurveyThunk());
    },
    InitOverview: (): void => {
      dispatch(CombineAction.RetrieveOverviewThunk());
    },
    InitTip: (): void => {
      dispatch(CombineAction.RetrieveTipThunk());
    },
    InitUserInfo: (): void => {
      dispatch(CombineAction.RetrieveUserInfoThunk());
    },
    InitSpouseInfo: (): void => {
      dispatch(CombineAction.RetrieveSpouseInfoThunk());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

class Icon extends React.Component<IconProps> {
  private styles = StyleSheet.create({
    container: {
      position: "relative",
    },

    focusedStyle: {
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(255, 255, 255, 0)",
      position: "absolute",
    },

    blurredStyle: {
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      position: "absolute",
    },
  });

  render() {
    return (
      <View style={this.styles.container}>
        <Image
          style={{ width: 23, height: 23, resizeMode: "contain" }}
          source={this.props.Source}
        />
        <View
          style={
            this.props.Focused
              ? this.styles.focusedStyle
              : this.styles.blurredStyle
          }
        />
      </View>
    );
  }
}

type IconProps = {
  Focused: boolean;
  Source: any;
};
