import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    button: {
        backgroundColor: "grey",
        alignSelf: "center",
        padding: 20,
        margin: 10
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
    }
});