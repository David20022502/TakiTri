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

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const StackLibrary = createNativeStackNavigator();


export default function Home({ navigation }) {
  global.navigation = navigation;
  const { pageStatus } = useContext(HomeContext)
  return (
    <>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Inicio" component={RootHomeTab} />
      </Drawer.Navigator>
    </>

  );
}
const RootHomeTab = () => {
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
    <Tab.Screen name="Buscar" component={LookFor} options={{
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
      component={LibraryPlayLists}
      options={{ headerShown: false }}

    />
    <Stack.Screen name="Favorites"
      component={AlbumRender}
      options={{ headerShown: false }}

    />
    <Stack.Screen name="PlayList"
      component={Library}
      options={{ headerShown: false }}

    />
      <Stack.Screen name="madeForYou"
      component={MadeForYou}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="AlbumListMusic"
      component={AlbumRender}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>);
}
const LibraryNavigation = () => {
  return (<StackLibrary.Navigator initialRouteName='PlayList'>
   
   
    <StackLibrary.Screen name="Favorites"
      component={AlbumRender}
      options={{ headerShown: false }}

    />
    <StackLibrary.Screen name="PlayList"
      component={Library}
      options={{ headerShown: false }}

    />
     
  </StackLibrary.Navigator>);
}
