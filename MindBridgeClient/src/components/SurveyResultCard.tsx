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

function date(date: Date): string {
  return date.getFullYear() + '. ' + (date.getMonth() + 1) + '. ' + date.getDay() +'. ';
}

export default class SurveyResultCard extends React.Component<Props> {
  render() {
    return (
      <Surface style={styles.cardContainer} onTouchEnd={(this.props.OnClick as any)}>
        <View style={styles.dataContainer}>
          <View style={styles.imageAvatar}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{uri: this.props.image}}
            ></Image>
          </View>
          <View style={styles.textContainer}>
            <View style={styles.titleContainer}>
              <Text allowFontScaling={false} style={{ fontSize: 12 }}>{date(this.props.Date)}</Text>
              <Text allowFontScaling={false} style={{ fontWeight: "bold", fontSize: 22 }}>
                {this.props.Title}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <Text allowFontScaling={false} style={{ fontSize: 14, color: "#F970B9" }}>
                결과보기
              </Text>
              <AntDesign name="right" size={14} color="#F970B9" />
            </View>
          </View>
        </View>
      </Surface>
    );
  }
}

type Props = {
  Title: string;
  Date: Date;
  OnClick: Function;
  image: string;
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
  },
});
