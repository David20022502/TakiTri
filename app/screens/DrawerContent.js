import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Drawer,

} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icon } from '@rneui/themed';
import { darkThemText } from '../../constants/Colors';
import TakiTriContext from '../../context/SecurityContext/TakiTriContext';
import HomeContext from '../../context/HomeContext/HomeContext';


export function DrawerContent(props) {

    const paperTheme = useTheme();

    const { handleLogOut, userTakiTri, handleDestroySnackBar } = React.useContext(TakiTriContext);

    const { finishAllMusic } = React.useContext(HomeContext);



    return (
        <View style={{ flex: 1, backgroundColor: "#12485B" }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15,justifyContent:"center" }}>
                            <Avatar.Image
                                source={{
                                    uri: userTakiTri.imageUser
                                }}
                                size={100}
                            />
                           
                        </View>
                        <View style={{ marginLeft: 15, flexDirection: 'column',alignItems:"center" }}>
                                <Title style={styles.title}>{userTakiTri.names}</Title>
                                <Caption style={styles.caption}>{userTakiTri.user}</Caption>
                            </View>

                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="home"
                                    color={darkThemText}
                                    size={size}
                                />
                            )}
                            labelStyle={{ color: darkThemText }}

                            label="Inicio"
                            onPress={() => {
                                props.navigation.navigate("Inicio")
                            }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="user"
                                    color={darkThemText}
                                    size={size}
                                    type={"font-awesome"}
                                />
                            )}
                            labelStyle={{ color: darkThemText }}

                            label="  Perfil"
                            onPress={() => { props.navigation.navigate('Perfil') }}
                        />

                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="history"
                                    color={darkThemText}
                                    size={size}

                                />
                            )}
                            labelStyle={{ color: darkThemText }}

                            label="Historial"
                            onPress={() => { props.navigation.navigate('ListenedNow') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="infocirlce"
                                    color={darkThemText}
                                    size={size}
                                    type={"antdesign"}
                                />
                            )}
                            labelStyle={{ color: darkThemText }}

                            label="Acerca de"
                            onPress={() => { props.navigation.navigate('Información') }}
                        />
                    </Drawer.Section>

                </View>
                <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="exit-to-app"
                                color={darkThemText}
                                size={size}
                            />
                        )}
                        labelStyle={{ color: darkThemText }}
                        label="Cerrar Sesión"
                        onPress={() => {
                            handleLogOut()
                            finishAllMusic()
                        }}
                    />
                </Drawer.Section>

            </DrawerContentScrollView>
            <Drawer.Section>
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
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',

    },
    caption: {
        fontSize: 12,
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