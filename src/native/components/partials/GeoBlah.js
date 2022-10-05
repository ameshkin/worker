import React from 'react';
import PropTypes from 'prop-types';
import { View, Picker, StyleSheet, Text, TextInput } from 'react-native';
import MapView, { PROVIDER_GOOGLE, AnimatedRegion, Animated  } from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import _isEqual from 'lodash/isEqual';
import {Form, Input, Item, Label } from "native-base"
import globalStyles from "../../styles/global"
import formStyles from "../../styles/forms"
import Profile from "../pages/Profile"


// google places api
// AIzaSyD0IYIIrSgAsb8h1dTsS44S7CGOOCcy0rY
const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#1d2c4d',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#263c3f',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6b9a76',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#38414e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#212a37',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9ca5b3',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#1f2835',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#f3d19c',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2f3948',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#515c6d',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
];

// TODO: change default
// TODO:  wrappers for heading

// TODO: dropdown for geolocation and selection


var getPosition = function (options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

class GeoLocationGeocode extends React.Component {

  constructor(props) {
    super(props);
    this.state =  {
      latitude: {},
      longitude: {},
      label: {},
      city: {},
      state: {},
      country: {},
      array: []
    };


  }


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


    // TODO: save to state, props, redux, wthatever



    getPosition()
      .then((position) => {

        console.log("will mount getPosition: ");

        // console.log(position);

        var latlong = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        // console.log(latlong);

        // TODO: get reverse geocode from developer, plugin lat and long

        // https://reverse.geocoder.api.here.com/6.2/reversegeocode.{format}
        const url = 'https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox=52.5309%2C13.3847%2C150&mode=retrieveAll&gen=9&app_id=SoVYzJFgD34pODdRQQKt&app_code=r4frFabzJ5ROm8hvt-DEMQ';
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
          .then(function(response) {
            // Handle response you get from the server

            // console.log("response: ",response);


            let all   = response.Response.View[0].Result;
            let first = all[0];


            console.log("Relevance: ",first.Relevance);
            console.log("Label: ",first.Location.Address.Label);



            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              label: first.Location.Address.Label,
              city: first.Location.Address.City,
              state: first.Location.Address.State,
              country: first.Location.Address.Country,

            });


          })
          .catch((err) => {
            console.log(" GeoBlah geocode error: ");
            console.error(err.message);
          });
        /*
        const url = 'https://reverse.geocoder.api.here.com/6.2/reversegeocode.json';
        // The data we are going to send in our request
        let data = {
          prox: '52.5309,13.3847,150',
          mode: 'retrieveAll',
          gen: '9',
          app_id: 'devportal-demo-20180625',
          app_code: '9v2BkviRwi9Ot26kp2IysQ'
        }
        // The parameters we are gonna pass to the fetch function
        let fetchData = {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        }
        fetch(url, fetchData)
          .then(function(response) {
            // Handle response you get from the server

            console.log("response: ",response);



          })
          .catch((err) => {
            console.log("geocode error: ");
            console.error(err.message);
          });

*/


        /*

        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

*/



        /* TODO: bug fix

        undefined is not an object (evaluating 'RNGeocoder.geocodePosition')
* src/native/components/partials/GeoLocationGeocode.js:253:22 in <unknown>
- node_modules/promise/setimmediate/core.js:37:14 in tryCallOne
- node_modules/promise/setimmediate/core.js:123:25 in <unknown>
- ... 8 more stack frames from framework internals


        Geocoder.geocodePosition(latlong).then(res => {
          // res is an Array of geocoding object (see below)

          console.log('blah');

          console.dir( res);


        })
          .catch((err) => {
            console.log("errr1: ");
            console.error(err.message);
          });

          */

        /*


    this.setState({
              geo_label: first.Location.Address.Label
            });


*/





      })
      .catch((err) => {
        console.error(err.message);
      });

  }

  componentDidMount() {

    /*
    if(this.state.latitude != null) {
      var latlong = {
        lat: this.state.latitude,
        lng: this.state.longitude
      };


      console.log('latlong');
      console.log(latlong);

      Geocoder.geocodePosition(latlong).then(res => {
        // res is an Array of geocoding object (see below)

        console.log('blah');

        console.dir( res);


      })

        .catch(err  => {
          console.log("blah error");
          console.log(err);
        },)
    } else {

      console.log("state is null");

      console.log("state is latitude" + this.state.latitude);
      console.log("state is longitude" + this.state.longitude);


*/

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

          <Item style={formStyles.oneLineItem}>
            <TextInput
              style={formStyles.oneLineBox}
              placeholder="City"
              placeholderTextColor="#ccc"
              value={ this.state.city }
            />

          </Item>


        </View>

        <View style={{ height: 350, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>

          <Animated
            provider={ PROVIDER_GOOGLE } // breaks shit

            showsUserLocation={true}
            followUserLocation={true}
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


/*
const GeoLocationGeocode = ({   latitude, longitude, label, city, state, country }) => (

  <View>
    <View style={{ flexGrow: 1 }}>

      <Item style={formStyles.oneLineItem}>
        <TextInput
          style={formStyles.oneLineBox}
          placeholder="City"
          placeholderTextColor="#ccc"
          value={ label }
        />

      </Item>

      <Item style={formStyles.oneLineItem}>
        <TextInput
          style={formStyles.oneLineBox}
          placeholder="City"
          placeholderTextColor="#ccc"
          value={ city }
        />

      </Item>


    </View>

    <View style={{ height: 350, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>



      <ShowMap />
    </View>

  </View>

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

/*
GeoLocationGeocode.propTypes = {
  latitude: PropTypes.string,
  longitude: PropTypes.string,
  label: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  country: PropTypes.string,
};

GeoLocationGeocode.defaultProps = {
  latitude: {},
  longitude: {},
  label: {},
  city: {},
  state: {},
  country: {},
};
*/
/*
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
*/

export default GeoLocationGeocode;
