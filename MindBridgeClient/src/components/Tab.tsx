import React from "react";
import { TouchableNativeFeedback, StyleSheet, View } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { Title, Text } from "react-native-paper";

export default class Tab extends React.Component<Props> {
  state = {
    focused: 0,
  };

  private onSwipeLeft = () => {
    if (this.state.focused < this.props.tabs.length - 1) {
      this.setState({ focused: this.state.focused + 1 });
    }
  };

  private onSwipeRight = () => {
    if (this.state.focused > 0) {
      this.setState({ focused: this.state.focused - 1 });
    }
  };

  render() {
    const RenderComp = this.props.tabs[this.state.focused].route;

    return (
      <View style={styles.main}>
        <View style={[styles.tabContainer, this.props.style]}>
          {this.props.tabs.map((val, ind) => (
            <TouchableNativeFeedback
              key={ind}
              onPress={(e) => {
                this.setState({ focused: ind });
                this.props.onChange(this.state.focused);
              }}
              background={TouchableNativeFeedback.Ripple(
                "rgba(0, 0, 0, 0.3)",
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
                <View
                  style={[
                    styles.centerContainer,
                    { width: this.props.tabWidth },
                  ]}
                  key={ind}
                >
                  {this.state.focused === ind && (
                    <View
                      style={[
                        styles.tabBar,
                        { width: this.props.tabWidth / 2 },
                      ]}
                    />
                  )}
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
            gestureIsClickThreshold: 50,
          }}
          style={{
            flex: 1,
          }}
        >
          {RenderComp}
        </GestureRecognizer>
      </View>
    );
  }
}

type Props = {
  tabs: { title: string; route: any }[];
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
    /* width must be set to props.tapWidth */
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

  tabBar: {
    height: 2,
    backgroundColor: "#FF83B0",
    /* width must be set to half of props.tapWidth */
  },
});
