import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  NativeSyntheticEvent,
  NativeTouchEvent, Dimensions, ScrollView,
} from "react-native";
import Constants from "expo-constants";

import { ActivityIndicator, Button } from "react-native-paper";
import Background from "../../components/Background";
import Counter from "../../components/Counter";

import Tab from "../../components/Tab";
import StackParamList from "../StackParamList";
import TabBackground from "../../components/TabBackground";
import WebView from "react-native-webview";
import RatioImage from "../../components/RatioImage";
import * as WebBrowser from "expo-web-browser";
import { SystemState } from "../../StateTypes";
import { connect } from "react-redux";

class AdvertiseRoute extends React.Component<Props> {
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
      <View style={{ flex: 1, backgroundColor: "#FCDCFA" }}>
      <View style={styles.statusBar}></View>
      <ScrollView>
        <Background
          Title="알콩달콩 부부학교"        
        >
          <Introduction system={this.props.System}></Introduction>
        </Background>
        </ScrollView>
        </View>
    );
  }
}

type Props = StackScreenProps<StackParamList, "Main"> & {
  System: SystemState;
};

function mapStateToProps(state: any) {
  return {
    System: state.System as SystemState,
  };
}

function mapDispatchToProps(dispatch: Function) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvertiseRoute);

type IntroductionProps = {
  system: SystemState,
}

class Introduction extends React.Component<IntroductionProps> {

  state = {
    isWebViewLoaded: false,
  }

  render() {
    return (
      <View style={styles.backgroundLeft}>
        <Text allowFontScaling={false} style={{ fontSize: 16, fontWeight: "bold", marginTop: 5, }}>
          알콩달콩부부학교는?
        </Text>
        <Text allowFontScaling={false} style={{marginBottom: 5}}>
          알콩달콩부부학교는 두란노 어머니학교와 아버지학교에서 운영하는
          부부학교입니다.
        </Text>
        <RatioImage Ratio={16/9} Source={require('../../drawables/advertise.png')}></RatioImage>
        <Text allowFontScaling={false} style={{ fontSize: 16, fontWeight: "bold", marginTop: 5, marginBottom: 5 }}>
          알콩달콩부부학교 소개영상
        </Text>
        <View style={styles.videoContainer}>
          {this.props.system.appState === "active" && <WebView
              onLoad={() => {
                this.setState({ isWebViewLoaded: true });
              }}
              style = {styles.video}
              javaScriptEnabled={true}
              source={{uri: 'https://www.youtube.com/embed/mMCLiXfNn9Y'}}>
          </WebView>}
          {!this.state.isWebViewLoaded && (
            <View style={styles.asyncScreen}>
              <ActivityIndicator size="large" color="#F970B9" />
            </View>
          )}
          </View>
        <Text allowFontScaling={false} style={{ fontSize: 16, fontWeight: "bold" }}>
          “부부가 바로 서야 가정이 바로 선다”
        </Text>
        <Text allowFontScaling={false} style={ styles.paragraph }>
          사회를 구성하는 가장 기초적인 단위는 가정이고 건강한 가정이 있어야
          건강한 사회가 이룩될 수 있습니다.
        </Text>

        <Text allowFontScaling={false} style={[{ fontSize: 16, fontWeight: "bold" }, styles.paragraph]}>
          알콩달콩 부부학교에 오시면?
        </Text>
        <Text allowFontScaling={false}>
          ▶ 남녀 간의 차이에 대해 이해할 수 있습니다.</Text>
        <Text allowFontScaling={false}>
          ▶ 남편과 아내가 하나 되어 행복한 가정을 만들 수 있습니다.
        </Text>
        <Text allowFontScaling={false}>▶ 자녀들을 건강하고 행복하게 양육할 수 있습니다.</Text>
        <Text allowFontScaling={false}>
          ▶ 건강한 가정이 건강한 사회의 밑거름임을 인식하고 그에 기여할 수
          있습니다.
        </Text>

        <Button
          onPress={() => {
            WebBrowser.openBrowserAsync('http://www.mother.or.kr');
          }}
          mode="outlined"
          style={{
            borderColor: "#F970B9",
            backgroundColor: "#F970B911",
            borderWidth: 1,
            marginTop: 20,
            marginBottom: 10,
          }}
          labelStyle={{ color: "#F970B9" }}
        >
          부부학교 신청하기
        </Button>
        <Hahim></Hahim>
      </View>
    );
  }
}

