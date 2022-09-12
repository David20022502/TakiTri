import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { StatusBar } from 'expo-status-bar';

import { ButtonOwn, InputText } from "../../src/components/Components";

import guitarImg from "../../assets/images/guitarImg.png";

import TakiTriContext from "../../context/SecurityContext/TakiTriContext";

import imageHeader from "../../assets/images/HeaderLogo.jpg"
import { getMessage } from "../../src/components/Messages";
import { validateEmail } from "../../src/services/Validations";

export const ResetPasword = ({ navigation }) => {
    const { handleSendEmailPasswordReeset,handleError } = useContext(TakiTriContext)
    const [emailUser, setEmailUser] = React.useState("");
    const [isNotErrorStyleImputTextEmail, setIsNotErrorStyleImputTextEmail] = React.useState(false);
    const [errorTextImputMessageEmail, setErrorTextImputMessageEmail] = React.useState("");
    const handleSendEmailPasswordReset = () => {
        if(emailUser.length<=0){
            handleError(getMessage("emailRequired"),"red");

        }else{
            handleSendEmailPasswordReeset(emailUser.trim());

        }
    }
    return (

        <View style={styles.container}>
            <StatusBar backgroundColor='#20DACA'></StatusBar>
            <View style={{ position: "relative" ,height:400}}>
                <Image
                    source={imageHeader}
                    style={{ width: Dimensions.get("window").width + 20, height: 180, marginTop: 20, marginLeft: -20 }}
                >
                </Image>
                <View style={{ position: "absolute", marginHorizontal: 0, top: 100,left:(Dimensions.get("window").width / 3) - 50 }}>
                    <Image
                        source={guitarImg}
                        style={{ width: 250, height: 150}}
                    >
                    </Image>
                    <Text style={styles.title}>
                        Reestablecer Contraseña
                    </Text>
                </View>
            </View>
            <View style={styles.container2}>
                <ScrollView>

                    <View style={styles.containerImputs} >
                        <InputText
                            placeholder={"ejemplo123@gmail.com"}
                            text={"Correo electrónico"}
                            value={emailUser}
                            maxLength={50}

                            onChangeText={(e)=>{
                                console.log("email", e);
                                let validation = validateEmail(e);
                                if (validation.resultValidation) {
                                    setEmailUser(e);
                                }
                                console.log(validation);
                                setErrorTextImputMessageEmail(validation.message);
                                setIsNotErrorStyleImputTextEmail(validation.Result);
                            }}
                            colorT={"white"}
                        >
                        </InputText>
                        {isNotErrorStyleImputTextEmail == false && (
                            <Text style={styles.errorStyleImputText}>{errorTextImputMessageEmail}</Text>
                        )}

                        <View style={styles.containerButton} >
                            <ButtonOwn
                                title={"Enviar Email"}
                                onPress={() => { handleSendEmailPasswordReset(); }}
                                disabled={!isNotErrorStyleImputTextEmail}
                            >

                            </ButtonOwn>
                        </View>

                    </View>
                    <View style={styles.containerLine}>
                        <View style={styles.lineStyle}>
                        </View>


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
    },
    container2: {
        flex: 1,
        backgroundColor: '#FDFDFD',
        flexDirection: "column",
        justifyContent: 'center',
        position: "relative",
        paddingHorizontal: 50,
    },
    errorStyleImputText: {
        color: "red",
        top: -20,
        marginLeft: 20,
        fontSize: 11,
    },
    conatinerHeader: {
        marginTop: 75,
        flexDirection: "column",
        alignItems: "center"
    },
    containerOptions: {
        marginTop: 80,
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
        textShadowOffset: { width: 0, height: 3 },
        textShadowRadius: 4,
        marginTop: 30,
        textAlign:"center"

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
        height: 150,
        marginTop: 80
    }
});
