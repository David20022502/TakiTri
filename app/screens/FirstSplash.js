import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from "react";
import { ButtonOwn, Indicator } from "../../src/components/Components";
import TakiTriContext from "../../context/SecurityContext/TakiTriContext";
export const FirstSplash = ({ navigation }) => {
    const { isAutenticated, currentAutenticatedUser } = useContext(TakiTriContext)
    React.useEffect(() => {
        // currentAutenticatedUser();
    }, [])
    return (
        <ScrollView>
            <StatusBar backgroundColor='#FDFDFD'></StatusBar>
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
                        source={{ uri: "https://firebasestorage.googleapis.com/v0/b/borrador-a0724.appspot.com/o/codePictures%2FWhatsApp%20Image%202022-07-11%20at%206.06.01%20PM.jpeg?alt=media&token=2c9d14da-67a2-4f4d-849d-db8745a0e976" }}
                        style={styles.imageStyle}
                    >
                    </Image>
                    <View style={styles.containerImageBack}>

                    </View>
                </View>
                <View style={styles.containerButton} >
                    <ButtonOwn
                        title={"Siguiente"}
                        onPress={() => { navigation.navigate("secondSplash") }}
                    >

                    </ButtonOwn>
                </View>

                <Indicator
                    i1={true}
                    i2={false}
                >
                </Indicator>

            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: '#FDFDFD',
        flexDirection: "column",
        justifyContent: 'center',
        position: "relative",
        paddingHorizontal: 50,
        height: Dimensions.get("window").height

    },
    containerIndicator: {
        flexDirection: "row",
        justifyContent: "center",
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
    containerImageBack: {
        position: "absolute",
        width: 295,
        height: 260,

        backgroundColor: "rgba(196, 196, 196, 0.19)",
        borderRadius: 20
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
        marginTop: 0,
        marginBottom: 20,
        textAlign: "center"
    },
    subTitle: {
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 20,
        lineHeight: 30,
        textAlign: "center",
        color: "#838383",
        marginBottom: 20
    },
    imageStyle: {
        width: 285,
        height: 260,


    }

});
