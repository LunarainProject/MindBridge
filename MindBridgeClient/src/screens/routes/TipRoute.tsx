import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import Card from "../../components/Card";
import Tab from "../../components/Tab";
import Title from "../../components/Title";
import { CardState, CardType } from "../../StateTypes";
import StackParamList from "../StackParamList";

class TipRoute extends React.Component<Props> {
  private OnClickTestHandler: (
    arg1: NativeSyntheticEvent<NativeTouchEvent>
  ) => void;

  constructor(props: any) {
    super(props);

    this.OnClickTestHandler = (
      e: NativeSyntheticEvent<NativeTouchEvent>
    ): void => {
      props.navigation.navigate("Test");
      return;
    };
  }

  video = <Video Card={this.props.Card}/>;
  column = <Column Card={this.props.Card}/>;

  tabs = [
    { title: "부부가행복하게사는법", route: this.video },
    { title: "행복한부부칼럼", route: this.column },
  ];

  render() {
    return (
      <View style={styles.main}>
        <Tab
          tabs={this.tabs}
          style={{marginLeft: 20, marginRight: 20}}
          tabWidth={(Dimensions.get("screen").width - 40) / 2}
          onChange={() => {}}
        ></Tab>
      </View>
    );
  }
}

class Video extends React.Component<SubProps> {
  render() {
    return (
      <View style={[styles.background, styles.paddingContainer]}>
        <Title>{this.props.Card.TipVideoCategory.Title}</Title>
        {this.props.Card.TipVideoCategory.Cards.map((card: CardType, ind) => (
          <View style={styles.cardMargin} key={ind}>
          <Card
            Title={card.Title}
            Subtitle={card.Subtitle}
            Description={card.Description}
            ButtonLabel={card.ButtonLabel}
            InfoLabel=""
            OnClick={() => {}}
          />
        </View>
        ))}
      </View>
    );
  }
}

class Column extends React.Component<SubProps> {
  render() {
    return (
      <View style={[styles.background, styles.paddingContainer]}>
        <Title>{this.props.Card.TipCategory.Title}</Title>
        {this.props.Card.TipCategory.Cards.map((card: CardType, ind) => (
          <View style={styles.cardMargin} key={ind}>
          <Card
            Title={card.Title}
            Subtitle={card.Subtitle}
            Description={card.Description}
            ButtonLabel={card.ButtonLabel}
            InfoLabel=""
            OnClick={() => {}}
          />
        </View>
        ))}
      </View>
    );
  }
}

type Props = StackScreenProps<StackParamList, "Main"> & SubProps;

type SubProps = {
  Card: CardState,
}

function mapStateToProps(state: any) {
  return {
    Card: state.Card,
  };
};

function mapDispatchToProps(dispatch: Function) {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TipRoute);

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },

  background: {
    flex: 1,
    backgroundColor: "white",
    marginLeft: 20,
    marginRight: 20,
  },
  cardMargin: {
    width: "100%",
    marginBottom: 20,
  },

  paddingContainer: {
    paddingTop: 20,
    paddingBottom: 50,
  },
});
