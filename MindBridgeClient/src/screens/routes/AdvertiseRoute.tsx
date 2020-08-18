import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import {
  StyleSheet,
  View,
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent, Dimensions
} from "react-native";
import Constants from "expo-constants";

import { ActivityIndicator, Paragraph, Text } from "react-native-paper";
import Background from "../../components/Background";
import Counter from "../../components/Counter";

import Tab from "../../components/Tab";
import StackParamList from "../StackParamList";
import TabBackground from "../../components/TabBackground";
import WebView from "react-native-webview";

export default class AdvertiseRoute extends React.Component<Props> {
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
        <TabBackground
          title="알콩달콩 부부학교"
          tabWidth={90}
          tabs={tabs}
          style={{
            marginLeft: 10
          }}          
        >
        </TabBackground>
    );
  }
}

type Props = StackScreenProps<StackParamList, "Main">;

class Introduction extends React.Component {

  state = {
    isWebViewLoaded: false,
  }

  render() {
    return (
      <View style={styles.backgroundLeft}>
        <Paragraph>
          알콩달콩부부학교는 두란노 어머니학교와 아버지학교에서 운영하는
          부부학교입니다.
        </Paragraph>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10, }}>
          알콩달콩부부학교는?
        </Text>
        <View style={styles.videoContainer}>
          <WebView
              onLoad={() => {
                this.setState({ isWebViewLoaded: true });
              }}
              style = {styles.video}
              javaScriptEnabled={true}
              source={{uri: 'https://www.youtube.com/embed/mMCLiXfNn9Y'}}>
          </WebView>
          {!this.state.isWebViewLoaded && (
            <View style={styles.asyncScreen}>
              <ActivityIndicator size="large" color="#F970B9" />
            </View>
          )}
          </View>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          “부부가 바로 서야 가정이 바로 선다”
        </Text>
        <Paragraph style={ styles.paragraph }>
          사회를 구성하는 가장 기초적인 단위는 가정이고 건강한 가정이 있어야
          건강한 사회가 이룩될 수 있습니다.
        </Paragraph>

        <Text style={[{ fontSize: 16, fontWeight: "bold" }, styles.paragraph]}>
          알콩달콩 부부학교에 오시면?
        </Text>
        <Paragraph>
          ▶ 남녀 간의 차이에 대해 이해할 수 있습니다.</Paragraph>
        <Paragraph>
          ▶ 남편과 아내가 하나 되어 행복한 가정을 만들 수 있습니다.
        </Paragraph>
        <Paragraph>▶ 자녀들을 건강하고 행복하게 양육할 수 있습니다.</Paragraph>
        <Paragraph>
          ▶ 건강한 가정이 건강한 사회의 밑거름임을 인식하고 그에 기여할 수
          있습니다.
        </Paragraph>
      </View>
    );
  }
}

class Itinerary extends React.Component {
  render() {
    return (
      <View style={styles.background}>
        <Text>Itinerary</Text>
        <Text>
          This is sample counter to test Redux Actions: CountActions,
          CountReducer(subreducer)
        </Text>
        <Counter />
      </View>
    );
  }
}

class Donate extends React.Component {
  render() {
    return (
      <View style={styles.background}>
        <Text>Donate</Text>
      </View>
    );
  }
}

class Review extends React.Component {
  render() {
    return (
      <View style={styles.background}>
        <Text>Review</Text>
      </View>
    );
  }
}

class Homework extends React.Component {
  render() {
    return (
      <View style={styles.backgroundRight}>
        <Text>Homework</Text>
      </View>
    );
  }
}

const myPage = <Introduction />;
const itinerary = <Itinerary />;
const donate = <Donate />;
const review = <Review />;
const homework = <Homework />;

const tabs = [
  { title: "소개", route: myPage },
  { title: "일정", route: itinerary },
  { title: "후원", route: donate },
  { title: "후기", route: review },
  { title: "숙제", route: homework },
];

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
