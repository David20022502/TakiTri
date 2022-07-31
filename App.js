import 'react-native-gesture-handler';

import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { FirstSplash } from './app/screens/FirstSplash';
import { Navigation } from './navigation/Navigation';
import { firebaseinitializeApp } from './src/services/FirebaseConection';
import {
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';
import TakiTriContext from './context/SecurityContext/TakiTriContext';
import { TakiTriStates } from './context/SecurityContext/TakiTriStates';
import { createTableDatabaseChecker } from './src/services/DataBase';
import { openDatabase } from "expo-sqlite";

function getDimensions() {
  let d = Dimensions.get("window").width;
  let result = d - 208;
  global.width = d;
}
export default function App() {
  React.useEffect(() => {
    
    getDimensions();
    firebaseinitializeApp();
    //fillAppChecker();
  }, [])
  const fillAppChecker = () => {
    if (global.dbStatusChecker == null) {

      global.dbStatusChecker = openDatabase("checkerapp");
    }
    console.log("inciando cretae checker")
     createTableDatabaseChecker();
  };
  const CustomDarkTheme = {
    ...PaperDarkTheme,
    colors: {
      ...PaperDarkTheme.colors,
      background: '#111b21',
      text: '#ffffff'
    }
  }
  const MyTheme = {
    dark: true,
    colors: {
      primary: 'rgb(255, 45, 85)',
      background: '#FDFDFD',
      card: '#20DACA',
      text: 'black',
      border: '#2a3942',
      notification: 'rgb(255, 69, 58)',
      color: "white"
    },
  };


  return (
    <PaperProvider theme={CustomDarkTheme}>
      <NavigationContainer theme={MyTheme}>
        <StatusBar backgroundColor='#20DACA'></StatusBar>
        <TakiTriStates>
          <Navigation>
          </Navigation>
        </TakiTriStates>

      </NavigationContainer>
    </PaperProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
