import React from "react";
import { StyleSheet, View } from "react-native";
import BackgroundBase from "./BackgroundBase";

export default class Background extends React.Component<Props> {
  render() {
    return (
      <View style={styles.main}>
        <BackgroundBase {...this.props}>
          {this.props.children}
        </BackgroundBase>
      </View>
    );
  }
}

type Props = {
  Title: string;
  ChildMargin: boolean;
};

const styles = StyleSheet.create({

  main: {
    flex: 1,
    backgroundColor: "whitesmoke",
  },
});
