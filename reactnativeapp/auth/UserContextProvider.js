import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from "../axios/axios";
import { translations } from "../language/localizations";
import { I18n } from "i18n-js";
import { getLocales } from "expo-localization"
import { useState } from 'react';


const AuthContext = React.createContext();

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

function UserContextProvider({children}) {
  const i18n = new I18n(translations)
  i18n.defaultLocale = getLocales()[0].languageCode
  i18n.locale = getLocales()[0].languageCode
  i18n.enableFallback = true
  console.log("Språk: "+i18n.locale)


  const [colorTheme, setColorTheme] = useState({name: "The Original", firstColor: "#4d70b3", secondColor: "#6ea1ff"})

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
        selectedColor = await SecureStore.getItemAsync('selectedColor')
        console.log(selectedColor)
        if(selectedColor != null){
          setColorTheme(JSON.parse(selectedColor))
        }
        //setColorTheme(selectedColor)
      } catch (e){

      }

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
            /* response.data innehåller data från databasen */
            console.log("isSTAFF? : " + response.data.isStaff)
            save("userToken", response.data.access)
            save("userRefreshToken", response.data.refresh)
            axios.defaults.headers.common = {'Authorization': `Bearer ${response.data.access}`}
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
            axios.defaults.headers.common = {'Authorization': `Bearer ${response.data.access}`}
            save("userRefreshToken", response.data.refresh)
            save("userToken", response.data.access).then(() => {
              dispatch({ type: 'SIGN_IN', token: response.data });
            })

          })
          .catch(error => {
            console.log(error);
          });

      },
      signOut: () => {
        SecureStore.deleteItemAsync('userRefreshToken')
        SecureStore.deleteItemAsync('userToken')
        dispatch({ type: 'SIGN_OUT' })
      },
      signUp: async (data) => {

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      t: (translate) => {
        return i18n.t(translate)
      },
      setLang: (lang) => {
        i18n.locale = lang
      },
      getLang: () => {
        return i18n.locale
      },

    }),
    []
  );
  const contextValue = {authContext, state, colorTheme, setColorTheme}

  return (
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
  );
}

export {UserContextProvider, AuthContext}