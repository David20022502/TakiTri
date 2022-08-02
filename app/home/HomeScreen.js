import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ButtonOwnHeader } from '../../src/components/Components';
import { Icon } from '@rneui/themed';
import { openDatabase } from "expo-sqlite";
import { MainHome } from './HomeScreens/MainHome';
import { TrendHome } from './HomeScreens/TrendHome';
import { FavoriteHome } from './HomeScreens/FavoriteHome';
import { AlbumItem } from '../../src/Items/AlbumItem';
import MusicRecent from "../../assets/images/MusicRecent.jpg";
import favorites from "../../assets/images/favorites.jpg";
import playList from "../../assets/images/playList.jpg";
import madeForYou from "../../assets/images/madeForYou.jpg";

import FondoEcuador from "../../assets/images/FondoEcuador.png";

import myPlayListImg from "../../assets/images/myPlayListImg.png";

import recentPlayedImg from "../../assets/images/recentPlayedImg.png";
import favoritosImg from "../../assets/images/favoritosImg.png";


import HomeContext from '../../context/HomeContext/HomeContext';

import { createTableDatabase, deleteDataBase, getMaxNumberDataBase, getRecentPlayed } from '../../src/services/DataBase';
import TakiTriContext from '../../context/SecurityContext/TakiTriContext';
import { getAlbumes } from '../../src/services/MusicServices';
import { useIsFocused } from '@react-navigation/native';

export const HomeScreen = ({ navigation }) => {
  //const [isSelected, setIsSelected] = React.useState("MainPage");
  global.pageStatus = "HomeScreen";

  const { loadAlbumAll, handleMaxNumberDataBase, audioPlayer, handleMusicPlayed, musicPlayedList } = React.useContext(HomeContext)
  const { userTakiTri, handlePaddingSnackBar } = React.useContext(TakiTriContext);
  const [musicPlayed, setMusicPlayed] = React.useState([]);
  const [maxNumberDataBase, setMaxNumberDataBase] = React.useState([]);
  React.useEffect(() => {
    fillAppStatus();
    getAlbumes(loadAlbumAll, 1000);
  }, [])
  React.useEffect(() => {
    handleMusicPlayed(musicPlayed, musicPlayedList, true);
    if (musicPlayed.length > 0) {
      getMaxNumberDataBase(setMaxNumberDataBase);
      //handleMaxNumberDataBase
    }
  }, [musicPlayed])
  React.useEffect(() => {
    if (maxNumberDataBase.length > 0 && maxNumberDataBase[0].maxNumber) {
      handleMaxNumberDataBase(maxNumberDataBase[0].maxNumber);
    }
  }, [maxNumberDataBase])
  React.useEffect(() => {
    handlePaddingSnackBar(54)
  }, [useIsFocused])



  const fillAppStatus = () => {
    if (global.dbStatus == null) {
      global.dbStatus = openDatabase("historymusics");
    }
    //deleteDataBase();
    createTableDatabase();
    getRecentPlayed(userTakiTri.id, setMusicPlayed);
  };
  const itemAlbumFavorite = {
    "author": "",
    "genre_name": "Yaraví",
    "id": "4ESAmUoaJ31q8xJMke9u",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/borrador-a0724.appspot.com/o/albumes%2Fsinf%C3%B3nico%20a%20lo%20grande.jpg?alt=media&token=cbe92664-1094-4687-9e5e-f4ab3d484bba",
    "image_reference": "albumes/sinfónico a lo grande",
    "name": "Favoritos",
    "year": 2017,
  }
  return (
    <View style={styles.container}>
      <View style={{flexDirection:"row",justifyContent:"space-around"}}>
        <AlbumItem onPresseAlbum={() => { navigation.navigate("ListenedNow") }} title={"Últimas Reproducciones"} imageUri={recentPlayedImg}></AlbumItem>
        <AlbumItem onPresseAlbum={() => { navigation.navigate("Favorites", { itemAlbum: itemAlbumFavorite, typeAlbum: "FAVORITES" }) }} title={"Favoritos"} imageUri={favoritosImg}></AlbumItem>

      </View>
      <View style={{flexDirection:"row",justifyContent:"space-around"}}>
        <AlbumItem onPresseAlbum={() => { navigation.navigate("PlayListOther") }} title={"Mis PlayLists"} imageUri={myPlayListImg}></AlbumItem>
        <AlbumItem onPresseAlbum={() => { navigation.navigate("madeForYou", { isSwitchVisibleType: false }) }} title={"Hecho para ti"} imageUri={FondoEcuador}></AlbumItem>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height:Dimensions.get("window").height-150,
    flexDirection:"column",
    justifyContent:"center"
  },
  body: {
    flex: 1,
  },
  header: {
    width: Dimensions.get("window").width,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20
  },
  headerMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    paddingHorizontal: 20,
    alignItems: "center",

  },
  containerLine: {
    marginTop: 15,
    position: "relative",
    flexDirection: "column",
    alignItems: "center",
  },
  lineStyle: {
    backgroundColor: "#C6C6C6",
    width: Dimensions.get("window").width,
    height: 1,
  },
  title: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 35,
    lineHeight: 52,
    color: "#000000",
    textShadowColor: 'rgba(0, 0, 0, 0.25)',

    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  containerItems: {
    flexDirection: "column",
  },
  containerItemsFinal: {
    flexDirection: "column",
    flex: 1,
  },
  conatinerTitleHeaderItem: {
    marginTop: 10,
    flexDirection: "column",
    justifyContent: "center",
    justifyContent: "center",
    paddingHorizontal: 5
  },
  textTitleItem: {

    fontStyle: "normal",
    fontSize: 20,
    lineHeight: 24,
    color: "white",
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  textStyleSeeMore: {

    fontStyle: "normal",
    fontSize: 15,
    lineHeight: 24,
    color: "#C8383F",
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  scrollViewAlbum: {
    paddingLeft: 10
  },
  scrollViewMusic: {
    paddingBottom: 40,
    paddingLeft: 10
  }
});
