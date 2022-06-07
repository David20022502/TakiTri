import { Dimensions, StyleSheet } from "react-native";


export const colors = {
    screamingGreen: "#5DF061",
    cultured: "#F9FAF9",
    darkJungleGreen: "#09140C",
    greenPantone: "#47AF49",
    redOrangeColorWheel: "#F94802",
    ashGray: "#A5B8AC",
    spaceCadet: "#191A4C",
    camel: "#B2956B",
    white: "#FFFFFF",
    transparent: "transparent",
    black: "#000000",
    blue: "#124E99",
    darkCyan:"#009387",
    lightGray: "#9697B7"


};


export const commons = StyleSheet.create({
    principalContainer: {
        flex: 1,

        backgroundColor: '#fff',
    },
    principalButton: {
        backgroundColor: colors.spaceCadet,
        marginVertical:20,
        maxWidth:150,
        minWidth:150,
        alignSelf:'center',
    },
    textLogo: {
        color: colors.greenPantone,
        fontSize: 24,

    },
    loginTitle: {
        color: colors.darkJungleGreen,
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 40
    },
    loginMessage: {
        color: colors.ashGray,
        marginVertical: 20,
        fontSize: 15,
    },loginDivider:{
        maxWidth:Dimensions.get('window').width/2.2
    },signContainer:{
        flex: 1,
        backgroundColor: colors.darkCyan
    }, 
    header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50
    },
    footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
    },
    text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
    },
    text_footer: {
      color: '#05375a',
      fontSize: 18
    },
    action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5,
      alignItems: 'center',
      alignContent:'center',
    },
    actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5
    },
    textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
    },
    errorMsg: {
      color: '#FF0000',
      fontSize: 14,
    },
    button: {
      alignItems: 'center',
      marginTop: 40
    },
    signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
    },
    textSign: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    description: {
      color:colors.lightGray,
      fontSize: 20,
    }
});