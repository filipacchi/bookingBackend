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

function UserContextProvider({ children }) {
  const i18n = new I18n(translations)
  i18n.defaultLocale = getLocales()[0].languageCode
  i18n.locale = getLocales()[0].languageCode
  i18n.enableFallback = true
  console.log("Språk: " + i18n.locale)


  const [colorTheme, setColorTheme] = useState({ name: "The Original", firstColor: "#4d70b3", secondColor: "#6ea1ff" })
  const [tabTitles, setTabTitles] = useState({AssociationsPage: i18n.t("AssociationsPage"), Profile: i18n.t("Profile"), Bookings: i18n.t("Bookings"), Return: i18n.t("Return")})
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
            isAssociation: action.token.isAssociation,
            firstName: action.token.firstName,
            lastName: action.token.lastName,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token.access,
            userRefreshToken: action.token.refresh,
            isAssociation: action.token.isAssociation,
            firstName: action.token.firstName,
            lastName: action.token.lastName,
            isLoading: false,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isLoading: true,
            isSignout: true,
            userToken: null,
            userRefreshToken: null,
            firstName: null,
            lastName: null,
            isAssociation: null,
          };
          case 'NO_AUTH':
          return {
            ...prevState,
            isLoading: false,
            isSignout: true,
            userToken: null,
            userRefreshToken: null,
            firstName: null,
            lastName: null,
            isAssociation: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      userRefreshToken: null,
      isAssociation: null,
      firstName: null,
      lastName: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userRefreshToken;

      try {
        selectedColor = await SecureStore.getItemAsync('selectedColor')
        console.log(selectedColor)
        if (selectedColor != null) {
          setColorTheme(JSON.parse(selectedColor))
        }
        //setColorTheme(selectedColor)
      } catch (e) {
        console.log(e)
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
            console.log("isSTAFF? : " + response.data.firstName)
            save("userToken", response.data.access)
            save("userRefreshToken", response.data.refresh)
            axios.defaults.headers.common = { 'Authorization': `Bearer ${response.data.access}` }
            dispatch({ type: 'RESTORE_TOKEN', token: response.data });
          })
          .catch(error => {
            dispatch({ type: 'NO_AUTH'});
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
            axios.defaults.headers.common = { 'Authorization': `Bearer ${response.data.access}` }
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
        console.log("SIGNAR UPP!")
        axios.post('user/account/register/', {
          email: data.email,
          first_name: data.firstname,
          last_name: data.lastname,
          password: data.password,
          is_association: false
        })
          .then(response => {
            console.log("KOlla " + Object.keys(response.data.info))
            data = { "access": response.data.access_token, "refresh": response.data.refresh_token, "isAssociation": response.data.info.is_association }
            console.log(data)
            axios.defaults.headers.common = { 'Authorization': `Bearer ${data.access}` }
            save("userRefreshToken", data.refresh)
            save("userToken", data.access).then(() => {
              dispatch({ type: 'SIGN_IN', token: data });
            })

          })
          .catch(error => {
            console.log(error);
          });

        //dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      t: (translate) => {
        return i18n.t(translate)
      },
      setLang: (lang) => {
        i18n.locale = lang
        setTabTitles({AssociationsPage: i18n.t("AssociationsPage"), Profile: i18n.t("Profile"), Bookings: i18n.t("Bookings"), Return: i18n.t("Return")})

      },
      getLang: () => {
        return i18n.locale
      },
      getLanguage: () => {
        let lang = i18n.locale
        let language = ""
        if(lang === "sv"){
          language = "Svenska"
        } else if(lang === "en"){
          language = "English"
        }
        return language
      }

    }),
    []
  );
  const contextValue = { tabTitles, authContext, state, colorTheme, setColorTheme }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export { UserContextProvider, AuthContext }