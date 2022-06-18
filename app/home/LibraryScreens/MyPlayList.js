import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import React, { useContext } from "react";
import { Alert, BackHandler, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HomeContext from "../../../context/HomeContext/HomeContext";
import TakiTriContext from "../../../context/SecurityContext/TakiTriContext";
import { AlbumItem } from "../../../src/Items/AlbumItem";
import { getAlbumes, handleDeletePlayList } from "../../../src/services/MusicServices";
export const MyPlayList = ({ navigation }) => {
    const {handlePushPlayListMusicAdded,handleIsToUpdatePlayList,isToUpdatePlayList,isOnLongPress, handleIsonlongPress, selectedList, handleDeleteSelectedList ,handleMessageError,handleIsModalErrorVisible} = useContext(HomeContext);

    const { userTakiTri } = useContext(TakiTriContext);

    const [albumes, setAlbumes] = React.useState([]);
    let isOnlongPressItem = React.useRef(false);
    React.useEffect(() => {
        getAlbumes(setAlbumes,userTakiTri.id);
        const backAction = () => {
            if (!isOnlongPressItem.current) {

                console.log("navigation", navigation.canGoBack())
                if (navigation.canGoBack()) {
                    navigation.goBack();
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
    React.useEffect(() => {
        isOnlongPressItem.current = isOnLongPress;
    }, [isOnLongPress])
    React.useEffect(()=>{
        if(isToUpdatePlayList){
            getAlbumes(setAlbumes,userTakiTri.id);
            handleIsToUpdatePlayList(false);
        }
      
    },[isToUpdatePlayList])
    const renderItemMusic = (item) => {
       
        if (item.item.length > 1) {

            return (
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 5 }}>
                    <AlbumItem onPresseAlbum={() => { navigation.navigate("AlbumListMusic", { itemAlbum: item.item[0], typeAlbum: "ALBUM" }) }} imageUri={item.item[0].imageURL} title={item.item[0].name} item={item.item[0]}></AlbumItem>
                    <AlbumItem onPresseAlbum={() => { navigation.navigate("AlbumListMusic", { itemAlbum: item.item[1], typeAlbum: "ALBUM" }) }} imageUri={item.item[1].imageURL} title={item.item[1].name} item={item.item[1]}></AlbumItem>
                </View>

            );
        } else {
            return (
                <View style={{ flexDirection: "row", justifyContent: "flex-start", paddingHorizontal: 5 }}>
                    <AlbumItem onPresseAlbum={() => { navigation.navigate("AlbumListMusic", { itemAlbum: item.item[0], typeAlbum: "ALBUM" }) }} imageUri={item.item[0].imageURL} title={item.item[0].name} item={item.item[0]}></AlbumItem>
                </View>

            );
        }
    }
    const handleUpdatePlayList=()=>{
        if(selectedList.length==1){
            navigation.navigate("AddPlayList");
           // handleIsonlongPress(false);
       
        }else{
            handleMessageError("Solo puede editar una PlayList a la vez")
            handleIsModalErrorVisible(true)
        }
    }
    const handleDeletePlayistDataBase=()=>{
        let tempIds=[];
        for(let i=0;i<selectedList.length;i++){
            tempIds.push(selectedList[i].id);
        }
        console.log("datos de delete",tempIds);
        handleDeletePlayList(tempIds,backToPlayList);
    }
    const backToPlayList=()=>{
        handlePushPlayListMusicAdded([]);
        handleIsonlongPress(false);
        handleDeleteSelectedList({}, {}, true);
        handleIsToUpdatePlayList(true);        
    }
    return (

        <View styles={styles.containerMain}>
            <View style={styles.containerItemsFinal}>
                <View style={styles.conatinerTitleHeaderItem}>
                    <Text style={styles.textTitleItem}>
                        Tus PlayLists
                    </Text>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate("AddPlayList")}}
                    >
                        <View style={{ width: 50, height: 50, flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 25, paddingTop: 2 }}>
                            <Icon name="plus" size={25} type="font-awesome" color={"#FDFDFD"} />
                        </View>
                    </TouchableOpacity>
                    {
                        isOnLongPress && <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity
                                onPress={() => {handleUpdatePlayList() }}
                            >
                                <View style={{ width: 50, height: 50, flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 25, paddingTop: 2 }}>
                                    <Icon name="sync" size={25} color={"white"} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    Alert.alert("Alerta!", "Estas seguro de cancelar la operación?", [
                                        {
                                            text: "No",
                                            onPress: () => null,
                                            style: "cancel"
                                        },
                                        {
                                            text: "Si", onPress: () => {
                                                handleDeletePlayistDataBase();
                                            }
                                        }
                                    ]);
                                
                                }}
                            >
                                <View style={{ width: 50, height: 50, flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 25, paddingTop: 2 }}>
                                    <Icon name="trash" size={25} type="font-awesome" color={"white"} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    }


                </View>

                <View style={styles.scrollViewMusic}>
                    {
                        albumes.length > 0 && <FlatList
                            data={albumes}
                            renderItem={(item) => renderItemMusic(item)}
                            key={item => item.id}
                        />
                    }
                </View>
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
    scrollViewMusic: {
        paddingBottom: 230,
        paddingHorizontal: 5,
        paddingTop: 0
    }
})