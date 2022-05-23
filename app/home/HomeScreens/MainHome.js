import * as React from 'react';
import { ScrollView, StyleSheet, Text, View,TouchableOpacity, FlatList } from 'react-native';
import Sound from 'react-native-sound';
import HomeContext from '../../../context/HomeContext/HomeContext';
import { AlbumItem } from '../../../src/Items/AlbumItem';
import { MusicItem } from '../../../src/Items/MusicItem';
import { getMusics } from '../../../src/services/MusicServices';


export const MainHome = () => {
  const { loadCurrentPlayList} = React.useContext(HomeContext)

  const[datas,setDatas]=React.useState(null)
  React.useEffect(()=>{
   getMusics(setDatas);
  },[])

  //let tempPlayList=React.useRef([])
  const renderItemMusic = (item) => {
   // console.log("indice a pasar",index)
   /* let tempUrlMusic=getUrl(item.item.urlMusic)
    let tempUrlPoster=getUrl(item.item.urlPoster)
    let tempTitle = resolveTitle(item.item.title)
    let itemTemp={
      title: tempTitle,
      author: item.item.author,
      duracion: "",
      urlMusic: tempUrlMusic,
      urlPoster:tempUrlPoster
    }
    tempPlayList.current.push(itemTemp);
    console.log("------------")
    console.log("data:",tempPlayList.current)*/
    
    return (<MusicItem music={item.item} playList={datas} ></MusicItem>);
  }
  const getUrl = (url) => {
    let tem1 = url.replace("https://", "")
    tem1=tem1.split("/");
    return "https://docs.google.com/uc?export=download&id="+tem1[3];
  }
  const resolveTitle=(title)=>{
    let tempTitle=title.replace("y2mate.com","");
    tempTitle=tempTitle.replace("-","");
    tempTitle=tempTitle.replace("Remix","");
    tempTitle=tempTitle.replace("Audio","");
    tempTitle=tempTitle.replace("Official","");
    tempTitle=tempTitle.replace("Lyric","");
    tempTitle=tempTitle.replace("video","");
    tempTitle=tempTitle.replace("Video","");
    tempTitle=tempTitle.replace("Music","");
    tempTitle=tempTitle.replace("Oliver","");
    tempTitle=tempTitle.replace("Heldens","");
    tempTitle=tempTitle.trim();
    return tempTitle;
  }
  return (
    <View style={{ flex: 1, }}>
      <View style={styles.containerItems}>
        <View style={styles.conatinerTitleHeaderItem}>
          <Text style={styles.textTitleItem}>
            Ultimas Reproducciones
          </Text>
          <TouchableOpacity>
          <Text style={styles.textStyleSeeMore}>
            ver mas
          </Text>
          </TouchableOpacity>
          
        </View>
        <View style={styles.scrollViewAlbum}>
          <ScrollView horizontal>
            <AlbumItem></AlbumItem>
            <AlbumItem></AlbumItem>
            <AlbumItem></AlbumItem>
          </ScrollView>
        </View>
      </View>
      <View style={styles.containerItems}>
        <View style={styles.conatinerTitleHeaderItem}>
          <Text style={styles.textTitleItem}>
          Músicas Nuevas 
          </Text>
          <TouchableOpacity>
          <Text style={styles.textStyleSeeMore}>
            ver mas
          </Text>
          </TouchableOpacity>
          
        </View>
        <View style={styles.scrollViewAlbum}>
          <ScrollView horizontal>
            <AlbumItem></AlbumItem>
            <AlbumItem></AlbumItem>
            <AlbumItem></AlbumItem>
          </ScrollView>
        </View>
      </View>
      <View style={styles.containerItemsFinal}>
        <View style={styles.conatinerTitleHeaderItem}>
          <Text style={styles.textTitleItem}>
          Músicas Populares 
          </Text>
          <TouchableOpacity>
          <Text style={styles.textStyleSeeMore}>
            ver mas
          </Text>
          </TouchableOpacity>
          
        </View>
        <View style={styles.scrollViewMusic}>
          {
            datas&&  <FlatList
            data={datas}
            renderItem={(item) => renderItemMusic(item)}
            key={(item) => {
              console.log("key",item)
              return item.urlMusic}}
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
  containerItemsFinal:{
    flexDirection: "column",
    flex:1,
  },
  conatinerTitleHeaderItem: {
    marginTop:10,
    flexDirection: "row",
    justifyContent:"space-between",
    paddingHorizontal:20
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
  textStyleSeeMore:{

    fontStyle: "normal",
    fontSize: 15,
    lineHeight: 24,
    color: "#C8383F",
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  scrollViewAlbum: {
        paddingLeft:10
  },
  scrollViewMusic:{
    paddingBottom:40,
    paddingLeft:10
  }
});

const data = {
  posterArtist: "https://drive.google.com/file/d/12Os8JeDtFgMx4jauDYUIYTVk7ZBlT72t/view?usp=sharing",
  musics: [
     {
      "author": "Oliver heldens",
      "duracion": "",
      "title": "Calvin Harris Dua Lipa  One Kiss",
      "urlMusic": "https://docs.google.com/uc?export=download&id=1JXHj1ayKsIDq7rj0I6uY3bu3RorEAO5x",
      "urlPoster": "https://docs.google.com/uc?export=download&id=1Suv8i7gJ27wtsvkaACm3sebMICT2inyn",
    },
     {
      "author": "Oliver heldens",
      "duracion": "",
      "title": "Calvin Harris ft Tom Grennan  By Your Side    (1)",
      "urlMusic": "https://docs.google.com/uc?export=download&id=1n-sNE2v5f2ObXJYRSN4PMeAtKrXa067k",
      "urlPoster": "https://docs.google.com/uc?export=download&id=1Cn459kf90RudB8GnMBMbnkluZ6kQpvnK",
    },
     {
      "author": "Oliver heldens",
      "duracion": "",
      "title": "Calvin Harris ft Tom Grennan  By Your Side",
      "urlMusic": "https://docs.google.com/uc?export=download&id=1hefoNemlPpmzqpJc0xtQwWJc2xI4wf3C",
      "urlPoster": "https://docs.google.com/uc?export=download&id=1Jvwf3gqw21DU8c2ZYY8qpgNvgxbFZtu_",
    },
     {
      "author": "Oliver heldens",
      "duracion": "",
      "title": "Chic  Le Freak",
      "urlMusic": "https://docs.google.com/uc?export=download&id=1SDT8FA_basyZOLGpA2VjkmjbSsutaakP",
      "urlPoster": "https://docs.google.com/uc?export=download&id=15ZXdI6goUQw2cdSyTc6fOnlQVQ3-pkF8",
    },
     {
      "author": "Oliver heldens",
      "duracion": "",
      "title": "David Guetta ft Anne Marie  Dont Leave Me Alone",
      "urlMusic": "https://docs.google.com/uc?export=download&id=1B46BRoYIRkmwTJZWUqOolhe0RzNYV-OD",
      "urlPoster": "https://docs.google.com/uc?export=download&id=1yNk5JNRtzFhWTZVdNsOyQqWtO2akqwki",
    },
     {
      "author": "Oliver heldens",
      "duracion": "",
      "title": "Glass Animals  Heat Waves",
      "urlMusic": "https://docs.google.com/uc?export=download&id=1cdC_9xjk6x1CI8I6CYmm1REJFkWAFzn6",
      "urlPoster": "https://docs.google.com/uc?export=download&id=1t0g-B-WhjvKvhM5zPTBR1ygbbvE9TuN6",
    },
     {
      "author": "Oliver heldens",
      "duracion": "",
      "title": "Aquarius",
      "urlMusic": "https://docs.google.com/uc?export=download&id=16KJnYHifPObL72wStpXy3pP2-qJmq0Vo",
      "urlPoster": "https://docs.google.com/uc?export=download&id=1SVRKlAv82EhlVG3MYyZT6-6E8Ag0Fu0M",
    },
     {
      "author": "Oliver heldens",
      "duracion": "",
      "title": "Break This Habit feat Kiko Bun",
      "urlMusic": "https://docs.google.com/uc?export=download&id=1x2JFuhqcmmHmqxf5MfJ3BPWXHkCnn8dD",
      "urlPoster": "https://docs.google.com/uc?export=download&id=1qaYMMyv555iWZmovSWUQy3sFoyznhohJ",
    },
     {
      "author": "Oliver heldens",
      "duracion": "",
      "title": "Fire In My Soul Justin Caruso   ft Shungudzo",
      "urlMusic": "https://docs.google.com/uc?export=download&id=1r05snF2k7m9PGudYTlEJmeo0TPJzYbyb",
      "urlPoster": "https://docs.google.com/uc?export=download&id=13RJiQE15Xid_LuTwl1RI_MC6tJNxLEEH",
    },
     {
      "author": "Oliver heldens",
      "duracion": "",
      "title": "Funkin Matt  Somebody feat Bright Sparks",
      "urlMusic": "https://docs.google.com/uc?export=download&id=1IAeWF9gmE_pWYXDzI0wywK4KB_8TFyTV",
      "urlPoster": "https://docs.google.com/uc?export=download&id=1ko9MHVqZIG-2khDHr4Z_9ishZn4h9gGs",
    },
  ]
}




