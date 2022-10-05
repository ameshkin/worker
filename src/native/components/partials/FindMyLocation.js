// TODO: not using as of now but leaving for the future
import React from 'react';
import PropTypes from 'prop-types';
import { View, Picker, StyleSheet, Text, TextInput } from 'react-native';
import MapView, { PROVIDER_GOOGLE, AnimatedRegion, Animated  } from 'react-native-maps';
import { Button, Item } from "native-base"
import formStyles from "../../styles/forms"
import core from '../../constants/core'
import mapStyle from '../../styles/maps/lightBlue'

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

    console.log("pFind My rops: ", props);
  }
  state = { array: [] };

  handleChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    this.setState({
      [event.target.name]: value,
    });
  }




  componentWillMount() {

    console.log("FindMyLocation componentWillMount: ");

    // TODO: save to state, props, redux, wthatever



    getPosition()
      .then((position) => {

        console.log("will mount getPosition: ");

        // console.log(position);

        var latlong = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };


        let state = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };


        let prox =  position.coords.latitude + ',' +  position.coords.longitude;

        // const url = 'https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox=' +  prox + ',150&mode=retrieveAll&gen=9&app_id=SoVYzJFgD34pODdRQQKt&app_code=r4frFabzJ5ROm8hvt-DEMQ';
        const url = 'https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox=' +  prox + ',150&mode=retrieveAll&gen=' + core.gen + '&app_code=' + core.app_code;


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

            console.log("FindMyLocation response: ",response);


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


            console.log("Relevance: ",first.Relevance);
            console.log("Label: ",first.Location.Address.Label);
            console.log("City: ",first.Location.Address.City);







            this.setState(state);

            // TODO: fill out the form automatically here!

          })
          .catch((err) => {
            console.log("geocode error: ");
            console.error(err.message);
          });
        console.log(" second state: ",state);
        this.setState(state);
      })
      .catch((err) => {
        console.error(err.message);
      });

  }

  componentDidMount() {

  }

  render() {

    console.log("this.state.latitude: ", this.props);
    return (



      <View>

        <View style={{ height: 350, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>

          <Animated
            provider={ PROVIDER_GOOGLE } // breaks shit
            style={ styles.map }
            showsUserLocation={ true }
            followUserLocation={ true }
            zoomEnabled={true}
            customMapStyle={ mapStyle }
            showsMyLocationButton = { true }
            region={{
              // latitude: this.state.latitude,  //breaks
              latitude: this.state.latitude,
              longitude: this.state.longitude,
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
