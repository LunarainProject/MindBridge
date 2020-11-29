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
import Markdown from "react-native-markdown-renderer";
import md from "../../../assets/release.md";
import { Asset } from 'expo-asset';
import { ScrollView } from "react-native-gesture-handler";

export default class AppInfoScreen extends React.Component<Props> {
    
    state = {
        release: ''
    }

    async componentDidMount() {
        let file = Asset.fromModule(md);
        await file.downloadAsync() // Optional, saves file into cache
        let res = await fetch(file.uri);
        let text = await res.text();
        //console.log("markdown:", text);
        this.setState({release: text});
    }
    
    render() {
        return (
            <ScrollView>
                <View style={styles.main}>
                    <Markdown>{this.state.release}</Markdown>
                </View>
            </ScrollView>
        );
    }
}

type Props = StackScreenProps<StackParamList, "AppInfo">

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 20,
    }
})