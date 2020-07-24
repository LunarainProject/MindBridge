import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import DoubleCardBase from "./DoubleCardBase";
import { AntDesign } from "@expo/vector-icons";

export default class Profile extends React.Component<Props> {
  render() {
    return (
      <DoubleCardBase>
        <View style={styles.container}>
          <View style={styles.inner}>
            <View style={styles.myName}>
    <Text style={styles.myNameTextBig}>{this.props.myName}</Text>
              <Text style={styles.myNameText}>{this.props.myState}</Text>
            </View>
          <View style={styles.imageAvatar}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={require("../drawables/wait_normal.png")}
            ></Image>
          </View>
          <View style={styles.heart}>
            <AntDesign name="heart" size={12} color="#F970B9" />
          </View>
          <View style={styles.imageAvatar}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={require("../drawables/wait_normal.png")}
            ></Image>
            
          </View>
          <View style={styles.spouseName}>
              <Text style={styles.spouseNameTextBig}>{this.props.spouseName}</Text>
              <Text style={styles.spouseNameText}>{this.props.spouseState}</Text>
            </View>
          </View>
        </View>
      </DoubleCardBase>
    );
  }
}

type Props = {
  myName: string,
  myState: string,
  spouseName: string,
  spouseState: string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  myName: {
    marginRight: 8,
  },

  myNameTextBig: {
    textAlign: "right", fontSize: 14, fontWeight: "bold",
  },
  
  myNameText: {
    textAlign: "right", fontSize: 10,
  },

  spouseName: {
    marginLeft: 8,
  },

  spouseNameTextBig: {
    textAlign: "left", fontSize: 14, fontWeight: "bold",
  },
  
  spouseNameText: {
    textAlign: "left", fontSize: 10,
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
