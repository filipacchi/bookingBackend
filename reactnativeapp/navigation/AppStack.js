// NB nb

import Booking from "../src/screens/Booking";
import Login from "../src/screens/Login";
import Nav from "../src/screens/Nav";
import Splash from "../src/screens/Splash";
import NavButtons from "../src/screens/NavButtons";
import JoinAssociations from "../src/screens/JoinAssociations";
import Calendar from "reactnativeapp/src/screens/Calendar.js";
import User from "../src/screens/User";
import Associations from "../src/screens/Associations";
import Book from "../src/screens/Book";
import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createContext } from 'react';
import axios from "../axios/axios";
import { NavigationContainer } from "@react-navigation/native";

export const AuthContext = React.createContext();

export default function Stack() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token.access,
            isStaff: action.token.isStaff,
            username: action.token.username
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      isStaff: null,
      username: null
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        axios.post('token/', {
          username: data.username,
          password: data.password
        })
          .then(response => {
            console.log(response.data.access);
            dispatch({ type: 'SIGN_IN', token: response.data });
          })
          .catch(error => {
            console.log(error);
          });


      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );
  //const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          {/* {state.userToken == null ? (
            <Stack.Screen name="Login" component={Login} />
          ) : (
            <Stack.Screen name="Splash" component={Splash} />
          )} */}
        <Stack.Screen name="NavButtons" component={NavButtons} />
        <Stack.Screen name="Nav" component={Nav} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Booking" component={Booking} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="Associations" component={Associations} />
        <Stack.Screen name="Book" component={Book} />
        <Stack.Screen name="JoinAssociations" component={JoinAssociations} />
        <Stack.Screen name="Calendar" component={Calendar}/>
      </Stack.Navigator>
    </AuthContext.Provider>
    </NavigationContainer>
  );
}