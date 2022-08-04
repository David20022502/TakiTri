import { useIsFocused } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import React from "react";
import { BackHandler, Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { createIconSetFromFontello } from "react-native-vector-icons";
import TakiTriContext from "../../context/SecurityContext/TakiTriContext";
import { MusicItem } from "../../src/Items/MusicItem";
import { getRecentPlayed } from "../../src/services/DataBase";
import { getLikedSongById } from "../../src/services/MusicServices";
export const RecentPlayed = () => {
    global.pageStatus = "RecentPlayed";
    const { userTakiTri, handlePaddingSnackBar } = React.useContext(TakiTriContext);
    // handlePaddingSnackBar("RecentPlayed")
    const [MusicList, SetMusics] = React.useState([]);
    const [musicListOrder, setMusicListOrder] = React.useState([]);
    const [musicsList, setMusicsList] = React.useState([]);
    const [musicsListShow, setMusicsListShow] = React.useState([]);

    React.useEffect(() => {
        getRecentPlayed(userTakiTri.id, SetMusics);
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
    React.useEffect(() => {
        handlePaddingSnackBar(54)
    }, [useIsFocused])
    React.useEffect(() => {
        if (musicListOrder.length > 0) {
            let musicsId = [];

            for (let i = 0; i < musicListOrder.length; i++) {
                musicsId.push(musicListOrder[i].music_id);
            }
            getLikedSongById(setMusicsList, musicsId);
        }
    }, [musicListOrder])
    React.useEffect(() => {
        if (MusicList.length > 0) {
            let musicOrder = burbuja(MusicList);
            console.log("music oreder",musicOrder)
            setMusicListOrder(musicOrder);
        }

    }, [MusicList])
    React.useEffect(() => {
        if(musicsList.length>0){
            let tempMusics=[];
            for(let i=0;i<musicListOrder.length;i++){
               let item= musicsList.filter(it=>it.id==musicListOrder[i].music_id);
               if(item.length>0){
                tempMusics.push(item[0])

               }
            }
            setMusicsListShow(tempMusics);

        }
    }, [musicsList])
    const orderByDateMusic = (musicList) => {
    }
    function burbuja(arreglo1) {
        let arreglo = arreglo1;
        let firs = [];
        let second = [];
        for (let a = 0; a < arreglo.length; a++) {
            firs[a] = parseInt(arreglo[a].date_created);

        }
        second = firs;
        for (let i = 0; i < arreglo.length-1; i++) {
           
            for (let j = 0; j < arreglo.length-1; j++) {
               const d1 = parseInt(arreglo[j].date_created);
               const d2 = parseInt(arreglo[j+1].date_created);
                //comparamos
                if (d2 > d1) {
                    //guardamos el numero mayor en el auxiliar
                    let aux = arreglo[j];
                    //guardamos el numero menor en el lugar correspondiente
                    arreglo[j] = arreglo[j+1];
                    //asignamos el auxiliar en el lugar correspondiente
                    arreglo[j+1] = aux;
                } 

            }
        }
        //recorreremos todos los elementos hasta n-i, tomar en cuenta los ultimos no tiene caso ya que ya estan acomodados.


        return arreglo
    }
    const EmptyPlayList = () => {
        return (<View
            style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", height: Dimensions.get("window").height - 200 }}
        >
            <Text
                style={{ color: "#F3F3F3", fontSize: 20, marginHorizontal: 20, textAlign: "center" }}
            >Por el momento no tienes ninguna reproducción reciente</Text>
        </View>);
    }
    const renderItemMusic = (item) => {
        return (<MusicItem music={item.item} playList={musicsListShow} ></MusicItem>);
    }

    return <View style={{ flex: 1, position: "relative", }}>
        <View style={{ position: "absolute", top: 10, left: 10 }}>

            <Icon name="back" size={30} type="ant-design" color="black" onPress={() => { navigation.navigate("HomeScreen") }} />


        </View>
        <Text style={styles.styleTextTitle}>
            Tus últimas reproducciones
        </Text>
        <View style={styles.conatinerTitleHeaderItem1}>
            <Text style={styles.textSubTitleItem}>
                Todas las caciones escuchadas en los ultimos momentos
            </Text>

        </View>
        <View style={styles.scrollViewMusic}>
            {
                musicsListShow.length > 0 ? < FlatList
                    contentContainerStyle={{ paddingBottom: 200 }}
                    data={musicsListShow}
                    renderItem={(item) => renderItemMusic(item)}
                    key={item => item.id}
                /> : <EmptyPlayList></EmptyPlayList>
            }


        </View>
    </View>;
}
const styles = StyleSheet.create({
    containerItems: {
        flexDirection: "column",
    },
    styleTextTitle: {
        color: "#AAAAAA",
        fontSize: 25,
        width: "100%",
        textAlign: "center",
        marginTop: 30,
    },
    containerItemsFinal: {
        flexDirection: "column",
        flex: 1,
    },
    textSubTitleItem: {
        fontStyle: "normal",
        textAlign: "center",
        fontSize: 14,
        color: "#12485B",
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
        height: 40,
        marginTop: 5
    },
    conatinerTitleHeaderItem: {
        marginTop: 10,
        flexDirection: "row",

        paddingHorizontal: 20,
        position: "relative"
    },
    styleAlbumTitle: {
        fontStyle: "normal",
        fontSize: 20,
        color: "white",
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 4,
        width: 200,
    },
    conatinerTitleHeaderItem1: {
        marginTop: 0,
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 20,
        position: "relative",
        height: 65,
        marginBottom: 10
    },
    styleAlbumType: {

        fontStyle: "normal",
        fontSize: 20,
        color: "#848282",
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 4,
    },
    scrollViewAlbum: {
        paddingLeft: 10
    },
    scrollViewMusic: {
        flex: 1,
        paddingBottom: 0,
        paddingLeft: 10,
        backgroundColor: "#AAAAAA",
    }
});
