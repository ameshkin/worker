import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import { Icon } from 'native-base';
import {
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
  AsyncStorage
} from 'react-native';
import {
  Container, Content, Card, CardItem, Body, Text, Button, View, Col
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import Loading from '../partials/Loading';
import Error from '../partials/Error';
import Header from '../partials/Header';
import Spacer from '../partials/Spacer';
import ErrorMessages from "../../../constants/errors";
// import GeoLocation from '../partials/GeoLocation';  // TODO: dropdown to change location

// import { NavigationActions } from 'react-navigation';
import globalStyles from "../../styles/global"
// import formStyles from "../../styles/forms"
import Footer from "../partials/Footer"
import Icon from 'react-native-vector-icons/FontAwesome';
import 'firebase/firestore' // make sure you add this for firestore
import listStyles from "../../styles/lists"
import mapStyle from "../../styles/maps/lightBlue"
// import SvgUri from "react-native-svg-uri"
// import CategoryItem from "../partials/CategoryItem"
// import MapView, { PROVIDER_GOOGLE, Animated  } from 'react-native-maps';
import FindMyLocation from '../partials/GeoLocationGeocode'

import { getWorkerAsyncStorage } from '../helpers/getWorkerAsyncStorage'
import { getWorkersFromFirestore } from '../helpers/getWorkersFromFirestore'
import { translate } from "../../../i18n"
import core from "../../constants/core"



// TODO: dynamic column size.


// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
// const SCREEN_HEIGHT = width < height ? height : width;
const isSmallDevice = SCREEN_WIDTH <= 414;
const numColumns = isSmallDevice ? 2 : 3;


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

// original action
// const onPress = item => Actions.recipe({ match: { params: { id: String(item.id) } } });

// TODO: must figure out actions
// const onPress = item => Actions.recipe({ match: { params: { id: String(item.id) } } });


// const keyExtractor = item => String(item.id);
const keyExtractor = item => String( item.key);

const onPress = ( item ) => {
  Actions.workerdetail( item )
};

class WorkerByCategory extends Component {
  constructor(props) {
    super(props);
// this.state = {data: this._addKeysToBooks(categoryList)};

    // console.log("WorkerByCategory props: ", props);
    this.state = {
      isLoading: true,
      workers: null,
    };
  }




  /*
  /// TODO: replace with clean promise with .done, put getLocation into helpers
  getLocation = async () => {
    try {
      // position = await AsyncStorage.getItem('position') || 'none';
      await AsyncStorage.getItem('worker')
        .then(
          (values) => {
            //   value = values;
            console.log('getLocation values: ',values);

            // set city in state
            let location = JSON.parse(values);

            this.setState({ city: location.Location.Address.City });

            return location;  // this is  neeeded
          })
        .then(
          (location) => {
            //   value = values;
            // console.log('getLocation city: ', location.Location.Address.City);

            //TODO: sometimes city is not available, so we need to account for this when it happens.
            // use geolib if necessary

            // geolib.getDistance(position.coords, {
            //             latitude: 51.525,
            //             longitude: 7.4575
            //         })

            //


            let filter, type, header = ''
            if(typeof location.Location.Address.City !== "undefined" && location.Location.Address.City !== null) {
              console.log("CITY NOT NULL: ", location.Location.Address.City);
              filter = location.Location.Address.City
              type   = 'city'
              header = location.Location.Address.City
            } else {
              // use county /api/worker/county/:cat/:county
              console.log("we are null, need other web service or get city");
              filter = location.Location.Address.County;
              type   = 'county'
              header = location.Location.Address.County + ' County'




            }

            const url = `https://trabajamos.herokuapp.com/api/worker/${ type }/${ this.props.catId }/${ filter }`;

            // console.log("url: ", url);
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

                this.setState({
                  isLoading: false,
                  workers: response,
                  header: header
                });

                // console.log("response: ",response);

              })
              .catch((err) => {
                console.log("WorkerByCategory geocode error: ");
                console.error(err.message);
              });

            // return location;
          });
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }

  }

*/

  componentWillMount() {

    let filter, type, header, inputs = ''

    getWorkerAsyncStorage()
      .then((result) => {

        // determine headers depending on worker data that should ALWAYS HAVE SAME STRUCTURE

        console.log("getWorkerAsyncStorage result:  ", result.workers);

        let location = result.workers.data.location;
        // let location = result.workers.data.worker.location;
        if (typeof location.city !== "undefined" && location.city !== null) {
          console.log("CITY NOT NULL: ", location.city);
          filter = location.city
          type = 'city'
          header = location.city
        } else {
          // use county /api/worker/county/:cat/:county
          console.log("we are null, need other web service or get city");
          filter = location.county;
          type = 'county'
          header = location.county + ' County'
        }

        // let inputs = { location, filter, type, this.props.catId }

        inputs = {
          header,
          location,
          filter,
          type,
          catId: this.props.catId
        }

        return inputs

      })
      .done((inputs) => {

        let {location, filter, type, catId} = inputs

        try {
          console.log("helper function getWorkersFromFirestore: ", location);


          // const url = `https://trabajamos.herokuapp.com/api/worker/${ type }/${ catId }/${ filter }`;

          // TODO: let's just go head and replace this with new firestore method!



          const url = `${ core.web_service }api/worker/${ type }/${ catId }/${ filter }`;

          console.log("getWorkersFromFirestore url: ", url);
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

              // console.log("returning response from getWorkersFromFirestore: ",response);

              return response;
              //

            })
            .catch((err) => {
              console.log("37 catch getWorkersFromFirestore geocode error: ", err);
            })
            .done((response) => {

              this.setState({
                isLoading: false,
                workers: response,
                header: inputs.header
              });

            });
        } catch (error) {
          // Error retrieving data
          console.log(error.message);
        }


        /* MORE ASYNC HELL
        getWorkersFromFirestore(inputs)
          .done((result) => { // once that's done, then set state
            console.log("FUCKER IS DONE RESULT IS: ", result);
            this.setState({
              isLoading: false,
              workers: result,
              header: header
            });
          })

          */
      });
  }

