import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, ButtonGroup, withTheme, Text } from '@rneui/themed';
export const ButtonOwn = ({ onPress, title }) => {
    return (

        <Button
            buttonStyle={styles.ButtonOwn}
            onPress={onPress}
            title={title}
            titleStyle={styles.titleStyle}
        >

        </Button>

    );
}
export const Indicator = ({i1, i2}) => {
    return (<View style={styles.indicatorContainer}>
        <View style={i1==true?styles.firstIndicator:styles.SecondIndicator}>

        </View>
        <View style={styles.SecondIndicator}>

        </View>
    </View>);
}

const styles = StyleSheet.create({
    ButtonOwn: {
        backgroundColor: "rgba(151, 222, 249, 1)",
        textShadowOffset: { width: 0, height: 3 },
        textShadowRadius: 4,
        borderRadius: 15,
        width: 289,
        height: 40,
        
    },
    titleStyle:{

        textShadowColor: "rgba(0, 0, 0, 0.25)",
        textShadowOffset: { width: 0, height: 3 },
        textShadowRadius: 4
    },
    firstIndicator: {
        width: 30,
        height: 10,
        backgroundColor: "#97DEF9",
        borderRadius: 15,
    },
    SecondIndicator: {
        width: 15,
        height: 15,
        backgroundColor: "#C4C4C4",
        borderRadius:15,
    },
    indicatorContainer:{
        width:55,
        flexDirection:"row",
        alignItems:"center",
        justifyContent: 'space-between',
    }

});
