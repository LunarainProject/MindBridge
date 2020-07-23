import React from "react";
import { StyleSheet, View, Text, Button, NativeSyntheticEvent, NativeTouchEvent } from "react-native";
import { StackScreenProps } from '@react-navigation/stack';
import StackParamList from './StackParamList';

import Counter from "../components/Counter";

export default class SurveyWebScreen extends React.Component<Props> {

    private OnClickTestHandler: (arg1: NativeSyntheticEvent<NativeTouchEvent>) => void;

    constructor(props: Props) {
        super(props);

        this.OnClickTestHandler = (e: NativeSyntheticEvent<NativeTouchEvent>): void => {
            props.navigation.navigate('Test');
            return;
        }
    }

  render() {
    return (
      <View style={styles.main}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <Button title="Test Screen" onPress={this.OnClickTestHandler} />
        <Counter />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
  },
});

type Props = StackScreenProps<StackParamList, 'SurveyWeb'>;