import React from 'react';
import {AsyncStorage, TextInput} from 'react-native';

import {
  Text, View, Button, Container, Content, Number
} from 'native-base';
import formStyles from '../../../styles/forms'
// import t from 'tcomb-form-native';
import globalStyles from "../../../styles/global"
import Header from "../../partials/Header"
var _ = require('lodash');
import MapView, { PROVIDER_GOOGLE, AnimatedRegion, Animated  } from 'react-native-maps';
import core from "../../../constants/core"
import {StyleSheet} from "react-native"
import mapStyle from "../../../styles/maps/lightBlue"
import PropTypes from 'prop-types';
import Loading from "../../../../native/components/partials/Loading"
import {translate} from "../../../../i18n"
import CountryPicker, {
  getAllCountries
} from 'react-native-country-picker-modal'
// import DeviceInfo from 'react-native-device-info';
import { getCountry } from '../../../../i18n/index'


import t from "tcomb-form-native"
import Log from "am-simple-log"

// StatusBarIOS.setHidden(true)
const NORTH_AMERICA = ['CA', 'MX', 'US']

// TODO: if location already set, then this form should already be filled out.
// PULL from firestore if we have to
var Form = t.form.Form;

// clone the default stylesheet
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.textbox.normal.color = '#ffffff';
stylesheet.controlLabel.normal.color = '#ffffff';
stylesheet.controlLabel.error.color = '#ff0000';



// model for form
/*
var Location = t.struct({
  city: t.maybe(t.String),
  state: t.maybe(t.String),
  country: t.maybe(t.String),
  countryabbv: t.maybe(t.String),
  latitude: t.maybe(t.String),
  longitude: t.maybe(t.String),
});
*/
var Location = t.struct({
  city: t.String,
  state: t.String,
  country: t.String,
  countryabbv: t.maybe(t.String),
  latitude: t.String,
  longitude: t.String,
});



// form options
var options = {
  i18n: {
    optional: '',
    required: ' *',
    add: 'Add',   // add button
    remove: '✘',  // remove button
    up: '↑',      // move up button
    down: '↓'     // move down button
  },
  fields: {
    city: {
      stylesheet: stylesheet,
      label: ' ',
      placeholder: 'Your City',
      error: 'Enter a valid city',
      placeholderTextColor: '#9C9C9C',
      color: '#ffffff',
    },
    state: {
      stylesheet: stylesheet,
      label: ' ',
      placeholder: 'Your State',
      error: 'Enter a valid city',
      placeholderTextColor: '#9C9C9C',
      color: '#ffffff',
    },
    country: {
      stylesheet: stylesheet,
      label: ' ',
      placeholder: 'Your Country',
      error: 'Enter a valid city',
      placeholderTextColor: '#9C9C9C',
      color: '#ffffff',
    },
    countryabbv: {
      hidden: true
    },
    latitude: {
      hidden: true
    },
    longitude: {
      hidden: true
    },
  },
};


var getPosition = function (options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}



class WorkerSignUpLocation extends React.Component {
  constructor(props) {
    super(props);



    /*
    // undefined is not object (evaluating 'RNDeviceInfo.deviceId')
    // https://github.com/rebeccahughes/react-native-device-info/issues/52
    let userLocaleCountryCode = DeviceInfo.getDeviceCountry()
    const userCountryData = getAllCountries()
      .filter(country => NORTH_AMERICA.includes(country.cca2))
      .filter(country => country.cca2 === userLocaleCountryCode)
      .pop()
    let callingCode = null
    let cca2 = userLocaleCountryCode
    if (!cca2 || !userCountryData) {
      cca2 = 'US'
      callingCode = '1'
    } else {
      callingCode = userCountryData.callingCode
    }
    */
    // let cca2 = 'US'

    // TypeError: null is not an object (evaluating 'cca2.toUpperCase')



    // getCountry NOT WORKING
    // const cca2 = getCountry() console.log("cca2:  ", cca2);



    //

    this.state = {
      loading: true,
      permission: null,
      latitude: '',
      longitude: '',
      label: '',
      city: '',
      state: '',
      country: '',
      cca2: null,
      callingCode: null,
      userCountryData: null
    };


    this.handleSubmitNo = this.handleSubmitNo.bind(this)
    this.handleSubmitYes = this.handleSubmitYes.bind(this)
  }

  state = { array: [] };


