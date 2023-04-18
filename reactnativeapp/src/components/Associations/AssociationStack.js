import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Associations from './Associations.js';
import BookablesView from './BookablesView.js';
import BookableObject from './BookableObject.js';

const Stack = createNativeStackNavigator()

function AssociationStack({ route }) {
    const state = route.params.stateValue
    return (
    <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
       <Stack.Screen name="Associations" component={Associations}/>
       <Stack.Screen name="BookablesView" component={BookablesView} />
       <Stack.Screen name="BookableObject" component={BookableObject} />
    </Stack.Navigator>
    )
}

export default AssociationStack;