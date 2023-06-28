import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from "../axios/axios";
import { translations } from "../language/localizations";
import { I18n } from "i18n-js";
import { getLocales } from "expo-localization"
import { useState } from 'react';
import Splash from '../src/screens/Splash';
import { View } from 'react-native';


const AuthContext = React.createContext();

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

function UserContextProvider({ children }) {
  const i18n = new I18n(translations)
  i18n.defaultLocale = getLocales()[0].languageCode
  i18n.locale = getLocales()[0].languageCode
  i18n.enableFallback = true

  const [appReady, setAppReady] = useState(false)
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);
  const [colorTheme, setColorTheme] = useState({ name: "The Original", firstColor: "#4d70b3", secondColor: "#6ea1ff" })
  const [tabTitles, setTabTitles] = useState({ AssociationsPage: i18n.t("AssociationsPage"), Profile: i18n.t("Profile"), Bookings: i18n.t("Bookings"), Return: i18n.t("Return") })
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
            isActive: action.token.isActive,
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
            isActive: action.token.isActive,
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
      isActive: null,
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
        if (selectedColor != null) {
          setColorTheme(JSON.parse(selectedColor))
        }
      } catch (e) {
        
      }
      try {
        userRefreshToken = await SecureStore.getItemAsync('userRefreshToken')
        validateToken(userRefreshToken)
      } catch (e) {
      }


      async function validateToken(token) {

        const bodyParameters = {
          refresh: token
        };
        axios.post('token/refresh/',
          bodyParameters
        )
          .then(response => {
            save("userToken", response.data.access)
            save("userRefreshToken", response.data.refresh)
            axios.defaults.headers.common = { 'Authorization': `Bearer ${response.data.access}` }
            dispatch({ type: 'RESTORE_TOKEN', token: response.data });
          })
          .catch(error => {
            dispatch({ type: 'NO_AUTH' });
          }).finally(()=>{
            setAppReady(true)
          })
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
            axios.defaults.headers.common = { 'Authorization': `Bearer ${response.data.access}` }
            save("userRefreshToken", response.data.refresh)
            save("userToken", response.data.access).then(() => {
              dispatch({ type: 'SIGN_IN', token: response.data });
            })

          })
          .catch(error => {
            console.log(error)
          });

      },
      signOut: () => {
        SecureStore.deleteItemAsync('userRefreshToken')
        SecureStore.deleteItemAsync('userToken')
        dispatch({ type: 'SIGN_OUT' })
      },
      signUp: async (data) => {
        
       return axios.post('user/account/register/', {
          email: data.email,
          first_name: data.firstname,
          last_name: data.lastname,
          password: data.password,
          native_lang: data.nativeLang,
          is_association: false
        })
          .then(response => {
            return true
          })
          .catch(error => {
            return false
          });
      },
      activatedAccount: async (data) => {
        
        return axios.post('user/account/register/', {
           email: data.email,
           first_name: data.firstname,
           last_name: data.lastname,
           password: data.password,
           native_lang: data.nativeLang,
           is_association: false
         })
           .then(response => {
             
             data = { "access": response.data.access_token, "refresh": response.data.refresh_token, "isAssociation": response.data.info.is_association }
             
             axios.defaults.headers.common = { 'Authorization': `Bearer ${data.access}` }
             save("userRefreshToken", data.refresh)
             save("userToken", data.access).then(() => {
               dispatch({ type: 'SIGN_IN', token: data });
             }).then(() => {
               return true
             })
 
           })
           .catch(error => {
             return false
           });
       },
      t: (translate) => {
        return i18n.t(translate)
      },
      setLang: (lang) => {
        i18n.locale = lang
        setTabTitles({ AssociationsPage: i18n.t("AssociationsPage"), Profile: i18n.t("Profile"), Bookings: i18n.t("Bookings"), Return: i18n.t("Return") })

      },
      getLang: () => {
        return i18n.locale
      },
      getLanguage: () => {
        let lang = i18n.locale
        let language = ""
        if (lang === "sv") {
          language = "Svenska"
        } else if (lang === "en") {
          language = "English"
        }
        return language
      }

    }),
    []
  );
  const contextValue = { tabTitles, authContext, state, colorTheme, setColorTheme }

  function AnimatedSplashScreen({ children}) {
    return (
      <View style={{ flex: 1 }}>
        {isSplashAnimationComplete && children}
        {!isSplashAnimationComplete && (
          <Splash setAnimationComplete={setAnimationComplete} appReady={appReady}/>
        )}
      </View>
    );
  }

  return (
    <AnimatedSplashScreen>
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    </AnimatedSplashScreen>
  );
}

export { UserContextProvider, AuthContext }