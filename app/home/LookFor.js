import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, FlatList, BackHandler } from 'react-native';
import { ButtonOwnHeader, InputLookFor } from '../../src/components/Components';
import { MusicItem } from '../../src/Items/MusicItem';
import { lokForSongs } from '../../src/services/MusicServices';

export const LookFor = () => {
  global.pageStatus="LookFor";
  const [inputLookFor, setInputLookFor] = React.useState("");
  const [resultsMusics, setResultsMusics] = React.useState(null);
  React.useEffect(() => {

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
  const handleLookForMusics = () => {
    lokForSongs(setResultsMusics, inputLookFor)
  }
  const renderItemMusic = (item) => {
    return (<MusicItem music={item.item} playList={resultsMusics} ></MusicItem>);
  }
  const NotLookedFor = () => {
    return (<View
      style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }}
    >
      <Text
        style={{ color: "#AAAAAA", fontSize: 20, marginHorizontal: 20, textAlign: "center" }}
      >¡Siempre hay nueva música para escuchar!</Text>
    </View>);
  }
  const NotFound = () => {
    return (<View
      style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }}
    >
      <Text
        style={{ color: "#12485B", fontSize: 30 }}
      >Sin Resultados...</Text>
    </View>);
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerMain}>
        <Text style={styles.title}>
          Buscar
        </Text>
      </View>
      <View style={styles.containerMain}>
        <View style={styles.lookForConatiner}>
          <InputLookFor
            placeholder={"Busca tu canción favorita..."}
            value={inputLookFor}
            onChangeText={setInputLookFor}
            onPress={handleLookForMusics}
          >
          </InputLookFor>
        </View>

        {
          resultsMusics != null ? resultsMusics.length <= 0 ? <NotFound /> : <View style={styles.scrollViewMusic}>
            <FlatList
              data={resultsMusics}
              renderItem={(item) => renderItemMusic(item)}
              key={item => item.id}
            />

          </View> : <NotLookedFor></NotLookedFor>
        }
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  lookForConatiner: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 30
  },
  containerMain: {
    flex: 1
  },
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
    paddingHorizontal: 20
  },
  headerMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
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
    color: "#12485B",
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 4,
  },
  scrollViewMusic: {
    paddingBottom: 150,
    paddingLeft: 10
  }
});
