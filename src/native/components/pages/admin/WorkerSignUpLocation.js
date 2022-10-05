import React from 'react';
// import {AsyncStorage, TextInput} from 'react-native';
import {
  Text, View, Button, Container, Content, Number
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import formStyles from '../../../styles/forms'
import globalStyles from "../../../styles/global"
import Header from "../../partials/Header"
var _ = require('lodash');
import MapView, { PROVIDER_GOOGLE, Animated  } from 'react-native-maps';
import core from "../../../constants/core"
import {AsyncStorage, StyleSheet} from "react-native"
import mapStyle from "../../../styles/maps/lightBlue"
import PropTypes from 'prop-types';
import Loading from "../../../../native/components/partials/Loading"
import { translate, getPosition } from "../../../../i18n"
import t from "tcomb-form-native"
var Form = t.form.Form;
import stylesheet from "../../../styles/forms/Bluebox"
import Messages from "../../partials/Messages"
import { mergeWorkerAsyncStorage } from "../../helpers/mergeWorkerAsyncStorage"
import { getGeocoderFromHereApi } from "../../helpers/getGeocoderFromHereApi"
import { saveLocationFirestore } from "../../helpers/saveLocationFirestore"

/*
const countries = {
  'IT': 'Italy',
  'US': 'United States'
}
*/

/*

Exception '-[__NSDictionaryM dataUsingEncoding:]: unrecognized selector sent to instance 0x600003fb4c40' was thrown while invoking multiMerge on target AsyncLocalStorage with params (
        (
                (
            worker,
                        {
                data =                 {
                    location =                     {
                        city = Nashville;
                        country = USA;
                        county = Davidson;
                        latitude = "36.16785";
                        longitude = "-86.77816";
                        state = TN;
                    };
                };
                error = 0;
                key = FKSY5YIyMsSmkyxph2uwJLLqcvx1;
            }
        )
    ),
    2719
)
callstack: (
	0   CoreFoundation                      0x000000011358429b __exceptionPreprocess + 331
	1   libobjc.A.dylib                     0x0000000111ade735 objc_exception_throw + 48
	2   CoreFoundation                      0x00000001135a2fa4 -[NSObject(NSObject) doesNotRecognizeSelector:] + 132
	3   CoreFoundation                      0x0000000113588fb6 ___forwarding___ + 1446
	4   CoreFoundation                      0x000000011358ae88 _CF_forwarding_prep_0 + 120
	5   Exponent                            0x0000000108047a3b _ABI30_0_0RCTJSONParse + 210
	6   Exponent                            0x0000000107f89339 -[ABI30_0_0RCTAsyncLocalStorage multiMerge:callback:] + 776
	7   CoreFoundation                      0x000000011358b11c __invoking___ + 140
	8   CoreFoundation                      0x00000001135885b5 -[NSInvocation invoke] + 325
	9   CoreFoundation                      0x0000000113588a06 -[NSInvocation invokeWithTarget:] + 54
	10  Exponent                            0x0000000107fec18a -[ABI30_0_0RCTModuleMethod invokeWithBridge:module:arguments:] + 612
	11  Exponent                            0x0000000107ff36f5 _ZN8facebook14ReactABI30_0_0L11invokeInnerEP18ABI30_0_0RCTBridgeP22ABI30_0_0RCTModuleDatajRKN5folly7dynamicE + 255
	12  Exponent                            0x0000000107ff3473 ___ZN8facebook14ReactABI30_0_024ABI30_0_0RCTNativeModule6invokeEjON5folly7dynamicEi_block_invoke + 78
	13  libdispatch.dylib                   0x000000011461c51d _dispatch_call_block_and_release + 12
	14  libdispatch.dylib                   0x000000011461d587 _dispatch_client_callout + 8
	15  libdispatch.dylib                   0x0000000114624058 _dispatch_lane_serial_drain + 720
	16  libdispatch.dylib                   0x0000000114624b9b _dispatch_lane_invoke + 401
	17  libdispatch.dylib                   0x000000011462d9c6 _dispatch_workloop_worker_thread + 645
	18  libsystem_pthread.dylib             0x0000000114a02fd2 _pthread_wqthread + 980
	19  libsystem_pthread.dylib             0x0000000114a02be9 start_wqthread + 13
)

ABI30_0_0RCTFatal
facebook::ReactABI30_0_0::invokeInner(ABI30_0_0RCTBridge*, ABI30_0_0RCTModuleData*, unsigned int, folly::dynamic const&)
invocation function for block in facebook::ReactABI30_0_0::ABI30_0_0RCTNativeModule::invoke(unsigned int, folly::dynamic&&, int)
_dispatch_call_block_and_release
_dispatch_client_callout
_dispatch_lane_serial_drain
_dispatch_lane_invoke
_dispatch_workloop_worker_thread
_pthread_wqthread
start_wqthread

 */
// model for form
var Location = t.struct({
  city: t.maybe(t.String),
  state: t.maybe(t.String),
  // country: t.enums(countries, 'Country'),  // all kinds of issues with drop down
  country: t.String,
  countryabbv: t.maybe(t.String),
  latitude: t.maybe(t.String),  // instead of making hidden fields required, warn user if not filled out
  longitude: t.maybe(t.String),
});


//  make forms multilingual
const city_error = translate('city_error');
const city_label = translate('city_label');

const state_error = translate('state_error');
const state_label = translate('state_label');

const country_error = translate('country_error');
const country_label = translate('country_label');


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
      label: city_label,
      placeholder: '',
      error: city_error,
      placeholderTextColor: '#9C9C9C',
      color: '#ffffff',
    },
    state: {
      stylesheet: stylesheet,
      label: state_label,
      placeholder: '',
      error: state_error,
      placeholderTextColor: '#9C9C9C',
      color: '#ffffff',
    },
    country: {
      stylesheet: stylesheet,
      label: country_label,
      placeholder: '',
      error: country_error,
      placeholderTextColor: '#9C9C9C',
      color: '#ffffff',
    },
    countryabbv: {
      hidden: true
    },
    county: {
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



class WorkerSignUpLocation extends React.Component {

  /*
  static propTypes = {
    error: PropTypes.string,
    success: PropTypes.string,
  }

  static defaultProps = {
    error: null,
    success: null,
  }
  */

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      permission: null,
      alert: null,
      value: {
        latitude: '',
        longitude: '',
        label: '',
        city: '',
        county: '',
        state: '',
        country: '',
      }
    };
    this.handleSubmitNo = this.handleSubmitNo.bind(this)
    this.handleSubmitYes = this.handleSubmitYes.bind(this)
    this.handleDone = this.handleDone.bind(this)

  }

  state = { array: [] };

  // after location is updated, this button and action take us to next page
  handleDone = () => {

    Actions.jump("home");
    // Actions.home();

  }

  // someone who DENIED geo location hits submit
  // handleSubmitNo = () => {
  handleSubmitNo = () => {
    let state, all = null;
    let value = this.refs.formref.getValue();   console.log("handleSubmitNo: ", value);


    if (value) { // value is either filled or null if validation fails!

/*
      console.log("permissipn is FALSE ", this.state.permission);

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
      */

      // TODO: a fetch function just to get data and return it!!!
      // getGeocoderFromHereApi
      getGeocoderFromHereApi(value.city, value.state, value.country)
        .then((resp) => resp.json())  // returns just the JSON from request
        .then((response) => {
          //  undefined is not an object (near '...}).catch(function (err...')
          // TODO: proper working action would be nice to use here.
          all = response.Response.View[0];

          if(all) {

            let first = all.Result[0];
            console.log("ready to update firestore Longitude: ", first.Location.DisplayPosition.Longitude );

            state = {
              value: {
                city: first.Location.Address.City,
                state: first.Location.Address.State,
                county: first.Location.Address.County,
                country: first.Location.Address.Country,
                latitude: first.Location.DisplayPosition.Latitude,
                longitude: first.Location.DisplayPosition.Longitude,
              },
              updated: 1,
              alert:  1,
              type:  'success',
              message: translate('geo_success'),
              loading: false,
              permission: false,
            };

            console.log("member uid: ", this.props.member.uid);


            saveLocationFirestore(this.props.member.uid, state.value)
              // TODO: FIXME: mergeWorkerAsync not working here, perhaps add catch individually. so mergeWorkerAsync is now in save location

              //.then((worker) => { return mergeWorkerAsyncStorage( worker ) })
              //.then((worker) => { return mergeWorkerAsyncStorage( JSON.stringify( worker )) })
              .catch((err) => {
                console.log("saveLocationFirestore error 305: ");  // Not authorized to use location services
                console.log(err);
                // setTimeout(function(){ Actions.pop() }, 1000);
              });
              //.done(() => { setTimeout(function(){ Actions.pop() }, 1000); });




            //TODO: save to asyncstorage
            this.setState(state);

            // saveLocation
            // TODO: FIXME: catch always being caught
            /* not going to next screen! */


          } else {
            // did not get anything back
            state = {
              alert:  1,
              type:  'error',
              message: translate('geo_error'),
              updated: 1,
              value: {
                city: value.city,
                county: value.county,
                state: value.state,
                country: value.country
              }
            };


            this.setState(state);
          }
          return state;
        })
        .catch((err) => {
          // TODO: FIXME: undefined is not an object (near '...}).catch(function (err...')
          console.log("WhandleSubmitNo catch error: ");
          console.log(err);


          // setTimeout(function(){ Actions.pop() }, 1000);
          // JSON Parse error: Unrecognized token '<'
        })
        .done((result) => {
          // TODO: FIXME: undefined is not an object (near '...}).catch(function (err...')
          console.log("done with crap function: ");
          // console.log(result);


          setTimeout(function(){ Actions.pop() }, 1000);
          // JSON Parse error: Unrecognized token '<'
        });
    } else {
      console.log("ELSE VALUE FAILED: ", value);  //if null, form is not valid. allow normal behavoir
    }
  }

  /**
   * When someone submits after location is automatically updated, then lookup city info and allow submission
   */
  handleSubmitYes = () => {

    // TODO: instead of success error message, just send to category listing page with data needed,
    // MUST USE ACTIONS!!!!
    var value = this.refs.formref.getValue();     console.log("handleSubmitYes: ", value);

    if(value) { // value is not values of form, but an object of the form after auto valildation
      console.log("value: ", value);


      console.log("permissipn is TRUE ", this.state.permission);
      let postdata = {
        latitude: this.state.value.latitude,  // comes from state
        longitude: this.state.value.longitude,
        city: value.city,
        state: value.state,
        county: value.county,
        country: value.country,
      }
      // mergeWorkerAsyncStorage( JSON.stringify( first ) );  // merge with existing data, do not overwrite, WORKS HERE, NOT BELOW :(
      // saveLocation
      saveLocationFirestore(this.props.member.uid, state.value)
        .then(() => setTimeout(function(){ Actions.pop() }, 1000) )  // don't wait, just go to next page
        .catch((err) => {
          console.log("saveLocation error 305: ");  // Not authorized to use location services
          console.log(err.message);
          setTimeout(function(){ Actions.pop() }, 1000);
        });

    }
  }


  // componentDidMount() {
  componentWillMount() {

    let state = '';

    // run this only if we have permission

    if(this.state.permission) {
      getPosition()
        .then((position) => {

          console.log("will mount getPosition: ");

          /*
          state = {
            value: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            loading: true,
            permission: true,
          };
          */


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
                value: {
                  city: first.Location.Address.City,
                  state: first.Location.Address.State,
                  county: first.Location.Address.County,
                  country: first.Location.Address.Country,
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                },
                loading: false,
                permission: true,
              };

              this.setState(state);

            })
            .catch((err) => {
              console.log("geocode error: ");
              console.log(err.message);
            });
          console.log(" second state: ",state);
          this.setState(state);
        })
        .catch((err) => {
          console.log(err.message);

          // TODO: a user can say no, and that is handled here!

          console.log(" blah ah ahsd  catch: ", err);

          this.setState({
            loading: false,
            permission: false,
          });

        });
    }

    // if we don't have permission, it doesn't matter, remove loading
    this.setState({
      loading: false,
    });

  }

  render() {

    // const { error, success } = this.props;

    if ( this.state.loading ) return <Loading />;  // loading should also be used with PROPS NOT STATE!!!

    let subheader, content = '';
    if(this.state.permission) {
      subheader = translate("geo_no_sub");
      content = translate("geo_no_cnt");
    } else {
      subheader = translate("geo_yes_sub");
      content = translate("geo_yes_cnt");
    }

    return (

      <Container style={globalStyles.main}>
        <Content>

          <Header
            subheader={ subheader }
            content={ content }
          />

          {this.state.alert && <Messages message={this.state.message} type={this.state.type} />}

          {
            this.state.permission ? (
              <View>

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
                      latitude: this.state.value.latitude,
                      longitude: this.state.value.longitude ,
                      latitudeDelta: .25,
                      longitudeDelta: .25,
                    }}
                  >

                  </Animated>
                </View>
              </View>

            ) : ( null )  // simply don't show map if no permissions
          }

          <View style={{ flexGrow: 1 }}>

            <Form
              ref="formref"
              // ref={(ref) => this.formref=ref}
              type={ Location }
              options={ options }
              value={ this.state.value }
              // type={Model} model? instead of ref

            />

            <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
              {
                this.state.permission ? (
                  <Button block
                          style={formStyles.submitButton}
                          onPress={this.handleSubmitYes}
                  >
                    <Text style={formStyles.submitButtonText}>
                      SAVE LOCATION
                    </Text>
                  </Button>
                ) : (
                  <Button block
                          style={formStyles.submitButton}
                          onPress={this.handleSubmitNo}
                  >
                    <Text style={formStyles.submitButtonText}>
                      LOOK UP LOCATION
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

/*
       {
                this.state.updated ? (  // TODO: if data has been updated, show button to go home/category page
                  <Button block
                          style={formStyles.submitButton}
                          onPress={this.handleDone }
                  >
                    <Text style={formStyles.submitButtonText}>
                      SAVE LOCATION
                    </Text>
                  </Button>
                ) : (null)
              }
 */


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
/*
WorkerSignUpLocation.propTypes = {
  latitude: PropTypes.string,
  longitude: PropTypes.string,
  label: PropTypes.string,
  city: PropTypes.string,
  county: PropTypes.string,
  state: PropTypes.string,
  country: PropTypes.string,
  permission: PropTypes.string,
  loading: PropTypes.string,

};

WorkerSignUpLocation.defaultProps = {
  error: null,
  loading: true,
};
*/
export default WorkerSignUpLocation;


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
