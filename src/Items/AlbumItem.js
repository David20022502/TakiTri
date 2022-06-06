import React, { useContext, useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import example from "../../assets/images/example.jpg";
import { Icon } from '@rneui/themed';
import HomeContext from "../../context/HomeContext/HomeContext";

export const AlbumItem = ({ onPresseAlbum, title, imageUri ,item}) => {
    const { isOnLongPress, handleIsonlongPress,handlePushSelectedList,handleDeleteSelectedList,selectedList} = useContext(HomeContext);
    const [isSelecting, setIsSelecting] = useState(false);
    React.useEffect(() => {
        if(!isOnLongPress){
            setIsSelecting(isOnLongPress);
           
        }
    }, [isOnLongPress])
    React.useEffect(() => {
        if(item){
            if(isSelecting){
                handlePushSelectedList(item,selectedList);
            }else{
                handleDeleteSelectedList(item,selectedList)
            }
        }
    }, [isSelecting])
    const changeAlbumPage = () => {
        // changePageStatus("PLAY_LIST_ALBUM_PAGE");
        onPresseAlbum();
    }
    return (
        <TouchableOpacity
            onPress={() => {
                if (isOnLongPress) {
                    setIsSelecting(!isSelecting);
                } else {
                  
                    changeAlbumPage()
                }

            }}
            onLongPress={() => { handleIsonlongPress(true);
                setIsSelecting(true)}}
        >
            <View style={{position:"relative"}}>
                <View style={styles.containerAlbum}>
                    {
                        (typeof (imageUri) == "string") ? <Image
                            source={{ uri: imageUri }}
                            style={{ width: 180, height: 180, borderRadius: 4 }}
                        >
                        </Image> : <Image
                            source={imageUri}
                            style={{ width: 180, height: 180, borderRadius: 4 }}
                        >
                        </Image>


                    }

                    <Text style={styles.TextStyle}>{title}</Text>
                </View>
                <View style={isSelecting&&styles.containerFront}>

                </View>
            </View>

        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    containerAlbum: {
        backgroundColor: '#334048',
        flexDirection: "column",
        position: "relative",
        marginTop: 50,
        width: 180,
        height: 250,
        borderRadius: 15
    },
    containerFront:{
        backgroundColor: "rgba(0, 117, 103, 0.53)",
        flexDirection: "column",
        position: "absolute",
        marginTop: 50,
        width: 180,
        height: 250,
        borderRadius: 15,
        borderTopLeftRadius:0,
        borderTopRightRadius:0
    },
    TextStyle: {
        textAlign: "center",
        fontStyle: "normal",
        fontSize: 17,
        marginTop: 5,
        paddingHorizontal: 10,
        color: "#FFFFFF",
    },
    iconStyle: {
        position: "absolute",
        bottom: 10,
        right: 10
    }

});
