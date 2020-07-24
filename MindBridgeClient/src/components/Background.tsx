import React from "react";
import { StyleSheet, View } from "react-native";
import BackgroundBase from "./BackgroundBase";
import LogoTitle from "./LogoTitle";
import Constants from 'expo-constants';

export default class Background extends React.Component<Props> {
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.heading}>
          <View style={styles.headingInner}>
            <LogoTitle />
          </View>
        </View>
        <BackgroundBase {...this.props}>{this.props.children}</BackgroundBase>
      </View>
    );
  }
}

type Props = {
  Title: string;
  ChildMargin: boolean;
};

const styles = StyleSheet.create({
  heading: {
    height: 80,
    paddingTop: Constants.statusBarHeight,
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
