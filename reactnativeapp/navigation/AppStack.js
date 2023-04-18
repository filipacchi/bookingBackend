// NB nb

import Login from "../src/screens/Login";
import Nav from "../src/screens/Nav";
import Splash from "../src/screens/Splash";
import NavButtons from "../src/screens/NavButtons";
import JoinAssociations from "../src/components/Associations/JoinAssociations";
import User from "../src/screens/User";
import Associations from "../src/components/Associations/Associations";
import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createContext } from 'react';
import axios from "../axios/axios";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import { View } from "react-native/Libraries/Components/View/View";
import Register from "../src/screens/Register";
import { useAxios } from "../axios/useAxios";
import BookableObject from "../src/components/Associations/BookableObject";
import Auth from "../src/screens/Auth"
import MainNav from "../src/screens/MainNav";



export const AuthContext = React.createContext();

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export default function Stack() {
  const [loadingState, setLoadingState] = React.useState(true)
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token.access,
            userRefreshToken: action.token.refresh,
            isStaff: action.token.isStaff,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token.access,
            userRefreshToken: action.token.refresh,
            isStaff: action.token.isStaff,
            isLoading: false,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isLoading: true,
            isSignout: true,
            userToken: null,
            userRefreshToken: null,
            isStaff: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      userRefreshToken: null,
      isStaff: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userRefreshToken;

      try {
        userRefreshToken = await SecureStore.getItemAsync('userRefreshToken')
        //console.log("LOGGAR " + userRefreshToken),
        validateToken(userRefreshToken)
        //console.log("THEN")
      } catch (e) {
        // Restoring token failed
      }

      async function validateToken(token) {

        const bodyParameters = {
          refresh: token
        };
        axios.post('token/refresh/',
          bodyParameters
        )
          .then(response => {
            //console.log("TOKEN OKAY")
            console.log("isSTAFF? : " + response.data.isStaff)
            save("userToken", response.data.access)
            save("userRefreshToken", response.data.refresh)
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
            //console.log(response.data.access);
            save("userToken", response.data.access).then(() => {
              dispatch({ type: 'SIGN_IN', token: response.data });
            })
            save("userRefreshToken", response.data.refresh)

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


  if (loadingState) {
    return (
      // <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
      //   <ActivityIndicator/>
      // </View>
      <Splash setLoadingState={setLoadingState}></Splash>
    )
  }

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          {state.userToken == null /* bytte håll på token temporärt */ ? (
            <Stack.Group>
              <Stack.Screen name="Auth" component={Auth} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </Stack.Group>

          ) : (
            <Stack.Screen name="MainNav" component={MainNav} initialParams={{ stateValue: state }} />
            //<Stack.Screen name="NavButtons" component={NavButtons} />
          )}

          {/* <Stack.Screen name="NavButtons" component={NavButtons} /> */}
          <Stack.Screen name="Nav" component={Nav} />
          <Stack.Screen name="User" component={User} />
          <Stack.Screen name="Associations" component={Associations} />
          <Stack.Screen name="JoinAssociations" component={JoinAssociations} />
          <Stack.Screen name="BookableObject" component={BookableObject} />
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}