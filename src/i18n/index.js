import english from './english';
import french from './french';
import spanish from './spanish';
import { DangerZone } from 'expo';
import {AsyncStorage} from "react-native"
import Log from 'am-simple-log'
import core from "../native/constants/core"
import { mergeWorkerAsyncStorage } from "../native/components/helpers/mergeWorkerAsyncStorage"

const { Localization } = DangerZone;

// this is used in other places, so just leave it
export const DEFAULT_LOCALE = 'en'

export const Translations = {
  en: english,
  fr: french,
  es: spanish,
};

// get device locale, en
export function getLocale() {
  Expo.DangerZone.Localization.getCurrentLocaleAsync()
    .then((locale) => {

      // Log.err(locale,"100",1);
      console.log("src/i18n/index.js getLocale index.js ", locale)
      return locale;

    })
    .then(function(result) {
      console.log("result inside promise: ", result)
      return result;
    })
    .catch((err) => {
      console.log("danger zone error: ");
      console.error(err.message);
    });
}

// get a uid
export const getUserId = async () => {
  let uid = '';
  try {
    uid = await AsyncStorage.getItem('userId') || 'none';
    console.log("uid: ", uid);
    return uid;
  } catch (error) {
    // Error retrieving data
    console.log("wtf: ");
    console.log(error.message);
  }

}

// get current position geolocation service
export const getPosition = function (options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options, {
        enableHighAccuracy: true
      }
    );
  });
}

//TODO: automatically pass file nad line number to new error log, enable message and object
export const _e = () => {


}

// get country //TODO: not working
// export function getCountry() {
export const getCountry = () => {

  /*
  return new Promise(function (fulfill, reject){
    readFile(filename, 'utf8').done(function (res){
      try {
        fulfill(JSON.parse(res));
      } catch (ex) {
        reject(ex);
      }
    }, reject);
  });
  */

  Expo.DangerZone.Localization.getCurrentDeviceCountryAsync()
    .then((country) => {

      Log.err(country,"49",1);
      // console.log("src/i18n/index.js getLocale index.js ", locale)



      return country;

    })
    .then(function(result) {
      console.log("result inside promise: ", result)
      return result;
    })
    .catch((err) => {
      console.log("danger zone error: ");
      console.error(err.message);
    });
}






// Expo.DangerZone.Localization.getCurrentDeviceCountryAsync()

export function translate(message, dl = DEFAULT_LOCALE) {

  // test here
  let locale = 'en'
  if (message) {

    if (Translations[locale] && Translations[locale][message]) {
      return Translations[locale][message];
    } else {
      return null;
    }
  }
  /*
  Expo.DangerZone.Localization.getCurrentLocaleAsync()
    .then((locale) => {

      console.log("get local asybnc ", locale);

      //return response;

      if (message) {

        if (Translations[locale] && Translations[locale][message]) {
          return Translations[locale][message];
        }

        // if translation doesn't exist, then return default
        if (Translations[dl] && Translations[dl][message]) {
          return Translations[dl][message];
        }
      }
      console.log("in translate: ", locale)
      return '???';

    })
    .catch((err) => {
      console.log("danger zone error: ");
      console.error(err.message);
    });
*/
}
