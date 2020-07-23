import React from "react";
import {
  StyleSheet,
  View,
  Platform,
  Image,
  NativeSyntheticEvent,
  NativeTouchEvent,
} from "react-native";
import { Text, Caption, Surface } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

export default class SurveyCard extends React.Component<Props> {
  render() {
    return (
      <Surface style={styles.cardContainer} onTouchEnd={this.props.OnClick}>
        <View style={styles.dataContainer}>
            <View style={styles.imageAvatar}>
                <Image 
                    style={styles.image}
                    resizeMode="cover"
                    source={require('../drawables/wait.jpg')}
                >
                </Image>
            </View>  
            <View style={styles.textContainer}>
                <View style={styles.titleContainer}>
                    <Text style={{ fontSize: 14 }}>
                        {this.props.Subtitle}
                    </Text>
                    <Text style={{ fontWeight: "bold", fontSize: 23 }}>
                        {this.props.Title}
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Text style={{ fontSize: 14, color: "#F970B9" }}>
                        {this.props.ButtonLabel}
                    </Text>
                    <AntDesign name="right" size={14} color="#F970B9" />
                </View>
            </View>
        </View>
        <View style={styles.infoContainer}>
              <Image
                style={{ width: 110, height: 32 }}
                resizeMode="stretch"
                source={require("../drawables/info.png")}
              ></Image>
              <View style={styles.infoText}>
                <Caption style={{ marginLeft: 15, color: "white" }}>
                  {this.props.InfoLabel}
                </Caption>
              </View>
            </View>
      </Surface>
    );
  }
}

type Props = {
  Title: string;
  Subtitle: string;
  ButtonLabel: string;
  InfoLabel: string;
  OnClick: (arg1: NativeSyntheticEvent<NativeTouchEvent>) => void;
};

const radius = 10;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    borderRadius: radius,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#4d4d4d",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        shadowColor: "#4d4d4d",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
    }),
  },

  dataContainer: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  imageAvatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  textContainer: {
    display: "flex",
    marginLeft: 20,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  titleContainer: {
    marginBottom: 14,
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  infoContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },

  infoText: {
    width: "100%",
    height: "100%",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
});
