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
        marginBottom: 5,
        marginTop: 5,
    },
    settingLabelOverhead:{
        width: '50%'
    },
    settingLabel: {
        fontSize: 16,
    },
    button: {
        flex: 1,
        backgroundColor: '#53d5d5',
        borderRadius: 50,
        padding: 10,
        width: '60%',
        alignSelf: 'center',
        marginTop: '2%',
        marginLeft: '2%',
        marginRight: '2%'
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'white'
    },
    objectName: {
        width: '100%',
        backgroundColor: 'white',
        flex: 1,
        fontSize: 16,
    },
    pressable: {
        width: "70%",
        borderRadius: 10,
        borderColor: "transparent",
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
        //borderColor: "#999999",
        overflow: 'hidden',
        margin: 10,
        //borderWidth: 1
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
        borderColor: "white",
        borderWidth: 1,
        padding: 8,
        margin: 5
    },
    modalWindow: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)', /* en hinna över bakgrunden */
    },
    modalOuter: {
        backgroundColor: 'white',
        width: "70%",
        height: 120,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '7%',
    },
    modalInner: {
        position: "absolute",
        height: '100%',
        width: '95%',
        left: '5%',
        bottom: '10%',
        border: "solid", borderWidth: 2,
        borderColor: "green",
        backgroundColor: "white"
    },
    modalDescription: {
        fontSize: 16,
        marginBottom: 20,
    },
    modalCloseButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        /* border: 'solid', borderWidth: '2', */
    },
    modalCloseIcon: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
    },
    inputAndCheckMark: {
        marginTop: 10,
        flexDirection: "row",
        gap: 10,
    },
    modalTextInput: {
        position: "absolute",
        color: "black",
        width: "85%", height: "100%",
        border: "solid", borderWidth: 2, borderRadius: 4
    },
    modalTextInputButton: {
        height: "100%",
        /* width: 20, */
        resizeMode: 'contain',
    },
    modalButton: {
        width: 50,
        height: 30,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalInput: {
        minWidth: 120,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
        backgroundColor: "#d9d9d9",
    },
    addObject: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    langSwitchBox: {
        right: "15%",
        top: "5%",
        position: "absolute",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "white",
        height: 35,
        width: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    noBookablesContainer: {
        justifyContent: "center",
        height: 90,
    },
    noBookablesText: {
        fontWeight: "500",
        fontSize: 17,
        textAlign: "center"
    },
    langText: {
        color: "white",
        fontWeight: "400",
        fontSize: 15
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    pressableBook: {
        flexGrow: 7,
        borderRadius: 10,
        borderColor: "transparent",
        borderStyle: "solid",
        justifyContent: "center",
        borderWidth: 2,
        alignItems: "center",
        alignSelf: "center",
        padding: 15,
        flexDirection: "row",
        gap: 10,
        backgroundColor: "#22992e"
    },
    pressableCancelBook: {
        flexGrow: 1,
        borderRadius: 10,
        borderColor: "transparent",
        borderStyle: "solid",
        justifyContent: "center",
        borderWidth: 2,
        alignItems: "center",
        alignSelf: "center",
        padding: 15,
        flexDirection: "row",
        gap: 10,
        backgroundColor: "#Be2525",
    },
    inputCredentials: {
        overflow: "hidden",
        width: "70%",
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
    },
    swipeToDelView: {
        backgroundColor: "red",
        width: "20%",
        marginBottom: 10,
        //marginTop: 10,
        marginRight: 10,
        borderRadius: 10,
    },
    toSwipe: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    assoViewInner: {
        flex: 1,
        gap: 5
    },
    bookedTimesView: {
        backgroundColor: "white",
        borderRadius: 10,
        //borderColor: "#999999",
        //borderWidth: 1
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
    },
    viewBookButton: {
        flexDirection: "row",
        padding: 20,
        backgroundColor: "white",
        gap: 20
    },
    containerSettings: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      innerContainerSettings: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: "5%"
      },
      settingsView: {
        padding: "5%",
        gap: "30%"
      },
      nameTextLarge: {
        fontSize: 20,
        fontWeight: 500
      },
      nameHeader: {
        justifyContent: "center",
        alignItems: "center"
      },
      iconContainer: {
        height: 30,
        width: 30,
        alignItems: "center",
        justifyContent: "center"
      },
      settingNameText: {
        fontSize: 20
      }
});