import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, TextInput, AsyncStorage } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Animated  } from 'react-native-maps';
import { Button, Item } from "native-base"
import formStyles from "../../styles/forms"
import core from '../../constants/core'
import mapStyle from '../../styles/maps/lightBlue'
import Log from 'am-simple-log'
import saveWorkerAsyncStorage from '../helpers/saveWorkerAsyncStorage'

// TODO: change default
// TODO:  wrappers for heading

// TODO: dropdown for geolocation and selection

var getPosition = function (options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

class ShowMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: '',
      longitude: '',
      label: '',
      city: '',
      state: '',
      country: '',
    };
  }


  state = { array: [] };

  handleChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    this.setState({
      [event.target.name]: value,
    });
  }

  componentWillMount() {

    getPosition({
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 1,
    })
      .then((position) => {

        // console.log("position: ", position);

        let state = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };


        let prox =  position.coords.latitude + ',' +  position.coords.longitude;
        // const url = 'https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox=' +  prox + ',150&mode=retrieveAll&gen=9&app_id=SoVYzJFgD34pODdRQQKt&app_code=r4frFabzJ5ROm8hvt-DEMQ';
        const url = 'https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?locationattributes=additionalData&level=city&prox=' +  prox + ',150&mode=retrieveAll&gen=' + core.gen + '&app_id=' + core.app_id + '&app_code=' + core.app_code;

        // console.log("url: " + url);

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
            // Handle response you get from the server

            // console.log("response: ",response);


            // TODO: figure out how to add redux state

            let all   = response.Response.View[0].Result;
            let first = all[0];

            state = {
              label: first.Location.Address.Label,
              city: first.Location.Address.City,
              state: first.Location.Address.State,
              county: first.Location.Address.County,
              country: first.Location.Address.Country,
            };


            saveWorkerAsyncStorage( JSON.stringify( first ) );
            // console.log( "GetLocationGeocode locationPromise: ", locationPromise );



            this.setState(state);

          })
          .catch((err) => {

            //TODO: changing location to spain fucks this up
            console.log("177 geocode error: ");
            console.error(err.message);
          });
        // console.log(" second state: ",state);
        this.setState(state);
      })
      .catch((err) => {
        console.error(err.message);
      });

  }

  componentDidMount() {

    // TODO: save  current user info to async storage



  }

  render() {
    return (

      <View>
        <View style={{ flexGrow: 1 }}>

          <Item style={formStyles.oneLineItem}>
            <TextInput
              style={formStyles.oneLineBox}
              placeholder="City"
              placeholderTextColor="#ccc"
              value={ this.state.label }
            />

          </Item>

        </View>

        <View style={{ height: 350, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>

          <Animated
            provider={ PROVIDER_GOOGLE } // breaks shit
            style={styles.map}
            showsUserLocation={ true }
            zoomEnabled={ true }
            customMapStyle={ mapStyle }
            showsMyLocationButton={ true }
            region={{
              // parseFloat breaks
              latitude: Number(this.state.latitude),
              longitude: Number(this.state.longitude),
              latitudeDelta: .25,
              longitudeDelta: .25,
            }}

          >

          </Animated>

        </View>

      </View>
    )
  }
}

/*

        <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>

          <Button block
                  style={formStyles.submitButton}
                  onPress={this.handleSubmit}
          >
            <Text style={formStyles.submitButtonText}>
              View Workers in { this.state.city }
            </Text>
          </Button>

        </View>
 */

const FindMyLocation = ({  }) => (
  <ShowMap />
);

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

export default FindMyLocation;
