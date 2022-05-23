import * as React from 'react';
import { Text, View, StyleSheet, Dimensions,TouchableOpacity } from 'react-native';

import { PlayListsScreen } from './LibraryScreens/PlayListsScreen';
import HomeContext from '../../context/HomeContext/HomeContext';
export const Library = ({navigation}) => {
  const {pageStatus}=React.useContext(HomeContext)

  const [isSelected, setIsSelected] = React.useState("Favorites");
  React.useEffect(()=>{
    console.log("page satus",pageStatus)
  },[pageStatus])
  const changePageAlbum=()=>{
    setIsSelected("PLAY_LIST_ALBUM_PAGE")
  }
  return (
    <View style={styles.container}>
      <PlayListsScreen navigation={navigation}></PlayListsScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
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
    paddingHorizontal: 80
  },
  headerMain:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop:40,
    paddingHorizontal: 20,
    alignItems:"center",

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
});
