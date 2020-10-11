import React from "react";
import {
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { Surface } from "react-native-paper";
import DoubleCardBase from "./DoubleCardBase";

export default class DoubleCard extends React.Component<Props> {
  render() {
    return (
      <DoubleCardBase>
        <View style={styles.main}>
          <View style={styles.button}>
            <TouchableNativeFeedback
              onPress={this.props.upperButton.onClick}
              background={TouchableNativeFeedback.Ripple(
                "rgba(0, 0, 0, 0.08)",
                false
              )}
            >
              <View style={styles.textContainer}>
                <Text allowFontScaling={false} >{this.props.upperButton.text}</Text>
              </View>
            </TouchableNativeFeedback>
          </View>

          <View style={styles.centerContainer}>
            <View style={styles.divider} />
          </View>
          <View style={styles.button}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple(
                "rgba(0, 0, 0, 0.08)",
                false
              )}
              onPress={this.props.downerButton.onClick}
            >
              <View style={styles.textContainer}>
                <Text allowFontScaling={false} >{this.props.downerButton.text}</Text>
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

const radius = 5;

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 30,
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
