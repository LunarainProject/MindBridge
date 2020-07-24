import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import BackgroundBase from "./BackgroundBase";
import LogoTitle from "./LogoTitle";
import Constants from "expo-constants";

export default class ScrollBackground extends React.Component<Props> {
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.statusBar}></View>
        <View style={styles.headingAbsolute}>
          <View style={styles.headingInner}>
            <LogoTitle />
          </View>
        </View>
        <ScrollView>
        <View style={styles.headdingPadder} />
          <BackgroundBase {...this.props}>{this.props.children}</BackgroundBase>
        </ScrollView>
      </View>
    );
  }
}

type Props = {
  Title: string;
  ChildMargin: boolean;
};

const styles = StyleSheet.create({

  statusBar : {
    width: "100%",
    height: Constants.statusBarHeight,
  },

  headingAbsolute: {
    width: "100%",
    height: 80,
    paddingTop: Constants.statusBarHeight,
    position: "absolute",
  },

  headdingPadder: {
    width: "100%",
    height: 80 - Constants.statusBarHeight,
  },

  headingInner: {
    flex: 1,
    justifyContent: "center",
  },
  main: {
    flex: 1,
    backgroundColor: "#FCDCFA",
  },
});
