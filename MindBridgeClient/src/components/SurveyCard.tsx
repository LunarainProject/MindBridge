import React from "react";
import {
  StyleSheet,
  View,
  Platform,
  Image,
  NativeSyntheticEvent,
  NativeTouchEvent,
  Text,
} from "react-native";
import { Surface } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import InfoContainer from "./InfoContainer";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default class SurveyCard extends React.Component<Props> {
  render() {
    return (
      <View style={styles.cardContainer}>
        <TouchableWithoutFeedback style={styles.touch} onPress={this.props.OnClick}>
          <View style={styles.dataContainer}>
            <View style={styles.imageAvatar}>
              <Image
                style={styles.image}
                resizeMode="cover"
                source={(typeof this.props.Image == 'string') ? {
                  uri: `${this.props.Image}?date=${new Date()}`,
                } : this.props.Image}
              ></Image>
            </View>
            <View style={styles.textContainer}>
              <View style={styles.titleContainer}>
                <Text allowFontScaling={false} style={{ fontSize: 12 }}>{this.props.Subtitle}</Text>
                <Text allowFontScaling={false} style={{ fontWeight: "bold", fontSize: 22 }}>
                  {this.props.Title}
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <Text allowFontScaling={false} style={{ fontSize: 14, color: "#F970B9" }}>
                  {this.props.ButtonLabel}
                </Text>
                <AntDesign name="right" size={14} color="#F970B9" />
              </View>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <View style={{ width: 90, height: 32 }}>
              <InfoContainer />
            </View>
            <View style={styles.infoText}>
              <Text allowFontScaling={false} style={{ marginLeft: 15, color: "white" }}>
                {this.props.InfoLabel}
              </Text>
            </View>
          </View>

        </TouchableWithoutFeedback>
      </View>
    );
  }
}

type Props = {
  Title: string;
  Subtitle: string;
  ButtonLabel: string;
  InfoLabel: string;
  Image: any;
  OnClick: (arg1: NativeSyntheticEvent<NativeTouchEvent>) => void;
};

const radius = 5;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    borderRadius: radius,
    // borderWidth: 0.5,
    // borderColor: '#F970B9',
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
        elevation: 1,
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


  touch: {
    width: "100%",
    borderRadius: radius,
    overflow: "hidden",
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
    flex: 1,
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
  },
});
