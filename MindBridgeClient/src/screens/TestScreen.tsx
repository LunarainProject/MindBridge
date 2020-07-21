import React from "react";
import { StyleSheet, View, Text } from "react-native";

import Counter from "../components/Counter";

export default class TestScreen extends React.Component {
  render() {
    return (
      <View style={styles.main}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <Counter />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
  },
});
