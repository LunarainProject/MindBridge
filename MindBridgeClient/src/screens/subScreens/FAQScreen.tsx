import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Button,
    NativeSyntheticEvent,
    NativeTouchEvent, BackHandler, Alert
  } from "react-native";
import StackParamList from "../StackParamList";

export default class FAQScreen extends React.Component<Props> {
    render() {
        return (
            <View style={styles.main}>
                <Text>준비중입니다.</Text>
            </View>
        );
    }
}

type Props = StackScreenProps<StackParamList, "FAQ">

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})