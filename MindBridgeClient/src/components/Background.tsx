import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Headline, Surface } from "react-native-paper";

export default class Background extends React.Component<Props> {
  render() {
    return (
      <View style={styles.main}>
        <View />
        <Surface style={styles.screen}>
          <Headline style={styles.headlineTitle}>
            {this.props.Title || "제목"}
          </Headline>
          <View style={styles.children}>{this.props.children}</View>
        </Surface>
      </View>
    );
  }
}

type Props = {
  Title: string;
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "whitesmoke",
  },

  headlineTitle: {
    fontSize: 50,
    fontWeight: "bold",
  },

  children: {
    marginTop: 20,
  },

  screen: {
    flex: 1,
    borderTopLeftRadius: 60,
    backgroundColor: "white",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 40,
    ...Platform.select({
      ios: {
        shadowColor: "#4d4d4d",
        shadowOffset: {
          width: -1,
          height: -1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
      web: {
        shadowColor: "#4d4d4d",
        shadowOffset: {
          width: -1,
          height: -1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
    }),
  },
});
