import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Schedule from '../Schedule/Schedule.js';
/* import ScheduleAdmin from '../Schedule/Schedule.js'; */
import ScheduleAdmin from './ScheduleAdmin.js';
import { AuthContext } from '../../../auth/UserContextProvider.js';
import BookableObject from '../Associations/BookableObject.js';

const Stack = createNativeStackNavigator()

function ScheduleStack() {
    const {state} = React.useContext(AuthContext)

    console.log("inne i ScheduleStack")
    console.log("isAssociation: " + state.isAssociation)

    return (
    <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        {state.isAssociation ? (
        <Stack.Group>
           <Stack.Screen name="ScheduleAdmin" component={ScheduleAdmin}/>
           <Stack.Screen name="BookableObject" component={BookableObject}/>
        </Stack.Group>
          /* <Stack.Screen name="AssociationInformation" component={AssociationInformation}/>
          <Stack.Screen name="AddBookableObject" component={AddBookableObject}/>
        <Stack.Screen name="EditBookableObject" component={EditBookableObject}/> */
        ):
        (
        <Stack.Group>
          <Stack.Screen name="Schedule" component={Schedule}/>
        </Stack.Group>
        )}
    </Stack.Navigator>
    )
}

export default ScheduleStack;