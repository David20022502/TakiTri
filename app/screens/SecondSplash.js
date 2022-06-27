import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import React from "react";
import headPhone from "../../assets/images/headPhone.jpg";
import { ButtonOwn, Indicator } from "../../src/components/Components";
export const SecondSplash = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <Text style={styles.title}>
                        Conocenos
                    </Text>
                </View>
                <View style={styles.containerItemInformation} >
                    <Text style={styles.subTitle}>
                        Quiénes somos?
                    </Text>
                    <Text style={styles.textStyle}>
                        Somos un grupo de desarrolladores que buscamos lo mejor para nuestros usuarios
                    </Text>
                </View>
                <View style={styles.containerItemInformation} >
                    <Text style={styles.subTitle}>
                        Generos Musicales
                    </Text>
                    <Text style={styles.textStyle}>
                        Los generos musicales que encontraras en en la Aplicación Móvil, son propios del Ecuador
                    </Text>
                </View>

                <View style={styles.containerItemInformation} >
                    <Text style={styles.subTitle}>
                        Misión
                    </Text>
                    <Text style={styles.textStyle}>
                        Dar un espacio a los ecuatorianos para que ouedan oresentar sus músicas
                    </Text>
                </View>

                <View style={[styles.containerItemInformation, { marginBottom: 60 }]} >
                    <Text style={styles.subTitle}>
                        Visión
                    </Text>
                    <Text style={[styles.textStyle, { marginBottom: 30 }]}>
                        Ser la APP mas usada en Ecuador
                    </Text>
                </View>



            </ScrollView>
            <View style={styles.containerButton} >
                <ButtonOwn
                    title={"Empezar"}
                    onPress={() => { navigation.navigate("login") }}
                >

                </ButtonOwn>
            </View>
            <Indicator
                i1={false}
                i2={true}
            >
            </Indicator>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        flex: 1,
        backgroundColor: '#FDFDFD',
        flexDirection: "column",
        justifyContent: 'center',
        position: "relative",
        paddingHorizontal: 50,
        paddingBottom:100

    },
    containerIndicator: {
        flexDirection: "row",
        justifyContent: "center",
        position: "absolute",
        bottom: 0
    },
    textStyle: {
        fontStyle: "normal",
        fontSize: 20,
        lineHeight: 30,
        
        color: "#838383"
    },
    containerImage: {
        position: "relative",
        marginBottom: 80,
        flexDirection: "row",
        justifyContent: "center",
    },
    containerButton: {
        position: "absolute",
        bottom: 0,
        width: Dimensions.get("window").width,
        marginBottom: 90,
        flexDirection: "row",
        justifyContent: "center",
    },
    title: {
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 35,
        lineHeight: 52,
        color: "#12485B",
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 4,
        marginTop: 50,
        marginBottom: 0
    },
    subTitle: {
        fontStyle: "normal",
        fontSize: 20,
        lineHeight: 24,
        color: "#7DDAFF",
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
    containerItemInformation: {
        flexDirection: "column",
        justifyContent: "space-between",
        height: 125,
        marginTop: 15
    }
});
