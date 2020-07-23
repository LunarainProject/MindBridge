import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { Surface, Text } from "react-native-paper";
import DoubleCardBase from "./DoubleCardBase";

export default class DoubleCard extends React.Component<Props> {
  render() {
    return (
      <DoubleCardBase>
        <View style={styles.main}>
          <View style={styles.button}>
            <TouchableNativeFeedback onPress={this.props.upperButton.onClick}>
              <View style={styles.textContainer}>
                <Text>{this.props.upperButton.text}</Text>
              </View>
            </TouchableNativeFeedback>
          </View>

          <View style={styles.centerContainer}>
            <View style={styles.divider} />
          </View>
          <View style={styles.button}>
            <TouchableNativeFeedback onPress={this.props.upperButton.onClick}>
              <View style={styles.textContainer}>
                <Text>{this.props.downerButton.text}</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </DoubleCardBase>
    );
  }
}

type Props = {
  upperButton: { text: string; onClick: any };
  downerButton: { text: string; onClick: any };
};

const radius = 10;

const styles = StyleSheet.create({
  textContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    marginLeft: 30,
  },

  button: {
    flex: 1,
  },

  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  divider: {
    width: "90%",
    height: 1,
    backgroundColor: "#CACACA",
  },

  main: {
    flex: 1,
  },
});
