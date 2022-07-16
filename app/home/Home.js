import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './HomeScreen';
import { LookFor } from './LookFor';
import { Library } from './Library';
import { Icon } from '@rneui/themed';
import HomeContext from '../../context/HomeContext/HomeContext';
import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from '../screens/DrawerContent';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LibraryPlayLists } from './LibraryScreens/LibraryPlayList';
import { AlbumRender } from './AlbumRender';
import { MadeForYou } from './MadeForYou';
import { MyPlayList } from './LibraryScreens/MyPlayList';
import { AddPlayList } from './LibraryScreens/AddPlayList';
import { AddMusicPlayList } from './LibraryScreens/AddMusicPlayList';
import { ModalInfoError } from '../components/ModalInfoError';
import { ProfileScreen } from './ProfileScreen';
import { RecentPlayed } from './RecentPlayed';
import TakiTriContext from '../../context/SecurityContext/TakiTriContext';
import { useDrawerStatus } from '@react-navigation/drawer';
import { AboutInfo } from '../screens/AboutInfo';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const StackLibrary = createNativeStackNavigator();
const StackLookFor = createNativeStackNavigator();


export default function Home({ navigation }) {
  global.pageStatus = "Home";
  global.navigation = navigation;
  const { loadLikedMusics, isModalErrorVisible, messageError, handleIsModalErrorVisible } = useContext(HomeContext)
  const { handlePaddingSnackBar } = React.useContext(TakiTriContext)
  //handlePaddingSnackBar("Home")
  React.useEffect(() => {
    // handlePaddingSnackBar("Home")
    loadLikedMusics();
  }, [])

  return (
    <>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Inicio" component={RootHomeTab} />
        <Drawer.Screen name="Perfil" component={ProfileScreen} />
        <Drawer.Screen name="Historial" component={RecentPlayed} />
        <Drawer.Screen name="Información" component={AboutInfo} />
      </Drawer.Navigator>
      <ModalInfoError
        modalVisible={isModalErrorVisible}
        setModalVisible={handleIsModalErrorVisible}
        message={messageError}
      >

      </ModalInfoError>
    </>

  );
}
const RootHomeTab = () => {
  const { handleReopenSnackBar, handleDestroySnackBar } = React.useContext(TakiTriContext);
  const isDrawerOpen = useDrawerStatus();
  if (isDrawerOpen == "open") {
    // handleDestroySnackBar();
  } else {
    // handleReopenSnackBar();
  }
  return <Tab.Navigator initialRouteName='Home'>
    <Tab.Screen name="Libreria" component={LibraryNavigation} options={{
      headerShown: false,
      tabBarIcon: ({ color, size }) => (
        <Icon name="bars" size={25} type="ant-design" color={color} />
      )
    }
    } />
    <Tab.Screen name="Home" component={MainNavigation} options={{
      headerShown: false,
      tabBarIcon: ({ color, size }) => (
        <Icon name="home" size={25} type="ant-design" color={color} />
      )

    }} />
    <Tab.Screen name="Buscar" component={LookForMusics} options={{
      headerShown: false,
      tabBarIcon: ({ color, size }) => (
        <Icon name="search" size={25} color={color} />
      )
    }} />
  </Tab.Navigator>;
}
const MainNavigation = () => {
  return (<Stack.Navigator initialRouteName='HomeScreen'>
    <Stack.Screen name="HomeScreen"
      component={HomeScreen}
      options={{ headerShown: false }}

    />
    <Stack.Screen name="ListenedNow"
      component={RecentPlayed}
      options={{ headerShown: false }}

    />

    <Stack.Screen name="PlayListOther"
      component={LibraryNavigation}
      options={{ headerShown: false }}

    />
    <Stack.Screen name="madeForYou"
      component={MadeForYou}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>);
}
const LibraryNavigation = () => {
  return (<StackLibrary.Navigator initialRouteName='PlayList'>
    <StackLibrary.Screen name="PlayList"
      component={MyPlayList}
      options={{ headerShown: false }}

    />
    <StackLibrary.Screen name="AddPlayList"
      component={AddPlayList}
      options={{ headerShown: false }}

    />
    <StackLibrary.Screen name="AddMusicPlayList"
      component={AddMusicPlayList}
      options={{ headerShown: false }}

    />


  </StackLibrary.Navigator>);
}

const LookForMusics = () => {
  return (<StackLookFor.Navigator initialRouteName='LookFor'>
    <StackLookFor.Screen name="LookFor"
      component={LookFor}
      options={{ headerShown: false }}

    />
  </StackLookFor.Navigator>);
}
