import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

export default function LogoTitle() {
    return (
        <View style={styles.logo}>
            <View style={{width: 30, height: 1}}/>
            <Image
                style={{ width: 84, height: 40 }}
                source={require('../drawables/title.png')}
            ></Image>
            <Image
                style={{ width: 30, height: 30 }}
                source={require('../drawables/logo.png')}
            ></Image>
        </View>
        
    )
}

const styles = StyleSheet.create({
    logo: {
        marginLeft: 10,
        marginRight: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
    }
})