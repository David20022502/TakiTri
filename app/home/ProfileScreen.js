import { StyleSheet, TouchableOpacity, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useTheme, Text } from 'react-native-paper'
//import * as styles from '../../assets/styles/appStyles'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Avatar, Icon } from '@rneui/themed'
import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { ButtonOwn, ButtonOwnAddPlayList, InputTextInfo } from '../../src/components/Components'
import TakiTriContext from '../../context/SecurityContext/TakiTriContext'
import { getMessage } from '../../src/components/Messages'
import DatePicker from 'react-native-date-picker'
import { checkOnlySpaces, validateName } from '../../src/services/Validations'

export const ProfileScreen = () => {
  global.pageStatus = "ProfileScreen";
  const { userTakiTri, handleLoading, handleUpdateUser, handlePaddingSnackBar, handleError } = React.useContext(TakiTriContext)
  const [imageUser, setImageUser] = React.useState(userTakiTri.imageUser);
  const [nameUser, setNameUser] = React.useState(userTakiTri.names);
  const [lastNameUser, setLastNameUser] = React.useState(userTakiTri.lastName);
  const [birthDate, setBirhDate] = React.useState(userTakiTri.birthDate);
  const [email, setEmail] = React.useState(userTakiTri.user);
  const [userImageUrl, setUserImageUrl] = React.useState(null);
  const [isNotErrorStyleImputTextname, setIsNotErrorStyleImputTextname] = React.useState(true);
  const [errorTextImputMessagename, setErrorTextImputMessagename] = React.useState("");
  const [isNotErrorStyleImputlastname, setIsNotErrorStyleImputTextlastname] = React.useState(true);
  const [errorTextImputMessagelastname, setErrorTextImputMessagelastname] = React.useState("");
  const [isNotErrorStyleImputTextdate, setIsNotErrorStyleImputTextdate] = React.useState(true);
  const [errorTextImputMessagedate, setErrorTextImputMessagedate] = React.useState("");
  const [open, setOpen] = React.useState(false)
  const [isButtonDisbled, setIsButtonDisabled] = React.useState(true);

  //const [birthdate, setBirthdate] = useState(new Date());
  const [initBirthdate, setInitBirthdate] = useState(new Date());

  React.useEffect(() => {
    //handlePaddingSnackBar(5);
  }, []);
  React.useEffect(async () => {
    if (userImageUrl) {
      try {
        const values = {
          "birthDate": birthDate,
          "id": userTakiTri.id,
          "lastName": lastNameUser,
          "names": nameUser,
          "user": email,
          "imageUser": global.urlProfile
        }
        await handleUpdateUser(values);
        handleLoading(false)
        handleError("Se ha actualizado su perfíl correctamente", "green");
      } catch (e) {
        handleError(getMessage("*"), "red");
      }



    }
  }, [userImageUrl]);
  React.useEffect(() => {
    if (isNotErrorStyleImputTextname && isNotErrorStyleImputTextdate && isNotErrorStyleImputlastname) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [isNotErrorStyleImputTextname, isNotErrorStyleImputTextdate, isNotErrorStyleImputlastname])

  const chooseFile = async () => {
    let options = {
      mediaTypes: MediaTypeOptions.Images,
    };
    let response = await launchImageLibraryAsync(options);
    if(response.cancelled==false){
      setImageUser(response.uri);
    }
  };


  const lettersName = (nameBasic, surnameBasic) => {
    let lettersImg =
      nameBasic.charAt(0).toUpperCase() +
      "" +
      surnameBasic.charAt(0).toUpperCase();
    return lettersImg;
  };
  const onSubmit = () => {

    if (imageUser != null) {
      handleLoading(true)
      uploadFile();
    } else {
    }

  }
  const uploadFile = async () => {
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", imageUser, true);
        xhr.send(null);
      });

      const storage = getStorage();
      const fileStorage = ref(
        storage,
        "ProfileImagesAvatars/" + userTakiTri.id + ".jpg"
      );
      const uploadResult = await uploadBytes(fileStorage, blob);

      blob.close();

      const url = await getDownloadURL(fileStorage);
      setUserImageUrl(url);
      global.urlProfile = url;
    } catch (e) {
      handleLoading(false)
      handleError(getMessage("*"), "red");

    }

  };
  const verifyDate=(date)=>{
    let date1 = parseInt(date);
    let d= new Date();
    let yearcurrent=d.getFullYear();
    let tempDate=parseInt(yearcurrent)-date1;
    if(tempDate>=18 && tempDate<=50){
        return true;
    }
    return false;

}
  return (
    <View style={{ flex: 1, marginHorizontal: 20 }}>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          size={122}
          rounded
          title={
            imageUser != null
              ? lettersName("nameBasic", "surnameBasic")
              : imageUser
          }
          source={{
            uri:
              imageUser == null
                ? "https://ui-avatars.com/api/?background=0B2460&color=fff&size=600&font-size=0.4&name=" +
                global.name +
                "+" +
                global.lastname
                : imageUser,
          }}
          containerStyle={{
            backgroundColor: "#3d4db7",
            marginBottom: 30,
            marginTop: 10,
          }}
        >
          <Avatar.Accessory
            onPress={() => {
              chooseFile();
            }}
            style={{ backgroundColor: "#7DDAFF" }}
            size={30}
          />
        </Avatar>
      </View>


      <View style={{ width: "100%", marginVertical: 10 }}>
        <InputTextInfo
          text={"Nombres:"}
          editable={true}
          placeholder={"xxxx xxxx"}
          value={nameUser}
          onChangeText={(e) => {
            // e=e.trim();
            let checkSpaces = checkOnlySpaces(e);
            if (!checkSpaces) {
              let validation = validateName(e);
              if (validation.resultValidation) {

                setNameUser(e);

              }
              setErrorTextImputMessagename(validation.message)
              setIsNotErrorStyleImputTextname(validation.Result)

            }else{
              setNameUser(e);
              setErrorTextImputMessagename(getMessage("nameRequired"))
              setIsNotErrorStyleImputTextname(false)
            }

          }}
        >
        </InputTextInfo>
      </View>
      {isNotErrorStyleImputTextname == false && (
        <Text style={styles.errorStyleImputText}>{errorTextImputMessagename}</Text>
      )}
      <View style={{ width: "100%", marginVertical: 10 }}>
        <InputTextInfo
          text={"Apelllidos:"}
          placeholder={"xxxx xxxx "}
          value={lastNameUser}
          editable={true}
          onChangeText={(e) => {
            let checkSpaces = checkOnlySpaces(e);
            if (!checkSpaces) {
              let validation = validateName(e);
              if (validation.resultValidation) {
                setLastNameUser(e);
              }
              setErrorTextImputMessagelastname(validation.message)
              setIsNotErrorStyleImputTextlastname(validation.Result)
            } else {
              setLastNameUser(e);
              setErrorTextImputMessagelastname(getMessage("lastNameReuired"))
              setIsNotErrorStyleImputTextlastname(false)
            }


          }}
        >
        </InputTextInfo>
      </View>
      {isNotErrorStyleImputlastname == false && (
        <Text style={styles.errorStyleImputText}>{errorTextImputMessagelastname}</Text>
      )}


      <View style={{ width: "100%", marginVertical: 10 }}>
        <InputTextInfo
          text={"Correo:"}
          value={email}
          editable={false}
          onChangeText={setEmail}

        >
        </InputTextInfo>
      </View>
      <View style={{ width: "100%", marginVertical: 10 }}>
        <InputTextInfo
          text={"Fecha de Nacimiento:"}
          placeholder={"xxxx xxxx "}
          value={birthDate}
          onChangeText={setBirhDate}
          editable={false}
          isDate={true}

          changeVisibility={() => { setOpen(!open) }}
          IconR={() => { return (<Icon name="date" type="fontisto" color={"#AAAAAA"} />) }}

        >
        </InputTextInfo>
      </View>

      {isNotErrorStyleImputTextdate == false && (
        <Text style={styles.errorStyleImputText}>{errorTextImputMessagedate}</Text>
      )}


      <View style={{ marginVertical: 30, width: "100%", flexDirection: "row", justifyContent: "center" }}>
        <ButtonOwnAddPlayList
          title={"Actualizar"}
          onPress={() => { onSubmit() }}
          disabled={isButtonDisbled}
        >
        </ButtonOwnAddPlayList>
      </View>

      <DatePicker
        modal
        open={open}
        mode="date"
        date={initBirthdate}
        onConfirm={(date) => {
          setOpen(false)
          ///let currentDate = initBirthdate
          let currentDate = new Date();
          console.log("current date",Date.parse(currentDate))
          console.log(" date",Date.parse(date))

          if (Date.parse(date) <= Date.parse(currentDate)) {
            
            console.log("no es mayor")
            setIsNotErrorStyleImputTextdate(true);
            setErrorTextImputMessagedate("");
          } else {
            console.log("si es mayor")
            setIsNotErrorStyleImputTextdate(false);
            setErrorTextImputMessagedate("La fecha no puede ser mayor a la fecha actual");
          }
          console.log("date", date)
          date = date.toJSON();
          let tempDat = date.split("T");
          tempDat = tempDat[0].split("-");
          tempDat[0] = parseInt(tempDat[0])
          tempDat[1] = parseInt(tempDat[1])
          tempDat[2] = parseInt(tempDat[2])
          tempDat[2] = tempDat[2];
          let dateD = tempDat[0] + "/" + tempDat[1] + "/" + tempDat[2];
          let verify=verifyDate(tempDat[0]);
          setBirhDate(dateD)
          setInitBirthdate(new Date(dateD));
          if(verify){
            setBirhDate(dateD)
              setInitBirthdate(new Date(dateD));
          }else{
            setBirhDate(dateD)
              setInitBirthdate(new Date(dateD));
              setIsNotErrorStyleImputTextdate(false);
              setErrorTextImputMessagedate("Solo para edades de 18 a 50 años");
          }
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  errorStyleImputText: {
    color: "red",
    top: -10,
    marginLeft: 20,
    fontSize: 11,
  },
})