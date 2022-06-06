import { useNavigation } from "@react-navigation/native";
import { Avatar } from "@rneui/themed";
import React, { useContext } from "react";
import { Alert, BackHandler, Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HomeContext from "../../../context/HomeContext/HomeContext";
import { ButtonOwn, ButtonOwnAddPlayList, ButtonOwnHeader, InputAddLookFor, InputLookFor, InputTextAdd } from "../../../src/components/Components";
import { AlbumItem } from "../../../src/Items/AlbumItem";
import { getAlbumes, getLikedSongById, handleSubmitPlayList, lokForSongs } from "../../../src/services/MusicServices";
import {
    launchImageLibraryAsync,
    MediaTypeOptions,
    useMediaLibraryPermissions,
} from "expo-image-picker";
import { MusicItem } from "../../../src/Items/MusicItem";
import TakiTriContext from "../../../context/SecurityContext/TakiTriContext";
export const AddPlayList = (props) => {
    const { navigation } = props;
    let musicList1 = React.useRef([]);
    try {
        const { musicList } = props.route.params;
        console.log("propsd", props)
        musicList1.current = musicList;
    } catch (e) {
        musicList1.current = [];
    }

    const { isOnLongPress, handleIsonlongPress, selectedList, handleDeleteSelectedList, handleMessageError, handleIsModalErrorVisible } = useContext(HomeContext);
    const { userTakiTri } = useContext(TakiTriContext);



    const [albumes, setAlbumes] = React.useState([]);
    const [imageUser, setImageUser] = React.useState(null);
    const [inputLookFor, setInputLookFor] = React.useState("");
    const [resultsMusics, setResultsMusics] = React.useState(null);
    const [playListName, setPlayListName] = React.useState((selectedList[0] && selectedList[0].name) || "");
    const [typePlayList, setTypePlayList] = React.useState((selectedList[0] && selectedList[0].genre_name) || "");
    let isOnlongPressItem = React.useRef(false);


    React.useEffect(() => {
        getAlbumes(setAlbumes);
        if (selectedList[0]) {
            console.log("*----------------",selectedList)
            getLikedSongById(setResultsMusics, selectedList[0].songList);
        }

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
        musicList1.current = resultsMusics;
    }, [resultsMusics])
    React.useEffect(() => {
        isOnlongPressItem.current = isOnLongPress;
    }, [isOnLongPress])
    React.useEffect(() => {
        console.log("lista", selectedList)
    }, [selectedList])
    const chooseFile = async () => {
        let options = {
            mediaTypes: MediaTypeOptions.Images,
        };
        let response = await launchImageLibraryAsync(options);
        //console.log("Response", response);
        setImageUser(response.uri);
    };
    const renderItemMusic = (item) => {
        return (<MusicItem music={item.item} playList={resultsMusics} ></MusicItem>);
    }
    const handleLookForMusics = () => {
        lokForSongs(setResultsMusics, inputLookFor)
    }
    const NotLookedFor = () => {
        return (<View
            style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }}
        >
            <Text
                style={{ color: "white", fontSize: 30, marginHorizontal: 20, textAlign: "center" }}
            >Siempre hay nuevas musicas para escuchar!</Text>
        </View>);
    }
    const NotFound = () => {
        return (<View
            style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }}
        >
            <Text
                style={{ color: "white", fontSize: 30 }}
            >Sin Resultados...</Text>
        </View>);
    }
    const lettersName = (nameBasic, surnameBasic) => {
        let lettersImg =
            nameBasic.charAt(0).toUpperCase() +
            "" +
            surnameBasic.charAt(0).toUpperCase();
        return lettersImg;
    };
    const onSubmit = async () => {
        let date = new Date()
        let idMusics = [];
        for (let i = 0; i < musicList1.current.length; i++) {
            idMusics.push(musicList1.current[i].id);
        }
        const values = {
            author: userTakiTri.names + " " + userTakiTri.lastName,
            genre_name: typePlayList,
            id: "",
            idUserOwn: userTakiTri.id,
            imageURL: "https://firebasestorage.googleapis.com/v0/b/borrador-a0724.appspot.com/o/albumes%2Fselecci%C3%B3n%20de%20capishcas.jpg?alt=media&token=5a67bb96-6f7b-4fad-9d2c-32c333883d9d",
            image_references: "albumes/selección de capishcas",
            name: playListName,
            year: date.getFullYear(),
            songList: idMusics
        }

        if (playListName.length <= 0 || typePlayList.length <= 0) {
            console.log("si hay error");
            handleIsModalErrorVisible(true);
            handleMessageError("Ingrese los campos");
        } else {
            if (musicList1.current.length < 3) {
                handleIsModalErrorVisible(true);
                handleMessageError("Mìnimo 3 canciones");
            } else {
                console.log("values", values)
                handleSubmitPlayList(values);

            }
        }

    }
    return (
        <View styles={styles.containerMain}>

            <View style={styles.conatinerTitleHeaderItem}>
                {
                    selectedList[0] ? <Text style={styles.textTitleItem}>

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
                    selectedList[0] ? <InputTextAdd
                        text={"Musicas:"}
                        placeholder={"Total de canciones"}
                        maxLength={30}
                        editable={false}
                        value={selectedList[0].songList.length+""}
                    >
                    </InputTextAdd> : <InputTextAdd
                        text={"Musicas:"}
                        placeholder={"Total de canciones"}
                        maxLength={30}
                        editable={false}
                        value={musicList1.current.length + "" || "0"}
                    >
                    </InputTextAdd>
                }

            </View>

            <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", height: 200, paddingTop: 0 }}>
                <View style={{ marginVertical: 3 }}>
                    <ButtonOwnAddPlayList
                        title={"Agregar Canciones"}
                        onPress={() => { navigation.navigate("AddMusicPlayList", { musicList: musicList1.current }) }}
                    >
                    </ButtonOwnAddPlayList>
                </View>
                <View style={{ marginVertical: 6 }}>
                    <ButtonOwnAddPlayList
                        title={"Guardar"}
                        onPress={() => { onSubmit() }}
                    >
                    </ButtonOwnAddPlayList>
                </View>
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
                                { text: "Si", onPress: () => navigation.goBack() }
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
        color: "white",
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