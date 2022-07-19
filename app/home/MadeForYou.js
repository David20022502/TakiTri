import { Icon } from '@rneui/themed';
import * as React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList, BackHandler, Dimensions } from 'react-native';
import HomeContext from '../../context/HomeContext/HomeContext';
import { InputLookForAlbumMusic } from '../../src/components/Components';
import { AlbumItem } from '../../src/Items/AlbumItem';
import { getAlbumes } from '../../src/services/MusicServices';


export const MadeForYou = ({ onPresseAlbum, navigation }) => {
  global.pageStatus = "MadeForYou";
  const { loadAlbumAll,albumAll  } = React.useContext(HomeContext)

  const [albumes, setAlbumes] = React.useState([]);
  const [isLookingFor, setIslookingFor] = React.useState(false)
  const [textLookFor, setTextLookFor] = React.useState("")
  const [datasLookFor, setDatasLookFor] = React.useState(null)
  const [datasOrderAlbum, setDatasOrderAlbum] = React.useState([]);
  let isLookingForRef = React.useRef(false);
  let maxNumberToSearch = React.useRef(11);

  React.useEffect(() => {
    getAlbumes(setAlbumes, null, maxNumberToSearch.current);
    const backAction = () => {
      if (isLookingForRef.current == true) {
        setIslookingFor(false)
      } else {
        navigation.popToTop();
      }
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [])
  React.useEffect(() => {
    // console.log("datasLookFor", datasLookFor);
  }, [datasLookFor])
  React.useEffect(() => {
    if (albumes.length > 0) {
      handleOrderAlbum();
    }
  }, [albumes])
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
  const handleOrderAlbum = () => {
    let tempAlbumOriginal = [];
    for (let i = 0; i < albumAll.length; i++) {
      let tempdata = albumAll[i];
      for (let j = 0; j < tempdata.length; j++) {
        tempAlbumOriginal.push(tempdata[j])
      }
    }
    setDatasOrderAlbum(tempAlbumOriginal);
  }
  const lookForAlbum = () => {
    if (textLookFor.length > 0) {
      let textLook = textLookFor.trim();
      const datasTempResult = [];
      for (let i = 0; i < datasOrderAlbum.length; i++) {
        let item = datasOrderAlbum[i];
        if (item.genre_name && item.author) {
          let NOMBRE = item.genre_name;
          let AUTOR = item.author;
          let NAME = item.name;
          if (NOMBRE.toLowerCase().includes(textLook.toLowerCase()) ||
            AUTOR.toLowerCase().includes(textLook.toLowerCase()) ||
            NAME.toLowerCase().includes(textLook.toLowerCase())
          ) {
            datasTempResult.push(datasOrderAlbum[i]);
          }
        }
      }
      const resultData = [];
      for (let i = 0; i < datasTempResult.length; i++) {
        let itemAlbum = [];
        if (i % 2 == 0) {
          itemAlbum.push(datasTempResult[i]);
          if (i + 1 < datasTempResult.length) {
            itemAlbum.push(datasTempResult[i + 1]);
          }
          resultData.push(itemAlbum);
        }

      }
      setDatasLookFor(resultData)

      //console.log("resultado:---", resultData);
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
  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 0;
   

    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <View style={{ position: "absolute", top: 10, left: 20 }}>

        <Icon name="back" size={30} type="ant-design" color="black" onPress={() => { navigation.goBack() }} />


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
            isLookingFor ? <View style={{ width: Dimensions.get("window").width, flexDirection: "row", justifyContent: "flex-end", marginBottom: 10 }}>
              <InputLookForAlbumMusic
                onChangeText={(e) => { setTextLookFor(e) }}
                value={textLookFor}
              >

              </InputLookForAlbumMusic>
              <View style={{ width: 30, marginRight: 50, marginLeft: 10, marginBottom: 10 }}>
                <Icon name="search" size={30} color="#12485B" onPress={() => { lookForAlbum() }} />
              </View>
            </View>

              : <View style={{ width: Dimensions.get("window").width, flexDirection: "row", justifyContent: "flex-end", marginBottom: 10 }}>

                <View style={{ flexDirection: "row", alignItems: "center" }}>

                </View>
                <View style={{ width: 30, marginRight: 50, marginLeft: 10, marginBottom: 10 }}>
                  <Icon name="search" size={30} color="#12485B" onPress={() => { setIslookingFor(true) }} />
                </View>
              </View>
          }


        </View>
        <View style={styles.scrollViewMusic}>
          {
            (datasLookFor) ? <FlatList
              contentContainerStyle={{ paddingBottom: 270 }}
              data={datasLookFor}
              renderItem={(item) => renderItemMusic(item)}
              key={item => item.id}
            /> : albumes.length > 0 && <FlatList
              contentContainerStyle={{ paddingBottom: 270 }}
              onScroll={({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent)) {
                  //enableSomeButton();
                  console.log("ha llegado al fn")
                  maxNumberToSearch.current= maxNumberToSearch.current+10;
                  getAlbumes(setAlbumes, null, maxNumberToSearch.current);

                }
              }}
              data={albumes}
              renderItem={(item) => renderItemMusic(item)}
              key={item => item.id}
            />

          }
          {
            /*
             <FlatList
                        data={albumes}
                        renderItem={(item) => renderItemMusic(item)}
                        key={item => item.id}
                      />
             */
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
    paddingBottom: 0,
    paddingHorizontal: 5,
    paddingTop: 0,

  }
});
