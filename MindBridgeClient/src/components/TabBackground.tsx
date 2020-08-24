import React, { createRef, Ref } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  ScrollView,
  Text,
  TouchableNativeFeedback,
} from "react-native";
import BackgroundBase from "./BackgroundBase";
import LogoTitle from "./LogoTitle";
import Constants from "expo-constants";
import Background from "./Background";;
import GestureRecognizer from "react-native-swipe-gestures";
import { yellow100 } from "react-native-paper/lib/typescript/src/styles/colors";

export default class TabBackground extends React.Component<Props> {
  state = {
    focused: 0,
    Pos: new Animated.Value(0),
    width: Dimensions.get("screen").width,
  };

  componentDidMount() {
    Dimensions.addEventListener("change", this._handler);
  }

  private _handler = () => {
    this.setState({width: Dimensions.get("screen").width});
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this._handler);
  }

  private ref = createRef<ScrollView>();

  private onSwipeLeft = () => {
    if (this.state.focused < this.props.tabs.length - 1) {
      this.changeFocused(this.state.focused + 1);
    }
  };

  private onSwipeRight = () => {
    if (this.state.focused > 0) {
      this.changeFocused(this.state.focused - 1);
    }
  };

  public changeFocused(index: number) {
    this.setState({ focused: index });
    Animated.timing(this.state.Pos, {
      toValue: index,
      duration: 150,
      useNativeDriver: false,
    }).start();
    if(this.ref) {
      this.ref.current?.scrollTo({
        x: this.props.tabWidth * index,
        y: 0,
        animated: true,
      });
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}> 
        <View style={styles.statusBar}></View>
        <ScrollView stickyHeaderIndices={[1]}>
          <Background Title={this.props.title}></Background>
          <View
            style={[{ marginTop: -5, backgroundColor: "white", paddingTop: 5 }]}
          >
            <ScrollView 
              ref={this.ref}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.tabMain}>
              <View style={[styles.barContainer, this.props.style]}>
                <Animated.View
                  style={{
                    width: this.state.Pos.interpolate({
                      inputRange: [0, this.props.tabs.length - 1],
                      outputRange: [
                        0,
                        (this.props.tabs.length - 1) * this.props.tabWidth,
                      ],
                    }),
                  }}
                />
                <View
                  style={[
                    styles.centerContainer,
                    { width: this.props.tabWidth },
                  ]}
                >
                  <View
                    style={[styles.tabBar, { width: this.props.tabWidth / 2 }]}
                  />
                </View>
              </View>
              <View style={[styles.tabContainer, this.props.style]}>
                {this.props.tabs.map((val, ind) => (
                  <TouchableNativeFeedback
                    key={ind}
                    onPress={(e) => {
                      this.changeFocused(ind);
                    }}
                    background={TouchableNativeFeedback.Ripple(
                      "rgba(0, 0, 0, 0.08)",
                      false
                    )}
                  >
                    <View style={{width: this.props.tabWidth, height: 40}}>
                      <View
                        style={[
                          styles.centerContainer,
                          { width: this.props.tabWidth, height: 40 },
                        ]}
                      >
                        <Text
                          allowFontScaling={false}
                          style={[
                            styles.tabText,
                            this.state.focused == ind
                              ? styles.focusedText
                              : styles.blurredText,
                          ]}
                        >
                          {val.title}
                        </Text>
                      </View>
                    </View>
                  </TouchableNativeFeedback>
                ))}
              </View>
            </ScrollView>
          </View>
          <GestureRecognizer
            onSwipeRight={this.onSwipeRight}
            onSwipeLeft={this.onSwipeLeft}
            config={{
              velocityThreshold: 0.02,
              directionalOffsetThreshold: 80,
              gestureIsClickThreshold: 60,
            }}
            style={{ flex: 1, backgroundColor: "#FFFFFF" }}
          >
            <Animated.View
              style={[
                styles.tabScreen,
                {
                  width:
                    Dimensions.get("screen").width * this.props.tabs.length,
                },
                {
                  transform: [
                    {
                      translateX: this.state.Pos.interpolate({
                        inputRange: [0, this.props.tabs.length - 1],
                        outputRange: [
                          0,
                          -Dimensions.get("screen").width *
                            (this.props.tabs.length - 1),
                        ],
                      }),
                    },
                  ],
                },
              ]}
            >
              {this.props.tabs.map((val: TabType, ind) => (
                <View
                  style={{ width: Dimensions.get("screen").width }}
                  key={ind}
                >
                  {val.route}
                </View>
              ))}
            </Animated.View>
          </GestureRecognizer>
        </ScrollView>
      </View>
    );
  }
}

type TabType = { title: string; route: any };

type Props = {
  tabs: TabType[];
  title: string;
  tabWidth: number;
  style: any;
};

const height = Dimensions.get("screen").height - 330;

const styles = StyleSheet.create({
  heading: {
    height: 80 - Constants.statusBarHeight,
  },

  statusBar: {
    backgroundColor: "#FCDCFA",
    width: "100%",
    height: Constants.statusBarHeight,
  },

  headingInner: {
    flex: 1,
    justifyContent: "center",
  },

  tabMain : {
    flex: 1,
    backgroundColor: "white",
  },

  tabContainer: {
    flexDirection: "row",
    height: 40 + 2,
  },

  barContainer: {
    flexDirection: "row",
    position: "absolute",
    left: 0,
    top: 40,
  },

  tabText: {
    fontSize: 16,
  },

  focusedText: {
    color: "black",
    fontWeight: "bold",
  },

  blurredText: {
    color: "#A1A1A1",
    fontWeight: "normal",
  },

  centerContainer: {
    /* width must be set to props.tabWidth */
    justifyContent: "center",
    alignItems: "center",
  },

  tabScreen: {
    flex: 1,
    flexDirection: "row",
    minHeight: height,
  },

  tabBar: {
    height: 2,
    backgroundColor: "#FF83B0",
    /* width must be set to half of props.tapWidth */
  },
});
