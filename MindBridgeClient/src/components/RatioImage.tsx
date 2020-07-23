import React from "react";
import { StyleSheet, View, Image } from "react-native";

export default class Card extends React.Component<Props> {
    render() {
        return (
            <View style={styles.relativeContainer}>
                <View style={[styles.padder, { marginTop: (100 / this.props.Ratio) + "%"}]} />
                <View style={styles.absoluteContainer}>
                    <Image
                        style={styles.image}
                        source={this.props.Source}
                    />
                </View>
            </View>
        )
    }
}

type Props = {
    Ratio: number,
    Source: any,
}

const styles = StyleSheet.create({

    relativeContainer: {
        position: "relative",
    },

    padder : {
        width: "100%",
    },

    absoluteContainer: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },

    image: {
        width: "100%",
        height: "100%",
    },
})