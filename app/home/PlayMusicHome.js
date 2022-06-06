import { BackHandler, StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';
import { Icon, Slider } from '@rneui/themed';
import React, { useContext, useRef } from 'react';
import HomeContext from '../../context/HomeContext/HomeContext';
import Sound from 'react-native-sound';
import { deleteLikedSong, putLikedSong } from '../../src/services/MusicServices';

export const PlayMusicHome = ({ navigation }) => {
  const { audioPlayer, currentMusic, isPlayingSound, playMusic, currentPlayList, likedSongsList, loadLikedMusics } = useContext(HomeContext)
  const [progresBar, setProgresBar] = React.useState(0);
  const [isPlayingSoundInside, setIsPlayingSoundInside] = React.useState(isPlayingSound);
  const [progresBarVolume, setProgresBarVolume] = React.useState(20);
  const [progresTime, setProgresTime] = React.useState("00:00");
  const [duration, setDuration] = React.useState("00:00");
  const [isRandom, setIsRandom] = React.useState(false);
  const [isRepeatingButton, setIsRepeatingButton] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);

  let isRepeating = React.useRef(false)
  let isSliderChanging = React.useRef(false)
  let timeProgresInterval = useRef(null)
  React.useEffect(() => {
    const backAction = () => {
          navigation.goBack();
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
      console.log("inicia uno nuevo")
      initInterval();
    }
    else {
      console.log("destrye el anterior y crea uno nuevo")
      finsihInterval();
      initInterval();
    }


  }, [audioPlayer])
  React.useEffect(() => {
    if (currentMusic) {
      const index = likedSongsList.indexOf(currentMusic.id);
      console.log("cambia de musica y ver si es favorito", index)
      if (index > 0) {
        setIsLiked(true)
      } else {
        setIsLiked(false)
      }
    }
  }, [currentMusic])
  const onPlaybackStatusUpdate = () => {
    // console.log("cambiando")
    if (audioPlayer.isPlaying()) {
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
            audioPlayer.play();
          } else {
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
    console.log("onStart")

  }
  const onFinishSliderChange = () => {
    console.log("onFinish")
    let data = progresBar * audioPlayer.getDuration();
    audioPlayer.setCurrentTime(data)
    isSliderChanging.current = false;
    if (audioPlayer.isPlaying() == false) {
      audioPlayer.play();
      setIsPlayingSoundInside(true);
    }
  }
  const conChangeProgresBar = (e) => {
    setProgresBar(e)
  }
  const onNextMusic = () => {
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
      console.log("fin de lalista", tempCurrentMusic)
      playMusic(audioPlayer, currentMusic, tempCurrentMusic, currentPlayList);
    } else {
      tempCurrentMusic = currentPlayList[index];
      playMusic(audioPlayer, currentMusic, tempCurrentMusic, currentPlayList);
    }
    setIsPlayingSoundInside(true)
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
      console.log("fin de lalista", tempCurrentMusic)
      playMusic(audioPlayer, currentMusic, tempCurrentMusic, currentPlayList);
    } else {
      tempCurrentMusic = currentPlayList[index];
      playMusic(audioPlayer, currentMusic, tempCurrentMusic, currentPlayList);
    }
    setIsPlayingSoundInside(true)
  }
  const calculateRandomMusic = () => {
    let numRandom = Math.floor(Math.random() * (currentPlayList.length - 1));
    console.log("numero randomico", numRandom);
    return numRandom;

  }
  const handleLikedMusic = () => {
    const index = likedSongsList.indexOf(currentMusic.id);
    if (index > 0) {
      deleteLikedSong(currentMusic.id, loadLikedMusics);
    } else {
      putLikedSong(currentMusic.id, loadLikedMusics);
    }

  }

  return (
    <>
      {currentMusic && <View style="allContainer">

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
                style={{ width: 330, height: 330, borderRadius: 20 }}
              >
              </Image>
              <View style={{ flexDirection: "row", width: 120, justifyContent: "space-between", paddingTop: 10, marginRight: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    setIsRandom(!isRandom);
                  }}
                >
                  <Icon name="shuffle" size={25} type="entypo" color={isRandom ? "red" : "#FDFDFD"} />

                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    isRepeating.current = !isRepeating.current; setIsRepeatingButton(!isRepeatingButton)
                  }}
                >
                  <Icon name="repeat" size={25} type="feather" color={isRepeatingButton ? "red" : "#FDFDFD"} />

                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon name="dots-three-vertical" size={25} type="entypo" color={"#FDFDFD"} />

                </TouchableOpacity>
              </View>
            </View>
          </View>
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
                if (audioPlayer.isPlaying()) {
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

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: 200 }}>
              <TouchableOpacity>
                <Icon name="volume-mute" size={25} type="fontisto" color={"#FDFDFD"} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleLikedMusic();
                  setIsLiked(!isLiked)
                }}
              >
                <Icon name={isLiked ? "heart" : "hearto"} size={30} type="ant-design" color={"#FDFDFD"} />

              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="sharealt" size={30} type="ant-design" color={"#FDFDFD"} style={{ transform: [{ rotateY: '180deg' }] }} />
              </TouchableOpacity>
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
    alignItems: "flex-end"
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