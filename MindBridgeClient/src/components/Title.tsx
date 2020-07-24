import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default class Title extends React.Component {
  render() {
    return (
      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 22 }}>{this.props.children}</Text>
      </View>
    );
  }
};