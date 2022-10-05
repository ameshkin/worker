import React from 'react';
import PropTypes from 'prop-types';
import { View, Picker, StyleSheet, Text, TextInput } from 'react-native';
import MapView, { PROVIDER_GOOGLE, AnimatedRegion, Animated  } from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import _isEqual from 'lodash/isEqual';
import {Button, Col, Form, Input, Item, Label} from "native-base"

import formStyles from "../../styles/forms"
import core from '../../constants/core'
import mapStyle from '../../styles/maps/lightBlue'

// google places api
// AIzaSyD0IYIIrSgAsb8h1dTsS44S7CGOOCcy0rY
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

    // console.log("props: ", props);
  }


  state = { array: [] };
  /*
  constructor(props) {
    super(props);
    this.state =  {
      latitude: {},
      longitude: {},
      label: {},
      city: {},
      state: {},
      country: {},
    };
  }
  */

  /*
  getInitialState = (event) => {
    return { latlong: {} };

  }


  getInitialState() {
    return {
      region: new AnimatedRegion({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: .25,
        longitudeDelta: .25,
      }),
    };
  }
*/

  handleChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    this.setState({
      [event.target.name]: value,
    });
  }

  componentWillMount() {

    let prox =  this.props.latitude + ',' +  this.props.longitude;

    // console.log("prox: ", prox);

    const url = 'https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox=' +  prox + ',150&mode=retrieveAll&gen=' + core.gen + '&app_code=' + core.app_code;

    // console.log("url: ", url);

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

        console.log("worker location Relevance: ",first.Relevance);
        console.log("Label: ",first.Location.Address.Label);
        console.log("City: ",first.Location.Address.City);

        this.setState(state);

      })
      .catch((err) => {
        console.log("WOrker Location geocode error: ");
        console.log("err: ", err);

        // console.error(err.message);
      });

  }

  componentDidMount() {

  }

  render() {
    return (

      <View>

        <View style={{ height: 350, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>

          <Animated
            provider={ PROVIDER_GOOGLE } // breaks shit
            style={styles.map}
            showsUserLocation={true}
            followUserLocation={true}
            zoomEnabled={true}
            customMapStyle={ mapStyle }
            region={{
              // latitude: this.state.latitude,  //breaks
              latitude: this.props.latitude,
              longitude: this.props.longitude,
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
  region={{
          // latitude: this.state.latitude,  //breaks
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: .25,
          longitudeDelta: .25,
        }}
 */

const WorkerLocation = ({ latitude, longitude }) => (
  <ShowMap
    latitude={ latitude }
    longitude={ longitude }
  />
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



export default WorkerLocation;
