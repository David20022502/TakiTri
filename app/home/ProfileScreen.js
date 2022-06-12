import { StyleSheet, TouchableOpacity, View, TextInput } from 'react-native'
import React from 'react'
import { useTheme, Text } from 'react-native-paper'
import * as styles from '../../assets/styles/appStyles'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Avatar } from '@rneui/themed'
import { ButtonOwn, ButtonOwnAddPlayList, InputTextInfo } from '../../src/components/Components'
import TakiTriContext from '../../context/SecurityContext/TakiTriContext'

export const ProfileScreen = () => {
  const { userTakiTri, handleUpdateUser } = React.useContext(TakiTriContext)
  const [imageUser, setImageUser] = React.useState(null);
  const [nameUser, setNameUser] = React.useState(userTakiTri.names);
  const [lastNameUser, setLastNameUser] = React.useState(userTakiTri.lastName);
  const [birthDate, setBirhDate] = React.useState(userTakiTri.birthDate);
  const [email, setEmail] = React.useState(userTakiTri.user);

  const chooseFile = async () => {
    let options = {
      mediaTypes: MediaTypeOptions.Images,
    };
    let response = await launchImageLibraryAsync(options);
    //console.log("Response", response);
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
    const values = {
      "birthDate": birthDate,
      "id": userTakiTri.id,
      "lastName": lastNameUser,
      "names": nameUser,
      "user": email,
    }
    handleUpdateUser(values);
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
            style={{ backgroundColor: "#EF6F6C" }}
            size={30}
          />
        </Avatar>
      </View>


      <View style={{ width: "100%" }}>
        <InputTextInfo
          text={"Nombres"}
          placeholder={"xxxx xxxx"}
          value={nameUser}
          onChangeText={setNameUser}
        >
        </InputTextInfo>
      </View>
      <View style={{ width: "100%" }}>
        <InputTextInfo
          text={"Apelllidos"}
          placeholder={"xxxx xxxx "}
          value={lastNameUser}
          onChangeText={setLastNameUser}
        >
        </InputTextInfo>
      </View>

      <View style={{ width: "100%" }}>
        <InputTextInfo
          text={"Correo"}
          value={email}

          onChangeText={setEmail}

        >
        </InputTextInfo>
      </View>
      <View style={{ width: "100%" }}>
        <InputTextInfo
          text={"Fecha de Nacimiento"}
          placeholder={"xxxx xxxx "}
          value={birthDate}
          onChangeText={setBirhDate}
        >
        </InputTextInfo>
      </View>
      <View style={{ marginVertical: 6,width:"100%",flexDirection:"row",justifyContent:"center" }}>
                    <ButtonOwnAddPlayList
                        title={"Actualizar"}
                        onPress={() => { onSubmit() }}
                    >
                    </ButtonOwnAddPlayList>
                </View>

    </View>
  )
}