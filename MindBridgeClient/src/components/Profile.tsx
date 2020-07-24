import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import DoubleCardBase from "./DoubleCardBase";
import { AntDesign } from "@expo/vector-icons";

export default class Profile extends React.Component {
  render() {
    return (
      <DoubleCardBase>
        <View style={styles.container}>
          <View style={styles.inner}>
          <View style={styles.imageAvatar}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={require("../drawables/wait.jpg")}
            ></Image>
          </View>
          <View style={styles.heart}>
            <AntDesign name="heart" size={12} color="#F970B9" />
          </View>
          <View style={styles.imageAvatar}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={require("../drawables/wait.jpg")}
            ></Image>
          </View>
          </View>
        </View>
      </DoubleCardBase>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  inner: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  heart: {
    marginLeft: 8,
    marginRight: 8,
  },

  imageAvatar: {
    width: 75,
    height: 75,
    borderRadius: 45,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },
});
