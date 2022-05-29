import { Icon } from '@rneui/themed';
import * as React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { AlbumItem } from '../../src/Items/AlbumItem';
import { getAlbumes } from '../../src/services/MusicServices';


export const MadeForYou = ({ onPresseAlbum, navigation }) => {
  const [albumes, setAlbumes] = React.useState([]);
  React.useEffect(() => {
    getAlbumes(setAlbumes);
  }, [])
  const renderItemMusic = (item) => {
    if (item.item.length > 1) {
      return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 5 }}>
          <AlbumItem onPresseAlbum={() => { navigation.navigate("AlbumListMusic",{itemAlbum:item.item[0],typeAlbum:"ALBUM"}) }} imageUri={item.item[0].imageURL} title={item.item[0].name}></AlbumItem>
          <AlbumItem onPresseAlbum={() => { navigation.navigate("AlbumListMusic",{itemAlbum:item.item[1],typeAlbum:"ALBUM"}) }} imageUri={item.item[1].imageURL} title={item.item[1].name}></AlbumItem>
        </View>

      );
    } else {
      return (
        <View style={{ flexDirection: "row", justifyContent: "flex-start", paddingHorizontal: 5 }}>
          <AlbumItem onPresseAlbum={() => { navigation.navigate("AlbumListMusic",{itemAlbum:item.item[0],typeAlbum:"ALBUM"}) }} imageUri={item.item[0].imageURL} title={item.item[0].name}></AlbumItem>
        </View>

      );
    }

  }
  return (
    <View style={{ flex: 1, }}>

      <View style={styles.containerItemsFinal}>
        <View style={styles.conatinerTitleHeaderItem}>
          <Text style={styles.textTitleItem}>
            Hecho Para ti
          </Text>
        </View>

        <View style={styles.scrollViewMusic}>
          {
            albumes.length > 0 && <FlatList
              data={albumes}
              renderItem={(item) => renderItemMusic(item)}
              key={item => item.id}
            />
          }


        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  containerItems: {
    flexDirection: "column",
  },
  containerItemsFinal: {
    flexDirection: "column",
    flex: 1,
  },
  conatinerTitleHeaderItem: {
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    position: "relative",
    height: 65,
    marginBottom: 10
  },
  textTitleItem: {
    marginTop: 10,
    fontStyle: "normal",
    fontSize: 30,
    color: "white",
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    height: 50,
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
    paddingBottom: 100,
    paddingHorizontal: 5,
    paddingTop:0
  }
});