  // someone who DENIED geo location hits submit
  handleSubmitNo = () => {

    var value = this.refs.formref.getValue();   console.log("handleSubmitNo: ", value);
    // var value = this.state;

    if (value) { // value is not values of form, but an object of the form after auto valildation


      console.log("permissipn is FALSE ", this.state.permission);


      // validate form first!

      let query = encodeURI(`${value.city}, ${value.state} ${value.country}`);

      let url = `https://geocoder.api.here.com/6.2/geocode.json?app_id=${core.app_id}&app_code=${core.app_code}&searchtext=` + query
      console.log("url: ", url);
      let fetchData = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }
      fetch(url, fetchData)

        .then((resp) => resp.json())  // returns just the JSON from request
        .then((response) => {
          // Handle response you get from the server


          // console.log("response: ",response);

          let all   = response.Response.View[0].Result;
          let first = all[0];


          console.log("ready to update firestore Latitude: ", first.Location.DisplayPosition.Latitude );
          console.log("ready to update firestore Longitude: ", first.Location.DisplayPosition.Longitude );


          // TODO: use my heroku web service to append this to auth admin database in firestore

          // TODO: proper working action would be nice to use here.


        })
        .catch((err) => {
          console.log("WOrker Sign Up Location geocode error: ");
          console.log(err.message);
        });
    }
  }

  /**
   * When someone submits after location is automatically updated, then lookup city info and allow submission
   */
  handleSubmitYes = () => {

    var value = this.refs.formref.getValue();     console.log("handleSubmitYes: ", value);

    if(value) { // value is not values of form, but an object of the form after auto valildation
      console.log("value: ", value);


      console.log("permissipn is TRUE ", this.state.permission);
      let postdata = {
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        city: value.city,
        state: value.state,
        country: value.country,
      }

      // TODO: instead of zapier, this should go to our web service
      // ZAPIER:  https://zapier.com/app/editor/43744252/overview
      let url = `https://hooks.zapier.com/hooks/catch/3347587/lbfd24/`


      // The data we are going to send in our request
      // The parameters we are gonna pass to the fetch function
      let fetchData = {
        method: 'POST',
        body: JSON.stringify( postdata ),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }
      fetch(url, fetchData)

        .then((resp) => resp.json())  // returns just the JSON from request
        .then((response) => {
          // Handle response you get from the server


          // console.log("response: ",response);

          //TODO: run zapier to save data and go to next page!!!!

        })
        .catch((err) => {
          console.log("WOrker Sign Up Location geocode error: ");
          console.log(err.message);
        });

    }
  }


  // componentDidMount() {
  componentWillMount() {

    let state = ''

    getPosition()
      .then((position) => {

        console.log("will mount getPosition: ");

        state = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          loading: true,
          permission: true,
        };

        let prox =  position.coords.latitude + ',' +  position.coords.longitude;
        const url = 'https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox=' +  prox + ',150&mode=retrieveAll&gen=' + core.gen + '&app_code=' + core.app_code + '&app_id=' + core.app_id;

        console.log("url in getPosition: ", url);

        // The data we are going to send in our request
        // The parameters we are gonna pass to the fetch function
        let fetchData = {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        }
        fetch(url, fetchData)

          .then((resp) => resp.json())  // returns just the JSON from request
          .then((response) => {

            // TODO: figure out how to add redux state

            let all   = response.Response.View[0].Result;
            let first = all[0];

            state = {
              label: first.Location.Address.Label,
              city: first.Location.Address.City,
              state: first.Location.Address.State,
              county: first.Location.Address.County,
              country: first.Location.Address.Country,
              loading: false,
              permission: true,
              cca2: this.state.cca2,
              callingCode: null,
              userCountryData: this.state.userCountryData
            };


            console.log("Relevance: ",first.Relevance);
            console.log("Label: ",first.Location.Address.Label);
            console.log("City: ",first.Location.Address.City);


            this.setState(state);

          })
          .catch((err) => {
            console.log("geocode error: ");
            console.log(err.message);
          });
        console.log(" second state: ",state);
        // this.setState(state);
      })
      .catch((err) => {
        console.log(err.message);

        // TODO: a user can say no, and that is handled here!

        console.log(" blah ah ahsd  catch: ", err);

        state = {
          loading: false,
          permission: false,
          cca2: this.state.cca2,  // null
          callingCode: null,
          userCountryData: this.state.userCountryData
        };


        // this.setState(state);

      });


    Expo.DangerZone.Localization.getCurrentDeviceCountryAsync()
      .then((country) => {

        Log.err(country,"49",1);
        // console.log("src/i18n/index.js getLocale index.js ", locale)



        return country;

      })
      .then(function(cca2) {
        console.log("cca2 inside promise: ", cca2)



        console.log("cca2: ", cca2);
        // console.log("userCountryData: ", userCountryData);



        // get a list of all countries
        const userCountryData = getAllCountries()

        state = {
          cca2: cca2,  // null
          callingCode: null,
          userCountryData: userCountryData
        };



        return state;
        //
      }).done(function (state){
        try {
          this.setState(state)
        } catch (ex) {
          // reject(ex);

          console.log("ex danger zone error: ", ex);
        }
      })
      .catch((err) => {
        console.log("417 danger zone error: ");

        // set daefault
        state = {
          loading: false,
          permission: false,
          cca2: 'US',
          callingCode: null,
          userCountryData: NORTH_AMERICA
        };


        console.log(err.message);

        this.setState(state)

      });



  }

  render() {

    if ( this.state.loading ) return <Loading />;

    console.log("Wtafdsasdf: ", this.state);

    /*
    by the time we get here, the state is barely set

    Wtafdsasdf:  Object {
10:45:46 AM:   "array": Array [],
10:45:46 AM:   "loading": false,
10:45:46 AM:   "permission": false,
10:45:46 AM: }




     */
    return (

      <Container style={globalStyles.main}>
        <Content>
          {
            this.state.permission ? (
              <View>
                <Header
                  subheader="Your Location"
                  content="Accept the Automatically locate your city and state or manually enter them"
                />
                <View style={{height: 350, flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
                  <Animated
                    provider={ PROVIDER_GOOGLE } // breaks shit
                    style={styles.map}
                    showsUserLocation={true}
                    followUserLocation={true}
                    zoomEnabled={true}
                    customMapStyle={mapStyle}
                    showsMyLocationButton={true}
                    // onRegionChange={this.onRegionChange}  to fill form on region change requires many lookups
                    region={{
                      latitude: this.state.latitude ,
                      longitude: this.state.longitude ,
                      latitudeDelta: .25,
                      longitudeDelta: .25,
                    }}
                  >

                  </Animated>
                </View>
              </View>
            ) : ( // simply don't show map if no permissions
              <View>
                <Header
                  subheader="Enter Your Location"
                  content="Manually enter your location please"
                />
              </View>
            )
          }

          <View style={{ flexGrow: 1 }}>

            <Form
              ref="formref"
              type={ Location }
              options={ options }
            />

            <CountryPicker
              countryList={NORTH_AMERICA}
              // countryList={ this.state.userCountryData }  //trouble evauating
              onChange={value => {
                this.setState({ cca2: value.cca2, callingCode: value.callingCode })
              }}
              cca2="US"
              // cca2={ this.state.cca2 }  // error?
              translation="eng"
            />
            <Text style={styles.instructions}>press on the flag</Text>
            {this.state.country && (
              <Text style={styles.data}>
                {JSON.stringify(this.state.country, null, 2)}
              </Text>
            )}

            <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>

              {
                this.state.permission ? (
                  <Button block
                          style={formStyles.submitButton}
                          onPress={this.handleSubmitYes}
                  >
                    <Text style={formStyles.submitButtonText}>
                      SET LOCATION TRUE
                    </Text>
                  </Button>
                ) : (
                  <Button block
                          style={formStyles.submitButton}
                          onPress={this.handleSubmitNo}
                  >
                    <Text style={formStyles.submitButtonText}>
                      SET LOCATION FALSE
                    </Text>
                  </Button>
                )
              }
            </View>

          </View>

        </Content>
      </Container>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: 320,
  },
});

WorkerSignUpLocation.propTypes = {
  latitude: PropTypes.string,
  longitude: PropTypes.string,
  label: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  country: PropTypes.string,
  permission: PropTypes.string,
  loading: PropTypes.string,

};

WorkerSignUpLocation.defaultProps = {
  error: null,
  loading: true,
};

export default WorkerSignUpLocation;



/* WTF

TypeError: undefined is not an object (evaluating 'cca2.toUpperCase')

This error is located at:
    in CountryPicker
    in RCTView
    in View
    in ViewNB
    in Styled(ViewNB)
    in RCTScrollContentView
    in RCTScrollView
    in ScrollView
    in _class
    in Content
    in Styled(Content)
    in RCTView
    in View
    in Container
    in Styled(Container)
    in WorkerSignUpLocation
    in SignUp
    in Connect(SignUp)
    in Wrapped
    in SceneView
    in RCTView
    in View
    in AnimatedComponent
    in Card
    in Container
    in RCTView
    in View
    in RCTView
    in View
    in CardStack
    in RCTView
    in View
    in Transitioner
    in CardStackTransitioner
    in Unknown
    in Navigator
    in NavigationContainer
    in SceneView
    in RCTView
    in View
    in RCTView
    in View
    in ResourceSavingSceneView
    in RCTView
    in View
    in RCTView
    in View
    in AnimatedComponent
    in TabViewPagerPan
    in RCTView
    in View
    in TabViewAnimated
    in TabView
    in withCachedChildNavigation(TabView)
    in Unknown
    in Navigator
    in NavigationContainer
    in SceneView
    in RCTView
    in View
    in AnimatedComponent
    in Card
    in Container
    in RCTView
    in View
    in RCTView
    in View
    in CardStack
    in RCTView
    in View
    in Transitioner
    in CardStackTransitioner
    in Unknown
    in Navigator
    in NavigationContainer
    in SceneView
    in RCTView
    in View
    in AnimatedComponent
    in Card
    in Container
    in RCTView
    in View
    in RCTView
    in View
    in CardStack
    in RCTView
    in View
    in Transitioner
    in CardStackTransitioner
    in Unknown
    in Navigator
    in NavigationContainer
    in SceneView
    in RCTView
    in View
    in AnimatedComponent
    in Card
    in Container
    in RCTView
    in View
    in RCTView
    in View
    in CardStack
    in RCTView
    in View
    in Transitioner
    in CardStackTransitioner
    in Unknown
    in Navigator
    in NavigationContainer
    in App
    in Router
    in StyleProvider
    in PersistGate
    in Provider
    in RCTView
    in View
    in Root
    in Styled(Root)
    in App
    in App
    in ExpoRootComponent
    in RCTView
    in View
    in RCTView
    in View
    in AppContainer

renderEmojiFlag
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:214371:40
renderFlag
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:214394:54
render
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:214694:39
finishClassComponent
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:6274:269
performUnitOfWork
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:7597:27
renderRoot
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:7614:47
performWorkOnRoot
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:7842:447
performWork
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:7809:26
performSyncWork
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:7800:18
batchedUpdates
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:8051:92
batchedUpdates
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:4934:29
_receiveRootNodeIDEvent
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:4966:19
receiveTouches
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:5016:32
__callFunction
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:2442:49
<unknown>
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:2265:31
__guardSafe
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:2404:13
callFunctionReturnFlushedQueue
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:2264:21


 */

/*
WTF


     <Button block
                    style={formStyles.submitButton}
                    //onPress={() => handleSubmit( this.state.latitude, this.state.longitude, this.state.city, this.state.state, this.state.country ) }
                    // onPress={() => this.handleSubmit( this.state.latitude, this.state.longitude, this.state.city, this.state.state, this.state.country, this.state.permission ) }
                    // onPress={() => this.handleSubmit() }  // this not available
                    // onPress={ this.handleSubmit }  // breaks
                    // onPress={ this.handleSubmit() }  // runs on page load
                    // onPress={() => this.handleSubmit }  // nothing happens on click
                    // onPress={() => this.handleSubmit.bind(this) } // nothing happens on click
                    // onPress={() => wtfSubmit() }  //NO STATE
                    // onPress={() => wtfSubmit }
                    // onPress={ wtfSubmit() }


            >
              <Text style={formStyles.submitButtonText}>
                Set Location
              </Text>
            </Button>
 */
/*
OLD FORM NOT ATTACHED TO STATE



            <Form
              ref='setlocation'
              // onFocus={this.onChange.bind(this)}
            >
              <Item style={globalStyles.inputItem} stackedLabel>
                <Label style={globalStyles.inputLabel}>
                  City
                </Label>
                <Input
                  style={globalStyles.inputBox}
                  value={ this.state.city }
                />
              </Item>

              <Item style={globalStyles.inputItem} stackedLabel>
                <Label style={globalStyles.inputLabel}>
                  State
                </Label>
                <Input
                  style={globalStyles.inputBox}
                  value={ this.state.state }
                />
              </Item>

              <Item style={globalStyles.inputItem} stackedLabel>
                <Label style={globalStyles.inputLabel}>
                  Country
                </Label>
                <Input
                  style={globalStyles.inputBox}
                  value={ this.state.country }
                />
              </Item>

              <Input
                name="latitude"
                type="hidden"
                style={{ height: 0 }}
                value={`${ this.state.latitude }`}
              />

              <Input
                name="longitude"
                type="hidden"
                style={{ height: 0 }}
                value={`${ this.state.longitude }`}
              />

              <Input
                name="recordid"
                type="hidden"
                style={{ height: 0 }}
                value="dVnKgtzgelrydwmBDN3U"
              />


            </Form>


 */
