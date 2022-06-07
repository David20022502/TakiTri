import React from "react";
import { StyleSheet, View, Dimensions, TextInput, TouchableOpacity } from "react-native";
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
export const ButtonOwnAddPlayList= ({ onPress, title }) => {
    return (<View style={{width:200}}>
        <Button
            buttonStyle={styles.ButtonOwn1}
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
export const InputTextAdd = ({
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
    return <View style={{ flexDirection: "column", width: 340 }}>
        <View style={styles.fieldSetAdd}>
            <Text style={styles.legendAdd}>{text}</Text>
            <TextInput
           
                onChangeText={onChangeText}
                value={value}
                autoCapitalize={autoCapitalize}
                maxLength={maxLength}
                secureTextEntry={modify}
                minLength={minLength}
                placeholder={placeholder}
                placeholderTextColor={"#848282"}
                editable={editable}
                style={{ fontSize: 16, color: "white", paddingTop: 5 }}

            />
        </View>

        <View style={styles.lineStyle}></View>
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
            <View style={{ height: 30 }}>
                <Icon name="search" size={30} color={"white"} />
            </View>
        </TouchableOpacity>

        <TextInput
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            style={styles.styleInputLook}
            placeholderTextColor="white"
            placeholderStyle={{ fontFamily: "AnotherFont", borderColor: 'red' }}
        />
        <TouchableOpacity>
            <View style={{ height: 30 }}>
                <Icon name="microphone" size={30} type={"font-awesome"} color={"white"} />
            </View>
        </TouchableOpacity>


    </View>;
}
export const InputAddLookFor = ({
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
            <View style={{ height: 30 }}>
                <Icon name="search" size={30} color={"white"} />
            </View>
        </TouchableOpacity>

        <TextInput
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            style={{ color: "white", fontSize: 18 }}
            placeholderTextColor="white"
            placeholderStyle={{ fontFamily: "AnotherFont", borderColor: 'red' }}
        />
        <TouchableOpacity>
            <View style={{ height: 30 }}>
                <Icon name="microphone" size={30} type={"font-awesome"} color={"white"} />
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
        alignItems: "center"

    },
    styleInputLook: {
        paddingTop: 0,
        width: 200
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
    fieldSetAdd: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        height: 50,
        flexDirection: "row",

    },
    lineStyle: {
        backgroundColor: "#83C8EA",
        height: 2,
        width: "100%"
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
    legendAdd: {
        fontSize: 23,
        color: "#83C8EA",
        marginRight: 20,
        width: 100
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
    ButtonOwn1:{
        backgroundColor: "#97DEF9",
        borderRadius: 15,
        width: 200,
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
