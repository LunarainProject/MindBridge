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
        <BackgroundBase {...this.props}></BackgroundBase>
      </View>
    );
  }
}

type Props = {
  Title: string;
};

const styles = StyleSheet.create({
  heading: {
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
