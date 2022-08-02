import React from "react";
import { StyleSheet, View, Dimensions, TextInput, TouchableOpacity } from "react-native";
import { Button, ButtonGroup, withTheme, Text } from '@rneui/themed';
import { Icon } from "@rneui/base";
export const ButtonOwn = ({ onPress, title, disabled }) => {
    return (<View style={styles.containerButton}>
        <Button
            buttonStyle={styles.ButtonOwn}
            onPress={onPress}
            title={title}
            titleStyle={styles.titleStyle}
            disabled={disabled}
        >

        </Button>
    </View>
    );
}
export const ButtonOwnRegister = ({ onPress, title }) => {
    return (<View style={styles.containerButtonRegister}>
        <Button
            buttonStyle={styles.ButtonOwnRegister}
            onPress={onPress}
            title={title}
            titleStyle={[styles.titleStyle, { color: "#12485B" }]}
        >

        </Button>
    </View>
    );
}
export const ButtonOwnAddPlayList = ({ onPress, title,disabled }) => {
    return (<View style={{ width: 200 }}>
        <Button
            buttonStyle={styles.ButtonOwn1}
            onPress={onPress}
            title={title}
            titleStyle={styles.titleStyle}
            disabled={disabled}
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
    isPassword,
    changeVisibility,
    IconR,
    showDate,
    isDate,
    colorT
}) => {
    return <View style={styles.fieldSet}>
        <Text style={colorT?[styles.legend,{backgroundColor:colorT}]:styles.legend}>{text}</Text>
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
        {
            isPassword && <TouchableOpacity
                style={styles.percentageText}
                onPress={changeVisibility}
            >
                <IconR />
            </TouchableOpacity>
        }
        {
            isDate && <TouchableOpacity
                style={styles.percentageText}
                onPress={changeVisibility}
            >
                <IconR />
            </TouchableOpacity>
        }

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
                style={{ fontSize: 16, color: value != 0 ? "#12485B" : "#848282", paddingTop: 5 }}

            />
        </View>

        <View style={styles.lineStyle}></View>
    </View>;
}
export const InputTextInfo = ({
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
    isDate,
    changeVisibility,
    IconR
}) => {
    return <View style={{ flexDirection: "column", }}>
        <View style={styles.fieldSetInfoProfile}>
            <Text style={[{ fontSize: 15, width: 100, color: "#848282" }]}>{text}</Text>
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
                placeholderTextColor="white"
                color={"#12485B"}

            />
            {
                isDate && <TouchableOpacity
                    style={styles.percentageText}
                    onPress={changeVisibility}
                >
                    <IconR />
                </TouchableOpacity>
            }
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
                <Icon name="search" size={30} color={"#AAAAAA"} />
            </View>
        </TouchableOpacity>

        <TextInput
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            style={styles.styleInputLook}
            placeholderTextColor="#676767"
            placeholderStyle={{ fontFamily: "AnotherFont", borderColor: 'red' }}
        />
        <TouchableOpacity>
            <View style={{ height: 30, width:30}}>
                
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
                <Icon name="search" size={30} color={"#AAAAAA"} />
            </View>
        </TouchableOpacity>

        <TextInput
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            style={{ color: "#12485B", fontSize: 18 }}
            placeholderTextColor="#676767"
            placeholderStyle={{ fontFamily: "AnotherFont", borderColor: 'red' }}
        />
        <TouchableOpacity>
            <View style={{ height: 30,height:30 }}>
              
            </View>
        </TouchableOpacity>


    </View>;
}
export const SwitchCase = ({
    active,
    setValueSwith
}) => {
    return <TouchableOpacity
        onPress={() => {
            setValueSwith(!active)
        }}
    >
        <View style={{ width: 60, height: 30, flexDirection: "column", justifyContent: "center" }}>
            <View style={{ height: 30, width: 60, backgroundColor: active ? "#12485B" : "#D9D9D9", borderRadius: 15, flexDirection: "row", justifyContent: active ? "flex-end" : "flex-start" }}>
                <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: "#20DACA" }}>
                </View>
            </View>
        </View>

    </TouchableOpacity>
        ;
}
export const InputLookForAlbumMusic = ({
    value,
    onChangeText,
    valueText
}) => {
    return <View>
        <TextInput
            value={value}
            onChangeText={onChangeText}
            style={{ color: "#12485B", fontSize: 18, backgroundColor: "#D9D9D9", width: 250, height: 35, borderRadius: 6, paddingLeft: 10 }}
            placeholderTextColor="#AAAAAA"
            placeholderStyle={{ fontFamily: "AnotherFont", borderColor: 'red' }}
            placeholder={valueText}
        >

        </TextInput>
    </View>
        ;
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
    percentageText: {
        position: "absolute",
        top: 10,
        right: 20
    },
    fieldSetInfoProfile: {
        paddingHorizontal: 10,
        borderRadius: 15,
        height: 60,
        width: "100%",
        flexDirection: "row",
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
        flexDirection: "row",

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
        backgroundColor: "#F3F3F3",
        color: "#83C8EA",
        paddingHorizontal: 8
    },
    legendAdd: {
        fontSize: 18,
        color: "#83C8EA",
        marginRight: 20,
        width: 100
    },
    containerButton: {
        backgroundColor: "#20DACA",
        borderRadius: 15,
        width: 293,
        height: 45,
    },
    ButtonOwn: {
        backgroundColor: "#20DACA",
        borderRadius: 15,
        width: 293,
        height: 45,

    },
    containerButtonRegister: {
        borderWidth: 2,
        borderColor: "#12485B",
        borderRadius: 15,
        width: 289,

    },
    ButtonOwnRegister: {
        backgroundColor: "transparent",
        borderRadius: 15,
        width: 289,
        height: 45,

    },
    ButtonOwn1: {
        backgroundColor: "#20DACA",
        borderRadius: 15,
        width: 200,
        height: 40,
    },
    titleStyle: {


        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4
    },
    firstIndicator: {
        width: 30,
        height: 10,
        backgroundColor: "#20DACA",
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
