import { Icon } from '@rneui/themed';
import * as React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { AlbumItem } from '../../../src/Items/AlbumItem';
import { MusicItem } from '../../../src/Items/MusicItem';
import { getMusics } from '../../../src/services/MusicServices';

export const FavoriteScreen = () => {
  global.pageStatus="FavoriteScreen";

  const[datas,setDatas]=React.useState(null)

  React.useEffect(()=>{
    getMusics(setDatas);
   },[])
  const data1 = [{
    id: "1",
    title: "Deatails",
    author: "Oliver Heldens",
    imagePath: "",
  }, {
    id: "2",
    title: "Deatails",
    author: "Oliver Heldens",
    imagePath: "",
  }, {
    id: "3",
    title: "Deatails",
    author: "Oliver Heldens",
    imagePath: "",
  }, {
    id: "4",
    title: "Deatails",
    author: "Oliver Heldens",
    imagePath: "",
  }, {
    id: "5",
    title: "Deatails",
    author: "Oliver Heldens",
    imagePath: "",
  }, {
    id: "6",
    title: "Deatails",
    author: "Oliver Heldens",
    imagePath: "",
  }]
  const renderItemMusic = (item) => {
    return (<MusicItem music={item.item} playList={datas} ></MusicItem>);
  }
  return (
    <View style={{ flex: 1, }}>

      <View style={styles.containerItemsFinal}>
        <View style={styles.conatinerTitleHeaderItem}>
          <View style={{ width: 100, height: 100, backgroundColor: "#97DEF9", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 50, paddingTop: 8 ,marginVertical:20}}>
            <Icon name="heart" size={60} type="font-awesome" color={"#FDFDFD"} />
          </View>
          
        </View>

        <View style={styles.scrollViewMusic}>
          <FlatList
            data={datas}
            renderItem={(item) => renderItemMusic(item)}
            key={item => item.id}
          />

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
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    position: "relative"
  },
  textTitleItem: {

    fontStyle: "normal",
    fontSize: 20,
    lineHeight: 24,
    color: "#C8383F",
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
