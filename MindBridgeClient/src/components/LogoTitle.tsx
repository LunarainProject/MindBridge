import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

export default function LogoTitle() {
    return (
        <View style={styles.logo}>
            <Image
                style={{ width: 84, height: 40 }}
                resizeMode="contain"
                source={require('../drawables/title.png')}
            ></Image>
        </View>
        
    )
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        display:"flex",
        flexDirection: 'row',
        justifyContent:"center",
    }
})