import { useNavigation } from "@react-navigation/native";
import { Avatar } from "@rneui/themed";
import React, { useContext } from "react";
import { Alert, BackHandler, Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HomeContext from "../../../context/HomeContext/HomeContext";
import { ButtonOwn, ButtonOwnAddPlayList, ButtonOwnHeader, InputAddLookFor, InputLookFor, InputTextAdd } from "../../../src/components/Components";
import { AlbumItem } from "../../../src/Items/AlbumItem";
import { getAlbumes, getLikedSongById, handleSubmitPlayList, lokForSongs, handleUpdatePlayList } from "../../../src/services/MusicServices";
import {
    launchImageLibraryAsync,
    MediaTypeOptions,
    useMediaLibraryPermissions,
} from "expo-image-picker";
import { MusicItem } from "../../../src/Items/MusicItem";
import TakiTriContext from "../../../context/SecurityContext/TakiTriContext";
export const AddPlayList = (props) => {
    const { navigation } = props;
    const { handleIsToUpdatePlayList,isOnLongPress,handlePushPlayListMusicAdded, musicListPlayList, handleIsonlongPress, selectedList, handleDeleteSelectedList, handleMessageError, handleIsModalErrorVisible } = useContext(HomeContext);
    const { userTakiTri } = useContext(TakiTriContext);
    const [imageUser, setImageUser] = React.useState(null);
    const [resultsMusics, setResultsMusics] = React.useState([]);
    const [playListName, setPlayListName] = React.useState("");
    const [typePlayList, setTypePlayList] = React.useState("");
    const [itemSelectedEdit, setItemSelectedEdit] = React.useState(null);
    let isOnlongPressItem = React.useRef(false);
    let canNavigateToNext = React.useRef(false);
    React.useEffect(() => {

        const backAction = () => {
            if (!isOnlongPressItem.current) {
                console.log("navigation123", navigation.canGoBack())
                if (navigation.canGoBack()) {
                    Alert.alert("Alerta!", "Estas seguro de cancelar la operación?", [
                        {
                            text: "No",
                            onPress: () => null,
                            style: "cancel"
                        },
                        {
                            text: "Si", onPress: () => {
                                navigation.goBack();
                                handlePushPlayListMusicAdded([]);
                              
                            }
                        }
                    ]);


                } else {
                    BackHandler.exitApp();
                }

            } else {

                Alert.alert("Alerta!", "Estas seguro de cancelar la operación?", [
                    {
                        text: "No",
                        onPress: () => null,
                        style: "cancel"
                    },
                    {
                        text: "Si", onPress: () => {
                            handleIsonlongPress(false);
                            handleDeleteSelectedList({}, {}, true);
                            navigation.goBack();
                        }
                    }
                ]);

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
    React.useEffect(() => {
        console.log("cambiando a nuevo de agregar");
        if (selectedList.length > 0) {
            setItemSelectedEdit(selectedList)
            setPlayListName(selectedList[0].name)
            setTypePlayList(selectedList[0].genre_name)
            getLikedSongById(setResultsMusics, selectedList[0].songList);
        }
    }, [selectedList])
    React.useEffect(() => {
        if (canNavigateToNext.current) {
            canContinue();
        }
    }, [resultsMusics])
    const chooseFile = async () => {
        let options = {
            mediaTypes: MediaTypeOptions.Images,
        };
        let response = await launchImageLibraryAsync(options);
        setImageUser(response.uri);
    };

    const lettersName = (nameBasic, surnameBasic) => {
        let lettersImg =
            nameBasic.charAt(0).toUpperCase() +
            "" +
            surnameBasic.charAt(0).toUpperCase();
        return lettersImg;
    };
    const onSubmit = async () => {
        let date = new Date();
        const values = {
            author: userTakiTri.names + " " + userTakiTri.lastName,
            genre_name: typePlayList,
            id: "",
            idUserOwn: userTakiTri.id,
            imageURL: "https://firebasestorage.googleapis.com/v0/b/borrador-a0724.appspot.com/o/albumes%2Fselecci%C3%B3n%20de%20capishcas.jpg?alt=media&token=5a67bb96-6f7b-4fad-9d2c-32c333883d9d",
            image_references: "albumes/selección de capishcas",
            name: playListName,
            year: date.getFullYear(),
            songList: musicListPlayList
        }

        if (playListName.length <= 0 || typePlayList.length <= 0) {
            console.log("si hay error");
            handleIsModalErrorVisible(true);
            handleMessageError("Ingrese los campos");
        } else {
            if (musicListPlayList.length < 3) {
                handleIsModalErrorVisible(true);
                handleMessageError("Mìnimo 3 canciones");
            } else {
                console.log("values", values)
                handleSubmitPlayList(values,backToPlayList);

            }
        }
    }
    const updatePlayList = () => {
        const values = {
            id: itemSelectedEdit[0].id,
            genre_name: typePlayList,
            idUserOwn: userTakiTri.id,
            imageURL: "https://firebasestorage.googleapis.com/v0/b/borrador-a0724.appspot.com/o/albumes%2Fselecci%C3%B3n%20de%20capishcas.jpg?alt=media&token=5a67bb96-6f7b-4fad-9d2c-32c333883d9d",
            image_references: "albumes/selección de capishcas",
            name: playListName,
            songList: itemSelectedEdit[0].songList
        }

        if (playListName.length <= 0 || typePlayList.length <= 0) {
            console.log("si hay error");
            handleIsModalErrorVisible(true);
            handleMessageError("Ingrese los campos");
        } else {
            if (itemSelectedEdit[0].songList.length < 3) {
                handleIsModalErrorVisible(true);
                handleMessageError("Mìnimo 3 canciones");
            } else {
                console.log("values a actualizar", values)
                handleUpdatePlayList(values,backToPlayList);
            }
        }
    }
    const navigateToNext = () => {
        canNavigateToNext.current = true;
        if (selectedList.length > 0) {
            getLikedSongById(setResultsMusics, selectedList[0].songList);
        } else {
            if (musicListPlayList.length > 0) {
                getLikedSongById(setResultsMusics, musicListPlayList);
            } else {
                canContinue();
            }
        }

    }
    const canContinue = () => {
        navigation.navigate("AddMusicPlayList", { musicList: resultsMusics });
    }
    const backToPlayList=()=>{
        handlePushPlayListMusicAdded([]);
        handleIsonlongPress(false);
        handleDeleteSelectedList({}, {}, true);
        handleIsToUpdatePlayList(true);
        navigation.navigate("PlayList");
        
    }
    return (
        <View styles={styles.containerMain}>

            <View style={styles.conatinerTitleHeaderItem}>
                {
                    (selectedList.length > 0) ? <Text style={styles.textTitleItem}>

                        Modificar PlayList
                    </Text> : <Text style={styles.textTitleItem}>

                        Agregar PlayList
                    </Text>
                }

            </View>
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Avatar
                    size={122}
                    title={
                        imageUser != null
                            ? lettersName("nameBasic", "surnameBasic")
                            : imageUser
                    }
                    source={{
                        uri:
                            imageUser == null
                                ? "https://ui-avatars.com/api/?background=0B2460&color=fff&size=600&font-size=0.4&name=" +
                                global.name +
                                "+" +
                                global.lastname
                                : imageUser,
                    }}
                    containerStyle={{
                        backgroundColor: "#3d4db7",
                        marginBottom: 30,
                        marginTop: 10,
                    }}
                >
                    <Avatar.Accessory
                        onPress={() => {
                            chooseFile();
                        }}
                        style={{ backgroundColor: "#EF6F6C" }}
                        size={30}
                    />
                </Avatar>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
                <InputTextAdd
                    text={"Nombre:"}
                    placeholder={"Nombre de tu PlayList"}
                    maxLength={30}
                    value={playListName}
                    onChangeText={setPlayListName}
                >
                </InputTextAdd>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
                <InputTextAdd
                    text={"Tipo:"}
                    placeholder={"Género de las canciones"}
                    maxLength={30}
                    value={typePlayList}
                    onChangeText={setTypePlayList}

                >
                </InputTextAdd>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
                {
                    (itemSelectedEdit && itemSelectedEdit.length > 0 && itemSelectedEdit[0]) ? <InputTextAdd
                        text={"Musicas:"}
                        placeholder={"Total de canciones"}
                        maxLength={30}
                        editable={false}
                        value={itemSelectedEdit[0].songList.length + ""}
                    >
                    </InputTextAdd> : <InputTextAdd
                        text={"Musicas:"}
                        placeholder={"Total de canciones"}
                        maxLength={30}
                        editable={false}
                        value={musicListPlayList.length + ""}
                    >
                    </InputTextAdd>
                }

            </View>

            <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", height: 200, paddingTop: 0 }}>
                <View style={{ marginVertical: 3 }}>
                    <ButtonOwnAddPlayList
                        title={"Agregar Canciones"}
                        onPress={() => {
                            navigateToNext();
                        }}
                    >
                    </ButtonOwnAddPlayList>
                </View>
                {
                    (itemSelectedEdit && itemSelectedEdit.length > 0 && itemSelectedEdit[0]) ? <View style={{ marginVertical: 6 }}>
                        <ButtonOwnAddPlayList
                            title={"Actualizar"}
                            onPress={() => { updatePlayList() }}
                        >
                        </ButtonOwnAddPlayList>
                    </View> : <View style={{ marginVertical: 6 }}>
                        <ButtonOwnAddPlayList
                            title={"Guardar"}
                            onPress={() => { onSubmit() }}
                        >
                        </ButtonOwnAddPlayList>
                    </View>

                }


                <View style={{ marginVertical: 6 }}>
                    <ButtonOwnAddPlayList
                        title={"Cancelar"}
                        onPress={() => {
                            Alert.alert("Alerta!", "Estas seguro de cancelar la operación?", [
                                {
                                    text: "No",
                                    onPress: () => null,
                                    style: "cancel"
                                },
                                { text: "Si", onPress: () => {
                                    handlePushPlayListMusicAdded([]);
                                    handleIsonlongPress(false);
                                    handleDeleteSelectedList({}, {}, true);
                                    navigation.goBack() 
                                }}
                            ]);

                        }}
                    >
                    </ButtonOwnAddPlayList>
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
        color: "#12485B",
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 4,
        height: 50,
    },
    styleTextAddMusic: {
        color: "white",
        fontSize: 15,
        width: "100%",
        textAlign: "center",
        marginBottom: 10
    },
    scrollViewMusic: {

    }

})