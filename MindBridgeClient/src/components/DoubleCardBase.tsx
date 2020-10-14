import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Surface } from "react-native-paper";

export default class DoubleCardBase extends React.Component {
    render() {
        return(
            <Surface style={styles.main}>
                {this.props.children}
            </Surface>
        );
    }
}

const radius = 5;

const styles = StyleSheet.create({
    main: {
        width: "100%",
        height: 110,
        backgroundColor: "white",
        borderRadius: radius,
        ...Platform.select({
          ios: {
            shadowColor: "#4d4d4d",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 2,
          },
          android: {
            elevation: 2,
          },
        }),
    }
})