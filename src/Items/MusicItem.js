import React, { useContext } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import example from "../../assets/images/example.jpg";
import { Icon } from '@rneui/themed';
import { PLAY_MUSIC_HOME } from "../../context/HomeContext/HomeTypes";
import HomeContext from "../../context/HomeContext/HomeContext";
import TakiTriContext from "../../context/SecurityContext/TakiTriContext";

export const MusicItem = ({ music, playList }) => {

    const { playMusic, audioPlayer, currentMusic } = useContext(HomeContext)
    const {handleShowSnackBar,handleDestroySnackBar} = useContext(TakiTriContext)

    const changeAlbumPage = () => {
        //changePageStatus(PLAY_MUSIC_HOME);
        handleDestroySnackBar();
        global.navigation.navigate("PlayMusicHome")
        playMusic(audioPlayer, currentMusic, music, playList);
        global.playMusic=playMusic;
    }
    return (
        <View style={{ flexDirection: "row" }}>
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
            <View style={styles.containerOPtions}>
                <Icon name="heart" size={25} type="ant-design" color="#12485B" onPress={() => { }} />
            </View>
            <View style={styles.containerOPtions}>
                <Icon name="dots-three-vertical" size={20} type="entypo"  color="#12485B" onPress={() => { }} />
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
        marginHorizontal: 15,
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


});
