import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Associations from './Associations.js';
import BookablesView from './BookablesView.js';
import BookableObject from './BookableObject.js';
import AdminStart from 'reactnativeapp/src/screens/AdminStart.js';
import AssociationInformation from 'reactnativeapp/src/components/AdminStart/AssociationInformation.js';
import AddBookableObject from 'reactnativeapp/src/components/AdminStart/AddBookableObject.js';
import EditBookableObject from 'reactnativeapp/src/components/AdminStart/EditBookableObject.js';

const Stack = createNativeStackNavigator()

function AssociationStack({ route }) {
    const state = route.params.stateValue
    return (
    <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        {state.isStaff ? (
        <Stack.Group>
        <Stack.Screen name="Admin" component={AdminStart}/>
        <Stack.Screen name="AssociationInformation" component={AssociationInformation}/>
        <Stack.Screen name="AddBookableObject" component={AddBookableObject}/>
        <Stack.Screen name="EditBookableObject" component={EditBookableObject}/>
        </Stack.Group>
        ):
        ( 
        <Stack.Group>
        <Stack.Screen name="Associations" component={Associations}/>
        <Stack.Screen name="BookablesView" component={BookablesView} />
        <Stack.Screen name="BookableObject" component={BookableObject} />
        </Stack.Group>
        )}
    </Stack.Navigator>
    )
}

export default AssociationStack;