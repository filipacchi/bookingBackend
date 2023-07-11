import React, {useContext} from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Associations from './Associations.js';
import BookablesView from './BookablesView.js';
import BookableObject from './BookableObject.js';
import AdminStart from 'reactnativeapp/src/screens/AdminStart.js';
import AssociationInformation from 'reactnativeapp/src/components/AdminStart/AssociationInformation.js';
import AddBookableObject from 'reactnativeapp/src/components/AdminStart/AddBookableObject.js';
import EditBookableObject from 'reactnativeapp/src/components/AdminStart/EditBookableObject.js';
import { AuthContext } from '../../../auth/UserContextProvider.js';
import BookedObjectSwiper from './BookedObjectSwiper.js';
import { Ionicons } from '@expo/vector-icons';
import { GlobalContext } from 'reactnativeapp/GlobalContext.js';
import Members from "reactnativeapp/src/components/AdminStart/Members.js";


const Stack = createNativeStackNavigator()

function AssociationStack() {
  const {tabTitles, authContext, colorTheme, state} = React.useContext(AuthContext)
  const { showInformation, setShowInformation, updateShowInformation } = useContext(GlobalContext);

  return (
    <Stack.Navigator screenOptions={{

      tabBarActiveTintColor: colorTheme.firstColor,//"#577ac2",
      tabBarStyle: {
        height: 90,
        padding: 10
      },
      headerStyle: {
        backgroundColor: colorTheme.firstColor//"#8AAAE5"
      },
      headerBackTitle: tabTitles.Return,
      headerTitleStyle: {
        color: 'white'
      },
      headerTitleAlign: "center",
      headerBackButtonMenuEnabled: false
    }}>
      {state.isAssociation ? (
        <Stack.Group>
          <Stack.Screen name="Admin" component={AdminStart} />
          <Stack.Screen name="AssociationInformation" component={AssociationInformation} options={{ headerTintColor: "white", headerBackTitle: tabTitles.Return, }} />
          <Stack.Screen name="AddBookableObject" component={AddBookableObject} options={{ headerTintColor: "white", headerBackTitle: tabTitles.Return, }}/>
          <Stack.Screen name="EditBookableObject" component={EditBookableObject} options={{ headerTintColor: "white", headerBackTitle: tabTitles.Return, }}/>
          <Stack.Screen name="Members" component={Members} options={{ headerTintColor: "white", headerBackTitle: tabTitles.Return, }} />
        </Stack.Group>
      ) :
        (
          <Stack.Group>
            <Stack.Screen name="Associations" component={Associations} options={{
              headerTitle: tabTitles.AssociationsPage,
              headerBackTitle: tabTitles.Return,
            }} />
            <Stack.Screen name="BookablesView" component={BookablesView} options={{ headerTintColor: "white", headerBackTitle: tabTitles.Return, }} />
            <Stack.Screen name="BookableObject" component={BookableObject} options={({ route}) => ({ title: route.params.name, headerTintColor: "white", headerBackTitle: tabTitles.Return, 
            headerRight: () => (
                <Ionicons
                  name="ios-information-circle-outline" 
                  size={24} 
                  color="white"
                  style={{ marginRight: 10 }}
                  onPress={() => {
                    updateShowInformation()
                  }}
                />
              ),
              })}/>
            <Stack.Screen name="BookedObjectSwiper" component={BookedObjectSwiper} />
          </Stack.Group>
        )}
    </Stack.Navigator>
  )
}

export default AssociationStack;