class Hahim extends React.Component {
  private styles = StyleSheet.create({
    hahim: {
      marginTop: 10,
    }
  })
  render() {
    return (
      <View style={this.styles.hahim}>
        <Text allowFontScaling={false} style={{ fontSize: 16, fontWeight: "bold" }}>
          하나님을 힘써알자 - 독서모임
        </Text>
        <Text allowFontScaling={false}>
          이렇게 노력하는 남편을 마주하게 되는 저는 알콩달콩 부부학교와 하힘 독서모임을 사랑하게 되었습니다. 아내들은 아내들끼리 남편들은 남편들끼리
          각자의 삶의 나누고 위로하고 공감하고 소통하는 하힘은 ‘나’를 알고
          ‘너’를 알고 나와 너를 넘어서는 ‘우리’로의 스타트였습니다.
        </Text>
        <Text allowFontScaling={false}>
          또한 이 모임이 유지되어야 하는 이유는 지적인 은혜의 삶의 태도로
          살아가도록 연명할 힘이 되어주기 때문입니다. 그래서 한 주가 미뤄지거나
          하면 하힘금단현상이 있기도... 하나님은 특별한 방법이 아닌 평범함
          속에서 아내를 알게 하시고 작은 일상 속에서 아내를 사랑하는 법을 깨닫게
          하셨습니다. 참으로 감사하고 감사한 책읽기 모임입니다.
        </Text>
      </View>
    );
  }
}

class Itinerary extends React.Component {
  render() {
    return (
      <View style={styles.background}>
        <Text allowFontScaling={false} >부부학교 일정</Text>
        <Text allowFontScaling={false} >
          아직 부부학교 일정이 정해지지 않았습니다.
        </Text>
      </View>
    );
  }
}

class Donate extends React.Component {
  render() {
    return (
      <View style={styles.background}>
        <Text allowFontScaling={false} >아직 후원을 받고 있지 않습니다.</Text>
      </View>
    );
  }
}

class Review extends React.Component {
  render() {
    return (
      <View style={styles.background}>
        <Text allowFontScaling={false} >아직 후기를 받고 있지 않습니다.</Text>
      </View>
    );
  }
}

class Homework extends React.Component {
  render() {
    return (
      <View style={styles.backgroundRight}>
        <Text allowFontScaling={false} >아직 숙제가 없습니다.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },

  statusBar: {
    backgroundColor: "#FCDCFA",
    width: "100%",
    height: Constants.statusBarHeight,
  },

  paragraph: {
    marginTop: 10,
  },

  background: {
    flex: 1,
    backgroundColor: "whitesmoke",
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },

  backgroundLeft: {
    marginLeft: 20,
    flex: 1,
    backgroundColor: "whitesmoke",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginBottom: 10,
    padding: 10,
    paddingRight: 30,
  },

  backgroundRight: {
    marginRight: 20,
    flex: 1,
    backgroundColor: "whitesmoke",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 10,
    padding: 10,
    paddingLeft: 30,
  },

  videoContainer: {
    marginTop: 10,
    marginBottom: 10,
    width: Dimensions.get("screen").width - 60,
    height: (Dimensions.get("screen").width - 60) * (9 / 16),
  },

  video: {
    flex: 1,
  },

  asyncScreen: {
    position: "absolute",
    backgroundColor: "whitesmoke",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
