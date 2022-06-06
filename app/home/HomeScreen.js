import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ButtonOwnHeader } from '../../src/components/Components';
import { Icon } from '@rneui/themed';
import { MainHome } from './HomeScreens/MainHome';
import { TrendHome } from './HomeScreens/TrendHome';
import { FavoriteHome } from './HomeScreens/FavoriteHome';
import { AlbumItem } from '../../src/Items/AlbumItem';
import MusicRecent from "../../assets/images/MusicRecent.jpg";
import favorites from "../../assets/images/favorites.jpg";
import playList from "../../assets/images/playList.jpg";
import madeForYou from "../../assets/images/madeForYou.jpg";
import HomeContext from '../../context/HomeContext/HomeContext';

export const HomeScreen = ({ navigation }) => {
  //const [isSelected, setIsSelected] = React.useState("MainPage");
  const { audioPlayer } = React.useContext(HomeContext)
  const itemAlbumFavorite={
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
        <AlbumItem onPresseAlbum={()=>{navigation.navigate("madeForYou")}} title={"Ultimas Reproducciones"} imageUri={MusicRecent}></AlbumItem>
        <AlbumItem onPresseAlbum={()=>{navigation.navigate("Favorites",{itemAlbum:itemAlbumFavorite,typeAlbum:"FAVORITES"})}} title={"Favoritos"} imageUri={favorites}></AlbumItem>
        <AlbumItem onPresseAlbum={()=>{navigation.navigate("madeForYou")}} title={"Mis PlayLists"} imageUri={playList}></AlbumItem>
        <AlbumItem onPresseAlbum={()=>{navigation.navigate("madeForYou")}} title={"Hecho para ti"} imageUri={madeForYou}></AlbumItem>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap:"wrap",
    justifyContent:"space-around",
    position: "relative",
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
    justifyContent:"center",
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
