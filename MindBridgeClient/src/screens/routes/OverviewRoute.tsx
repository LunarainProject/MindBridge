import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent,
  Alert,
} from "react-native";
import Constants from "expo-constants";
import { ScrollView } from "react-native-gesture-handler";
import { Paragraph } from "react-native-paper";
import { connect } from "react-redux";
import Background from "../../components/Background";
import Card from "../../components/Card";
import Divider from "../../components/Divider";
import Title from "../../components/Title";
import { CardState, CardType, LoginState } from "../../StateTypes";
import StackParamList from "../StackParamList";
import { BackHandleService } from "../../services/BackHandleService";
import RatioImage from "../../components/RatioImage";
import * as WebBrowser from 'expo-web-browser';

class OverviewRoute extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FCDCFA" }}>
        <View style={styles.statusBar}></View>
        <ScrollView>
          <Background Title="안녕하세요!">
          <View style={styles.main}>
              <View>
                <Text allowFontScaling={false}>
                  알콩달콩 관계성테스트와 부부학교 콘텐츠는 부부나 연인이 서로의 상태를 점검하고 분석하여, 보다 나은 관계를 형성하고 행복한 가정을 세우는데 도움을 주는 서비스입니다.
                </Text>
                <Text allowFontScaling={false}>
                  부부나 연인의 행동유형, 대화, 재정, 성, 친밀도, 존경, 사랑 테스트 등을 통해 서로의 상태를 점검하고 분석하여, 새로운 실천계획을 세우며, 다양한 알콩달콩 부부학교 콘텐츠를 통해 행복한 가정과 부부관계를 형성하는데 활용할 수 있습니다.
                </Text>
              </View>

              <Divider />
              
              <Title>{this.props.Card.OverviewSurveyCategory.Title}</Title>
              {this.props.Card.OverviewSurveyCategory.Cards.map(
                (val: CardType, ind) => (
                  <View style={styles.cardMargin} key={ind}>
                    <Card
                      Title={val.Title}
                      Subtitle={val.Subtitle}
                      Description={val.Description}
                      ButtonLabel={val.ButtonLabel}
                      Image={val.Image}
                      InfoLabel={val.InfoLabel}
                      OnClick={() => {
                        // 부부 유형 테스트
                        if(ind == 0) {
                          if(this.props.Login.loggedIn) {
                            BackHandleService.Navigate("SurveyWeb", null, {SurveyId: val.Id});
                          } else {
                            Alert.alert(
                              "알콩달콩",
                              "로그인 후 사용하실 수 있습니다. 둘러보기를 그만두고 로그인하시겠습니까?",
                              [
                                {
                                  text: "취소",
                                  onPress: () => { },
                                  style: "cancel",
                                },
                                {
                                  text: "확인",
                                  onPress: () => {
                                    BackHandleService.MainGoBack();
                                  },
                                },
                              ],
                              { cancelable: false }
                            );
                          }
                        }
                        // 부부 관계성 테스트 모음
                        else if(ind == 1) {
                          // SurveyRoute로 이동
                          this.props.setIndex(1);
                        }
                      }}
                    />
                  </View>
                )
              )}
              <Divider />
              <Title>{this.props.Card.OverviewVideoCategory.Title}</Title>
              {this.props.Card.OverviewVideoCategory.Cards?.map(
                (val: CardType, ind) => (
                  <View style={styles.cardMargin} key={ind}>
                    <Card
                      Title={val.Title}
                      Subtitle={val.Subtitle}
                      Description={val.Description}
                      ButtonLabel={val.ButtonLabel}
                      Image={val.Image}
                      InfoLabel=""
                      OnClick={() => {
                        BackHandleService.Navigate("VideoWeb", null, {
                          Url: val.InfoLabel
                        });
                      }}
                    />
                  </View>
                )
              )}
              <Divider />
              {/* <Title>{this.props.Card.OverviewColumnCategory.Title}</Title>
              {this.props.Card.OverviewColumnCategory.Cards?.map(
                (val: CardType, ind) => (
                  <View style={styles.cardMargin} key={ind}>
                    <Card
                      Title={val.Title}
                      Subtitle={val.Subtitle}
                      Description={val.Description}
                      ButtonLabel={val.ButtonLabel}
                      Image={val.Image}
                      InfoLabel=""
                      OnClick={() => {
                        BackHandleService.Navigate("TipWeb", null, {
                          ColumnId: val.Id,
                        })
                      }}
                    />
                  </View>
                )
              )}
              <Divider /> */}
              <Title>알콩달콩 부부학교</Title>
              <RatioImage Ratio={16/9} Source={require('../../drawables/advertise.png')}></RatioImage>        
              <View style={styles.advertiseText}>
                <Text allowFontScaling={false} style={{ fontSize: 16, fontWeight: "bold", marginTop: 10, }}>
                  “부부가 바로 서야 가정이 바로 선다”
                </Text>
                <Text allowFontScaling={false}>
                  사회를 구성하는 가장 기초적인 단위는 가정이고 건강한 가정이
                  있어야 건강한 사회가 이룩될 수 있습니다.
                </Text>
                <Text allowFontScaling={false}>
                  알콜달콩부부학교는 두란노 어머니학교와 아버지학교에서 운영하는
                  부부학교입니다.
                </Text>
              </View>
            </View>
          </Background>
        </ScrollView>
      </View>
    );
  }
}

type Props = StackScreenProps<StackParamList, "Main"> & {
  Card: CardState;
  Login: LoginState;
  setIndex: (index: number) => void;
};

function mapStateToProps(state: any) {
  return {
    Card: state.Card,
    Login: state.Login,
  };
}

function mapDispatchToProps(dispatch: Function) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(OverviewRoute);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
    marginLeft: 20, marginRight: 20,
  },

  cardMargin: {
    width: "100%",
    marginBottom: 20,
  },

  advertiseText: {
    marginBottom: 50,
  },

  statusBar: {
    backgroundColor: "#FCDCFA",
    width: "100%",
    height: Constants.statusBarHeight,
  },
});
