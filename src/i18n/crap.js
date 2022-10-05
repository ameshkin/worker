// TODO: finish translations

import english from './english';
// import italian from './it';
import spanish from './spanish';
// import I18n from "react-native-i18n"
//export const DEFAULT_LOCALE = I18n.currentLocale()

import { DangerZone } from 'expo';
import {AsyncStorage} from "react-native"
const { Localization } = DangerZone;

/*
export const DEFAULT_LOCALE = ( getLocale ) => {


}
*/
// export const DEFAULT_LOCALE = () => {  }

export const getLocale = async () => {
  console.log("getLocale: ")

  return await new Promise(function(resolve, reject) {
    console.log("resolve: ", resolve)

    Expo.DangerZone.Localization.getCurrentLocaleAsync()
      .then((response) => {  console.log("get local asybnc ", response); })
      .catch((err) => {
          console.log("danger zone error: ");
          console.error(err.message);
        });
  })


}



export async function returnLocale() {

  try {
    return await getLocale()
      .catch((err) => {
        console.log(err);
      });

  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }

}


// console.log("DEFAULT_LOCALE: ", fetchJSONAsync() ); // returns promise
// console.log("DEFAULT_LOCALE: ", DEFAULT_LOCALE ); // returns [Function DEFAULT_LOCALE]
// console.log("DEFAULT_LOCALE: ", getLocale());
export const Translations = {
  en: english,
  // italian: italian,
  es: spanish,
};

// translate now gets default locale here just once
export function translate(message, locale = null) {
  // We're actually asking for 'something' to be translated

  let locale2 = returnLocale();


  console.log("in translate: ", locale)
  if (message) {
    // The translation exists AND the message exists in this translation
    if (Translations[locale2] && Translations[locale2][message]) {
      return Translations[locale2][message];
    }

    // Otherwise try in the default translation
    if (Translations[locale2] && Translations[locale2][message]) {
      return Translations[locale2][message];
    }
  }

  return '???';
}
