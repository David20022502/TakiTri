import React, { useCallback, useContext, useMemo, useReducer, useState } from "react";
import HomeContext from "./HomeContext";
import { HomeReducer } from "./HomeReducer";
import { DELETE_SELECTED_ITEM_LIST, HOME_PAGE_USER, IS_LOADING_PAGE, IS_MODAL_ERROR_VISIBLE_PAGE, IS_ON_LONG_PRESS, IS_PLAYING_SOUND, LOAD_AUDIO_PLAYER, LOAD_CURRENT_MUSIC, LOAD_CURRENT_PLAYLIST, LOAD_ISLIKE_SONG, MESSAGE_ERROR_MODAL, PLAY_MUSIC_HOME, PUSH_SELECTED_ITEM_LIST } from "./HomeTypes";
import { Audio } from 'expo-av';
import Sound from 'react-native-sound';
import { getLikedSong } from "../../src/services/MusicServices";
import { collection, getDocs } from "firebase/firestore";
import TrackPlayer from 'react-native-track-player';

export const HomeStates = ({ children }) => {
  const initialState = useMemo(
    () => ({
      audioPlayer: null,
      currentMusic: null,
      isPlayingSound: null,
      currentPlayList: null,
      likedSongsList: null,
      isOnLongPress: false,
      selectedList: [],
      isLoading:false,
      isModalErrorVisible:false,
      messageError:""
    }),
    []
  );
  const [state, dispatch] = useReducer(HomeReducer, initialState);
  const handleIsLoadingPage = useCallback((isLoading) => {
      dispatch({ type: IS_LOADING_PAGE, payload: isLoading })
  }, [])
  const handleIsModalErrorVisible = useCallback((isVisible) => {
    dispatch({ type: IS_MODAL_ERROR_VISIBLE_PAGE, payload: isVisible })
}, [])
const handleMessageError = useCallback((message) => {
  dispatch({ type: MESSAGE_ERROR_MODAL, payload: message })
}, [])
  const changePageStatus = useCallback((pageStatus) => {
    console.log("entra l dispatch")
    if (pageStatus == PLAY_MUSIC_HOME) {
      dispatch({ type: PLAY_MUSIC_HOME, payload: pageStatus })

    } else {
      dispatch({ type: HOME_PAGE_USER, payload: pageStatus })
    }
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
      dispatch({ type: LOAD_AUDIO_PLAYER, payload: audioPlayer })
      dispatch({ type: LOAD_CURRENT_MUSIC, payload: music })
      loadCurrentPlayList(playList);
      setisPlayingSound(true);

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
          dispatch({ type: LOAD_AUDIO_PLAYER, payload: audioPlayer })
          dispatch({ type: LOAD_CURRENT_MUSIC, payload: music })
          loadCurrentPlayList(playList);
          setisPlayingSound(true);
        }

      } else {
        if (!audioPlayer.isPlaying()) {
          audioPlayer.play();
        }
      }
    }
  }, [])
  const setisPlayingSound = (isPlaying) => {
    dispatch({ type: IS_PLAYING_SOUND, payload: isPlaying });
  }
  const loadCurrentPlayList = (playList) => {
    dispatch({ type: LOAD_CURRENT_PLAYLIST, payload: playList })
  }
  const loadLikedMusics = useCallback(async () => {
    const songsLiked = collection(
      global.db_Firestore,
      "favorite", " DP3XfsWz0llXfYtU8UUO", "songs"
    );

    const querySnapshot = await getDocs(songsLiked);
    let tempSongsAlbum = [];

    querySnapshot.forEach((doc) => {
      let item = doc.data();
      tempSongsAlbum.push(item.id);
    });

    dispatch({ type: LOAD_ISLIKE_SONG, payload: tempSongsAlbum });
    console.log("songsliked", tempSongsAlbum);

  }, [])
  const putLikedSong = useCallback(async (songId, listLikedMusics) => {
    const nuewLikedSongs = listLikedMusics.filter(item => item != songId);
    dispatch({ type: LOAD_ISLIKE_SONG, payload: nuewLikedSongs });
  }, [])
  const deleteLikedSong = useCallback(async (songId, listLikedMusics) => {
    const nuewLikedSongs = listLikedMusics;
    nuewLikedSongs.push(songId);
    dispatch({ type: LOAD_ISLIKE_SONG, payload: nuewLikedSongs });
  }, [])
  const handleIsonlongPress = useCallback(async (isOnlong) => {
    dispatch({ type: IS_ON_LONG_PRESS, payload: isOnlong });
  }, [])
  const handlePushSelectedList = useCallback(async (item, selectedList, deleteAll) => {

    let letSelectedList;
    if (deleteAll) {
      letSelectedList = [];
    } else {
      letSelectedList = selectedList;
      letSelectedList.push(item)
    }

    dispatch({ type: PUSH_SELECTED_ITEM_LIST, payload: letSelectedList });
  }, [])
  const handleDeleteSelectedList = useCallback(async (item, selectedList,deleteAll) => {
    let letSelectedList;
    if (deleteAll) {
      letSelectedList = [];
    } else {
      letSelectedList = selectedList.filter(item1 => item1.id != item.id);
    }
    dispatch({ type: DELETE_SELECTED_ITEM_LIST, payload: letSelectedList });
  }, [])

  return <HomeContext.Provider
    value={{
      audioPlayer: state.audioPlayer,
      currentMusic: state.currentMusic,
      isPlayingSound: state.isPlayingSound,
      currentPlayList: state.currentPlayList,
      likedSongsList: state.likedSongsList,
      isOnLongPress: state.isOnLongPress,
      selectedList: state.selectedList,
      isLoading:state.isLoading,
      isModalErrorVisible:state.isModalErrorVisible,
      messageError:state.messageError,
      handleIsLoadingPage,
      handleIsModalErrorVisible,
      handleMessageError,
      handlePushSelectedList,
      handleDeleteSelectedList,
      handleIsonlongPress,
      playMusic,
      putLikedSong,
      deleteLikedSong,
      setisPlayingSound,
      loadCurrentPlayList,
      loadLikedMusics
    }}
  >
    {children}
  </HomeContext.Provider>
}