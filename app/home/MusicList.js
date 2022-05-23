import { Icon } from '@rneui/themed';
import * as React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { AlbumItem } from '../../../src/Items/AlbumItem';
import { MusicItem } from '../../../src/Items/MusicItem';
import disco from "../../../assets/images/disco.jpeg";
import pop from "../../../assets/images/pop.png";
import electronica from "../../../assets/images/electronica.jpg";
import balada from "../../../assets/images/balada.jpg";
import hiphop from "../../../assets/images/hiphop.jpg";
import rock from "../../../assets/images/rock.jpg";

export const MusicList = ({onPresseAlbum,navigation}) => {
  const data1 = [[{
    id: "1",
    title: "Música Disco",
    author: "Oliver Heldens",
    imagePath: disco,
  }, {
    id: "2",
    title: "Pop",
    author: "Oliver Heldens",
    imagePath: pop,
  }],[{
    id: "3",
    title: "Electrónica",
    author: "Oliver Heldens",
    imagePath: electronica,
  }, {
    id: "4",
    title: "Baladas",
    author: "Oliver Heldens",
    imagePath: balada,
  }], [{
    id: "5",
    title: "Hip Hop",
    author: "Oliver Heldens",
    imagePath: hiphop,
  }, {
    id: "6",
    title: "Rock",
    author: "Oliver Heldens",
    imagePath: rock,
  }]]
  const renderItemMusic = (item) => {
    return (
      <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:5}}>
        <AlbumItem onPresseAlbum={()=>{navigation.navigate("Favorites")}} imageUri={item.item[0].imagePath} title={item.item[0].title}></AlbumItem>
        <AlbumItem onPresseAlbum={()=>{navigation.navigate("Favorites")}} imageUri={item.item[1].imagePath} title={item.item[1].title}></AlbumItem>
      </View>

    );
  }
  return (
    <View style={{ flex: 1, }}>

      <View style={styles.containerItemsFinal}>
        <View style={styles.conatinerTitleHeaderItem}>
        
          <View style={{ position: "absolute", right: 20 }}>

            <TouchableOpacity
              onPress={() => { }}
            >
              <View style={{ width: 30, height: 30, backgroundColor: "gray", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 25, paddingTop: 2 }}>
                <Icon name="plus" size={20} type="font-awesome" color={"#FDFDFD"} />
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.textTitleItem}>
          Tus PlayLists
          </Text>
        </View>
       
        <View style={styles.scrollViewMusic}>
          <FlatList
            data={data1}
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
    position: "relative",
    height:65,
    marginBottom:10
  },
  textTitleItem: {
    marginTop:30,
    fontStyle: "normal",
    fontSize: 30,
    color: "white",
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    height:50,
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
   paddingHorizontal:5
  }
});
