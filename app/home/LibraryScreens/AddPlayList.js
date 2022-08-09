import { useNavigation } from "@react-navigation/native";
import { Avatar } from "@rneui/themed";
import React, { useContext, useRef } from "react";
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
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { MusicItem } from "../../../src/Items/MusicItem";
import TakiTriContext from "../../../context/SecurityContext/TakiTriContext";
import { getMessage } from "../../../src/components/Messages";
import { checkOnlySpaces, validateAlfaNumeric } from "../../../src/services/Validations";
export const AddPlayList = (props) => {
    global.pageStatus = "AddPlayList";
    const { navigation } = props;
    const { handleIsToUpdatePlayList, isOnLongPress, handlePushPlayListMusicAdded, musicListPlayList, handleIsonlongPress, selectedList, handleDeleteSelectedList, handleMessageError, handleIsModalErrorVisible } = useContext(HomeContext);
    const { userTakiTri, handleLoading, handleError, } = useContext(TakiTriContext);
    const [imageUser, setImageUser] = React.useState(null);
    const [resultsMusics, setResultsMusics] = React.useState([]);
    const [playListName, setPlayListName] = React.useState("");
    const [typePlayList, setTypePlayList] = React.useState("");
    const [itemSelectedEdit, setItemSelectedEdit] = React.useState(null);
    const [userImageUrl, setUserImageUrl] = React.useState(null);

    const [isNotErrorStyleImputName, setIsNotErrorStyleImputName] = React.useState(true);
    const [errorTextImputMessageName, setErrorTextImputMessageName] = React.useState("");
    const [isNotErrorStyleImputType, setIsNotErrorStyleImputType] = React.useState(true);
    const [errorTextImputMessageType, setErrorTextImputMessageType] = React.useState("");
    const [canCreate, setCanCreate] = React.useState(false);

    let checkUpdateCreate = useRef("");
    let docIdPlayList = useRef("");
    let isOnlongPressItem = React.useRef(false);
    let canNavigateToNext = React.useRef(false);
    React.useEffect(() => {

        const backAction = () => {
            if (!isOnlongPressItem.current) {
                console.log("navigation123", navigation.canGoBack())
                if (navigation.canGoBack()) {
                    Alert.alert("Alerta!", "Estas seguro de que quieres cancelarlo?", [
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

                Alert.alert("Alerta!", "Estas seguro de que quieres cancelarlo?", [
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
        console.log("isNotErrorStyleImputName", isNotErrorStyleImputName)
        console.log("isNotErrorStyleImputType", isNotErrorStyleImputType)

        if (isNotErrorStyleImputName == true && isNotErrorStyleImputType == true) {
            setCanCreate(true)
        } else {
            setCanCreate(false)
        }
    }, [isNotErrorStyleImputName, isNotErrorStyleImputType])

    React.useEffect(async () => {
        let date = new Date();
        if (userImageUrl) {
            try {

                if (checkUpdateCreate.current == "UPDATING") {
                    const values = {
                        id: itemSelectedEdit[0].id,
                        genre_name: typePlayList,
                        idUserOwn: userTakiTri.id,
                        imageURL: userImageUrl,
                        image_references: "albumes/selección de capishcas",
                        name: playListName,
                        songList: itemSelectedEdit[0].songList,
                        state: "PRIVATE"
                    }

                    console.log("actualizando....")

                    await handleUpdatePlayList(values, backToPlayList);
                }
                if (checkUpdateCreate.current == "CREATING") {
                    const values = {
                        author: userTakiTri.names + " " + userTakiTri.lastName,
                        genre_name: typePlayList,
                        id: docIdPlayList.current,
                        idUserOwn: userTakiTri.id,
                        imageURL: userImageUrl,
                        image_references: "albumes/selección de capishcas",
                        name: playListName,
                        year: date.getFullYear(),
                        songList: musicListPlayList,
                        state: "PRIVATE"

                    }
                    console.log("creando....123")
                    //let idAlbum=await handleSubmitPlayList(values, backToPlayList);
                    console.log("idAlbum", docIdPlayList.current)
                    await handleUpdatePlayList(values, backToPlayList);

                }
                handleLoading(false);
                checkUpdateCreate.current = "";
            } catch (e) {
                handleError(getMessage("*"), "red");
                handleLoading(false);
                checkUpdateCreate.current = "";
            }


        }
    }, [userImageUrl])
    React.useEffect(() => {
        console.log("cambiando a nuevo de agregar");
        if (selectedList.length > 0) {
            setImageUser(selectedList[0].imageURL);
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
        if (response.cancelled == false) {
            setImageUser(response.uri);

        }
    };

    const lettersName = (nameBasic, surnameBasic) => {
        let lettersImg =
            nameBasic.charAt(0).toUpperCase() +
            "" +
            surnameBasic.charAt(0).toUpperCase();
        return lettersImg;
    };
    const onSubmit = async () => {

        if (playListName.length <= 0 || typePlayList.length <= 0) {
            console.log("si hay error");
            // handleIsModalErrorVisible(true);
            //handleMessageError("Ingrese los campos");
            handleError(getMessage("dataRequired"), "red");
        } else {
            if (canCreate) {
                if (musicListPlayList.length < 3) {
                    // handleIsModalErrorVisible(true);
                    handleError(getMessage("min3musics"), "red");
                } else {
                    handleLoading(true);
                    if (imageUser != null) {
                        checkUpdateCreate.current = "CREATING";
                        uploadFile();

                    } else {
                        handleLoading(false);
                        handleError(getMessage("select_image"), "red");
                    }
                }
            }

        }
    }

    const uploadFile = async () => {
        try {
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    resolve(xhr.response);
                };
                xhr.onerror = function (e) {
                    reject(new TypeError("Network request failed"));
                };
                xhr.responseType = "blob";
                xhr.open("GET", imageUser, true);
                xhr.send(null);
            });

            const storage = getStorage();
            let fileStorage;
            if (checkUpdateCreate.current == "CREATING") {
                const values = {
                    id: ""
                }
                let docId = await handleSubmitPlayList(values, backToPlayList);
                docIdPlayList.current = docId;
                fileStorage = ref(
                    storage,
                    "imagesPlayList/" + docId + ".jpg"
                );
            } else {
                fileStorage = ref(
                    storage,
                    "imagesPlayList/" + selectedList[0].id + ".jpg"
                );
            }
            const uploadResult = await uploadBytes(fileStorage, blob);

            blob.close();

            const url = await getDownloadURL(fileStorage);
            setUserImageUrl(url);
            console.log("url--", url)
            global.urlProfile = url;
        } catch (e) {
            console.log("error subir", e)
            handleLoading(false)
            handleError(getMessage("*"), "red");

        }

    };
    const updatePlayList = async () => {


        if (playListName.length <= 0 || typePlayList.length <= 0) {
            console.log("si hay error");
            //handleIsModalErrorVisible(true);
            //handleMessageError("Ingrese los campos");
            handleError(getMessage("dataRequired"), "red");
        } else {
            if (canCreate) {
                if (itemSelectedEdit[0].songList.length < 3) {
                    //handleMessageError("Mìnimo 3 canciones","red");
                    handleError(getMessage("min3musics"), "red");
                } else {

                    handleLoading(true);
                    if (imageUser != null) {
                        checkUpdateCreate.current = "UPDATING";

                        uploadFile();
                    } else {
                        handleLoading(false);
                        handleError(getMessage("*"), "red");
                    }



                }
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
    const backToPlayList = () => {
        handlePushPlayListMusicAdded([]);
        handleIsonlongPress(false);
        handleDeleteSelectedList({}, {}, true);
        handleIsToUpdatePlayList(true);
        navigation.navigate("PlayList");

    }
    return (
        <ScrollView>
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
                            style={{ backgroundColor: "#7DDAFF", marginBottom: 7, marginRight: 5 }}
                            size={30}
                        />
                    </Avatar>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
                    <InputTextAdd
                        text={"Nombre:"}
                        placeholder={"Nombre de tu PlayList"}
                        maxLength={27}
                        value={playListName}
                        onChangeText={(e) => {
                            let checkSpaces = checkOnlySpaces(e);
                            if (!checkSpaces) {
                                let validation = validateAlfaNumeric(e);
                                if (validation.resultValidation) {
                                    setPlayListName(e);
                                }
                                setErrorTextImputMessageName(validation.message)
                                setIsNotErrorStyleImputName(validation.Result)
                            } else {
                                setPlayListName(e);
                                setErrorTextImputMessageName(getMessage("playListNameRequired"))
                                setIsNotErrorStyleImputName(false)
                            }
                        }}
                    >
                    </InputTextAdd>


                </View>
                {isNotErrorStyleImputName == false && (
                    <Text style={styles.errorStyleImputText}>{errorTextImputMessageName}</Text>
                )}
                <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
                    <InputTextAdd
                        text={"Tipo:"}
                        placeholder={"Género de las canciones"}
                        maxLength={27}
                        value={typePlayList}
                        onChangeText={(e) => {
                            let checkSpaces = checkOnlySpaces(e);
                            if (!checkSpaces) {
                                let validation = validateAlfaNumeric(e);
                                if (validation.resultValidation) {
                                    setTypePlayList(e);
                                }
                                setErrorTextImputMessageType(validation.message)
                                setIsNotErrorStyleImputType(validation.Result)
                            } else {
                                setTypePlayList(e);
                                setErrorTextImputMessageType(getMessage("typeRequired"))
                                setIsNotErrorStyleImputType(false)
                            }
                        }}

                    >
                    </InputTextAdd>

                </View>
                {isNotErrorStyleImputType == false && (
                    <Text style={styles.errorStyleImputText}>{errorTextImputMessageType}</Text>
                )}
                <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
                    {
                        (itemSelectedEdit && itemSelectedEdit.length > 0 && itemSelectedEdit[0]) ? <InputTextAdd
                            text={"Canciones:"}
                            placeholder={"Total de canciones"}
                            maxLength={30}
                            editable={false}
                            value={itemSelectedEdit[0].songList.length + " "}
                        >
                        </InputTextAdd> : <InputTextAdd
                            text={"Canciones:"}
                            placeholder={"Total de canciones"}
                            maxLength={30}
                            editable={false}
                            value={musicListPlayList.length + " "}
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
                                Alert.alert("Alerta!", "Estas seguro de que quieres cancelarlo?", [
                                    {
                                        text: "No",
                                        onPress: () => null,
                                        style: "cancel"
                                    },
                                    {
                                        text: "Si", onPress: () => {
                                            handlePushPlayListMusicAdded([]);
                                            handleIsonlongPress(false);
                                            handleDeleteSelectedList({}, {}, true);
                                            navigation.goBack()
                                        }
                                    }
                                ]);

                            }}
                        >
                        </ButtonOwnAddPlayList>
                    </View>
                </View>

            </View>
        </ScrollView>

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
        textShadowOffset: { width: 0, height: 3 },
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

    },
    errorStyleImputText: {
        color: "red",
        top: -10,
        marginHorizontal: 40,
        fontSize: 11,
    },

})