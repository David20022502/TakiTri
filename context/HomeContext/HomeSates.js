import React, { useCallback, useContext, useMemo, useReducer, useState } from "react";
import HomeContext from "./HomeContext";
import { HomeReducer } from "./HomeReducer";
import { HOME_PAGE_USER, IS_PLAYING_SOUND, LOAD_AUDIO_PLAYER, LOAD_CURRENT_MUSIC, LOAD_CURRENT_PLAYLIST, PLAY_MUSIC_HOME } from "./HomeTypes";
import { Audio } from 'expo-av';
import Sound from 'react-native-sound';

export const HomeStates = ({ children }) => {
  const initialState = useMemo(
    () => ({
      audioPlayer: null,
      currentMusic: null,
      isPlayingSound: null,
      currentPlayList: null
    }),
    []
  );
  const [state, dispatch] = useReducer(HomeReducer, initialState);
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

      }else{
        if(!audioPlayer.isPlaying()){
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
  return <HomeContext.Provider
    value={{
      audioPlayer: state.audioPlayer,
      currentMusic: state.currentMusic,
      isPlayingSound: state.isPlayingSound,
      currentPlayList: state.currentPlayList,
      playMusic,
      setisPlayingSound,
      loadCurrentPlayList
    }}
  >
    {children}
  </HomeContext.Provider>
}