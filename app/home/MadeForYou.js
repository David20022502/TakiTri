import { Icon } from '@rneui/themed';
import * as React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList, BackHandler } from 'react-native';
import { InputLookForAlbumMusic } from '../../src/components/Components';
import { AlbumItem } from '../../src/Items/AlbumItem';
import { getAlbumes } from '../../src/services/MusicServices';


export const MadeForYou = ({ onPresseAlbum, navigation }) => {
  global.pageStatus = "MadeForYou";
  const [albumes, setAlbumes] = React.useState([]);
  const [isLookingFor, setIslookingFor] = React.useState(false)
  const [textLookFor, setTextLookFor] = React.useState("")
  const [datasLookFor, setDatasLookFor] = React.useState(null)
  let isLookingForRef = React.useRef(false);

  React.useEffect(() => {
    getAlbumes(setAlbumes);
    const backAction = () => {
      navigation.popToTop();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [])
  React.useEffect(() => {
    isLookingForRef.current = isLookingFor;
    if (!isLookingFor) {
      setDatasLookFor(null);
      setTextLookFor("");
    }
  }, [isLookingFor])
  React.useEffect(() => {
    if (isLookingFor) {
      lookForAlbum();
    } else {
      setDatasLookFor(null);
    }

  }, [textLookFor])
  const lookForAlbum = () => {
    if (textLookFor.length > 0) {
      let tempAlbumOriginal = [];
      for (let i = 0; i < albumes.length; i++) {
        let tempdata = albumes[i];
        for (let j = 0; j < tempdata.length; j++) {
          tempAlbumOriginal.push(tempdata[j])
        }
      }
      //let albumes=tempAlbumOriginal;
      let tempAlbumesOrder = [];
      console.log("totl de albumes", tempAlbumOriginal.length - 1);
      for (let i = 0; i < tempAlbumOriginal.length; i++) {
        let item = tempAlbumOriginal[i];
        const NOMBRE = item.genre_name;
        const AUTOR = item.author;
        let itemAlbum = [];
        if (i % 2 == 0) {


          itemAlbum.push(tempAlbumOriginal[i]);


          if (i + 1 < tempAlbumOriginal.length) {
            if (NOMBRE.toLowerCase().includes(textLookFor.toLowerCase()) ||
              AUTOR.toLowerCase().includes(textLookFor.toLowerCase())) {
              itemAlbum.push(tempAlbumOriginal[i + 1]);
            }

          }
          if (NOMBRE.toLowerCase().includes(textLookFor.toLowerCase()) ||
            AUTOR.toLowerCase().includes(textLookFor.toLowerCase())) {
            itemAlbum.push(tempAlbumOriginal[i + 1]);
          }
          tempAlbumesOrder.push(itemAlbum);

        }

      }
      //  resfreshFn(tempAlbumesOrder)
      setDatasLookFor(tempAlbumesOrder);
    } else {
      setDatasLookFor(null)
    }
  }
  const renderItemMusic = (item) => {
    if (item.item.length > 1) {
      return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 5 }}>
          <AlbumItem onPresseAlbum={() => { navigation.navigate("AlbumListMusic", { itemAlbum: item.item[0], typeAlbum: "ALBUM" }) }} imageUri={item.item[0].imageURL} title={item.item[0].name}></AlbumItem>
          <AlbumItem onPresseAlbum={() => { navigation.navigate("AlbumListMusic", { itemAlbum: item.item[1], typeAlbum: "ALBUM" }) }} imageUri={item.item[1].imageURL} title={item.item[1].name}></AlbumItem>
        </View>

      );
    } else {
      return (
        <View style={{ flexDirection: "row", justifyContent: "flex-start", paddingHorizontal: 5 }}>
          <AlbumItem onPresseAlbum={() => { navigation.navigate("AlbumListMusic", { itemAlbum: item.item[0], typeAlbum: "ALBUM" }) }} imageUri={item.item[0].imageURL} title={item.item[0].name}></AlbumItem>
        </View>

      );
    }

  }
  return (
    <View style={{ flex: 1,position:"relative" }}>
      <View style={{ position: "absolute", top: 10, left: 20 }}>

        <Icon name="back" size={30} type="ant-design" color="black" onPress={() => { navigation.goBack()}} />


      </View>
      <View style={styles.containerItemsFinal}>
        <View >
          <View style={styles.conatinerTitleHeaderItem}>
            <Text style={styles.textTitleItem}>
              Hecho Para ti
            </Text>

          </View>
          <View style={styles.conatinerTitleHeaderItem}>
            <Text style={styles.textSubTitleItem}>
              Todas los Álbumes y PlayLists lo encuentras en esta sección
            </Text>

          </View>
          {
            isLookingFor ? <>
              <InputLookForAlbumMusic
                onChangeText={setTextLookFor}
                value={textLookFor}
              >

              </InputLookForAlbumMusic>
              <View style={{ width: 30, marginRight: 50 }}>
                <Icon name="search" size={30} color="#12485B" onPress={() => { }} />
              </View>
            </> : <>
              <View style={{ flexDirection: "row", alignItems: "center" }}>

              </View>
              <View style={{ width: 30, marginRight: 50 }}>
                <Icon name="search" size={30} color="#12485B" onPress={() => { setIslookingFor(!isLookingFor) }} />
              </View>
            </>
          }


        </View>
        <View style={styles.scrollViewMusic}>
          {
            /* (datasLookFor ) ? <FlatList
               data={datasLookFor}
               renderItem={(item) => renderItemMusic(item)}
               key={item => item.id}
             /> : albumes.length > 0 && <FlatList
               data={albumes}
               renderItem={(item) => renderItemMusic(item)}
               key={item => item.id}
             />*/
            <FlatList
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
  textSubTitleItem: {
    fontStyle: "normal",
    textAlign: "center",
    fontSize: 15,
    color: "#12485B",
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    height: 50,
  },
  textTitleItem: {
    marginTop: 10,
    fontStyle: "normal",
    fontSize: 30,
    color: "#12485B",
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 3 },
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
    paddingTop: 0
  }
});
