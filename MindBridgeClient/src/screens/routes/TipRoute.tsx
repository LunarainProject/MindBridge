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
import TabBackground from "../../components/TabBackground";
import { Paragraph } from "react-native-paper";
import { BackHandleService } from "../../services/BackHandleService";

class TipRoute extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    //this.tabRef.current?.changeFocused(1);
  }

  video = <Video Card={this.props.Card} />;
  column = <Column Card={this.props.Card} />;
  hahim = <Hahim />;

  tabs = [
    { title: "부부행복팁", route: this.video },
    { title: "부부칼럼", route: this.column },
    { title: "독서모임", route: this.hahim },
  ];

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FCDCFA" }}>
        <TabBackground
          tabs={this.tabs}
          tabWidth={100}
          title="행복한 부부팁"
          style={{
            marginLeft: 10
          }}
        >
        </TabBackground>
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
            Image={card.Image}
            InfoLabel=""
            OnClick={() => {
              BackHandleService.Navigate("VideoWeb", undefined, {
                Url: card.InfoLabel,
              })
            }}
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
            Image={card.Image}
            OnClick={() => {
              BackHandleService.Navigate("TipWeb", null, {
                ColumnId: card.Id
              })
            }}
          />
        </View>
        ))}
      </View>
    );
  }
}

class Hahim extends React.Component {
  render() {
    return (
      <View style={ styles.hahim}>
        <Text allowFontScaling={false} style={{ fontSize: 16, fontWeight: "bold" }}>
          하나님을 힘써알자 - 독서모임
        </Text>
        <Text allowFontScaling={false}>
          이렇게 노력하는 남편을 마주하게 되는 저는 알콩달콩 부부학교와 하힘 독서모임을 사랑하게 되었습니다. 아내들은 아내들끼리 남편들은 남편들끼리
          각자의 삶의 나누고 위로하고 공감하고 소통하는 하힘은 ‘나’를 알고
          ‘너’를 알고 나와 너를 넘어서는 ‘우리’로의 스타트였습니다.
        </Text>
        <Text allowFontScaling={false}>
          또한 이 모임이 유지되어야 하는 이유는 지적인 은혜의 삶의 태도로
          살아가도록 연명할 힘이 되어주기 때문입니다. 그래서 한 주가 미뤄지거나
          하면 하힘금단현상이 있기도... 하나님은 특별한 방법이 아닌 평범함
          속에서 아내를 알게 하시고 작은 일상 속에서 아내를 사랑하는 법을 깨닫게
          하셨습니다. 참으로 감사하고 감사한 책읽기 모임입니다.
        </Text>
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

  hahim: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  }
});
