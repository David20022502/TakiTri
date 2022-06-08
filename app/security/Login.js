import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { ButtonOwn, Indicator, InputText } from "../../src/components/Components";
import iconGoogle from "../../assets/images/iconGoogle.jpg";
import TakiTriContext from "../../context/SecurityContext/TakiTriContext";
import {ModalInfoError} from "../components/ModalInfoError"

export const Login = ({ navigation }) => {
    const { singInWithEmailPassword } = useContext(TakiTriContext)
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [messageError, setMessageError] = useState("");
    const [modalErrorVisible, setmodalErrorVisible] = useState(false);

    const onSubmit = () => {
        const user = {
            email: userName,
            password: password
        }
        singInWithEmailPassword(user);
    }
    return (

        <View style={styles.container}>
            <ScrollView>
                <View>
                    <Text style={styles.title}>
                        Mira lo que tenemos para ti
                    </Text>
                </View>
                <View style={styles.containerImputs} >
                    <InputText
                        placeholder={"ejemplo123@gmail.com"}
                        text={"Usuario"}
                        value={userName}
                        onChangeText={setUserName}
                    >
                    </InputText>
                    <InputText
                        placeholder={"**********"}
                        text={"Contraseña"}
                        value={password}
                        onChangeText={setPassword}
                        modify={true}
                    >
                    </InputText>
                    <View style={styles.containerButton} >
                        <ButtonOwn
                            title={"Iniciar Sesión"}
                            onPress={() => { onSubmit() }}
                        >

                        </ButtonOwn>
                    </View>
                </View>
                <View style={styles.containerLine}>
                    <View style={styles.lineStyle}>
                    </View>
                    <Text style={styles.legend}>
                        Iniciar con
                    </Text>
                    <TouchableOpacity
                        onPress={() => { }}
                    >
                        <Image
                            source={iconGoogle}
                        >
                        </Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerOptions}>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate("register") }}
                    >
                        <Text style={styles.optionsStyleText}>
                            Registrarse
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate("ResetPasword") }}
                    >
                        <Text style={styles.optionsStyleText}>
                            Olvidé la Contraseña
                        </Text>
                    </TouchableOpacity>


                </View>
                <ModalInfoError
                message={setmodalErrorVisible}
                setModalVisible={setmodalErrorVisible}
                modalVisible={modalErrorVisible}
                >

                </ModalInfoError>
            </ScrollView>

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
        paddingHorizontal: 50,
    },
    containerOptions: {
        marginTop: 50,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    optionsStyleText: {
        fontStyle: "normal",
        fontSize: 17,
        color: "#59C7F0"
    },
    containerLine: {
        marginTop: 50,
        position: "relative",
        flexDirection: "column",
        alignItems: "center"
    },
    lineStyle: {
        backgroundColor: "#C6C6C6",
        width: Dimensions.get("window").width,
        height: 1,
    },
    legend: {
        color: "red",
        fontSize: 100,
        fontStyle: "normal",
        fontSize: 20,
        lineHeight: 30,
        color: "#9B9B9D",
        top: -17,
        width: 130,
        paddingLeft: 20,
        backgroundColor: "#FDFDFD"

    },
    textStyle: {
        fontStyle: "normal",
        fontSize: 20,
        lineHeight: 30,
        textAlign: "center",
        color: "#838383"
    },
    containerButton: {
        marginTop: 30
    },
    title: {
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 35,
        lineHeight: 52,
        color: "#000000",
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 4,
        marginTop: 80,
    },
    subTitle: {
        fontStyle: "normal",
        fontSize: 20,
        lineHeight: 24,
        color: "#C8383F",
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 4,
    },
    containerImputs: {
        flexDirection: "column",
        justifyContent: "space-between",
        height: 250,
        marginTop: 110
    }
});
