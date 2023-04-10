// NB nb

import Booking from "../src/screens/Booking";
import Login from "../src/screens/Login";
import Nav from "../src/screens/Nav";
import Splash from "../src/screens/Splash";
import NavButtons from "../src/screens/NavButtons";
import JoinAssociations from "../src/screens/JoinAssociations";
import Calendar from "reactnativeapp/src/screens/Calendar.tsx";
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

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export default function Stack() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token.access,
            userRefreshToken: action.token.refresh,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token.access,
            userRefreshToken: action.token.refresh,
            isStaff: action.token.isStaff,
            username: action.token.username,
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
      userRefreshToken: null,
      isStaff: null,
      username: null
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userRefreshToken;

      try {
        userRefreshToken = await SecureStore.getItemAsync('userRefreshToken')
        console.log(userRefreshToken),
          validateToken(userRefreshToken),
          console.log("THEN")
      } catch (e) {
        // Restoring token failed
      }

      async function validateToken(token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const bodyParameters = {
          refresh: userRefreshToken
        };
        axios.post('token/refresh/',
          bodyParameters
        )
          .then(response => {
            console.log("TOKEN OKAY")
            dispatch({ type: 'RESTORE_TOKEN', token: response.data });
          })
          .catch(error => {
            console.log(error);
            console.log("TOKEN NOT OKAY")
          });
      }

    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        axios.post('token/', {
          email: data.username,
          password: data.password
        })
          .then(response => {
            console.log(response.data.access);
            save("userToken", response.data.access)
            save("userRefreshToken", response.data.refresh)
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
            <Stack.Screen name="NavButtons" component={NavButtons} />
          )} */}
          <Stack.Screen name="NavButtons" component={NavButtons} />
          <Stack.Screen name="Nav" component={Nav} />
          <Stack.Screen name="Booking" component={Booking} />
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="User" component={User} />
          <Stack.Screen name="Associations" component={Associations} />
          <Stack.Screen name="Book" component={Book} />
          <Stack.Screen name="JoinAssociations" component={JoinAssociations} />
          <Stack.Screen name="Calendar" component={Calendar} />
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}