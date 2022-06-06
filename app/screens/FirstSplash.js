import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import React, { useContext } from "react";
import headPhone from "../../assets/images/headPhone.jpg";
import { ButtonOwn, Indicator } from "../../src/components/Components";
import TakiTriContext from "../../context/SecurityContext/TakiTriContext";
export const FirstSplash = ({navigation}) => {
    const { isAutenticated,currentAutenticatedUser } = useContext(TakiTriContext)
    React.useEffect(()=>{
       // currentAutenticatedUser();
      },[])
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>
                    Descubre nueva música  cada día
                </Text>
            </View>
            <View >
                <Text style={styles.subTitle}>
                    Puedes disfrutar de la música de las raices del Ecuador
                </Text>

            </View>
            <View style={styles.containerImage}>
                <Image
                    source={headPhone}
                    style={styles.imageStyle}
                >
                </Image>
                <View style={styles.containerImageBack}>
                    
                </View>
            </View>
            <View style={styles.containerButton} >
                <ButtonOwn
                    title={"Siguiente"}
                    onPress={() => { navigation.navigate("secondSplash")}}
                >

                </ButtonOwn>
            </View>

                <Indicator
                i1={true}
                i2={false}
                >
                </Indicator>

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal:10,
        flex: 1,
        backgroundColor: '#FDFDFD',
        flexDirection: "column",
        justifyContent: 'center',
        position:"relative",
        paddingHorizontal:50
        
    },
    containerIndicator:{
        flexDirection:"row",
        justifyContent:"center",
    },
    containerImage:{
        position:"relative",
        marginBottom:80,
        flexDirection:"row",
        justifyContent:"center",
    },
    containerButton:{
        position:"absolute",
        bottom:0,
        width:Dimensions.get("window").width,
        marginBottom: 90,
        flexDirection: "row",
        justifyContent: "center",
    },
    containerImageBack:{
        position:"absolute",
        width: 295,
        height: 260,
      
        backgroundColor: "rgba(196, 196, 196, 0.19)",
        borderRadius: 20
    },
    title: {
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 35,
        lineHeight: 52,
        color: "#000000",
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 4,
        marginTop:50,
        marginBottom:20
    },
    subTitle: {
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 20,
        lineHeight: 30,
        textAlign:"center",
        color: "#838383",
        marginBottom:20
    },
    imageStyle: {
        width: 285,
        height: 260,
        

    }

});
