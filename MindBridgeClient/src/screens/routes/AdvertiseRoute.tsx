import React from "react";
import {
  StyleSheet,
  View,
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent,
} from "react-native";

import { Paragraph, Text } from "react-native-paper";

import Tab from "../../components/Tab";

export default class AdvertiseRoute extends React.Component {
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

  render() {
    return (
      <View style={styles.main}>
        <Tab tabs={tabs} style={{}} tabWidth={70} onChange={() => {}} />
      </View>
    );
  }
}

class Introduction extends React.Component {
  render() {
    return (
      <View style={styles.background}>
        <Paragraph>
          알콜달콩부부학교는 두란노 어머니학교와 아버지학교에서 운영하는
          부부학교입니다.
        </Paragraph>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          “부부가 바로 서야 가정이 바로 선다”
        </Text>
        <Paragraph>
          사회를 구성하는 가장 기초적인 단위는 가정이고 건강한 가정이 있어야
          건강한 사회가 이룩될 수 있습니다.
        </Paragraph>

        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          알콩달콩 부부학교에 오시면?
        </Text>
        <Paragraph>▶ 남녀 간의 차이에 대해 이해할 수 있습니다.</Paragraph>
        <Paragraph>
          ▶ 남편과 아내가 하나 되어 행복한 가정을 만들 수 있습니다.
        </Paragraph>
        <Paragraph>▶ 자녀들을 건강하고 행복하게 양육할 수 있습니다.</Paragraph>
        <Paragraph>
          ▶ 건강한 가정이 건강한 사회의 밑거름임을 인식하고 그에 기여할 수
          있습니다.
        </Paragraph>
      </View>
    );
  }
}

class Itinerary extends React.Component {
  render() {
    return (
      <View style={styles.background}>
        <Text>Itinerary</Text>
      </View>
    );
  }
}

class Donate extends React.Component {
  render() {
    return (
      <View style={styles.background}>
        <Text>Donate</Text>
      </View>
    );
  }
}

class Hahim extends React.Component {
  render() {
    return (
      <View style={styles.background}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          하나님을 힘써알자 - 독서모임
        </Text>
        <Paragraph>
          이렇게 노력하는 남편을 마주하게 되는 저는 알콩달콩 부부학교와 하힘책
          책모임을 사랑하게 되었습니다. 아내들은 아내들끼리 남편들은 남편들끼리
          각자의 삶의 나누고 위로하고 공감하고 소통하는 하힘은 ‘나’를 알고
          ‘너’를 알고 나와 너를 넘어서는 ‘우리’로의 스타트였습니다.
        </Paragraph>
        <Paragraph>
          또한 이 모임이 유지되어야 하는 이유는 지적인 은혜의 삶의 태도로
          살아가도록 연명할 힘이 되어주기 때문입니다. 그래서 한 주가 미뤄지거나
          하면 하힘금단현상이 있기도... 하나님은 특별한 방법이 아닌 평범함
          속에서 아내를 알게 하시고 작은 일상 속에서 아내를 사랑하는 법을 깨닫게
          하셨습니다. 참으로 감사하고 감사한 책읽기 모임입니다.
        </Paragraph>
      </View>
    );
  }
}

const myPage = <Introduction />;
const itinerary = <Itinerary />;
const donate = <Donate />;
const hahim = <Hahim />;

const tabs = [
  { title: "소개", route: myPage },
  { title: "일정", route: itinerary },
  { title: "후원", route: donate },
  { title: "하힘", route: hahim },
];

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },

  background: {
    flex: 1,
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
});
