import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useCallback, useMemo, useReducer, useState } from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ActivityIndicator, Modal, Snackbar } from "react-native-paper";
import disco from "../../assets/images/disco.jpeg";
import disco1 from "../../assets/images/balada.jpg";
import Sound from 'react-native-sound';

import TakiTriContext from "./TakiTriContext";
import { TakiTriReducer } from "./TakiTriReducer";
import { IS_AUTENTICATED, LOAD_FIREBASE_USER, LOAD_TAKITRI_USER } from "./TakiTriTypes";
import { Icon } from "@rneui/base";


export const TakiTriStates = ({ children }) => {
  const initialState = useMemo(
    () => ({
      userFirebase: null,
      userTakiTri: null,
      isAutenticated: false
    }),
    []
  );
  const [state, dispatch] = useReducer(TakiTriReducer, initialState);
  const dat = {
    "album_name": "Llorando Mi Sanjuanito",
    "author": "Amor Paisano",
    "genre_name": "Sanjuanito",
    "id": "6Yl6eAhIUfopyDU5ZHW1",
    "imageURL": "https://firebasestorage.googleapis.com/v0/b/borrador-a0724.appspot.com/o/albumes%2FLlorando%20mi%20sanjuanito.jpg?alt=media&token=1169b1e4-3904-4dc5-8528-538a381a1e00",
    "songURL": "https://firebasestorage.googleapis.com/v0/b/borrador-a0724.appspot.com/o/songs%2FX2Download.com%20-%20Amor%20Paisano%20%20LLORANDO%20CON%20MI%20SANJUANITO%F0%9F%98%A2%F0%9F%98%A2%F0%9F%98%A2%202022%20covert%20(128%20kbps).mp3?alt=media&token=14919fcb-ff38-440f-a839-6e1abf82cf1a",
    "song_name": "Llorando con mi Sanjuanito",
    "song_reference": "songs/X2Download.com - Amor Paisano  LLORANDO CON MI SANJUANITO😢😢😢 2022 covert (128 kbps)",
    "year": 2022,
  }
  const [currentMusic, setCurrentMusic] = React.useState(null);
  const [snackBarPadding, setsNackBarPadding] = React.useState(0);
  const [currentPlayList, setCurrentPlayList] = React.useState(null);
  const [isPlayingSoundInside, setIsPlayingSoundInside] = React.useState(false);

  const [audioPlayer, setAudioPlayer] = React.useState(null);
  React.useEffect(() => {
    console.log("456hola123", currentMusic);
  }, [currentMusic])
  const currentAutenticatedUser = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: LOAD_FIREBASE_USER, payload: user })

        handleUserFirebase(user)
      } else {
        // User is signed out
        // ...
      }
    });
  }
  const singInWithEmailPassword = useCallback(async (values) => {
    const auth = getAuth();
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
        console.log("error al inciar sesion")
      });
  }, [])
  const handleUserFirebase = useCallback(async (user) => {
    global.user_id = user.uid;
    const docRef = doc(global.db_Firestore, "users", user.uid);
    const docSnap = await getDoc(docRef);
    console.log("usuario firestore", docSnap.data())
    dispatch({ type: LOAD_TAKITRI_USER, payload: docSnap.data() })
    handleIsAutenticated(true);
  }, [])
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
  const handleUpdateUser = useCallback(async (values) => {
    const userRef = doc(global.db_Firestore, "users", values.id);
    await updateDoc(userRef, values);
  }, [])
  const handleDestroySnackBar = useCallback(async () => {
    setCurrentMusic(null);
  }, [])
  const handlePaddingSnackBar = useCallback(async (value) => {
    setsNackBarPadding(value);
    console.log("cambia padding a", value)
  }, [])

  const handleShowSnackBar = useCallback(async (currentMusic, audioPlayer, currentPlayList, isPlaying) => {
    setCurrentMusic(currentMusic);
    setAudioPlayer(audioPlayer);
    setCurrentPlayList(currentPlayList);
    setIsPlayingSoundInside(isPlaying);
  }, [])
  const playMusic = useCallback(async (audioPlayer, currentMusic, music, playList) => {
    if (audioPlayer == null) {
      await TrackPlayer.setupPlayer()
      console.log("crendo audio", music);
      Sound.setCategory('Playback');
      audioPlayer = new Sound(music.songURL, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        console.log("reproducido con ")

        audioPlayer.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      });
      setCurrentMusic(currentMusic);
      setAudioPlayer(audioPlayer);
      setCurrentPlayList(currentPlayList);
      setIsPlayingSoundInside(true);
    } else {
      console.log("mismo audio")
      if (music.id != currentMusic.id) {
        console.log("diferente id", music)
        if (audioPlayer.isLoaded()) {
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
         
        }
        setAudioPlayer(audioPlayer);
      } else {
        if (!audioPlayer.isPlaying()) {
          audioPlayer.play();
        }
      }
    }
  }, [])
  const handlePlayPause = () => {
    if (audioPlayer && audioPlayer.isPlaying()) {
      setIsPlayingSoundInside(false)
      audioPlayer.pause();
      //finsihInterval();

    } else {
      setIsPlayingSoundInside(true)
      audioPlayer.play();
      //initInterval();

    }
  }
  const handleNextMusic = () => {

    let index = currentPlayList.indexOf(currentMusic);
    index = index + 1;
    let tempCurrentMusic;
    if (index > currentPlayList.length - 1) {
      tempCurrentMusic = currentPlayList[0];
      console.log("fin de lalista", tempCurrentMusic)
      playMusic(audioPlayer, currentMusic, tempCurrentMusic, currentPlayList);
    } else {
      tempCurrentMusic = currentPlayList[index];
      playMusic(audioPlayer, currentMusic, tempCurrentMusic, currentPlayList);
    }
    console.log("current music123",tempCurrentMusic);
    setCurrentMusic(tempCurrentMusic);
    setCurrentPlayList(currentPlayList);
    setIsPlayingSoundInside(true);

  }
  return <TakiTriContext.Provider
    value={{
      userFirebase: state.userFirebase,
      userTakiTri: state.userTakiTri,
      isAutenticated: state.isAutenticated,
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
      visible={currentMusic != null}
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
            global.navigation.navigate("PlayMusicHome",{audioPlayer:audioPlayer,currentMusic:currentMusic,currentPlayList:currentPlayList})
            handleDestroySnackBar();
            //playMusic(audioPlayer, currentMusic, currentMusic, currentPlayList);
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


  </TakiTriContext.Provider>
}
const styles = StyleSheet.create({
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
