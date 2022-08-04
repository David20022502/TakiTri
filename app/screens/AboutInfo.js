import React from "react"
import Constants from "expo-constants"

import { Image, StyleSheet, Text, View } from "react-native";
import logo from "../../assets/images/logoAppSplash.png";
import { StatusBar } from 'expo-status-bar';
import TakiTriContext from "../../context/SecurityContext/TakiTriContext";
export const AboutInfo = () => {
    const { handlePaddingSnackBar } = React.useContext(TakiTriContext)
    //handlePaddingSnackBar("AboutInfo")
  
   global.pageStatus="AboutInfo";
    const version = Constants.manifest.version

    return <View style={styles.container}>
        <StatusBar backgroundColor='#F3F3F3'></StatusBar>
        <View style={{width:300,flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <Text style={styles.text}>TakiTri</Text>
            <Text style={styles.text}>Versión-{version}</Text>
            <Text style={styles.text}>TakiTri es una app de prototipo, toda la información desplegada aquí, es usada con fines de prueba.</Text>
        </View>
    </View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F3F3",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    text:{
        color:"#12485B",
        fontSize:25,
        textAlign:"center"
    }
});
