import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { StatusBar } from 'expo-status-bar';

import { ButtonOwn, ButtonOwnRegister, Indicator, InputText } from "../../src/components/Components";
import iconGoogle from "../../assets/images/iconGoogle.jpg";
import TakiTriContext from "../../context/SecurityContext/TakiTriContext";
import { ModalInfoError } from "../components/ModalInfoError"
import imageHeader from "../../assets/images/HeaderLogo.jpg"
import { Icon } from "@rneui/base";
export const Login = ({ navigation }) => {
    const { singInWithEmailPassword } = useContext(TakiTriContext)
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [messageError, setMessageError] = useState("");
    const [modalErrorVisible, setmodalErrorVisible] = useState(false);
    const [isPwdVisible, setIsPwdVisible] = useState(true);

    const onSubmit = () => {
        const user = {
            email: userName,
            password: password
        }
        singInWithEmailPassword(user);
    }
    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor='#20DACA'></StatusBar>
            <View style={{position:"relative"}}>
                <Image
                    source={imageHeader}
                    style={{ width: Dimensions.get("window").width+20, height: 180, marginTop: 20,marginLeft:-20 }}
                >
                </Image>
                <View style={{position:"absolute",marginHorizontal:30,top:20}}>
                        <Text style={styles.title}>
                            Mira lo que tenemos para ti
                        </Text>
                    </View>
            </View>

            <View style={styles.container}>

                <ScrollView>

                    
                    <View style={styles.containerImputs} >
                        <InputText
                            placeholder={"ejemplo123@gmail.com"}
                            text={"Correo electrónico"}
                            value={userName}
                            onChangeText={setUserName}
                        >
                        </InputText>
                        <InputText
                            placeholder={"**********"}
                            text={"Contraseña"}
                            value={password}
                            onChangeText={setPassword}
                            modify={isPwdVisible}
                            isPassword={true}
                            changeVisibility={() => {setIsPwdVisible(!isPwdVisible)}}
                            IconR ={()=>{return(<Icon name={isPwdVisible ? "eye-off" : "eye"} type="feather" color={"#AAAAAA"}/>)}}
                        >
                        </InputText>
                       
                    </View>
                    <View style={styles.containerButton} >
                            <ButtonOwn
                                title={"Iniciar Sesión"}
                                onPress={() => { onSubmit() }}
                            >

                            </ButtonOwn>
                            <ButtonOwnRegister
                             title={"Registrarse"}
                             onPress={() => { navigation.navigate("register")  }}
                            >

                            </ButtonOwnRegister>
                        </View>
                        <View style={styles.containerOptions}>
                        
                        <Text style={[styles.optionsStyleText,{color:"#9E9E9E",marginRight:5}]}>
                            ¿Olvidaste la Contraseña? 
                            </Text>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate("ResetPasword") }}
                        >
                            <Text style={styles.optionsStyleText}>
                             ¿Deseas recuperarla?
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
    containerOptions: {
        marginTop: 50,
        flexDirection: "row",
        justifyContent:"center"
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
        flexDirection:"column",
        justifyContent:"space-between",
        height:120,
        paddingHorizontal: 50,
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
        marginTop: 80,
        width:300
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
        backgroundColor:"#F3F3F3",
        flexDirection: "column",
        justifyContent: "space-between",
        height: 240,
        paddingVertical:40,
        marginTop: 80,
        paddingHorizontal: 50,
        marginHorizontal:10,
        borderRadius:20,
        marginBottom:20

    }
});
