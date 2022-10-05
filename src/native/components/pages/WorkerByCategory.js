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
  AsyncStorage, Modal, ScrollView
} from 'react-native';
import {
  Container, Content, Card, CardItem, Body, Text, Button, View, Col, Row
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
import {Firebase, FirebaseFirestore} from "../../../lib/firebase"
import Messages from "../partials/Messages"
import modalStyles from "../../styles/modals"

import AdvancedSearchFilterButton from '../partials/buttons/AdvancedSearchFilterButton'

// SHOW A LIST OF WORKERS BY CATEGORY

// TODO: dynamic column size.


// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
// const SCREEN_HEIGHT = width < height ? height : width;
const isSmallDevice = SCREEN_WIDTH <= 414;
const numColumns = isSmallDevice ? 2 : 3;


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
      alert: null,
      errorType: null,
      message: null,
      loading: true,
      workers: null,
      header: null,
    };
  }


  /* HARD CODED FOR TESTING

  componentWillMount() {

    let filter, type, header = '';


    // TODO: NEED A GOOD SENSIBLE WAY TO GET LOCATION DATA FOR THIS USER!

    console.log(this.props);



    // determine headers depending on worker data that should ALWAYS HAVE SAME STRUCTURE

    console.log("getWorkerAsyncStorage result:  ", result.workers);

    let location = result.workers.data.location;

    console.log("getWorkerAsyncStorage location:  ", location);




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

    try {
      console.log("hgetting from Firestore: ", this.props.catSlug);
      console.log("filter: ", filter);

      // const url = `https://trabajamos.herokuapp.com/api/worker/${ type }/${ catId }/${ filter }`;

      // TODO: let's just go head and replace this with new firestore method!

      FirebaseFirestore.settings({ timestampsInSnapshots: true });

      var doc = FirebaseFirestore.collection('workers');
      // no longer using catId, now using category => slug

      let query = null;
      // may be county search!
      switch(type) {
        case 'city':
          query = 'worker.location.city'
          break;
        case 'county':
          query = 'worker.location.county'
          break;
        default:
          query = 'worker.location.city'
      }

      console.log("worker.category: ", this.props.catSlug);

      doc
        .where('worker.category', '==', this.props.catSlug)
        .where(query, '==', filter)
        // .where('worker.status', '==', 1) // make sure status is 1 and public is 1
        // .where('worker.public', '==', 1)
        .get()
        .then(snapshot => {

          var docs = [];
          snapshot.forEach(doc => {
            let docData = { "key": doc.id, "data": doc.data() }
            docs.push(docData);
          });

          this.setState({
            loading: false,
            workers: docs,
            header: header,
          });
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }

*/



  // TODO: BROKEN!

  // [Error: Reference.child failed: First argument was an invalid path = "undefined". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"]

  componentDidMount() {


    let filter, type, header, location, alert, message, errorType = '';

    getWorkerAsyncStorage()
    // .then(res => res.json())
      .then((result) => {

        // determine headers depending on worker data that should ALWAYS HAVE SAME STRUCTURE

        if(result.error) {
          location  = result.location;
          alert     = 1;
          errorType = 'info';
          message   = 1;
          // details   = 'Set Your Location';

        } else {
          location = result.workers.data.location;
          console.log("getWorkerAsyncStorage location stored:  ", location);
          alert     = 0;
          errorType = '';
          message   = '';
        }


        // let location = result.workers.data.worker.location;
        if (typeof location.city !== "undefined" && location.city !== null) {
          console.log("CITY NOT NULL: ", location.city);
          filter = location.city
          type   = 'city'
          header = location.city
        } else {
          // use county /api/worker/county/:cat/:county
          console.log("we are null, need other web service or get city");
          filter = location.county;
          type   = 'county'
          header = location.county + ' County'
        }


        console.log("WTASGFASDF AWSDF AWDSF ASDF AWSFD: ");

        // let inputs = { location, filter, type, this.props.catId }

        try {
          console.log("hgetting from Firestore: ", this.props.catSlug);
          console.log("filter: ", filter);

          // const url = `https://trabajamos.herokuapp.com/api/worker/${ type }/${ catId }/${ filter }`;

          // TODO: let's just go head and replace this with new firestore method!

          FirebaseFirestore.settings({ timestampsInSnapshots: true });

          var doc = FirebaseFirestore.collection('workers');
          // no longer using catId, now using category => slug

          let query = null;
          // may be county search!
          switch(type) {
            case 'city':
              query = 'worker.location.city'
              break;
            case 'county':
              query = 'worker.location.county'
              break;
            default:
              query = 'worker.location.city'
          }

          console.log("filter filter: ", filter);

          doc
            .where('worker.category', '==', this.props.catSlug)
            .where(query, '==', filter)
            //.where('worker.status', '==', true) // make sure status is 1 and public is 1
            //.where('settings.slug.public', '==', true)  // public should come from settings, search inside array
            //.where('settings', 'array_contains', 'public')
            .get()
            .then(snapshot => {

              var docs = [];
              snapshot.forEach(doc => {
                let docData = { "key": doc.id, "data": doc.data() }
                docs.push(docData);
              });

              this.setState({
                alert: alert,
                errorType: errorType,
                message: message,
                loading: false,
                workers: docs,
                header: header,
              });
            })
            .catch(err => {
              console.log('Error getting documents: ', err);
            })
            .catch(err => {
              console.log('Error getting documents 2: ', err);
            });
        } catch (error) {
          // Error retrieving data
          console.log(error.message);
        }
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



  // TODO: FILTER BUTTON pulls up advancedsearch bodal



  render() {

    const { alert, loading, error, errorType, message } = this.state;


/*
    // show geo location/set button
    if(message) {

      // TODO: open modal which explains geolocation process and allows manual and automatic location search

      // TODO: there is the city that the worker lives in and then the city THAT THE WORKER WOULD RELOCATE TO.
      // this page is for the city the worker lives in BUT PERHAPS SHOULD ALSO SEARCH OTHER LOCATIONS

      return (

        <Modal
          animationType="slide"
          transparent={ false }
          visible={ this.state.modalVisible }
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <ScrollView>
            <View style={ modalStyles.inside }>
              <Row>
                <Col md={{ size: 6, offset: 3 }} lg={{ size: 12, offset: 3 }}>

                  <View style={ globalStyles.filterModalHeader }>
                    <Text style={ globalStyles.filterHeaderLeft } >
                      Set
                    </Text>
                    <Text style={ globalStyles.filterHeaderRight } onPress={ this.handleFilterModalClose } >
                      X
                    </Text>
                  </View>

                </Col>
              </Row>

              <Row>
                <Col md={{ size: 6, offset: 3 }} lg={{ size: 12, offset: 3 }}>

                  <View style={globalStyles.filterSection}>

                    <View style={globalStyles.filterHeaderFirst}>
                      <Text style={ globalStyles.filterHeader } >
                        Worker Type
                      </Text>
                    </View>

                    <View>

                      sdfasdf

                    </View>

                  </View>

                </Col>
              </Row>


            </View>
          </ScrollView>
        </Modal>
      );
    }

*/

    if (!this.state.workers) {
      return (
        <Loading />
      );
    }


    return (
      <Container style={globalStyles.main}>
        <Content>
          <Header />

          { alert && <Messages message={ message } type={ errorType } /> }

          <AdvancedSearchFilterButton />

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
                    <Text style={ listStyles.workerTitle }>{ item.data.worker.private.displayName }</Text>
                    <Text style={ listStyles.workerDescription }>{ item.data.worker.experience } Year(s) of Experience</Text>
                    <Image source={require('../../images/stars5.png')} style={{ height: 19, width: 100 }} />
                  </View>

                </TouchableOpacity>
              </View>
            )}
            keyExtractor={ keyExtractor }
            refreshControl={(
              <RefreshControl
                refreshing={ this.state.loading }
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
                refreshing={ this.state.loading }
              />
            )}
          />

 */
