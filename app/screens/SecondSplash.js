import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import React from "react";
import headPhone from "../../assets/images/headPhone.jpg";
import { ButtonOwn, Indicator } from "../../src/components/Components";
export const SecondSplash = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{paddingRight:30}}>
                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <Text style={styles.title}>
                            Acerca de
                        </Text>
                    </View>
                    <View style={styles.containerItemInformation} >
                        <Text style={styles.subTitle}>
                            ¿Quiénes somos?
                        </Text>
                        <Text style={styles.textStyle}>
                            Somos un grupo de desarrolladores que buscamos lo mejor para nuestros usuarios.
                        </Text>
                    </View>
                    <View style={styles.containerItemInformation} >
                        <Text style={styles.subTitle}>
                            Géneros Musicales
                        </Text>
                        <Text style={styles.textStyle}>
                            Esta aplicacón móvil está destinada a acojer géneros musicales pertenecientes al Ecuador.
                        </Text>
                    </View>

                    <View style={styles.containerItemInformation} >
                        <Text style={styles.subTitle}>
                            Misión
                        </Text>
                        <Text style={styles.textStyle}>
                            Brindar a los artistas la oportunidad de llegar a más personas mediante la  música ,
                            construyendo una identidad musical en los niños, jóvenes y adultos ecuatorianos.
                        </Text>
                    </View>

                    <View style={[styles.containerItemInformation, { marginBottom: 60 }]} >
                        <Text style={styles.subTitle}>
                            Visión
                        </Text>
                        <Text style={[styles.textStyle, { marginBottom: 30 }]}>
                            Comunicar  mediante la música,
                            donde el respeto en cada uno de los artistas se refleja en cada canción de Taki-tri,
                            donde la humildad del ecuatoriano se escucha en los versos y la sinceridad en cada estrofa,
                            sin dejar a un lado la  honestidad en cada nota musical que  da vida y coraje al talento ecuatoriano.
                        </Text>
                    </View>
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
        flex: 1,
        backgroundColor: '#FDFDFD',
        flexDirection: "column",
        justifyContent: 'center',
        position: "relative",
        paddingHorizontal: 40,
        paddingBottom: 100

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
        color: "#838383",
        textAlign: "justify"

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
        textShadowOffset: { width: 0, height: 3 },
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
        marginTop: 20,
        marginBottom: 10,
        textAlign: "center"
    },
    containerItemInformation: {
        flexDirection: "column",
        justifyContent: "space-between",
    }
});
