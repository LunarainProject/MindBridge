import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent,
} from "react-native";
import SurveyCard from "../../components/SurveyCard";

export default class SurveyRoute extends React.Component {
  private OnClickHandler: (
    arg1: NativeSyntheticEvent<NativeTouchEvent>
  ) => void;

  constructor(props: any) {
    super(props);

    this.OnClickHandler = (
      e: NativeSyntheticEvent<NativeTouchEvent>
    ): void => {
      //alert("hello");
      return;
    };
  }

  render() {
    return (
      <View style={styles.main}>
        {[1, 2, 3, 4].map((val) => (
          <View style={styles.cardMargin} key={val}>
            <SurveyCard
              Title="배고파"
              Subtitle="왜 배고픈 걸까?"
              ButtonLabel="버튼"
              InfoLabel="돼지"
              OnClick={this.OnClickHandler}
            />
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
  },

  cardMargin: {
    width: "100%",
    marginBottom: 20,
  },
});
