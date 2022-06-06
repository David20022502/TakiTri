import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { ButtonOwn, Indicator, InputText } from "../../src/components/Components";
import iconGoogle from "../../assets/images/iconGoogle.jpg";
import { createUserDatabases } from "../../src/services/UserServices";

export const Register = ({ navigation }) => {
    const [userName, setUser] = useState("");
    const [password, setpassword] = useState("");
    const [names, setNames] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [lastName, setLastName] = useState("");
    
    const registerFunction = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, userName, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("usuario creado",user);
                console.log("usuario creado credenciales",userCredential);
                let userTemp={
                    id:user.uid,
                    user:userName,
                    names:names,
                    lastName:lastName,
                    birthDate:birthdate,
                }
                createUserDatabases(userTemp);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("error al autenticarse",error);
                // ..
            });
    }
   
    return (

        <View style={styles.container}>
            <ScrollView>
                <View>
                    <Text style={styles.title}>
                        Se parte de nuestra comunidad
                    </Text>
                </View>
                <View style={styles.containerImputs} >
                    <InputText
                        placeholder={"ejemplo123@gmail.com"}
                        text={"Usuario"}
                        value={userName}
                        onChangeText={setUser}
                    >
                    </InputText>
                    <InputText
                        placeholder={"**********"}
                        text={"Contraseña"}
                        value={password}
                        onChangeText={setpassword}
                    >
                    </InputText>
                    <InputText
                        placeholder={"xxxx xxxx  "}
                        text={"Nombres"}
                        value={names}
                        onChangeText={setNames}
                    >
                    </InputText>
                    <InputText
                        placeholder={"xxxx xxxx  "}
                        text={"Apellidos"}
                        value={lastName}
                        onChangeText={setLastName}
                    >
                    </InputText>
                    <InputText
                        placeholder={"AAAA/MM/DD"}
                        text={"Fecha de Nacimiento"}
                        value={birthdate}
                        onChangeText={setBirthdate}
                    >
                    </InputText>
                    <View style={styles.containerButton} >
                        <ButtonOwn
                            title={"Iniciar Sesión"}
                            onPress={() => {registerFunction();}}
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
                    <Text style={[styles.optionsStyleText, { color: "#9E9E9E", marginRight: 10 }]}>
                        Ya tienes una cuenta?
                    </Text>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate("login") }}
                    >
                        <Text style={styles.optionsStyleText}>
                            Iniciar Sesión
                        </Text>
                    </TouchableOpacity>



                </View>
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
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center"
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
        marginTop: 10
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
        marginTop: 10,
        

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
        height: 380,
        marginTop: 30
    }
});
