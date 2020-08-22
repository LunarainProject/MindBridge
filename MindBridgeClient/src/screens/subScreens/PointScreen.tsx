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

export default class PointScreen extends React.Component<Props> {
    render() {
        return (
            <View style={styles.main}>
                <Text allowFontScaling={false} >아직은 무료 이벤트가 진행되고 있어 포인트를 사용 및 구매하실 수 없습니다. 알콩달콩 앱을 자유롭게 이용해주세요.</Text>
            </View>
        );
    }
}

type Props = StackScreenProps<StackParamList, "Point">

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    }
})