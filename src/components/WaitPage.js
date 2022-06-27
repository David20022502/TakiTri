import React from "react"
import { Image, StyleSheet, Text, View } from "react-native";
import logo from "../../assets/images/logoAppSplash.png";
import { StatusBar } from 'expo-status-bar';
export const WaitPage = () => {
    return <View style={styles.container}>
           <StatusBar backgroundColor='#123544'></StatusBar>
        <Image
            source={logo}
            style={{ width: 100, height: 100 }}
        >
        </Image>
    </View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#123544",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    }
});
