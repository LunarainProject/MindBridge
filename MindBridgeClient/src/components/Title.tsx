import React from "react";
import { View, Text } from "react-native";

export default class Title extends React.Component {
  render() {
    return (
      <View style={{ marginBottom: 10 }}>
        <Text allowFontScaling={false} style={{ fontSize: 22 }}>{this.props.children}</Text>
      </View>
    );
  }
};