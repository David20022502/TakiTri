import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import headPhone from "../../assets/images/headPhone.jpg";
import { ButtonOwn, Indicator } from "../../src/components/Components";
export const FirstSplash = () => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>
                    Descubre nueva música  cada día
                </Text>
            </View>
            <View >
                <Text style={styles.subTitle}>
                    Puedes disfrutar de la música de las raices del Ecuador
                </Text>

            </View>
            <View style={styles.containerImage}>
                <Image
                    source={headPhone}
                    style={styles.imageStyle}
                >
                </Image>
                <View style={styles.containerImageBack}>
                    
                </View>
            </View>
            <View style={styles.containerButton} >
                <ButtonOwn
                    title={"Siguiente"}
                    onPress={() => { }}
                >

                </ButtonOwn>
            </View>
            <View style={styles.containerIndicator}>
                <Indicator
                i1={true}
                i2={false}
                >
                </Indicator>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal:10,
        flex: 1,
        backgroundColor: '#FDFDFD',
        flexDirection: "column",
       
        justifyContent: 'center',
        position:"relative"
    },
    containerIndicator:{
        flexDirection:"row",
        justifyContent:"center",
    },
    containerImage:{
        position:"relative",
        marginBottom:80,
        flexDirection:"row",
        justifyContent:"center",
    },
    containerButton:{
        marginBottom:60,
        flexDirection:"row",
        justifyContent:"center",
    },
    containerImageBack:{
        position:"absolute",
        width: 295,
        height: 260,
      
        backgroundColor: "rgba(196, 196, 196, 0.19)",
        borderRadius: 20
    },
    title: {
        fontFamily: 'Oswald',
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 35,
        lineHeight: 52,
        color: "#000000",
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 4,
        marginTop:50,
        marginBottom:20
    },
    subTitle: {
        fontFamily: 'Oswald',
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 20,
        lineHeight: 30,
        textAlign:"center",
        color: "#838383",
        marginBottom:20
    },
    imageStyle: {
        width: 285,
        height: 260,
        

    }

});
