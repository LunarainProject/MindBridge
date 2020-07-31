import React, { createRef } from "react";
import {
  TouchableNativeFeedback,
  StyleSheet,
  View,
  Easing,
  Animated,
  Dimensions,
} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { Title, Text } from "react-native-paper";
import { PanGestureHandler, ScrollView } from "react-native-gesture-handler";

export default class Tab extends React.Component<Props> {
  state = {
    focused: 0,
    Pos: new Animated.Value(0),
  };

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
    this.props.onChange(index);
    Animated.timing(this.state.Pos, {
      toValue: index,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }

  public ref = createRef();

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.main}>
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
            style={[styles.centerContainer, { width: this.props.tabWidth }]}
          >
            <View style={[styles.tabBar, { width: this.props.tabWidth / 2 }]} />
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
              <View>
                <View
                  style={[
                    styles.centerContainer,
                    { width: this.props.tabWidth },
                  ]}
                >
                  <Title
                    style={[
                      styles.tabText,
                      this.state.focused == ind
                        ? styles.focusedText
                        : styles.blurredText,
                    ]}
                  >
                    {val.title}
                  </Title>
                </View>
              </View>
            </TouchableNativeFeedback>
          ))}
        </View>

        <GestureRecognizer
          onSwipeRight={this.onSwipeRight}
          onSwipeLeft={this.onSwipeLeft}
          config={{
            velocityThreshold: 0.02,
            directionalOffsetThreshold: 80,
            gestureIsClickThreshold: 60,
          }}
          style={{ flex: 1, backgroundColor: "#FFFFFF"}}
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
                      outputRange: [0, -Dimensions.get("screen").width * (this.props.tabs.length - 1)],
                    }),
                  },
                ],
              },
            ]}
          >
            {this.props.tabs.map((val: TabType, ind) => (
              <View style={{ width: Dimensions.get("screen").width }} key={ind}>
                {val.route}
              </View>
            ))}
          </Animated.View>
        </GestureRecognizer>
      </View>
    );
  }
}

type TabType = { title: string; route: any };

type Props = {
  tabs: TabType[];
  tabWidth: number;
  style: any;
  onChange: (arg0: number) => void;
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
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
  },

  tabBar: {
    height: 2,
    backgroundColor: "#FF83B0",
    /* width must be set to half of props.tapWidth */
  },
});
