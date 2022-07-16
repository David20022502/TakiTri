import { useNavigation } from "@react-navigation/native";
import { Avatar } from "@rneui/themed";
import React, { useContext } from "react";
import { Alert, BackHandler, Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HomeContext from "../../../context/HomeContext/HomeContext";
import { InputAddLookFor, InputLookFor, InputTextAdd } from "../../../src/components/Components";
import { AlbumItem } from "../../../src/Items/AlbumItem";
import { getAlbumes, lokForSongs } from "../../../src/services/MusicServices";
import {
    launchImageLibraryAsync,
    MediaTypeOptions,
    useMediaLibraryPermissions,
} from "expo-image-picker";
import { MusicItem } from "../../../src/Items/MusicItem";
import { Icon } from "@rneui/base";
export const AddMusicPlayList = (props) => {
    global.pageStatus="AddMusicPlayList";
    const{navigation}=props;
    let musicList1=React.useRef([]);
    try{
        musicList1.current=props.route.params.musicList;
    }catch(e){

    }
    const { handlePushPlayListMusicAdded,musicListPlayList, handleIsonlongPress, selectedList, handleDeleteSelectedList,handlePushSelectedList } = useContext(HomeContext);
    const [inputLookFor, setInputLookFor] = React.useState("");
    const [resultsMusics, setResultsMusics] = React.useState(null);
    const [musicList, setMusicList] = React.useState(  musicList1.current);
    let listMusic = React.useRef([]);
    let isOnlongPressItem = React.useRef(false);
    React.useEffect(() => {
        const backAction = () => {
            if (!isOnlongPressItem.current) {
                console.log("navigation", navigation.canGoBack())
                if (navigation.canGoBack()) {
                    navigation.navigate("AddPlayList");
                } else {
                    BackHandler.exitApp();
                }

            } else {
                handleIsonlongPress(false);
                handleDeleteSelectedList({}, {}, true);
            }

            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [])
    React.useEffect(()=>{
        if(selectedList.length>0){
            let itemSelectedTemp=selectedList[0];
            let idMusics=[];
            handleDeleteSelectedList({},{},true)
            for (let i = 0; i < musicList.length; i++) {
                idMusics.push(musicList[i].id);
            }
            itemSelectedTemp.songList=idMusics;
            console.log("datos nuevos",itemSelectedTemp)
            handlePushSelectedList(itemSelectedTemp,selectedList);
        }else{
            let idMusics=[];  
            for (let i = 0; i < musicList.length; i++) {
                idMusics.push(musicList[i].id);
            }          
            handlePushPlayListMusicAdded(idMusics);
        }
        listMusic.current=musicList;
    },[musicList])
    React.useEffect(()=>{
        console.log("musicListPlayList",musicListPlayList);
    },[musicListPlayList])

    const renderItemMusic = (item) => {
        return (
            <View style={{ flexDirection: "row", position: "relative" }}>
                <View>
                    <MusicItem music={item.item} playList={resultsMusics} ></MusicItem>
                </View>

                <View style={styles.containerOPtions}>
                    <TouchableOpacity
                        onPress={() => {handleAddMusic(item.item)}}
                    >
                        <Icon name="plus" size={30} type="ant-design" color="#12485B" />
                    </TouchableOpacity>

                </View>

            </View>
        );
    }
    const renderItemMusicList = (item) => {
        return (
            <View style={{ flexDirection: "row", position: "relative" }}>
                <View>
                    <MusicItem music={item.item} playList={resultsMusics} ></MusicItem>
                </View>

                <View style={styles.containerOPtions}>
                    <TouchableOpacity
                        onPress={() => {handleDeleteMusic(item.item)}}
                    >
                        <Icon name="minus" size={30} type="ant-design" color="#12485B" />
                    </TouchableOpacity>

                </View>

            </View>
        );
    }
    const handleLookForMusics = () => {
        lokForSongs(setResultsMusics, inputLookFor)
    }
    const NotLookedFor = () => {
        return (<View
            style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }}
        >
            <Text
                style={{ color: "#12485B", fontSize: 20, marginHorizontal: 20, textAlign: "center" }}
            ></Text>
        </View>);
    }
    const NotFound = () => {
        return (<View
            style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }}
        >
            <Text
                style={{ color: "#AAAAAA", fontSize: 20,marginTop:20 }}
            >Sin Resultados...</Text>
        </View>);
    }
    const handleAddMusic=(item)=>{
        setMusicList([...musicList,item]);
    }
    const handleDeleteMusic=(item)=>{
        const nuewData=musicList.filter(item1=>item1.id!=item.id);
        setMusicList(nuewData);
    }
    return (
        <View styles={styles.containerMain}>
            <View style={{ flexDirection: "column", justifyContent: "center", width: "100%", height: 370, paddingTop: 20 }}>
                <Text style={styles.styleTextAddMusic}>Agrega las canciones a tu PlayList</Text>
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <InputAddLookFor
                        placeholder={"Busca tu canción favorita..."}
                        value={inputLookFor}
                        onChangeText={setInputLookFor}
                        onPress={handleLookForMusics}
                    >
                    </InputAddLookFor>
                </View>
                <ScrollView>

                    {
                        resultsMusics != null ? resultsMusics.length <= 0 ? <NotFound /> : <View style={styles.scrollViewMusic}>
                            <FlatList
                                data={resultsMusics}
                                renderItem={(item) => renderItemMusic(item)}
                                key={item => item.id}
                            />

                        </View> : <NotLookedFor></NotLookedFor>
                    }
                </ScrollView>
            </View>
            <View style={{ width: "100%", height: 1, backgroundColor: "#12485B" }}>

            </View>
            <View style={{ flexDirection: "column", justifyContent: "center", width: "100%", height: 400, paddingTop: 20 }}>
                <Text style={styles.styleTextAddMusic}>Canciones agregadas</Text>

                <ScrollView>
                    {
                        musicList.length > 0 ? <View style={styles.scrollViewMusic}>
                            <FlatList
                                data={musicList}
                                renderItem={(item) => renderItemMusicList(item)}
                                key={item => item.id}
                            />

                        </View> : <View></View>
                    }

                </ScrollView>
            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    containerMain: {
        flex: 1
    },
    conatinerTitleHeaderItem: {
        marginTop: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        position: "relative",
        height: 65,
        marginBottom: 10
    },
    textTitleItem: {
        marginTop: 10,
        fontStyle: "normal",
        fontSize: 30,
        color: "white",
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 4,
        height: 50,
    },
    styleTextAddMusic: {
        color: "#AAAAAA",
        fontSize: 20,
        width: "100%",
        textAlign: "center",
        marginBottom: 10
    },
    scrollViewMusic: {
        paddingBottom:100
    },
    containerOPtions: {
        position: "absolute",
        flexDirection: "row",
        justifyContent: "flex-end",
        width: Dimensions.get("window").width,
        height: "100%",
        alignItems: "center",
        paddingRight: 10
    },

})