// TODO: PHASE II:  show map with markers. on map change, worker list changes
// but for now, just show map with markers

  /*
  <Image source={require('../../images/stars5.png')} style={{ height: 30, width: 159 }} />
                <Image source={require('../../images/stars5.png')} style={{ height: 30, width: 159 }} />


                // no need for map, since location should be in state

          <View style={{ marginTop: 20, height: 350, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FindMyLocation />
          </View>

          <Spacer size={5} />

          <Image source={require('../../images/stars' + item.data.totalstars + '.png')} style={{ height: 19, width: 100 }} />

  */

  render() {

    if (!this.state.workers) {
      return (
        <Loading />
      );
    }

    return (
      <Container style={globalStyles.main}>
        <Content>
          <Header />

          <View style={ listStyles.workerHeader }>
            <Text style={ listStyles.workerHeaderText } >
              { this.props.catLabel } { translate( 'in' ) } { this.state.header }
            </Text>
          </View>

          <Spacer size={15} />

          <FlatList
            numColumns={ 1 }
            data={ this.state.workers }
            renderItem={({ item }) => (
              <View style={ listStyles.workerContainerRow }>
                <TouchableOpacity
                  // onPress={() => onPress(item.id)}
                  onPress={() => onPress( { item } )} // pass entire object
                  style={{    flex: 1, flexDirection: 'row',}}
                >

                  <View style={{ flex: .2, flexDirection: 'column' }}>
                    <Image
                      source={{ uri: 'https://via.placeholder.com/75x75' }}
                      style={{ height: 75, width: 75 }} />
                    />
                  </View>

                  <View style={{ flex: .8, flexDirection: 'column', paddingLeft: 20 }}>
                    <Text style={ listStyles.workerTitle }>{ item.data.worker.displayName }</Text>
                    <Text style={ listStyles.workerDescription }>{ item.data.worker.experience } Year(s) of Experience</Text>
                    <Image source={require('../../images/stars5.png')} style={{ height: 19, width: 100 }} />
                  </View>

                </TouchableOpacity>
              </View>
            )}
            keyExtractor={ keyExtractor }
            refreshControl={(
              <RefreshControl
                refreshing={ this.state.isLoading }
              />
            )}
          />

          <Spacer size={20} />
        </Content>
        <Footer />
      </Container>
    );
  };
}

export default WorkerByCategory;

/*


// task history
           <View style={ globalStyles.historyItem }>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => onPress(item)}
                  i
                >

                  <View>
                    <View style={ listStyles.flexContainerRow }>
                      <View style={ listStyles.flexColumnOneHalf}>
                        <Text style={ listStyles.taskTitle }>title { item.private.fullname }</Text>
                      </View>

                      <View style={ listStyles.flexColumnOneHalf}>
                        <Image source={require('../../images/stars5.png')} style={{ height: 30, width: 159 }} />
                      </View>
                    </View>

                    <View style={ listStyles.flexContainerRow }>
                      <Text style={ listStyles.taskDescription }>{ item.meta.english.subheader }</Text>
                    </View>
                  </View>

                  <Icon name="map" size={27} color={'#ffffff'} />
                </TouchableOpacity>

              </View>



// original
  <FlatList
            numColumns={ numColumns }
            data={ this.state.workers }
            renderItem={({ item }) => (
              <Card transparent>
                <CardItem cardBody>
                  <TouchableOpacity onPress={() => onPress(item)} style={{ flex: 1 }}>
                    <ImageBackground
                      source={{ uri: item.image }}
                      style={globalStyles.listImage}
                    />
                  </TouchableOpacity>
                </CardItem>
                <CardItem style={globalStyles.paddingLeftRight} cardBody>
                  <Body>
                  <Spacer size={10} />
                  <Text style={globalStyles.workerHeader}>
                    {item.title}
                  </Text>
                  <Text style={globalStyles.ptext}>
                    {item.username}
                  </Text>
                  <Spacer size={15} />
                  <Button
                    onPress={() => onPress(item)}
                    style={formStyles.button}
                  >
                    <Text style={globalStyles.buttonText}>
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
                refreshing={ this.state.isLoading }
              />
            )}
          />

 */
