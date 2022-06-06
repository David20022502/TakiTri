import { StyleSheet, TouchableOpacity, View, TextInput } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-elements'
import { useTheme, Text } from 'react-native-paper'
import * as styles from '../../assets/styles/appStyles'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export const ProfileScreen = () => {
  const paperTheme = useTheme();
  const [data, setData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isvalidEmail: true,
    isvalidPassword: true
  })
  return (
    <View style={{ flex: 1, backgroundColor: paperTheme.colors.background, marginHorizontal: 20 }}>
      <Text>ProfileScreen</Text>
      <Avatar
        size="xlarge"
        rounded
        containerStyle={{ alignSelf: 'center' }}
        source={{
          uri:
            global.profilePic,
        }}
      >
        <Avatar.Accessory size={40} onPress={() => console.log("Works!")} />
      </Avatar>
      <Text
        style={[styles.commons.text_footer, {
          marginTop: 35,
          color: paperTheme.dark == true ? 'white' : '#05375a'
        }]}>Nombre</Text>

      <View style={styles.commons.action}>
        <Feather
          name="lock"
          color={paperTheme.dark == true ? styles.colors.cultured : "#05375a"}
          size={20} />
        <TextInput
          placeholder='Your Password'
          placeholderTextColor={paperTheme.dark == true ? styles.colors.cultured : styles.colors.lightGray}
          style={[styles.commons.textInput, { color: paperTheme.dark == true ? styles.colors.cultured : styles.colors.lightGray }]}
          autoCapitalize="none"

        />
        {/* <TouchableOpacity onPress={() => { }}>
          <Feather
            name={data.secureTextEntry ? "eye-off" : "eye"}
            color="grey"
            size={20}
          />
        </TouchableOpacity> */}
      </View>
      <Text
        style={[styles.commons.text_footer, {
          marginTop: 35,
          color: paperTheme.dark == true ? 'white' : '#05375a'
        }]}>Apellido</Text>

      <View style={styles.commons.action}>
        <Feather
          name="lock"
          color={paperTheme.dark == true ? styles.colors.cultured : "#05375a"}
          size={20} />
        <TextInput
          placeholder='Your Password'
          placeholderTextColor={paperTheme.dark == true ? styles.colors.cultured : styles.colors.lightGray}
          style={[styles.commons.textInput, { color: paperTheme.dark == true ? styles.colors.cultured : styles.colors.lightGray }]}
          autoCapitalize="none"

        />
        {/* <TouchableOpacity onPress={() => { }}>
          <Feather
            name={data.secureTextEntry ? "eye-off" : "eye"}
            color="grey"
            size={20}
          />
        </TouchableOpacity> */}
      </View>
      <Text style={[styles.commons.text_footer, {
        marginTop: 35,
        color: paperTheme.dark == true ? 'white' : '#05375a'
      }]}>Email</Text>
      <View style={styles.commons.action}>
        <FontAwesome
          name="user-o"
          color={paperTheme.dark == true ? styles.colors.cultured : "#05375a"}
          size={20} />
        <TextInput
          placeholder='Your Password'
          placeholderTextColor={paperTheme.dark == true ? styles.colors.cultured : styles.colors.lightGray}
          style={[styles.commons.textInput, { color: paperTheme.dark == true ? styles.colors.cultured : styles.colors.lightGray }]}
          autoCapitalize="none"

        />
        {data.check_textInputChange ?
          <Animatable.View animation="bounceIn">
            <Feather
              name="check-circle"
              color="green"
              size={20}
            />
          </Animatable.View> : <></>}
      </View>
      <Text
        style={[styles.commons.text_footer, {
          marginTop: 35,
          color: paperTheme.dark == true ? 'white' : '#05375a'
        }]}>Nombre</Text>

      <View style={styles.commons.action}>
        <Feather
          name="lock"
          color={paperTheme.dark == true ? styles.colors.cultured : "#05375a"}
          size={20} />
        <TextInput
          placeholder='Your Password'
          placeholderTextColor={paperTheme.dark == true ? styles.colors.cultured : styles.colors.lightGray}
          style={[styles.commons.textInput, { color: paperTheme.dark == true ? styles.colors.cultured : styles.colors.lightGray }]}
          autoCapitalize="none"

        />
        {/* <TouchableOpacity onPress={() => { }}>
          <Feather
            name={data.secureTextEntry ? "eye-off" : "eye"}
            color="grey"
            size={20}
          />
        </TouchableOpacity> */}
      </View>
      {data.isvalidPassword ? null :
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.commons.errorMsg}>Password must be at least 6 characters</Text>
        </Animatable.View>
      }
    </View>
  )
}