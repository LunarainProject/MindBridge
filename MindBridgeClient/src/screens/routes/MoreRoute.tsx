import React from "react";
import {
  StyleSheet,
  View,
  Text,
} from "react-native";

import Tab from "../../components/Tab";

export default class MoreRoute extends React.Component {
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.tabContainer}>
          <Tab tabs={tabs} style={{marginLeft: 20}} tabWidth={100} onChange={()=>{}} />
        </View>
      </View>
    );
  }
}

class MyPage extends React.Component {
  render() {
    return (
      <View style={styles.pageLeftContainer}>
        <Text>마이페이지</Text>
      </View>
    );
  }
}

class Info extends React.Component {
  render() {
    return (
      <View style={styles.pageRightContainer}>
        <Text>알림센터</Text>
      </View>
    );
  }
}

const myPage = <MyPage />;
const info = <Info />;

const tabs = [
  { title: "마이페이지", route: myPage },
  { title: "알림센터", route: info },
];

const radius = 10;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },

  tabContainer: {
    flex: 1,
  },

  pageLeftContainer: {
    marginLeft: 20,
    borderTopLeftRadius: radius,
    borderBottomLeftRadius: radius,
    flex: 1,
    backgroundColor: "whitesmoke",
  },

  pageRightContainer: {
    marginRight: 20,
    borderTopRightRadius: radius,
    borderBottomRightRadius: radius,
    flex: 1,
    backgroundColor: "whitesmoke",
  },
});
