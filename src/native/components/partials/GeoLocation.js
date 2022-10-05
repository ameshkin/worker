import React from 'react';
import PropTypes from 'prop-types';
import { View, Picker, StyleSheet, Text, TextInput } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import _isEqual from 'lodash/isEqual';
import mapStyle from '../../styles/maps/darkMap2'



// TODO: change default
// TODO:  wrappers for heading

// TODO: dropdown for geolocation and selection


class ShowMap extends React.Component {

  state = { array: [] };


  componentDidMount() {

  }

  render() {
    return (
      <MapView
        style={styles.map}
        showsUserLocation={true}
        followUserLocation={true}
        zoomEnabled={true}
        customMapStyle={mapStyle}

        region={{
          // latitude: this.state.latitude,  //breaks
          latitude: -17.814583,
          longitude: -63.1561,
          latitudeDelta: .25,
          longitudeDelta: .25,
        }}
      >

      </MapView>
    )
  }
}


const GeoLocation = ({  }) => (

  <View style={{ height: 350, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
    <ShowMap />
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



export default GeoLocation;
