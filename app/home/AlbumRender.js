import { Icon } from '@rneui/themed';
import * as React from 'react';
import {  StyleSheet, Text, View, FlatList, Image, BackHandler } from 'react-native';
import { MusicItem } from '../../src/Items/MusicItem';
import { getAlbumes, getLikedSongById, getSongsByAlbum, handleUpdateStateAlbum } from '../../src/services/MusicServices';
import HomeContext from '../../context/HomeContext/HomeContext';
import { StatusBar } from 'expo-status-bar';
import favoritosImg from "../../assets/images/favoritosImg.png";

import { InputLookForAlbumMusic, SwitchCase } from '../../src/components/Components';
import TakiTriContext from '../../context/SecurityContext/TakiTriContext';
export const AlbumRender = (props) => {

    global.pageStatus = "AlbumRender";

    let { itemAlbum } = props.route.params;
    let { typeAlbum } = props.route.params;
    let isSwitchVisibleType;
    try {
        isSwitchVisibleType = props.route.params.isSwitchVisibleType;
    } catch (e) {
        isSwitchVisibleType = false
    }

    const { navigation } = props;


    const [datas, setDatas] = React.useState([])
    const { handleShowSnackBar, handlePaddingSnackBar } = React.useContext(TakiTriContext)
    const { loadAlbumAll, handleIsToUpdatePlayList } = React.useContext(HomeContext);
    const [datasLookFor, setDatasLookFor] = React.useState(null)
    const [switchValue, setValueSwith] = React.useState(false)
    const [textLookFor, setTextLookFor] = React.useState("")
    const [isSwitchVisible, setIsSwitchVisible] = React.useState(false)

    const [playListOwner, setPlayListOwner] = React.useState("")

    const [isLookingFor, setIslookingFor] = React.useState(itemAlbum.state ? false : true)
    const { likedSongsList } = React.useContext(HomeContext)
    let isLookingForRef = React.useRef(false);
    React.useEffect(() => {
        if (itemAlbum.state) {
            //setIsSwitchVisible(true)
            setValueSwith(itemAlbum.state == "PUBLIC" ? true : false);
            let name = itemAlbum.author;

            name = name.split(" ");
            if(name.length>1){
                setPlayListOwner(name[0] + " " + name[1])
            }else{
                setPlayListOwner(name[0])
            }
        }
        if (isSwitchVisibleType) {
            setIsSwitchVisible(true)
            let name = itemAlbum.author;

            name = name.split(" ");
            if(name.length>1){
                setPlayListOwner(name[0] + " " + name[1])
            }else{
                setPlayListOwner(name[0])
            }
            
        }
        handlePaddingSnackBar(5);
        const backAction = () => {
            if (navigation.canGoBack()) {
                if (itemAlbum.state) {
                    if (isLookingForRef.current) {
                        setIslookingFor(false);
                    } else {
                        if (itemAlbum.state) {
                            handleIsToUpdatePlayList(true);
                        }
                        navigation.goBack();
                        handlePaddingSnackBar(54);
                    }
                } else {
                    if (itemAlbum.state) {
                        handleIsToUpdatePlayList(true);
                    }
                    navigation.goBack();
                    handlePaddingSnackBar(54);
                }


            } else {
                BackHandler.exitApp();
            }

            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [])
    React.useEffect(async () => {
        if (itemAlbum.state) {
            //setValueSwith(itemAlbum.state=="PUBLIC"?true:false);
            if (switchValue) {
                await handleUpdateStateAlbum("PUBLIC", itemAlbum.id);
                await handleIsToUpdatePlayList(true);

                await getAlbumes(loadAlbumAll, 1000);

            } else {
                await handleUpdateStateAlbum("PRIVATE", itemAlbum.id);
                await handleIsToUpdatePlayList(true);
                await getAlbumes(loadAlbumAll,1000);


                //await getAlbumes(loadAlbumAll, 1000);

            }
        }
    }, [switchValue])

    React.useEffect(() => {
        switch (typeAlbum) {
            case "ALBUM": {
                getSongsByAlbum(setDatas, itemAlbum);
                return;
            }
            case "FAVORITES": {
                //setDatas(likedSongsList);
                getLikedSongById(setDatas, likedSongsList);
                return;
            }

        }
    }, [likedSongsList])
    React.useEffect(() => {
        isLookingForRef.current = isLookingFor;
        if (!isLookingFor) {
            setDatasLookFor(null);
            setTextLookFor("");
        }
    }, [isLookingFor])
    React.useEffect(() => {
        if (isLookingFor) {
            lookForMusic();
        } else {
            setDatasLookFor(null);
        }

    }, [textLookFor])
    const renderItemMusic = (item) => {
        return (<MusicItem music={item.item} playList={datas} ></MusicItem>);
    }
    const EmptyPlayList = () => {
        console.log("vacio fav")
        return (<View
            style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}
        >
            <Text
                style={{ color: "#F3F3F3", fontSize: 20, marginHorizontal: 20, textAlign: "center" }}
            >{
                    itemAlbum.name == "Favoritos" ? "Por el momento no tienes ninguna canción en favoritos" : "Álbum sin canciónes"
                }
            </Text>
        </View>);
    }
    const NotFound = () => {
        console.log("vacio fav")
        return (<View
            style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}
        >
            <Text
                style={{ color: "#F3F3F3", fontSize: 20, marginHorizontal: 20, textAlign: "center" }}
            >
                Sin resultados...
            </Text>
        </View>);
    }
    const lookForMusic = () => {

        let tempSongsAlbum = [];
        if (textLookFor.length > 0) {
            for (let i = 0; i < datas.length; i++) {
                let item = datas[i];
                const NOMBRE = item.song_name;
                const AUTOR = item.author;
                //console.log(NOMBRE,GENERO,AUTOR);

                if (NOMBRE.toLowerCase().includes(textLookFor.toLowerCase()) ||
                    AUTOR.toLowerCase().includes(textLookFor.toLowerCase())) {
                    tempSongsAlbum.push(item);
                }
            }
            setDatasLookFor(tempSongsAlbum);
        } else {
            setDatasLookFor(null)
        }
    }
    return (
        <View style={{ flex: 1, position: "relative" }}>
            <StatusBar backgroundColor='#F3F3F3'></StatusBar>
            <View style={styles.containerItemsFinal}>
                <View style={styles.conatinerTitleHeaderItem}>
                    <View>
                        {
                            itemAlbum.name == "Favoritos" ? <Image
                                source={favoritosImg }
                                style={{ width: 180, height: 150, borderRadius: 2 }}
                            >
                            </Image> : <Image
                                source={{ uri: itemAlbum.imageURL }}
                                style={{ width: 180, height: 150, borderRadius: 2 }}
                            >
                            </Image>
                            
                        }
                       

                    </View>
                    <Text style={styles.styleAlbumTitle}>{itemAlbum.name}</Text>
                    <Text style={styles.styleAlbumType}>{
                        itemAlbum.state == undefined ? "Álbum" : "PlayList por " + playListOwner
                    }</Text>

                    <View style={{ position: "absolute", top: 40, left: 20 }}>

                        <Icon name="back" size={30} type="ant-design" color="black" onPress={() => { navigation.goBack(); handlePaddingSnackBar(54); }} />


                    </View>
                </View>
                <View style={styles.scrollPather}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10, height: 35 }}>
                        {
                            isLookingFor ? <>
                                <InputLookForAlbumMusic
                                    onChangeText={setTextLookFor}
                                    value={textLookFor}
                                    valueText={"Buscar música"}
                                >

                                </InputLookForAlbumMusic>
                                <View style={{ width: 30, marginRight: 50 }}>
                                    <Icon name="search" size={30} color="#12485B" onPress={() => { }} />
                                </View>
                            </> : isSwitchVisible ? <>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <SwitchCase
                                        active={switchValue}
                                        setValueSwith={setValueSwith}
                                    ></SwitchCase>
                                    {
                                        switchValue ? <Text style={{ color: "#F3F3F3", fontSize: 20, marginLeft: 10 }} >Público</Text> : <Text style={{ color: "#F3F3F3", fontSize: 20, marginLeft: 10 }} >Privado</Text>
                                    }
                                </View>
                                <View style={{ width: 30, marginRight: 50 }}>
                                    <Icon name="search" size={30} color="#12485B" onPress={() => { setIslookingFor(!isLookingFor) }} />
                                </View>
                            </> : <>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>

                                </View>
                                <View style={{ width: 30, marginRight: 50 }}>
                                    <Icon name="search" size={30} color="#12485B" onPress={() => { setIslookingFor(!isLookingFor) }} />
                                </View>
                            </>
                        }



                    </View>
                    <View style={{ paddingBottom: 40 }}>
                        {
                            datasLookFor ? <FlatList
                                contentContainerStyle={{ paddingBottom: 200 }}
                                data={datasLookFor}
                                renderItem={(item) => renderItemMusic(item)}
                                key={item => item.id}
                            /> : <FlatList
                                contentContainerStyle={{ paddingBottom: 200 }}
                                data={datas}
                                renderItem={(item) => renderItemMusic(item)}
                                key={item => item.id}
                            />
                        }
                        {
                            
                            (datasLookFor && datasLookFor.length <= 0) ?<NotFound></NotFound>:(datas && datas.length <= 0) && <EmptyPlayList></EmptyPlayList>
                        }


                    </View>
                </View>


            </View>
            {
                /*
 <View style={{ width: 200, position: "absolute", top: 240, left: (Dimensions.get("window").width / 3) - 10 }}>

                <Button
                    buttonStyle={styles.ButtonOwn1}
                    onPress={() => { }}
                    title={"Reproducir"}
                    titleStyle={styles.titleStyle}
                >

                </Button>
            </View>
                 */
            }

        </View>
    );
}
const styles = StyleSheet.create({
    containerItems: {
        flexDirection: "column",
    },
    containerItemsFinal: {
        flexDirection: "column",
        flex: 1,
    },
    ButtonOwn1: {
        backgroundColor: "#20DACA",
        borderRadius: 25,
        width: 140,
        height: 50,

    },
    titleStyle: {
        textShadowOffset: { width: 0, height: 3 },
        textShadowRadius: 4
    },
    conatinerTitleHeaderItem: {
        paddingTop: 50,
        height: 265,
        flexDirection: "column",
        alignItems: "center",
        paddingHorizontal: 20,
        position: "relative",
        backgroundColor: "#F3F3F3",
    },
    styleAlbumTitle: {
        fontStyle: "normal",
        fontSize: 20,
        color: "#848282",
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowRadius: 4,

    },
    styleAlbumType: {
        fontWeight: "300",
        fontStyle: "normal",
        fontSize: 20,
        color: "#838383",
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowRadius: 4,
    },
    scrollViewAlbum: {
        paddingLeft: 10
    },
    scrollPather: {
        paddingLeft: 10,
        backgroundColor: "#AAAAAA",
        flex: 7,
        position: "relative",
        paddingTop: 30
    },

});
