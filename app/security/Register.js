import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { StatusBar } from 'expo-status-bar';

import { ButtonOwn, Indicator, InputText } from "../../src/components/Components";
import iconGoogle from "../../assets/images/iconGoogle.jpg";
import { createUserDatabases } from "../../src/services/UserServices";
import TakiTriContext from "../../context/SecurityContext/TakiTriContext";
import { getMessage } from "../../src/components/Messages";
import { Icon } from "@rneui/base";
import { validateEmail, validateName, validatePassword, validatePassword1 } from "../../src/services/Validations";
import DatePicker from 'react-native-date-picker'
import { Button } from "react-native";

export const Register = ({ navigation }) => {
    const { handleLoading, handleError, } = useContext(TakiTriContext)
    const [userName, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [names, setNames] = useState("");
    const [birthdate, setBirthdate] = useState(new Date());
    const [lastName, setLastName] = useState("");
    const [isPwdVisible, setIsPwdVisible] = useState(true);
    const [isPwdVisible2, setIsPwdVisible2] = useState(true);
    const [isNotErrorStyleImputTextEmail, setIsNotErrorStyleImputTextEmail] = React.useState(false);
    const [errorTextImputMessageEmail, setErrorTextImputMessageEmail] = React.useState("");
    const [isNotErrorStyleImputTextp1, setIsNotErrorStyleImputTextp1] = React.useState(false);
    const [errorTextImputMessagep1, setErrorTextImputMessagep1] = React.useState("");


    const [isNotErrorStyleImputTextp2, setIsNotErrorStyleImputTextp2] = React.useState(false);
    const [errorTextImputMessagep2, setErrorTextImputMessagep2] = React.useState("");
    const [isNotErrorStyleImputTextname, setIsNotErrorStyleImputTextname] = React.useState(false);
    const [errorTextImputMessagename, setErrorTextImputMessagename] = React.useState("");
    const [isNotErrorStyleImputlastname, setIsNotErrorStyleImputTextlastname] = React.useState(false);
    const [errorTextImputMessagelastname, setErrorTextImputMessagelastname] = React.useState("");
    const [isNotErrorStyleImputTextdate, setIsNotErrorStyleImputTextdate] = React.useState(false);
    const [errorTextImputMessagedate, setErrorTextImputMessagedate] = React.useState("");
    const [open, setOpen] = useState(false)

    const [resultValidation1, setResultValidation1] = React.useState(false);
    const [resultValidation2, setResultValidation2] = React.useState(false);
    const [isButtonDisbled, setIsButtonDisabled] = React.useState(true);
    const [pwdsValid, setPwdsValid] = React.useState(false);

    React.useEffect(()=>{
        if(isNotErrorStyleImputTextEmail&&isNotErrorStyleImputTextname&&isNotErrorStyleImputTextdate&&isNotErrorStyleImputlastname&&pwdsValid&&birthdate.length>0){
            setIsButtonDisabled(false);
        }else{
            setIsButtonDisabled(true);
        }
    },[isNotErrorStyleImputTextEmail,isNotErrorStyleImputTextname,isNotErrorStyleImputTextdate,isNotErrorStyleImputlastname,pwdsValid])
    React.useEffect(()=>{
        if(resultValidation1==true && resultValidation2==true){
            setPwdsValid(true)
        }else{
            setPwdsValid(false)
        }
    },[resultValidation1,resultValidation2])
    const registerFunction = () => {
        const auth = getAuth();
        handleLoading(true);
        createUserWithEmailAndPassword(auth, userName, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("usuario creado", user);
                console.log("usuario creado credenciales", userCredential);
                let userTemp = {
                    id: user.uid,
                    user: userName,
                    names: names,
                    lastName: lastName,
                    birthDate: birthdate,
                }
                createUserDatabases(userTemp);
                // ...
                handleLoading(true);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("errorCode", errorCode);
                console.log("errorMessage", errorMessage);
                handleLoading(false);
                handleError(getMessage(error.code), "red");
                console.log("error al inciar sesion", error)
                const data = getMessage("notAutenticated");
                console.log("mensaje obtenido", data)
            });
    }

    return (

        <View style={styles.container}>
            <StatusBar backgroundColor='#FDFDFD'></StatusBar>
            <ScrollView>
                <View>
                    <Text style={styles.title}>
                        Se parte de nuestra comunidad
                    </Text>
                </View>
                <View style={styles.containerImputs} >
                    <View style={{ flexDirection: "column", height: 80 }}>
                        <InputText
                            placeholder={"ejemplo123@gmail.com"}
                            text={"Email"}
                            value={userName}
                            onChangeText={(e) => {
                                console.log("email", e);
                                let validation = validateEmail(e);
                                if (validation.resultValidation) {
                                    setUser(e);
                                }
                                console.log(validation);
                                setErrorTextImputMessageEmail(validation.message);
                                setIsNotErrorStyleImputTextEmail(validation.Result);
                               // setIsButtonDisabled(!validation.Result);
                            }}
                        >
                        </InputText>
                        {isNotErrorStyleImputTextEmail == false && (
                            <Text style={styles.errorStyleImputText}>{errorTextImputMessageEmail}</Text>
                        )}
                    </View>
                    <View style={{ flexDirection: "column", height: 80 }}>
                        <InputText
                            placeholder={"**********"}
                            text={"Contraseña"}
                            value={password}
                            onChangeText={(e) => {
                                let validation = validatePassword1(e);
                                if (validation.resultValidation) {
                                    setPassword(e);
                                }
                                console.log("validationsa", validation);
                                setErrorTextImputMessagep1(validation.message)
                                setIsNotErrorStyleImputTextp1(validation.Result)
                                setResultValidation1(validation.Result);
                                console.log("password2", password2)
                                if (password2 && password2.length > 0) {
                                    let validation = validatePassword(e, password2);
                                    console.log("validacin con se", validation);
                                    if (validation.Result) {
                                        setResultValidation2(true);
                                        setIsNotErrorStyleImputTextp2(true)
                                        setErrorTextImputMessagep2("")
                                    } else {
                                        setResultValidation2(false);
                                        setIsNotErrorStyleImputTextp2(false)
                                        setErrorTextImputMessagep2(validation.message)
                                    }
                                }
                            }}

                            modify={isPwdVisible}
                            isPassword={true}
                            changeVisibility={() => { setIsPwdVisible(!isPwdVisible) }}
                            IconR={() => { return (<Icon name={isPwdVisible ? "eye-off" : "eye"} type="feather" color={"#AAAAAA"} />) }}
                        >
                        </InputText>
                        {isNotErrorStyleImputTextp1 == false && (
                            <Text style={styles.errorStyleImputText}>{errorTextImputMessagep1}</Text>
                        )}
                    </View>
                    <View style={{ flexDirection: "column", height: 80 }}>
                        <InputText
                            placeholder={"**********"}
                            text={"Repetir la contraseña"}
                            value={password2}
                            onChangeText={(e) => {
                                let validation = validatePassword(password, e, false);
                                if (validation.resultValidation) {
                                    setPassword2(e);
                                }
                                console.log(validation);
                                setErrorTextImputMessagep2(validation.message)
                                setIsNotErrorStyleImputTextp2(validation.Result)
                                setResultValidation2(validation.Result);



                            }}

                            modify={isPwdVisible2}
                            isPassword={true}
                            changeVisibility={() => { setIsPwdVisible2(!isPwdVisible2) }}
                            IconR={() => { return (<Icon name={isPwdVisible2 ? "eye-off" : "eye"} type="feather" color={"#AAAAAA"} />) }}
                        >
                        </InputText>
                        {isNotErrorStyleImputTextp2 == false && (
                            <Text style={styles.errorStyleImputText}>{errorTextImputMessagep2}</Text>
                        )}
                    </View>

                    <View style={{ flexDirection: "column", height: 80 }}>
                        <InputText
                            placeholder={"xxxx xxxx  "}
                            text={"Nombres"}
                            value={names}
                            onChangeText={(e) => {
                                let validation = validateName(e);
                                if (validation.resultValidation) {
                                
                                        setNames(e);
                                    
                                }
                                console.log(validation);
                                setErrorTextImputMessagename(validation.message)
                                setIsNotErrorStyleImputTextname(validation.Result)
                            }}


                        >
                        </InputText>
                        {isNotErrorStyleImputTextname == false && (
                            <Text style={styles.errorStyleImputText}>{errorTextImputMessagename}</Text>
                        )}
                    </View>
                    <View style={{ flexDirection: "column", height: 80 }}>
                        <InputText
                            placeholder={"xxxx xxxx  "}
                            text={"Apellidos"}
                            value={lastName}
                            onChangeText={(e) => {
                                let validation = validateName(e);
                                if (validation.resultValidation) {
                                    setLastName(e);
                                }
                                console.log(validation);
                                setErrorTextImputMessagelastname(validation.message)
                                setIsNotErrorStyleImputTextlastname(validation.Result)
                            }}

                        >
                        </InputText>
                        {isNotErrorStyleImputlastname == false && (
                            <Text style={styles.errorStyleImputText}>{errorTextImputMessagelastname}</Text>
                        )}
                    </View>
                    <View style={{ flexDirection: "column", height: 80 }}>
                        <InputText
                            placeholder={"AAAA/MM/DD"}
                            text={"Fecha de Nacimiento"}
                            value={birthdate}
                            onChangeText={setBirthdate}
                            isDate={true}
                           editable={false}
                           style={{color:"#12485B"}}
                           changeVisibility={() => { setOpen(!open) }}
                           IconR={() => { return (<Icon name="date" type="fontisto" color={"#AAAAAA"} />) }}
                       
                        >
                        </InputText>
                        {isNotErrorStyleImputTextdate == false && (
                            <Text style={styles.errorStyleImputText}>{errorTextImputMessagedate}</Text>
                        )}
                    </View>

                    <DatePicker
                        modal
                        open={open}
                        mode="date"
                        date={new Date()}
                        onConfirm={(date) => {
                            let d=new Date();
                            let year=d.getFullYear();
                            let month=d.getMonth()+1;
                            let day=d.getDate();
                            setOpen(false)
                            console.log("date",date)
                            date=date.toJSON();
                            let tempDat=date.split("T");
                            tempDat=tempDat[0].split("-");
                            if(parseInt(tempDat[0])>year||parseInt(tempDat[1])>month||parseInt(tempDat[2])>day){
                                console.log("si es mayor")
                                setIsNotErrorStyleImputTextdate(false);
                                setErrorTextImputMessagedate("La fecha no puede ser mayor a la fecha actual");
                            }else{
                                console.log("no es mayor")
                                setIsNotErrorStyleImputTextdate(true);
                                setErrorTextImputMessagedate("");
                          
                            }
                            let dateD=tempDat[0]+"/"+tempDat[1]+"/"+tempDat[2];
                            setBirthdate(dateD)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                </View>
                <View style={styles.containerButton} >
                    <ButtonOwn
                        title={"Registrarse"}
                        onPress={() => { registerFunction(); }}
                        disabled={isButtonDisbled}
                    >

                    </ButtonOwn>
                </View>
                <View style={styles.containerOptions}>
                    <Text style={[styles.optionsStyleText, { color: "#9E9E9E", marginRight: 10 }]}>
                        ¿Ya tienes una cuenta?
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

    },
    errorStyleImputText: {
        color: "red",
        top: -20,
        marginLeft: 20,
        fontSize: 11,
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
        marginTop: 10,
        paddingHorizontal: 50,
    },
    title: {
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 30,
        lineHeight: 52,
        color: "#000000",
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 3 },
        textShadowRadius: 4,
        marginTop: 50,
        paddingHorizontal: 50,

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
        backgroundColor: "#F3F3F3",
        flexDirection: "column",
        justifyContent: "space-between",
        height: 500,
        paddingVertical: 30,
        marginTop: 0,
        paddingHorizontal: 50,
        marginHorizontal: 10,
        borderRadius: 20,
        marginBottom: 20
    }
});
