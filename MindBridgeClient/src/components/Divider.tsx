import React from "react";
import { StyleSheet, View } from "react-native";
import RatioImage from "./RatioImage";

export default class Divider extends React.Component {
  render() {
    return (
      <View style={styles.dividerMargin}>
        <RatioImage
          Ratio={13.33}
          Source={require("../drawables/divider.png")}
        ></RatioImage>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dividerMargin: {
    marginTop: 10,
    width: "100%",
    marginBottom: 30,
  },
});
