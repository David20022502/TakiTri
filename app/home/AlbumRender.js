import { Icon } from '@rneui/themed';
import * as React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';
import { MusicItem } from '../../src/Items/MusicItem';
import { getLikedSongById, getMusics, getSongsByAlbum } from '../../src/services/MusicServices';
import disco from "../../assets/images/disco.jpeg";
import HomeContext from '../../context/HomeContext/HomeContext';
export const AlbumRender = (props) => {
    let {itemAlbum}=props.route.params;
    let {typeAlbum}=props.route.params;
    const [datas, setDatas] = React.useState([])
    const { likedSongsList } = React.useContext(HomeContext)
    console.log(itemAlbum);
    React.useEffect(() => {
        switch(typeAlbum){
            case "ALBUM":{
                getSongsByAlbum(setDatas,itemAlbum.genre_name);
                return;
            }
            case "FAVORITES":{
               //setDatas(likedSongsList);
               getLikedSongById(setDatas,likedSongsList);
                return;
            }

        }
    }, [likedSongsList])
    const renderItemMusic = (item) => {
        return (<MusicItem music={item.item} playList={datas} ></MusicItem>);
    }
    return (
        <View style={{ flex: 1, }}>

            <View style={styles.containerItemsFinal}>
                <View style={styles.conatinerTitleHeaderItem}>
                    <View>
                        <Image
                            source={{uri:itemAlbum.imageURL}}
                            style={{ width: 130, height: 130, borderRadius: 20 }}
                        >
                        </Image>

                    </View>
                    <View style={{paddingLeft:20}}>
                        <Text style={styles.styleAlbumTitle}>{itemAlbum.name}</Text>
                        <Text style={styles.styleAlbumType}>Álbum</Text>
                        <View style={{flexDirection:"row", justifyContent:"space-between",width:100,paddingTop:20}}>
                            <Icon name="playcircleo" size={30} type="ant-design" color="white" onPress={() => { }} />
                            <Icon name="shuffle" size={30} type="entypo" color="white" onPress={() => { }} />
                        </View>
                    </View>
                </View>

                <View style={styles.scrollViewMusic}>
                    <FlatList
                        data={datas}
                        renderItem={(item) => renderItemMusic(item)}
                        key={item => item.id}
                    />

                </View>
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
        width:200,
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
        paddingBottom: 150,
        paddingLeft: 10
    }
});
