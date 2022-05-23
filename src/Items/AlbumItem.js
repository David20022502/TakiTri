import React, { useContext } from "react";
import { View, StyleSheet, Image, Text,TouchableOpacity } from "react-native";
import example from "../../assets/images/example.jpg";
import { Icon } from '@rneui/themed';
import HomeContext from "../../context/HomeContext/HomeContext";

export const AlbumItem = ({onPresseAlbum,title,imageUri}) => {
    const {changePageStatus}=useContext(HomeContext)
    const changeAlbumPage=()=>{
       // changePageStatus("PLAY_LIST_ALBUM_PAGE");
        onPresseAlbum();
    }
    return (
        <TouchableOpacity 
        onPress={()=>{changeAlbumPage()}}
        >
            <View style={styles.containerAlbum}>
                {
                    (typeof(imageUri)=="string")?<Image
                    source={{uri:imageUri}}
                    style={{ width: 180, height: 180, borderRadius: 4 }}
                >
                </Image>:<Image
                    source={imageUri}
                    style={{ width: 180, height: 180, borderRadius: 4 }}
                >
                </Image>

                    
                }
                
                <Text style={styles.TextStyle}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    containerAlbum: {

        backgroundColor: '#334048',
        flexDirection: "column",
        position: "relative",
        marginTop:50,
        width: 180,
        height:250,
        borderRadius:15
    },
    TextStyle: {
        textAlign:"center",
        fontStyle: "normal",
        fontSize: 17,
        marginTop:5,
        paddingHorizontal:10,
        color: "#FFFFFF",
    },
    iconStyle: {
        position: "absolute",
        bottom: 10,
        right: 10
    }

});
