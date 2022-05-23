import React, { useContext } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import example from "../../assets/images/example.jpg";
import { Icon } from '@rneui/themed';
import { PLAY_MUSIC_HOME } from "../../context/HomeContext/HomeTypes";
import HomeContext from "../../context/HomeContext/HomeContext";

export const MusicItem = ({music,playList}) => {
    console.log("musica, ",music)
    const {playMusic,audioPlayer,currentMusic}=useContext(HomeContext)
    const changeAlbumPage=()=>{
        //changePageStatus(PLAY_MUSIC_HOME);
        global.navigation.navigate("PlayMusicHome")
        playMusic(audioPlayer,currentMusic,music,playList);
    }
    return (
        <TouchableOpacity 
        onPress={()=>{changeAlbumPage()}}
        >
            <View style={styles.containerMusic}>
                <Image
                    source={{uri:music.imageURL}}
                    style={{ width: 80, height: 80, borderRadius: 0 }}
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
                <View style={styles.containerOPtions}>
                    <Icon name="plus" size={30} type="ant-design" color="white" onPress={() => { }} />
                    <Icon name="playcircleo" size={30} type="ant-design" color="white" onPress={() => { }} />
                </View>
            </View>
        </TouchableOpacity>



    );
}
const styles = StyleSheet.create({
    containerMusic: {
        backgroundColor: '#FDFDFD',
        flexDirection: "row",
        position: "relative",
        margin: 10,
        width: 60,
    },
    containerText: {
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: 10
    },
    containerOPtions: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: 75
    },
    title: {
        fontStyle: "normal",
        fontSize: 18,
        lineHeight: 22,
        color: "white",
        width: 180,
    },
    subTitle: {
        fontStyle: "normal",
        fontSize: 15,
        lineHeight: 22,
        color: "#848282",
        width: 180
    },
    TextStyle: {
        position: "absolute",
        fontStyle: "normal",
        fontSize: 25,
        lineHeight: 24,
        color: "#FFFFFF",
        top: 20,
        left: 30,
    },
    iconStyle: {
        position: "absolute",
        bottom: 10,
        right: 10
    }

});
