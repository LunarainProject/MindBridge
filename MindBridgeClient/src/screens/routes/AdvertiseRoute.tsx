import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent,
} from "react-native";

import Counter from "../../components/Counter";

export default class AdvertiseRoute extends React.Component {
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
