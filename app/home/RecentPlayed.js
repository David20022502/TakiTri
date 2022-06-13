import React from "react";
import { View } from "react-native";
import TakiTriContext from "../../context/SecurityContext/TakiTriContext";
import { getRecentPlayed } from "../../src/services/DataBase";
import { getLikedSongById } from "../../src/services/MusicServices";
export const RecentPlayed = () => {
    const { userTakiTri } = React.useContext(TakiTriContext);
    const [MusicList, SetMusics] = React.useState([]);
    const [musicListOrder, setMusicListOrder] = React.useState([]);
    const [musicsList, setMusicsList] = React.useState([]);
    React.useEffect(() => {
        getRecentPlayed(userTakiTri.id, SetMusics);
    }, [])
    React.useEffect(() => {
        console.log("canciones ya en historial",musicsList)
    }, [musicsList])
    React.useEffect(() => {
        if(musicListOrder.length>0){
            console.log("musicListOrder",musicListOrder);
            let musicsId=[];
            for(let i=0;i<musicListOrder.length;i++){
                musicsId.push(musicListOrder[i].music_id);
            }
            getLikedSongById(setMusicsList,musicsId);
        }
    }, [musicListOrder])
    React.useEffect(() => {
        if(MusicList.length>0){
            let musicOrder = burbuja(MusicList);
            setMusicListOrder(musicOrder);
        }
       
    }, [MusicList])
    const orderByDateMusic = (musicList) => {
    }
    function burbuja(arreglo) {
        //recorreremos todos los elementos hasta n-1
        for (let i = 0; i < arreglo.length; i++)
            //recorreremos todos los elementos hasta n-i, tomar en cuenta los ultimos no tiene caso ya que ya estan acomodados.
            for (let j = i+1; j < arreglo.length; j++) {
                const d1 = new Date(arreglo[i].date_created);
                const d2 = new Date(arreglo[j].date_created);
                //comparamos
                console.log("d1",d1);
                if (d1 > d2) {
                   console.log("si hubo");
                    //guardamos el numero mayor en el auxiliar
                    let aux = arreglo[i];
                    //guardamos el numero menor en el lugar correspondiente
                    arreglo[i] = arreglo[j ];
                    //asignamos el auxiliar en el lugar correspondiente
                    arreglo[j] = aux;
                    console.log("la d2 es mayor")
                }else{
                    console.log("la d1 es mayor")

                }

            }

        return arreglo
    }
    return <View>

    </View>;
}