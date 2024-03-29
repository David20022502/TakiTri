import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import example from "../../assets/images/example.jpg";
import { Icon } from '@rneui/themed';
import { PLAY_MUSIC_HOME } from "../../context/HomeContext/HomeTypes";
import HomeContext from "../../context/HomeContext/HomeContext";
import TakiTriContext from "../../context/SecurityContext/TakiTriContext";
import { deleteLikedSong, putLikedSong } from "../services/MusicServices";
import { useState } from "react";
import { getMessage } from "../components/Messages";

export const MusicItem = ({ music, playList }) => {

    const { playMusic, audioPlayer, currentMusic, likedSongsList, loadLikedMusics } = useContext(HomeContext)
    const { handleError,isAutenticated,handleMessageToast, handleShowInformationMusic, handleShowSnackBar, handleDestroyAllSnackBar } = useContext(TakiTriContext)
    const [isLiked, setIsliked] = useState(false);
    useEffect(() => {
        if (likedSongsList.includes(music.id)) {
            setIsliked(true);
        } else {
            setIsliked(false);
        }
    }, [likedSongsList])
    const changeAlbumPage = () => {
        if(isAutenticated){
            handleDestroyAllSnackBar();
            global.navigation.navigate("PlayMusicHome")
            playMusic(audioPlayer, currentMusic, music, playList);
        }else{
            handleError(getMessage("authRequired"),"red");
        }
        //changePageStatus(PLAY_MUSIC_HOME);
      
    }
    const handleLike = () => {
        if(isAutenticated){
            if (!isLiked) {
                handleMessageToast("Canción agregada a favoritos");
                putLikedSong(music.id, loadLikedMusics);
            } else {
                handleMessageToast("Canción eliminada de favoritos");
                deleteLikedSong(music.id, loadLikedMusics);
            }
        }else{
            handleError(getMessage("authRequired"),"red");

        }
       


    }
    return (
        <View style={{ flexDirection: "row", justifyContent:"space-between"}}>
            <TouchableOpacity
                onPress={() => { changeAlbumPage() }}
            >
                <View style={styles.containerMusic}>
                    <Image
                        source={{ uri: music.imageURL }}
                        style={{ width: 60, height: 60, borderRadius: 6 }}
                    >
                    </Image>
                    <View style={styles.containerText}>
                        <Text style={styles.title}>
                            {music.song_name}
                        </Text>
                        <Text style={styles.subTitle}>
                            {music.author}
                        </Text>
                    </View>

                </View>
            </TouchableOpacity>
            <View 
            style={styles.optionsContainer}
            >
                <View style={styles.containerOPtions}>
                    {
                        isLiked ? <Icon name="heart" size={25} type="ant-design" color={"#12485B"} onPress={() => { handleLike() }} /> :
                            <Icon name="hearto" size={25} type="ant-design" color={"#12485B"} onPress={() => { handleLike() }} />
                    }
                </View>
                <View style={styles.containerOPtions}>
                    <Icon name="dots-three-vertical" size={20} type="entypo" color="#12485B" onPress={() => { handleShowInformationMusic(music) }} />
                </View>
            </View>

        </View>




    );
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
        paddingLeft: 10
    },
    containerOPtions: {
        flexDirection: "row",
        marginHorizontal:15,
        alignItems: "center",
    },
    title: {
        fontStyle: "normal",
        fontSize: 15,
        lineHeight: 22,
        color: "#12485B",
        width: 180,
    },
    subTitle: {
        fontStyle: "normal",
        fontSize: 13,
        lineHeight: 22,
        color: "#848282",
        width: 180
    },
    optionsContainer:{
        flexDirection:"row",
        justifyContent:"flex-end",
    }


});
