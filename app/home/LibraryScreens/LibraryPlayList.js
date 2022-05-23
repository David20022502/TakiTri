import { Icon } from '@rneui/themed';
import * as React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { AlbumItem } from '../../../src/Items/AlbumItem';
import { MusicItem } from '../../../src/Items/MusicItem';
import { getMusics } from '../../../src/services/MusicServices';

export const LibraryPlayLists = () => {
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
          <View style={{ flexDirection: "row", justifyContent: "space-between",width:Dimensions.get("window").width,paddingHorizontal:50 }}>

            <TouchableOpacity
              onPress={() => { }}
            >
              <View style={{ width: 50, height: 50, backgroundColor: "#C2C2C2", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 25, paddingTop: 2 }}>
                <Icon name="sync" size={30}  color={"black"} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { }}
            >
              <View style={{ width: 50, height: 50, backgroundColor: "black", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 25, paddingTop: 2 }}>
                <Icon name="plus" size={30} type="font-awesome" color={"#FDFDFD"} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { }}
            >
              <View style={{ width: 50, height: 50, backgroundColor: "#C2C2C2", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 25, paddingTop: 2 }}>
                <Icon name="trash" size={30} type="font-awesome" color={"black"} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ width: 100, height: 120, flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 50, paddingTop: 8, marginVertical: 20 }}>
          <Icon name="user-circle" size={100} type="font-awesome" />
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems:"center",
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
