import { Icon } from '@rneui/themed';
import * as React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, Image, BackHandler } from 'react-native';
import { MusicItem } from '../../src/Items/MusicItem';
import { getLikedSongById, getMusics, getSongsByAlbum, handleUpdateStateAlbum } from '../../src/services/MusicServices';
import disco from "../../assets/images/disco.jpeg";
import HomeContext from '../../context/HomeContext/HomeContext';
import { StatusBar } from 'expo-status-bar';
import { Button } from '@rneui/base';
import { InputLookForAlbumMusic, SwitchCase } from '../../src/components/Components';
import TakiTriContext from '../../context/SecurityContext/TakiTriContext';
export const AlbumRender = (props) => {
    
    global.pageStatus="AlbumRender";

    let { itemAlbum } = props.route.params;
    let { typeAlbum } = props.route.params;
    let  isSwitchVisibleType;
    try{
          isSwitchVisibleType  = props.route.params.isSwitchVisibleType;
    }catch(e){
        isSwitchVisibleType=false
    }

    const { navigation } = props;
    
    
    const [datas, setDatas] = React.useState([])
    const {handleShowSnackBar,handlePaddingSnackBar} = React.useContext(TakiTriContext)
    const { handleIsToUpdatePlayList } =React.useContext(HomeContext);

    const [datasLookFor, setDatasLookFor] = React.useState(null)
    const [switchValue, setValueSwith] = React.useState(false)
    const [textLookFor, setTextLookFor] = React.useState("")
    const [isSwitchVisible, setIsSwitchVisible] = React.useState(false)
    
    const [playListOwner, setPlayListOwner] = React.useState("")

    const [isLookingFor, setIslookingFor] = React.useState(false)
    const { likedSongsList } = React.useContext(HomeContext)
    let isLookingForRef = React.useRef(false);
    React.useEffect(() => {
        if(itemAlbum.state){
            //setIsSwitchVisible(true)
            setValueSwith(itemAlbum.state=="PUBLIC"?true:false);
        }
        if(isSwitchVisibleType){
            setIsSwitchVisible(true)
            let name=itemAlbum.author;
            
            console.log("****",itemAlbum)
            name = name.split(" ");
            console.log("names antes--",name)
            setPlayListOwner(name[0]+" "+name[1])
        }
        handlePaddingSnackBar(5);
        const backAction = () => {
            console.log("navigation", navigation.canGoBack())
            if (navigation.canGoBack()) {
                if (isLookingForRef.current) {
                    setIslookingFor(false);
                } else {
                    if(itemAlbum.state){
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
    React.useEffect(()=>{
        console.log("album item",itemAlbum)
        if(itemAlbum.state){
            //setValueSwith(itemAlbum.state=="PUBLIC"?true:false);
            if(switchValue){
                handleUpdateStateAlbum("PUBLIC",itemAlbum.id);
            }else{
                handleUpdateStateAlbum("PRIVATE",itemAlbum.id);
            }
        }
    },[switchValue])

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
        if(!isLookingFor){
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
    const lookForMusic = () => {

        let tempSongsAlbum = [];
        if (textLookFor.length > 0) {
            for (let i = 0; i < datas.length; i++) {
                let item = datas[i];
                const NOMBRE = item.song_name;
                const AUTOR = item.author;
                //console.log(NOMBRE,GENERO,AUTOR);
                if (item.id == "7uxRJlaFVdpPUmB63qQ2") {
                    console.log("cancion encontrada", item)
                } else {
                    console.log("cancion no encontrada")
                }
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
                        <Image
                            source={{ uri: itemAlbum.imageURL }}
                            style={{ width: 180, height: 130, borderRadius: 2 }}
                        >
                        </Image>

                    </View>
                    <Text style={styles.styleAlbumTitle}>{itemAlbum.name}</Text>
                    <Text style={styles.styleAlbumType}>{
                    itemAlbum.state==undefined?"Álbum":"PlayList por "+playListOwner
                    }</Text>

                    <View style={{ position: "absolute", top: 40, left: 20 }}>

                        <Icon name="back" size={30} type="ant-design" color="black" onPress={() => { navigation.goBack();  handlePaddingSnackBar(54); }} />


                    </View>
                </View>
                <View style={styles.scrollPather}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10, height: 35 }}>
                        {
                            isLookingFor ? <>
                                <InputLookForAlbumMusic
                                    onChangeText={setTextLookFor}
                                    value={textLookFor}
                                >

                                </InputLookForAlbumMusic>
                                <View style={{ width: 30, marginRight: 50 }}>
                                    <Icon name="search" size={30} color="#12485B" onPress={() => { }} />
                                </View>
                            </> : isSwitchVisible?<>
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
                            </>:<>
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


                    </View>
                </View>


            </View>
            <View style={{ width: 200, position: "absolute", top: 240, left: (Dimensions.get("window").width / 3) - 10 }}>

                <Button
                    buttonStyle={styles.ButtonOwn1}
                    onPress={() => { }}
                    title={"Reproducir"}
                    titleStyle={styles.titleStyle}
                >

                </Button>
            </View>
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
