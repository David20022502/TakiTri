import { Icon } from "@rneui/themed";
import { StyleSheet, Text, View, Modal } from "react-native";


export const ModalInfoError = ({ modalVisible, setModalVisible,message}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView2}>
        <View style={styles.modalView}>
          <View style={styles.viewDirrect}>
            <View style={{ paddingLeft: 110 }}>
              <Icon
                name="information-circle-outline"
                type="ionicon"
                size={90}
                color="#B2ABA4"
              />
            </View>
            <View style={{ paddingLeft: 60 }}>
              <Icon
                name="close"
                type="ionicon"
                size={35}
                color="#00C7B1"
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
          <Text style={styles.modalTitle}>MENSAJE DE ERROR</Text>
          <View style={[styles.viewFlex]}>
            <Text style={styles.textMessage}>
               {message}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  centeredView2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  textMessage:{
      fontSize:18,
      color: "#979797",
  },
  viewFlex: {
    alignItems: "flex-start",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  viewDirrect: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  modalText: {
    marginBottom: 15,
    fontSize: 15,
    color: "#979797",
  },
  modalSubTex: {
    marginBottom: 5,
    color: "#979797",
    fontSize: 15,
  },
  modalTitle: {
    marginBottom: 15,
    fontSize: 22,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
  },
  viewDirrect: {
    flexDirection: "row",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 15,
    color: "#979797",
  },
  modalSubtitle: {
    marginBottom: 5,
    color: "#979797",
    fontWeight: "bold",
    fontSize: 15,
  },
  modalTitle: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
  },
  itemModalStyle: {
    flexDirection: "row",
  },
});