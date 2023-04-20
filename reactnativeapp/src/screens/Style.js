import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    settingContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      },
      settingLabel: {
        fontSize: 16,
      },
      button: {
        backgroundColor: '#53d5d5',
        borderRadius: 50,
        padding: 10,
        width: '60%',
        alignSelf: 'center',
        marginTop: '2%'
      },
      buttonText:{
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'white'
      },
      objectName:{
        width: '100%',
        backgroundColor: 'white',
        flex: 1,
        fontSize: 16,
      },
    pressable: {
        width: "70%",
        borderRadius: 10,
        borderColor: "white",
        borderStyle: "solid",
        justifyContent: "center",
        borderWidth: 2,
        alignItems: "center",
        alignSelf: "center",
        padding: 15,
        flexDirection: "row",
        gap: 10,
        backgroundColor: "#53d5d5"
    },
    pressableText: {
        color: "white",
        fontWeight: 600
    },
    Text: {
        color: "black",
        fontWeight: 600,
        marginTop: 100,
    },
    Title: {
        textAlign: 'left',
        color: "black",
        fontWeight: 600,
        marginTop: 100,
    },
    addAssociation: {
        alignItems: "center",
        alignSelf: "center",
    },
    expandFlatlist: {

    },
    assoText: {
        color: "#222222",
        fontSize: 15,
    },
    assoView: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        gap: 10
    },
    assoFlatView: {
        backgroundColor: "white",
        borderRadius: 10,
        borderColor: "#999999",
        overflow: 'hidden',
        margin: 10,
    },
    noAssoText: {
        textAlign: "center",
        padding: 10
    },
    assoDarkView: {
        backgroundColor: "#ededed",
        padding: 15
    },
    bookObject: {
        backgroundColor: "white",
        borderRadius: 10,
        borderColor: "#999999",
        borderWidth: 1,
        padding: 5,
        margin: 5
    },
    addObject: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
    },
});