import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import BackgroundBase from "./BackgroundBase";

export default class ScrollBackground extends React.Component<Props> {
  render() {
    return (
      <ScrollView style={styles.main}>
        <BackgroundBase {...this.props}>
          {this.props.children}
        </BackgroundBase>
      </ScrollView>
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
