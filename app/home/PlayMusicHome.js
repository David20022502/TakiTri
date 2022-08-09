import { BackHandler, StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';
import { Icon, Slider } from '@rneui/themed';
import React, { useContext, useRef } from 'react';
import HomeContext from '../../context/HomeContext/HomeContext';
import Sound from 'react-native-sound';
import { deleteLikedSong, putLikedSong } from '../../src/services/MusicServices';
import { deleteFromDatabeMusic, getMaxNumberDataBase, insertHistoryMusicDataBase } from '../../src/services/DataBase';
import TakiTriContext from '../../context/SecurityContext/TakiTriContext';

export const PlayMusicHome = (props) => {

  const { navigation } = props;
  let isPlayingSnackBar = null;
  try {
    isPlayingSnackBar = props.route.params.isPlayingSnackBar;

  } catch (e) {
    isPlayingSnackBar = null;
  }


  const { handleSnackBarElement, handleMaxNumberDataBase, maxNumberDataBase, handleMusicPlayed, musicListenedNow, audioPlayer, currentMusic, isPlayingSound, playMusic, currentPlayList, likedSongsList, loadLikedMusics } = useContext(HomeContext)
  const [progresBar, setProgresBar] = React.useState(0);
  const { handleShowSnackBar, handlePaddingSnackBar, handleShowInformationMusic } = useContext(TakiTriContext)
  const [isPlayingSoundInside, setIsPlayingSoundInside] = React.useState(false);
  const [progresTime, setProgresTime] = React.useState("00:00");
  const [duration, setDuration] = React.useState("00:00");
  const [isRandom, setIsRandom] = React.useState(false);
  const [isRepeatingButton, setIsRepeatingButton] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  let volumenMusic = useRef(null);
  const [isMuted, setIsMuted] = React.useState(null);

  let currentMusicRef = useRef(null);
  let audioPlayerRef = useRef(null);
  let currentPlayListRef = useRef(null);
  let isRepeating = React.useRef(false)
  let isSliderChanging = React.useRef(false)
  let timeProgresInterval = useRef(null)
  let currentIsRandom = useRef(false);
  React.useEffect(() => {
    try {
      let audioPlayer = props.route.params.audioPlayer;
      let currentMusic = props.route.params.currentMusic;
      let currentPlayList = props.route.params.currentPlayList;
      handleSnackBarElement(audioPlayer, currentMusic, currentPlayList);
    } catch (e) {
      console.log(e);
    }
    const backAction = () => {

      navigation.goBack();
      showSnackBarPlay();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [])
  React.useEffect(() => {

    BackHandler.addEventListener(
      "hardwareBackPress",
      finsihInterval
    );
    if (timeProgresInterval.current == null) {
      initInterval();
    }
    else {
      finsihInterval();
      initInterval();
    }
    audioPlayerRef.current = audioPlayer;
    if (audioPlayer) {
      volumenMusic.current = audioPlayer.getVolume();
      //setIsPlayingSoundInside(audioPlayer.isPlaying());
    }
  }, [audioPlayer])
  React.useEffect(() => {
    currentPlayListRef.current = currentPlayList;
  }, [currentPlayList])
  React.useEffect(() => {
    currentIsRandom.current = isRandom;
  }, [isRandom])

  React.useEffect(() => {
    if (isMuted != null) {
      if (isMuted) {
        audioPlayer.setVolume(0);

      } else {
        audioPlayer.setVolume(volumenMusic.current);
      }
    }
  }, [isMuted])
  React.useEffect(() => {

    if (isPlayingSnackBar != null) {

      setIsPlayingSoundInside(isPlayingSnackBar);
    } else {
      if (audioPlayer != null) {
        if (isPlayingSound) {
          audioPlayer.play();
        } else {
          audioPlayer.pause();
        }
      }

      setIsPlayingSoundInside(isPlayingSound);

    }

    isPlayingSnackBar = null;
  }, [isPlayingSound])

  React.useEffect(() => {
    if (currentMusic) {
      console.log("liked playList", likedSongsList)
      const index = likedSongsList.filter(item => item === currentMusic.id);
      if (index.length > 0) {
        setIsLiked(true)
      } else {
        setIsLiked(false)
      }
      loadToHistoryPlayed();
    }
    currentMusicRef.current = currentMusic;
  }, [currentMusic])

  const showSnackBarPlay = () => {
    handleShowSnackBar(currentMusicRef.current, audioPlayerRef.current, currentPlayListRef.current, audioPlayerRef.current.isPlaying());
    //handlePaddingSnackBar(5);
  }
  const loadToHistoryPlayed = async () => {
    const date = new Date();
    //const dateFormated = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
    // const currentDate=date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate()+":"+date.getHours()+"/"+date.getMinutes()+"/"+date.getSeconds();
    let currentDate = date.getTime();
    currentDate = currentDate + "";
    if (musicListenedNow.length <= 0) {
      let numMax = maxNumberDataBase + 1;
      insertHistoryMusicDataBase(numMax, global.user_id, currentMusic.id, currentDate);
      const value = {
        "id_history": numMax,
        "music_id": currentMusic.id,
        "user_id": global.user_id,
        "date": currentDate
      }
      if (musicListenedNow.includes(currentMusic.id)) {
        await deleteFromDatabeMusic(currentMusic.id, global.user_id, currentDate);
        await handleMusicPlayed(value, musicListenedNow);
      } else {
        handleMusicPlayed(value, musicListenedNow);
      }

    } else {
      let musicListPlayed = [];
      let musicListPlayedMusicId = [];
      for (let i = 0; i < musicListenedNow.length; i++) {
        musicListPlayed.push(musicListenedNow[i].id_history);
      }
      for (let i = 0; i < musicListenedNow.length; i++) {
        musicListPlayedMusicId.push(musicListenedNow[i].music_id);
      }
      var numMax = Math.max(...musicListPlayed);
      numMax = maxNumberDataBase + 1;
      const value = {
        "id_history": numMax,
        "music_id": currentMusic.id,
        "user_id": global.user_id,
        "date": currentDate
      }
      if (musicListPlayedMusicId.includes(currentMusic.id)) {
        await deleteFromDatabeMusic(currentMusic.id, global.user_id);
        await handleMusicPlayed(value, musicListenedNow);
        insertHistoryMusicDataBase(numMax, global.user_id, currentMusic.id, currentDate);

      } else {
        handleMusicPlayed(value, musicListenedNow);
        insertHistoryMusicDataBase(numMax, global.user_id, currentMusic.id, currentDate);

      }

    }
    getMaxNumberDataBase(handleMaxNumberDataBase, true);
  }
  const onPlaybackStatusUpdate = () => {
    // console.log("cambiando")
    if (audioPlayer && audioPlayer.isPlaying()) {
      setDuration(calculateTime(audioPlayer.getDuration()))
      audioPlayer.getCurrentTime((seconds) => {
        let t = calculateTime(seconds)
        setProgresTime(t);
        let data = seconds / audioPlayer.getDuration();
        if (isSliderChanging.current == false) {
          setProgresBar(data)
        }
        if (parseInt(seconds) >= parseInt(audioPlayer.getDuration())) {
          if (isRepeating.current) {
            audioPlayer.stop();
            audioPlayer.play();


          } else if (currentIsRandom.current) {
            onNextMusic();
          }
        }
      })
    }
  }
  const calculateTime = (secs) => {
    let segundos = parseInt(secs);
    let minutos = segundos / 60;
    minutos = parseInt(minutos);
    segundos = segundos - (minutos * 60);
    minutos = minutos < 10 ? "0" + minutos : minutos;
    segundos = segundos < 10 ? "0" + segundos : segundos;
    return `${minutos}:${segundos}`;
  }
  const initInterval = () => {
    timeProgresInterval.current = setInterval(() => { onPlaybackStatusUpdate() }, 100)

  }
  const finsihInterval = () => {
    clearInterval(timeProgresInterval.current);
  }
  const onStartSliderChange = () => {
    isSliderChanging.current = true;

  }
  const onFinishSliderChange = () => {
    let data = progresBar * audioPlayer.getDuration();
    audioPlayer.setCurrentTime(data)
    isSliderChanging.current = false;
    if (audioPlayer && audioPlayer.isPlaying() == false) {
      audioPlayer.play();
      setIsPlayingSoundInside(true);
    }
  }
  const conChangeProgresBar = (e) => {
    setProgresBar(e)
  }
  const onNextMusic = async () => {
    let numRandom = calculateRandomMusic();
    let index = 0;
    if (isRandom) {
      index = numRandom;
    } else {
      index = currentPlayList.indexOf(currentMusic);
    }
    index = index + 1;
    let tempCurrentMusic;
    if (index > currentPlayList.length - 1) {
      tempCurrentMusic = currentPlayList[0];
      await playMusic(audioPlayer, currentMusic, tempCurrentMusic, currentPlayList);
    } else {
      tempCurrentMusic = currentPlayList[index];
      await playMusic(audioPlayer, currentMusic, tempCurrentMusic, currentPlayList);
    }
    setIsPlayingSoundInside(true)
    //await loadToHistoryPlayed();
  }

  const onPrevMusic = () => {
    let numRandom = calculateRandomMusic();
    let index = 0;
    if (isRandom) {
      index = numRandom;
    } else {
      index = currentPlayList.indexOf(currentMusic);
    }
    index = index - 1;
    let tempCurrentMusic;
    if (index < 0) {
      tempCurrentMusic = currentPlayList[currentPlayList.length - 1];
      playMusic(audioPlayer, currentMusic, tempCurrentMusic, currentPlayList);
    } else {
      tempCurrentMusic = currentPlayList[index];
      playMusic(audioPlayer, currentMusic, tempCurrentMusic, currentPlayList);
    }
    setIsPlayingSoundInside(true)
  }
  const calculateRandomMusic = () => {
    let numRandom = Math.floor(Math.random() * (currentPlayList.length - 1));
    return numRandom;

  }

  const handleLikedMusic = () => {
    const index = likedSongsList.filter(item => item == currentMusic.id);
    if (index.length > 0) {
      deleteLikedSong(currentMusic.id, loadLikedMusics);
    } else {
      putLikedSong(currentMusic.id, loadLikedMusics);
    }

  }
//cambios 1

  return (
    <>
      {currentMusic && <View style={styles.allContainer}>
        <Image
          source={{ uri: currentMusic.imageURL }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
          blurRadius={30}
        >
        </Image>


        <View style={styles.container}>
          <View style={[styles.containerItems]}>
            <TouchableOpacity
              onPress={() => { global.navigation.goBack(); console.log("atras") }}
            >
              <View style={{ width: 75, height: 40, paddingLeft: 10 }}>
                <View style={styles.lineHeader}></View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.containerItems}>
            <View style={styles.containerImage}>
              <Image
                source={{ uri: currentMusic.imageURL }}
                style={{ width: 300, height: 300, borderRadius: 20 }}
              >
              </Image>
              <View style={{ flexDirection: "row", width: 120, justifyContent: "space-between", paddingTop: 10, marginRight: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    setIsRandom(!isRandom);
                  }}
                >
                  <Icon name="shuffle" size={25} type="entypo" color={isRandom ? "#000000" : "#FDFDFD"} />

                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    isRepeating.current = !isRepeating.current; setIsRepeatingButton(!isRepeatingButton)
                  }}
                >
                  <Icon name="repeat" size={25} type="feather" color={isRepeatingButton ? "#000000" : "#FDFDFD"} />

                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon name="dots-three-vertical" size={25} type="entypo" color={"#FDFDFD"} onPress={() => { handleShowInformationMusic(currentMusic) }} />

                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{flex:1,flexDirection:"column",justifyContent:"space-between",paddingBottom:50}}>
            <View style={styles.containerItemsTitles}>
              <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.TitleName}>{currentMusic.author}</Text>
                <Text style={styles.subTitleName}>{currentMusic.song_name}</Text>
              </View>

            </View>
            <View style={{ paddingTop: 20, alignItems: 'stretch', justifyContent: 'center' }}>

              <Slider
                onTouchStart={onStartSliderChange}
                onTouchEnd={onFinishSliderChange}
                value={progresBar}
                onValueChange={conChangeProgresBar}
                minimumTrackTintColor={"#FFFFFF"}
                maximumTrackTintColor={"#B7B7B7"}
                maximumValue={1}
                minimumValue={0}
                thumbStyle={{ height: 15, width: 15 }}
                thumbProps={{
                  children: (

                    <View

                      style={{ width: 15, height: 15, backgroundColor: "#FFFFFF", borderRadius: 7 }}
                    >

                    </View>


                  )
                }}
              />
            </View>
            <View style={styles.containerItemsControl}>
              <Text style={[styles.counter, { paddingRight: 20 }]}>
                {progresTime}
              </Text>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: 200 }}>
                <TouchableOpacity
                  onPress={onPrevMusic}
                >
                  <Icon name="fastbackward" size={25} type="ant-design" color={"#FDFDFD"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={async () => {
                  if (audioPlayer && audioPlayer.isPlaying()) {
                    setIsPlayingSoundInside(false)
                    audioPlayer.pause();
                    //finsihInterval();

                  } else {
                    setIsPlayingSoundInside(true)
                    audioPlayer.play();
                    //initInterval();

                  }

                }}>
                  <Icon name={isPlayingSoundInside ? "pause" : "play"} size={60} type="ant-design" color={"#FDFDFD"} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onNextMusic}
                >
                  <Icon name="fastbackward" size={25} type="ant-design" color={"#FDFDFD"} style={{ transform: [{ rotateY: '180deg' }] }} />
                </TouchableOpacity>

              </View>
              <Text style={[styles.counter, { paddingLeft: 20 }]}>
                {duration}
              </Text>
            </View>


            <View style={styles.containerItemsControlBottom}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: 100 }}>
                <TouchableOpacity
                  onPress={() => {
                    if (isMuted == null) {
                      setIsMuted(true)

                    } else {
                      setIsMuted(!isMuted)

                    }

                  }}
                >
                  <Icon name={(isMuted == true) ? "mute" : "unmute"} size={30} type="octicon" color={"#FDFDFD"} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleLikedMusic();
                    setIsLiked(!isLiked)
                  }}
                >
                  <Icon name={isLiked ? "heart" : "hearto"} size={30} type="ant-design" color={"#FDFDFD"} />

                </TouchableOpacity>

              </View>

            </View>

          </View>

        </View>
      </View>}
    </>


  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 20,
    position: "absolute",
    height: "100%",



  },
  allContainer: {
    position: "relative"
  },
  containerItemsControlBottom: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  },
  counter: {
    fontStyle: "normal",
    fontSize: 14,
    color: "#FFFFFF"
  },
  containerItemsControl: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },

  subTitleName: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 18,
    lineHeight: 18,
    color: "#FFFFFF",
    marginTop: 10

  },
  containerItemsTitles: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50
  },
  TitleName: {

    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 30,
    lineHeight: 30,
    color: "#FFFFFF"
  },
  containerImage: {
    width: 330,
    height: 330,
    paddingTop: 0,
    flexDirection: "column",
    alignItems: "center"
  },
  containerItems: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "center",

  },
  lineHeader: {
    width: 60,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#FFFFFF",

  },

});