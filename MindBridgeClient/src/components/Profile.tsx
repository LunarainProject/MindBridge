import React from "react";
import { Dimensions, Image, StyleSheet, View, Text } from "react-native";
import {  Button } from "react-native-paper";
import DoubleCardBase from "./DoubleCardBase";
import { AntDesign } from "@expo/vector-icons";

export default class Profile extends React.Component<Props> {
  render() {
    return (
      <DoubleCardBase>
        {this.props.spouseName ? (
          <View style={styles.container}>
            <View style={styles.inner}>
              <View style={styles.myName}>
                <Text
                  allowFontScaling={false} 
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.myNameTextBig}
                >
                  {this.props.myName}
                </Text>
                <Text allowFontScaling={false} style={styles.myNameText}>{this.props.myState}</Text>
              </View>
              <View style={styles.imageAvatar}>
                {this.props.myImage ? (
                  <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{ uri: this.props.myImage }}
                  ></Image>
                ) : (
                  <View
                    style={{ backgroundColor: "lightgrey", flex: 1 }}
                  ></View>
                )}
              </View>
              <View style={styles.heart}>
                <AntDesign name="heart" size={12} color="#F970B9" />
              </View>
              <View style={styles.imageAvatar}>
                {this.props.spouseImage ? (
                  <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{ uri: this.props.spouseImage }}
                  ></Image>
                ) : (
                  <View
                    style={{ backgroundColor: "lightgrey", flex: 1 }}
                  ></View>
                )}
              </View>
              <View style={styles.spouseName}>
                <Text allowFontScaling={false} 
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.spouseNameTextBig}
                >
                  {this.props.spouseName}
                </Text>
                <Text allowFontScaling={false} style={styles.spouseNameText}>
                  {this.props.spouseState}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View>
            <View style={{flexDirection: "row", alignItems: 'center', justifyContent: "center", padding: 20, width: "100%", height: "100%", }}>
              <View style={styles.imageAvatar}>
                {this.props.myImage ? (
                  <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{ uri: this.props.myImage }}
                  ></Image>
                ) : (
                  <View
                    style={{ backgroundColor: "lightgrey", flex: 1 }}
                  ></View>
                )}
              </View>
              <View style={styles.spouseName}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.spouseNameTextBig}
                >
                  {this.props.myName}
                </Text>
                {/* <Text allowFontScaling={false} style={[styles.spouseNameText]}>{this.props.myState}</Text> */}
              </View>
              <Button
                  style={{ backgroundColor: "#F970B9", marginLeft: 10 }}
                  onPress={this.props.onMatch}
                >
                  <Text allowFontScaling={false}>배우자 등록하기</Text>
                </Button>
            </View>
          </View>
        )}
      </DoubleCardBase>
    );
  }
}

type Props = {
  myName: string;
  myState: string;
  myImage: string;
  spouseName: string;
  spouseState: string;
  spouseImage: string;

  onMatch: () => void;
};

const width = Dimensions.get("screen").width;

const stringWidth = (width - 100 - 2 * 70) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  myName: {
    marginRight: 8,
  },

  myNameTextBig: {
    width: stringWidth,
    textAlign: "right",
    fontSize: 14,
    fontWeight: "bold",
  },

  myNameText: {
    textAlign: "right",
    fontSize: 10,
  },

  spouseName: {
    marginLeft: 8,
  },

  spouseNameTextBig: {
    width: stringWidth,
    textAlign: "left",
    fontSize: 14,
    fontWeight: "bold",
  },

  spouseNameText: {
    textAlign: "left",
    fontSize: 10,
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
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },
});
