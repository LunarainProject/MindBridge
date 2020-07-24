import React from "react";
import { StyleSheet, View, Text } from "react-native";
import DoubleCard from "../../components/DoubleCard";
import Profile from "../../components/Profile";

import Tab from "../../components/Tab";

export default class MoreRoute extends React.Component {
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.tabContainer}>
          <Tab
            tabs={tabs}
            style={{ marginLeft: 20 }}
            tabWidth={100}
            onChange={() => {}}
          />
        </View>
      </View>
    );
  }
}

class MyPage extends React.Component {
  render() {
    return (
      <View style={styles.pageLeftContainer}>
        <View style={styles.cardMargin}>
          <Profile/>
        </View>
        {[1, 2, 3].map((val) => (
        <View style={styles.cardMargin} key={val}>
          <DoubleCard
            upperButton={{ text: "위 버튼", onClick: () => {} }}
            downerButton={{ text: "아래 버튼", onClick: () => {} }}
          />
        </View>
        ))}
      </View>
    );
  }
}

class Info extends React.Component {
  render() {
    return (
      <View style={styles.pageRightContainer}>
        {[1, 2, 3, 4].map((val) => (
        <View style={styles.cardMargin} key={val}>
          <DoubleCard
            upperButton={{ text: "위 버튼", onClick: () => {} }}
            downerButton={{ text: "아래 버튼", onClick: () => {} }}
          />
        </View>
        ))}
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

  cardMargin: {
    marginBottom: 15,
  },

  pageLeftContainer: {
    padding: 10,
    marginLeft: 20,
    marginBottom: 10,
    borderTopLeftRadius: radius,
    borderBottomLeftRadius: radius,
    flex: 1,
    backgroundColor: "whitesmoke",
  },

  pageRightContainer: {
    padding: 10,
    marginRight: 20,
    marginBottom: 10,
    borderTopRightRadius: radius,
    borderBottomRightRadius: radius,
    flex: 1,
    backgroundColor: "whitesmoke",
  },
});
