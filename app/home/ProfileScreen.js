import { StyleSheet, TouchableOpacity, View, TextInput } from 'react-native'
import React from 'react'
import { useTheme, Text } from 'react-native-paper'
import * as styles from '../../assets/styles/appStyles'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Avatar } from '@rneui/themed'
import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { ButtonOwn, ButtonOwnAddPlayList, InputTextInfo } from '../../src/components/Components'
import TakiTriContext from '../../context/SecurityContext/TakiTriContext'
import { getMessage } from '../../src/components/Messages'

export const ProfileScreen = () => {
  global.pageStatus = "ProfileScreen";
  const { userTakiTri, handleLoading, handleUpdateUser, handlePaddingSnackBar,handleError } = React.useContext(TakiTriContext)
  const [imageUser, setImageUser] = React.useState(userTakiTri.imageUser);
  const [nameUser, setNameUser] = React.useState(userTakiTri.names);
  const [lastNameUser, setLastNameUser] = React.useState(userTakiTri.lastName);
  const [birthDate, setBirhDate] = React.useState(userTakiTri.birthDate);
  const [email, setEmail] = React.useState(userTakiTri.user);
  const [userImageUrl, setUserImageUrl] = React.useState(null);
  React.useEffect(() => {
    console.log("userTakiTri", userTakiTri)
    handlePaddingSnackBar(5);
    console.log("----------------------- dentro de profile");
  }, []);
  React.useEffect(async() => {
    if (userImageUrl) {
      try{
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
      }catch(e){
        handleError(getMessage("*"), "red");
      }
     
      

    }
  }, [userImageUrl]);
  const chooseFile = async () => {
    let options = {
      mediaTypes: MediaTypeOptions.Images,
    };
    let response = await launchImageLibraryAsync(options);
    setImageUser(response.uri);
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
    }else{
    }

  }
  const uploadFile = async () => {
    try{
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
      console.log("url--", url)
      global.urlProfile = url;
    }catch(e){
      handleLoading(false)
      handleError(getMessage("*"), "red");

    }
   
  };
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
          text={"Nombres"}
          editable={false}
          placeholder={"xxxx xxxx"}
          value={nameUser}
          onChangeText={setNameUser}
        >
        </InputTextInfo>
      </View>
      <View style={{ width: "100%", marginVertical: 10 }}>
        <InputTextInfo
          text={"Apelllidos"}
          placeholder={"xxxx xxxx "}
          value={lastNameUser}
          editable={false}
          onChangeText={setLastNameUser}
        >
        </InputTextInfo>
      </View>

      <View style={{ width: "100%", marginVertical: 10 }}>
        <InputTextInfo
          text={"Correo"}
          value={email}
          editable={false}
          onChangeText={setEmail}

        >
        </InputTextInfo>
      </View>
      <View style={{ width: "100%", marginVertical: 10 }}>
        <InputTextInfo
          text={"Fecha de Nacimiento"}
          placeholder={"xxxx xxxx "}
          value={birthDate}
          onChangeText={setBirhDate}
          editable={false}
        >
        </InputTextInfo>
      </View>
      <View style={{ marginVertical: 30, width: "100%", flexDirection: "row", justifyContent: "center" }}>
        <ButtonOwnAddPlayList
          title={"Actualizar"}
          onPress={() => { onSubmit() }}
        >
        </ButtonOwnAddPlayList>
      </View>
    </View>
  )
}