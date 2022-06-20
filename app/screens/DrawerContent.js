import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icon } from '@rneui/themed';
import { darkThemText } from '../../constants/Colors';
import TakiTriContext from '../../context/SecurityContext/TakiTriContext';


export function DrawerContent(props) {

    const paperTheme = useTheme();

    const { handleLogOut,userTakiTri,handleDestroySnackBar } = React.useContext(TakiTriContext);

  

    return(
        <View style={{flex:1,backgroundColor:"#12485B"}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={{
                                    uri: 'https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/1bbe7/Twitter-NFT-profile.jpg'
                                }}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{userTakiTri.names}</Title>
                                <Caption style={styles.caption}>{userTakiTri.user}</Caption>
                            </View>
                        </View>

                       
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home" 
                                color={darkThemText}
                                size={size}
                                />
                            )}
                            labelStyle={{color:darkThemText}}

                            label="Inicio"
                            onPress={() => {props.navigation.navigate("Inicio")
                            }}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="user" 
                                color={darkThemText}
                                size={size}
                                type={"font-awesome"}
                                />
                            )}
                            labelStyle={{color:darkThemText}}

                            label="  Perfil"
                            onPress={() => {props.navigation.navigate('Perfil')}}
                        />
                       
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="history" 
                                color={darkThemText}
                                size={size}
                                
                                />
                            )}
                            labelStyle={{color:darkThemText}}

                            label="Historial"
                            onPress={() => {props.navigation.navigate('')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="infocirlce" 
                                color={darkThemText}
                                size={size}
                                type={"antdesign"}
                                />
                            )}
                            labelStyle={{color:darkThemText}}

                            label="Acerca de"
                            onPress={() => {props.navigation.navigate('')}}
                        />
                    </Drawer.Section>
                  
                </View>
                
            </DrawerContentScrollView>
            <Drawer.Section>
            </Drawer.Section>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={darkThemText}
                        size={size}
                        />
                    )}
                    labelStyle={{color:darkThemText}}
                    label="Cerrar Sesión"
                    onPress={() => {handleLogOut()}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
      
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 0
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });