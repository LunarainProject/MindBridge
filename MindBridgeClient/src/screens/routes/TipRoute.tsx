import { StackScreenProps } from "@react-navigation/stack";
import React, { createRef, RefObject } from "react";
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
import Constants from "expo-constants";
import { ScrollView } from "react-native-gesture-handler";
import Background from "../../components/Background";

class TipRoute extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      show: 0,
    }
  }

  componentDidMount() {
    //this.tabRef.current?.changeFocused(1);
  }

  private tabRef: RefObject<Tab> = createRef();

  video = <Video Card={this.props.Card}/>;
  column = <Column Card={this.props.Card}/>;

  routes: any[] = [this.video, this.column];

  tabs = [
    { title: "부부가행복하게사는법", route: <View/> },
    { title: "행복한부부칼럼", route: <View/> },
  ];

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FCDCFA" }}>
      <View style={styles.statusBar}></View>
      <ScrollView stickyHeaderIndices={[1]}>
        <Background Title="부부팁"></Background>
        <View
          style={[
            { marginTop: -5, backgroundColor: "white", paddingTop: 5 },
          ]}
        >
          <Tab 
          ref={this.tabRef}
          tabs={this.tabs}
          style={{marginLeft: 20, marginRight: 20}}
          tabWidth={(Dimensions.get("screen").width - 40) / 2}
          onChange={(ind) => {this.setState({show: ind});}}
        ></Tab>
        </View>
        {this.routes[this.state.show]}
      </ScrollView>
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
type State = {
  show: number,
}

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

  statusBar: {
    backgroundColor: "#FCDCFA",
    width: "100%",
    height: Constants.statusBarHeight,
  },

  background: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: 20,
    paddingRight: 20,
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
