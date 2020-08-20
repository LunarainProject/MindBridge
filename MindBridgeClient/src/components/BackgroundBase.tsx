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
import Title from "./Title";


export default class BackgroundBase extends React.Component<Props> {
  render() {
    return (
      <Surface style={styles.screen}>
        <View style={styles.screenPadder}>
        {this.props.Title ? (
          <Title>
            {this.props.Title}
          </Title>
          ): <View/>
        }
        </View>
        
        <View style={[styles.children]}>
          {this.props.children}
        </View>
      </Surface>
    );
  }
}

type Props = {
  Title: string;
};

const radius = 42;

const styles = StyleSheet.create({
  headlineTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },

  children: {
    flex: 1,
    marginTop: 15,
  },

  screenPadder: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 40,
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
