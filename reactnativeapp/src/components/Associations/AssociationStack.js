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

const Stack = createNativeStackNavigator()

function AssociationStack() {
  const {tabTitles, authContext, colorTheme, state} = React.useContext(AuthContext)
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
          <Stack.Screen name="AssociationInformation" component={AssociationInformation} />
          <Stack.Screen name="AddBookableObject" component={AddBookableObject} />
          <Stack.Screen name="EditBookableObject" component={EditBookableObject} />
        </Stack.Group>
      ) :
        (
          <Stack.Group>
            <Stack.Screen name="Associations" component={Associations} options={{
              headerTitle: tabTitles.AssociationsPage,
              headerBackTitle: tabTitles.Return,
            }} />
            <Stack.Screen name="BookablesView" component={BookablesView} options={{ headerTintColor: "white", headerBackTitle: tabTitles.Return, }} />
            <Stack.Screen name="BookableObject" component={BookableObject} options={({ route}) => ({ title: route.params.name ,headerTintColor: "white", headerBackTitle: tabTitles.Return,})}/>
            <Stack.Screen name="BookedObjectSwiper" component={BookedObjectSwiper} />
          </Stack.Group>
        )}
    </Stack.Navigator>
  )
}

export default AssociationStack;