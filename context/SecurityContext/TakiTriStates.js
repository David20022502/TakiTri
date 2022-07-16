import { getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useCallback, useMemo, useReducer, useState } from "react";
import { Button } from '@rneui/themed';

import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ActivityIndicator, Modal, Snackbar } from "react-native-paper";
import disco from "../../assets/images/disco.jpeg";
import disco1 from "../../assets/images/balada.jpg";
import Sound from 'react-native-sound';

import TakiTriContext from "./TakiTriContext";
import { TakiTriReducer } from "./TakiTriReducer";
import { IS_AUTENTICATED, LOADING_END, LOADING_START, LOAD_FIREBASE_USER, LOAD_TAKITRI_USER, SHOW_INFORMATION_SONG } from "./TakiTriTypes";
import { Icon } from "@rneui/base";
import { getMessage } from "../../src/components/Messages";


export const TakiTriStates = ({ children }) => {
  const initialState = useMemo(
    () => ({
      userFirebase: null,
      userTakiTri: null,
      isAutenticated: null,
      isLoading: false,
      informationVisible: null
    }),
    []
  );
  const [state, dispatch] = useReducer(TakiTriReducer, initialState);
  const [currentMusic, setCurrentMusic] = React.useState(null);
  const [snackBarPadding, setsNackBarPadding] = React.useState(0);
  const [currentPlayList, setCurrentPlayList] = React.useState(null);
  const [isPlayingSoundInside, setIsPlayingSoundInside] = React.useState(false);
  const [audioPlayer, setAudioPlayer] = React.useState(null);
  const [isSnackVisible, setIsSnackVisible] = React.useState(false);
  const [color, setColor] = useState("white");
  const [message, setMessage] = useState(null);
  const [isInformationVisible, setIsInformationVisible] = useState(false);
  const [itemInformation, setItemInformation] = useState(null);

  React.useEffect(() => {
    if (currentMusic != null) {
      console.log("para hacer visible")
      setIsSnackVisible(true)
    } else {
      setIsSnackVisible(false)
    }
  }, [currentMusic])
  let currentMusicRef = React.useRef(null);
  const currentAutenticatedUser = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: LOAD_FIREBASE_USER, payload: user })

        handleUserFirebase(user)
      } else {
        handleIsAutenticated(false);
        // User is signed out
        // ...
      }
    });
  }
  const singInWithEmailPassword = useCallback(async (values) => {
    const auth = getAuth();
    handleLoading(true);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in

        const user = userCredential.user;
        console.log("ligon user", user.uid)
        dispatch({ type: LOAD_FIREBASE_USER, payload: user })
        handleUserFirebase(user)

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode", errorCode);
        console.log("errorMessage", errorMessage);
        handleLoading(false);
        handleError(getMessage(error.code), "red");
        console.log("error al inciar sesion", error)
        const data = getMessage("notAutenticated");
        console.log("mensaje obtenido", data)

      });
  }, [])
  const handleUserFirebase = useCallback(async (user) => {
    global.user_id = user.uid||user.id;
    const docRef = doc(global.db_Firestore, "users", user.uid||user.id);
    const docSnap = await getDoc(docRef);
    console.log("usuario firestore", docSnap.data())
    dispatch({ type: LOAD_TAKITRI_USER, payload: docSnap.data() })
    handleIsAutenticated(true);
  }, [])
  const handleError = useCallback((message, color) => {
    setColor(color);
    setMessage(message);
  }, []);
  const handleShowInformationMusic = useCallback((music) => {
    setIsInformationVisible(true);
    setItemInformation(music);
    console.log(music)
  }, []);
  SHOW_INFORMATION_SONG

  const handleLoading = useCallback((isLoading) => {
    dispatch({ type: isLoading ? LOADING_START : LOADING_END });
  }, []);
  const handleIsAutenticated = useCallback(async (isAutenticated) => {
    dispatch({ type: IS_AUTENTICATED, payload: isAutenticated })

  }, [])
  const handleLogOut = useCallback(async () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      let val = {
        "birthDate": "",
        "id": "",
        "lastName": "",
        "names": "",
        "user": "",
      }

      dispatch({ type: LOAD_TAKITRI_USER, payload: val })
      handleIsAutenticated(false);
    }).catch((error) => {
      console.log("error al salir de la sesion")
    });

  }, [])

  const handleSendEmailPasswordReeset = useCallback(async (value) => {
    const auth = getAuth();
    console.log("dato de email", value)
    try {
      handleLoading(true);
      const data = await sendPasswordResetEmail(auth, value).then((e) => {
        console.log("datos de passworrd logro", e)
        handleError("Se ha enviádo un email de verificación", "green");
      }).catch((e) => {
        handleError("No se ha podido encontrar al usuario", "red");
        console.log("datos de passworrd error", e)
      });

    } catch (e) {
      console.log("error al recuperar contraseña", e);
    } finally {
      handleLoading(false);
    }

  }, [])
  const handleUpdateUser = useCallback(async (values) => {
    const userRef = doc(global.db_Firestore, "users", values.id);
    await updateDoc(userRef, values);
    handleUserFirebase(values);
  }, [])
  const handleDestroySnackBar = useCallback(async () => {
    setCurrentMusic(null);
  }, [])
  const handleReopenSnackBar = useCallback(async () => {
    setCurrentMusic(currentMusicRef.current);
  }, [])
  const handlePaddingSnackBar = useCallback(async (value) => {
    /*switch (value || global.pageStatus) {
      case "AddMusicPlayList": {
        setsNackBarPadding(54);
        break;
      }
      case "AddPlayList": {
        setsNackBarPadding(54);
        break;
      }
      case "FavoriteScreen": {
        setsNackBarPadding(5);
        break;
      }
      case "LibraryPlayLists": {
        setsNackBarPadding(54);
        break;
      }
      case "MyPlayList": {
        setsNackBarPadding(54);
        break;
      }
      case "PlayListsScreen": {
        setsNackBarPadding(54);
        break;
      }
      case "AlbumRender": {
        setsNackBarPadding(5);
        break;
      }
      case "Home": {
        setsNackBarPadding(54);
        break;
      }
      case "HomeScreen": {
        setsNackBarPadding(54);
        break;
      }
      case "Library": {
        setsNackBarPadding(54);
        break;
      }
      case "LookFor": {
        setsNackBarPadding(54);
        break;
      }
      case "MadeForYou": {
        setsNackBarPadding(54);
        break;
      }
      case "ProfileScreen": {
        setsNackBarPadding(5);

        break;
      }
      case "RecentPlayed": {
        setsNackBarPadding(54);
        break;
      }
      case "AboutInfo": {
        setsNackBarPadding(5);
        break;
      }
    }*/

    setsNackBarPadding(value);
    console.log("cambia padding a", value)
  }, [])
  const handleDestroyAllSnackBar = () => {
    if (audioPlayer) {
      audioPlayer.stop();
    }

    setCurrentMusic(null);
    currentMusicRef.current = currentMusic;
    setAudioPlayer(null);
    setCurrentPlayList(null);
    setIsPlayingSoundInside(false);
  };
  const handleShowSnackBar = useCallback(async (currentMusic, audioPlayer, currentPlayList, isPlaying) => {
    console.log("-----data", currentMusic)
    setCurrentMusic(currentMusic);
    setAudioPlayer(audioPlayer);
    setCurrentPlayList(currentPlayList);
    setIsPlayingSoundInside(isPlaying);
  }, [])
  const playMusic = useCallback(async (audioPlayer, currentMusic, music) => {
    Sound.setCategory('Playback');
    if (music.id != currentMusic.id) {
      if (audioPlayer.isLoaded()) {
        console.log("si esta cargado");
        audioPlayer.stop();
        audioPlayer = new Sound(music.songURL, Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
          audioPlayer.play((success) => {
            if (success) {

              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
          });
        });
        setAudioPlayer(audioPlayer);
      }

    } else {
      if (!audioPlayer.isPlaying()) {
        audioPlayer.play();
      }
    }


  }, [])
  const handlePlayPause = () => {
    if (audioPlayer && audioPlayer.isPlaying()) {
      setIsPlayingSoundInside(false)
      audioPlayer.pause();
    } else {
      setIsPlayingSoundInside(true)
      audioPlayer.play();
    }
  }
  const handleNextMusic = () => {
    let index = currentPlayList.indexOf(currentMusic);
    index = index + 1;
    let tempCurrentMusic;
    if (index > currentPlayList.length - 1) {
      tempCurrentMusic = currentPlayList[0];
      playMusic(audioPlayer, currentMusic, tempCurrentMusic);
    } else {
      tempCurrentMusic = currentPlayList[index];
      playMusic(audioPlayer, currentMusic, tempCurrentMusic);
    }
    setCurrentMusic(tempCurrentMusic);
    currentMusicRef.current = tempCurrentMusic;
    setCurrentPlayList(currentPlayList);
    setIsPlayingSoundInside(true);

  }
  const onDismissSnackBar = () => setMessage(null);

  return <TakiTriContext.Provider
    value={{
      userFirebase: state.userFirebase,
      userTakiTri: state.userTakiTri,
      isAutenticated: state.isAutenticated,
      handleShowInformationMusic,
      handleLoading,
      handleError,
      handleDestroyAllSnackBar,
      handleSendEmailPasswordReeset,
      handleReopenSnackBar,
      handlePaddingSnackBar,
      handleDestroySnackBar,
      handleShowSnackBar,
      singInWithEmailPassword,
      handleLogOut,
      currentAutenticatedUser,
      handleUpdateUser
    }}
  >
    {children}
    <Snackbar
      theme={{
        colors: {
          accent: '#FFFFFF',
          surface: '#FFFFFF'
        }
      }}
      visible={isSnackVisible}
      style={{
        backgroundColor: "#12485B",
        height: 60,
        marginBottom: snackBarPadding,
        padding: 0
      }}
      onDismiss={() => { }}
    >
      <View style={{ flexDirection: "row", position: "relative" }}>
        <View style={{ width: 70, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginRight: 10 }}>
          <Icon name={isPlayingSoundInside ? "pause" : "play"} size={35} type="ant-design" color={"#FDFDFD"} onPress={() => { handlePlayPause(); }} />
          <Icon name="fastbackward" size={20} type="ant-design" color={"#FDFDFD"} style={{ transform: [{ rotateY: '180deg' }] }} onPress={() => handleNextMusic()} />

        </View>
        <TouchableOpacity
          onPress={() => {
            global.navigation.navigate("PlayMusicHome", { audioPlayer: audioPlayer, currentMusic: currentMusic, currentPlayList: currentPlayList })
            handleDestroySnackBar();
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={styles.containerText}>
              <Text style={styles.title}>
                {currentMusic && currentMusic.song_name}
              </Text>
              <Text style={styles.subTitle}>
                {currentMusic && currentMusic.author}
              </Text>
            </View>
            <Image
              source={{ uri: currentMusic ? currentMusic.imageURL : "" }}
              style={{ width: 40, height: 40, borderRadius: 2, marginLeft: 10 }}
            >
            </Image>
          </View>
        </TouchableOpacity>


      </View>
    </Snackbar>
    <Modal visible={state.isLoading} style={{
      backgroundColor: 'transparent',
      elevation: 0
    }}>
      <ActivityIndicator size={80} />
    </Modal>
    <Modal visible={isInformationVisible} style={{
      backgroundColor: 'transparent',
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      elevation: 0
    }}
    >
      <View style={styles.modalInside}>
        <Image
          source={{ uri: itemInformation ? itemInformation.imageURL : "" }}
          style={{ width: "100%", height: "100%", position: "absolute", borderRadius: 20, }}
          resizeMode="cover"
          blurRadius={30}
        >
        </Image>
        <Image
          source={{ uri: itemInformation ? itemInformation.imageURL : "" }}
          style={{ width: 150, height: 150, borderRadius: 2, marginBottom: 20 }}
        >
        </Image>

        <View style={{ flexDirection: "row", alignItems: "center", height: 40, justifyContent: "center", width: 300 }}>
          <View style={{ width: 150, flexDirection: "row", justifyContent: "flex-end" }}>
            <Text style={styles.styleTitle}>
              Título:{"  "}
            </Text>
          </View>
          <View style={{ width: 150, flexDirection: "row", justifyContent: "flex-start" }}>
            <Text style={styles.styleTitleText}>
              {itemInformation && itemInformation.song_name}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", height: 40, justifyContent: "center", width: 300 }}>
          <View style={{ width: 150, flexDirection: "row", justifyContent: "flex-end" }}>
            <Text style={styles.styleTitle}>
              Artista:{"  "}
            </Text>
          </View>
          <View style={{ width: 150, flexDirection: "row", justifyContent: "flex-start" }}>
            <Text style={styles.styleTitleText}>
              {itemInformation && itemInformation.author}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", height: 40, justifyContent: "center", width: 300 }}>
          <View style={{ width: 150, flexDirection: "row", justifyContent: "flex-end" }}>
            <Text style={styles.styleTitle}>
              Género:{"  "}
            </Text>
          </View>
          <View style={{ width: 150, flexDirection: "row", justifyContent: "flex-start" }}>
            <Text style={styles.styleTitleText}>
              {itemInformation && itemInformation.genre_name}
            </Text>
          </View>


        </View>
        <View style={{ flexDirection: "row", alignItems: "center", height: 40, justifyContent: "center", width: 300 }}>
          <View style={{ width: 150, flexDirection: "row", justifyContent: "flex-end" }}>
            <Text style={styles.styleTitle}>
              Álbum:{"  "}
            </Text>
          </View>
          <View style={{ width: 150, flexDirection: "row", justifyContent: "flex-start" }}>
            <Text style={styles.styleTitleText}>
              {itemInformation && itemInformation.album_name}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", height: 40, justifyContent: "center", width: 300 }}>
          <View style={{ width: 150, flexDirection: "row", justifyContent: "flex-end" }}>
            <Text style={styles.styleTitle}>
              Año:{"  "}
            </Text>
          </View>
          <View style={{ width: 150, flexDirection: "row", justifyContent: "flex-start" }}>
            <Text style={styles.styleTitleText}>
              {itemInformation && itemInformation.year}
            </Text>
          </View>
        </View>

      </View>
      <View style={{width:50,position:"absolute",top:20,right:20}}>
        <Button
          title="Ok"
          titleStyle={{color:"#12485B"}}
          onPress={() => {
            setIsInformationVisible(!isInformationVisible)
            setItemInformation(null);
          }}
         
          buttonStyle={{ backgroundColor:"#C4BFBF",borderRadius:20}}
        >

        </Button>
      </View>

    </Modal>
    <Snackbar
      theme={{
        colors: {
          accent: '#FFFFFF',
          surface: '#FFFFFF'
        }
      }}
      style={{
        backgroundColor: color
      }}
      visible={message !== null}
      onDismiss={onDismissSnackBar}
      action={{
        label: 'OK',
        onPress: () => onDismissSnackBar(),
      }}>
      {message}
    </Snackbar>

  </TakiTriContext.Provider>
}
const styles = StyleSheet.create({
  modalInside: {
    backgroundColor: "#AAAAAA",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    width: 350,
    height: 400,
    position: "relative"
  },
  styleTitle: {
    fontSize: 20,
    color: "#F0E5E5",
  },
  styleTitleText: {
    color: "#F3F3F3",

    fontSize: 15
  },
  containerMusic: {
    flexDirection: "row",
    position: "relative",
    margin: 10,
    width: 230,
  },
  containerText: {
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 10,
    width: 200
  },
  containerOPtions: {
    flexDirection: "row",
    marginHorizontal: 15,
    alignItems: "center",
  },
  title: {
    fontStyle: "normal",
    fontSize: 15,
    lineHeight: 22,
    color: "white",
    width: 200,
  },
  subTitle: {
    fontStyle: "normal",
    fontSize: 13,
    color: "#848282",
    width: 180
  },


});
