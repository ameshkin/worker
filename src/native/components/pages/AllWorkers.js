import React from 'react';
// import PropTypes from 'prop-types';
// import { Icon } from 'native-base';
import {
  FlatList, TouchableOpacity, RefreshControl, Image, Picker, StyleSheet,
} from 'react-native';
import {
  Container, Content, Card, CardItem, Body, Text, Button, View
} from 'native-base';
import globalStyles from "../../styles/global"
/*
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
*/
import { Actions } from 'react-native-router-flux';

//import FontAwesome, { Icons } from 'react-native-fontawesome';

import Loading from '../partials/Loading';
import Error from '../partials/Error';
import Header from '../partials/Header';
import Spacer from '../partials/Spacer';
// import GeoLocation from '../partials/GeoLocation';

// TODO: the goal of this page is to get user's lcoation and show closest workers


const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerHeader: {
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 0,
    width: '100%'
  },
  pickerTitle: {
    flex: 1,
    textAlign: 'right',
  },
  pickerItem: {
    flex: 2,
  },
  map: {
    height: 300,
  },
  errorContainer: {
    backgroundColor: '#000000',
    color: '#cccccc',
    borderColor: '#DD0426',
    borderWidth: 1,
  },
  errorText: {
    color: '#DD0426',
  },
  iconContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  iconText: {
    paddingLeft: 14,
    paddingBottom: 0,
  },


});

// import LocationPicker from "../partials/LocationPicker"

/*
const cities = () => {
  const getCities = [
    {id: 0, label: 'Nanaimo'},
    {id: 1, label: 'Victoria'},
    {id: 2, label: 'Ladysmith'}
  ]
  return getCities;

}
*/
/*

  <LocationPicker
          title="City"
          enabled
          selectedValue={"Blah"}
          onValueChange={(value) => {
            this.props.setFieldValue('person_city', value)
            this.props.updateField({ prop: 'person_city', value })
          }}
          items={cities}
          firstItem="Select your city"
        />


                <Picker
          style={styles}
          mode="dialog"
          prompt="Select a Location"
          selectedValue={"dfd"}
          onValueChange={this.handleChangeOption}
          defaultValue="Select a Location"
          title="City"
          enabled
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
          <Picker.Item label="sdf" value="fsfsad" />
          <Picker.Item label="JavaSsdfsafdcript" value="sdff" />
        </Picker>


 */




const RecipeListing = ({
                         error,
                         loading,
                         category,
                         recipes,
                         reFetch,
                       }) => {

  /*
   Object {
8:40:34 PM:   "coords": Object {
8:40:34 PM:     "accuracy": 5,
8:40:34 PM:     "altitude": 0,
8:40:34 PM:     "altitudeAccuracy": -1,
8:40:34 PM:     "heading": -1,
8:40:34 PM:     "latitude": 37.785834,
8:40:34 PM:     "longitude": -122.406417,
8:40:34 PM:     "speed": -1,
8:40:34 PM:   },
8:40:34 PM:   "timestamp": 1535330434171.242,
8:40:34 PM: }

   */




  // TODO: geolocation here



// Loading
  if (loading) return <Loading />;

// Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => String(item.id);

  const onPress = item => Actions.recipe({ match: { params: { id: String(item.id) } } });


  /*

        <View>
          <View style={styles.iconContainer}>
            <Icon name="search" size={10} color='#000000' />
            <Text style={styles.iconText}>
              Enter a Location
            </Text>
          </View>

          <View style={styles.iconContainer}>
            <Icon name="ios-pin-outline" size={10} color='#000000' />
            <Text style={styles.iconText}>
              Use Current Location
            </Text>
          </View>
          <GeoLocation />
        </View>
   */

  return (
    <Container style={globalStyles.main}>
      <Content>
        <Header />

        <View style={styles.container}>
          <Text style={globalStyles.centerHeader}>
            Workers in Santa Cruz Bolivia
          </Text>
        </View>

        <Spacer size={5} />

        <FlatList
          numColumns={1}
          data={recipes}
          renderItem={({ item }) => (
            <Card transparent style={{ paddingHorizontal: 6 }}>
              <CardItem cardBody>
                <TouchableOpacity onPress={() => onPress(item)} style={{ flex: 1 }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      height: 100,
                      width: null,
                      flex: 1,
                    }}
                  />
                </TouchableOpacity>
              </CardItem>
              <CardItem cardBody>
                <Body>
                <Spacer size={10} />
                <Text style={{ fontWeight: '800' }}>
                  {item.title}
                </Text>
                <Spacer size={15} />
                <Button
                  block
                  bordered
                  small
                  onPress={() => onPress(item)}
                >
                  <Text>
                    View Worker
                  </Text>
                </Button>
                <Spacer size={5} />
                </Body>
              </CardItem>
            </Card>
          )}
          keyExtractor={keyExtractor}
          refreshControl={(
            <RefreshControl
              refreshing={loading}
              onRefresh={reFetch}
            />
          )}
        />

        <Spacer size={20} />
      </Content>
    </Container>
  );
};


// TODO: geolocation and google places
// const location = 'Santa Cruz Bolivia';

/*
RecipeListing.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  reFetch: PropTypes.func,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  latitudeDelta: PropTypes.number,
  longitudeDelta: PropTypes.number,
};



RecipeListing.defaultProps = {
  latitude: -17.814583,
  longitude: -63.1561,
  latitudeDelta: 0.3,
  longitudeDelta: 0.3,
  error: '',
  text: 'Default Text',
};

*/
// export default connect(mapStateToProps, mapDispatchToProps)(getCoords());
export default RecipeListing;
