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
import { LinearGradient } from "expo-linear-gradient";
import RatioImage from "../components/RatioImage";
import { AntDesign } from "@expo/vector-icons";
import InfoContainer from "./InfoContainer";

class Card extends React.Component<Props> {
  render() {
    return (
      <Surface style={styles.cardContainer} onTouchEnd={this.props.OnClick}>
        <View style={styles.imageContainer}>
          <RatioImage
            Ratio={16 / 9}
            Source={require("../drawables/wait.jpg")}
          />
          <View style={styles.imageCoverGrad}>
            <LinearGradient
              colors={[
                "rgba(0, 0, 0, 0)",
                "rgba(0, 0, 0, 0.2)",
                "rgba(0, 0, 0, 0.8)",
              ]}
              style={styles.grad}
            ></LinearGradient>
            <View style={styles.subtitleContainer}>
              <Text style={{ color: "white", fontSize: 16 }}>
                {this.props.Subtitle}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.footerTextContainer}>
            <Text style={{ fontWeight: "bold", fontSize: 24 }}>
              {this.props.Title}
            </Text>
            <Text style={{ fontSize: 14 }}>{this.props.Description}</Text>
          </View>
          <View style={styles.footerButtonLabel}>
            <Text style={{ fontSize: 14, color: "#F970B9" }}>
              {this.props.ButtonLabel}
            </Text>
            <AntDesign name="right" size={14} color="#F970B9" />
          </View>
          {this.props.InfoLabel !== "" && (
            <View style={styles.footerInfoLabel}>
              <View style={{ width: 90, height: 32 }}>
                <InfoContainer />
              </View>
              <View style={styles.infoText}>
                <Caption style={{ marginLeft: 15, color: "white" }}>
                  {this.props.InfoLabel}
                </Caption>
              </View>
            </View>
          )}
        </View>
      </Surface>
    );
  }
}

type Props = {
  Title: string;
  Subtitle: string;
  Description: string;
  ButtonLabel: string;
  InfoLabel: string;
  OnClick: (arg1: NativeSyntheticEvent<NativeTouchEvent>) => void;
};

export default Card;

const radius = 10;

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
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

  imageContainer: {
    position: "relative",
  },

  subtitleContainer: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },

  imageCoverGrad: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  grad: {
    width: "100%",
    height: "100%",
  },

  footerContainer: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: "white",
  },

  footerTextContainer: {
    marginBottom: 15,
  },

  footerButtonLabel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  footerInfoLabel: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },

  infoText: {
    position: "absolute",
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
