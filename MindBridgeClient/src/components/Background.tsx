import React from "react";
import { Platform, StyleSheet, View, ScrollView, Dimensions } from "react-native";
import { Headline, Surface } from "react-native-paper";

export default class Background extends React.Component<Props> {
  render() {
    return (
      <ScrollView style={styles.main}>
        <Surface style={styles.screen}>
            <Headline style={styles.headlineTitle}>
            {this.props.Title || "제목"}
          </Headline>
          <View style={styles.children}>{this.props.children}</View>
        </Surface>
      </ScrollView>
    );
  }
}

type Props = {
  Title: string;
};

const radius = 60;

const styles = StyleSheet.create({

  main: {
    width: "100%",
    backgroundColor: "whitesmoke",
  },

  headlineTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },

  children: {
    marginTop: 20,
  },

  screen: {
    flex: 1,
    borderTopLeftRadius: radius,
    backgroundColor: "white",
    paddingLeft: 20,
    paddingRight: 20,
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
