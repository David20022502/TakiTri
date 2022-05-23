import React from "react";
import { StyleSheet, View, Dimensions, TextInput,TouchableOpacity } from "react-native";
import { Button, ButtonGroup, withTheme, Text } from '@rneui/themed';
import { Icon } from "@rneui/base";
export const ButtonOwn = ({ onPress, title }) => {
    return (<View style={styles.containerButton}>
        <Button
            buttonStyle={styles.ButtonOwn}
            onPress={onPress}
            title={title}
            titleStyle={styles.titleStyle}
        >

        </Button>
    </View>



    );
}
export const Indicator = ({ i1, i2 }) => {

    return (<View style={styles.indicatorContainer}>
        <View style={styles.containerMainIndicator}>
            <View style={i1 == true ? styles.firstIndicator : styles.SecondIndicator}>
            </View>
            <View style={i2 == true ? styles.firstIndicator : styles.SecondIndicator}>
            </View>
        </View>

    </View>);
}
export const InputText = ({
    text,
    onChangeText,
    value,
    keyboardType,
    autoCapitalize,
    maxLength,
    modify,
    minLength,
    placeholder,
    editable,
    style,
}) => {
    return <View style={styles.fieldSet}>
        <Text style={styles.legend}>{text}</Text>
        <TextInput
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            value={value}
            autoCapitalize={autoCapitalize}
            maxLength={maxLength}
            secureTextEntry={modify}
            minLength={minLength}
            placeholder={placeholder}
            editable={editable}
            style={style}
        />
    </View>;
}
export const ButtonOwnHeader = ({ onPress, title, backgroundColor, textColor, color }) => {
    return (<View style={styles.containerButtonHeader}>
        <Button
            buttonStyle={[styles.ButtonOwnHeader, { backgroundColor: backgroundColor }]}
            onPress={onPress}
            title={title}
            titleStyle={[styles.titleStyle, { textShadowColor: textColor, color: color }]}
        >

        </Button>
    </View>



    );
}
export const InputLookFor = ({
    text,
    onChangeText,
    value,
    placeholder,
    onPress

}) => {
    return <View style={styles.fieldSetLookFor}>
        <TouchableOpacity
        onPress={onPress}
        >
        <View style={{height:30}}>
            <Icon name="search" size={30} color={"white"} />
        </View>
        </TouchableOpacity>
       
        <TextInput
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            style={styles.styleInputLook}
            placeholderTextColor="white" 
            placeholderStyle={{ fontFamily: "AnotherFont", borderColor: 'red'}}
            plc

        />
        <TouchableOpacity>
        <View style={{height:30}}>
            <Icon name="microphone" size={30} type={"font-awesome"} color={"white"}/>
        </View>
        </TouchableOpacity>
        
    </View>;
}
const styles = StyleSheet.create({
    fieldSetLookFor: {
        paddingHorizontal: 10,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "#83C8EA",
        height: 60,
        width: 320,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center"

    },
    styleInputLook: {
        paddingTop: 0,
        width:200
    },
    containerButtonHeader: {
        borderRadius: 15,
    },
    ButtonOwnHeader: {
        borderRadius: 15,
        width: 100,
        height: 40,
    },
    fieldSet: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "#83C8EA",
        height: 50,
        marginBottom: 20,
    },
    legend: {
        fontSize: 15,
        position: "absolute",
        top: -13,
        left: 20,
        backgroundColor: "#FFFFFF",
        color: "#83C8EA",
        paddingHorizontal: 8
    },
    containerButton: {
        backgroundColor: "#97DEF9",
        borderRadius: 15,
    },
    ButtonOwn: {
        backgroundColor: "#97DEF9",
        borderRadius: 15,
        width: 289,
        height: 40,

    },
    titleStyle: {


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
        borderRadius: 15,
    },
    containerMainIndicator: {
        width: 60,
        height: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    indicatorContainer: {
        width: Dimensions.get("window").width,
        flexDirection: "row",
        justifyContent: "center",
        bottom: 0,
        position: "absolute",
        height: 75,
    }

});
