import React from "react";
import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Text,
} from "react-native";
import { Headline, Surface } from "react-native-paper";

export default class BackgroundBase extends React.Component<Props> {
  render() {
    return (
      <Surface style={styles.screen}>
        <View style={styles.screenPadder}>
        <Headline style={styles.headlineTitle}>
                  {this.props.Title || "제목"}
                </Headline>
        </View>
        
        <View style={[styles.children, this.props.ChildMargin && styles.childMargin]}>
          {this.props.children}
        </View>
      </Surface>
    );
  }
}

type Props = {
  Title: string;
  ChildMargin: boolean;
};

const radius = 42;

const styles = StyleSheet.create({
  headlineTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },

  children: {
    flex: 1,
    marginTop: 20,
  },

  screenPadder: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 40,
  },

  childMargin: {
    marginLeft: 20,
    marginRight: 20,
  },

  screen: {
    flex: 1,
    borderTopLeftRadius: radius,
    backgroundColor: "white",
    
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
