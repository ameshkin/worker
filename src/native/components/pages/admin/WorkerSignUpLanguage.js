import React from 'react';
import {
  Container, Content, Text, Row, Col, View, Button,
} from 'native-base';
import globalStyles from '../../../styles/global'
import Footer from '../../partials/Footer'
import { Actions } from 'react-native-router-flux'
import Header from "../../partials/Header"
import Loading from '../../partials/Loading';
import { translate } from "../../../../i18n"
import { CheckBox } from 'react-native-elements'
import formStyles from "../../../styles/forms"
import { FirebaseFirestore, Firebase } from '../../../../lib/firebase'
import { saveWorkerFirestoreGeneric } from '../../helpers/saveWorkerFirestoreGeneric'
import languageDefaultJson from '../../../static/languages'


class WorkerSignUpLanguage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { "loading": true };

    const settings = { timestampsInSnapshots: true };

    let languages = null

    FirebaseFirestore.settings(settings);

    // this line doesn't worik. you have to subscribe to ALL documents :( wtf
    // var doc = FirebaseFirestore.collection('workers').doc(this.props.member.uid);

    var doc = FirebaseFirestore.collection('workers');

    // const uid = Firebase.auth().currentUser.uid;

    // hardcode for testijng
    // const uid = 'ameshkin2';
    const uid = 'CwUtnEXdmMhwzEd4eePlF4NpV5g2';

    var observer = doc.onSnapshot({includeMetadataChanges: true},snapshot => {

      // console.log("snapshot metadata: ",snapshot.metadata);

      // this goes through every docuyment!!!!!
      // snapshot.docChanges().forEach(function(changes) {
      snapshot.docChanges().forEach(changes => {  // binds this
        //  => {


        if( changes.doc.id === uid ) {

          console.log("change for this user only: ", changes.doc.id );


          // console.log("changes: ", changes.doc.data() );

          let worker = changes.doc.data();

          languages = worker.worker.data.worker.languages;

          let newstate = {}

          if(languages) {

            // console.log("YES languages: ", languages );

            this.setState({
              loading: false,
              languages: languages
            });

          } else {


            // TODO: should always be languages, but may have to catch errors here!
            console.log("NO languages: ", languages );


            // let's just go head and set defaults here!


            // TODO:  check locale, and check the user's language as true!!

/*
            let languageDefaultJson = `
    [{
  	"icon": "http://amir-meshkin.com/trabajamos/country/svg/it.svg",
  	"slug": "en",
  	"checked": false,
  	"status": 1
  }, {
  	"icon": "http://amir-meshkin.com/trabajamos/country/svg/es.svg",
  	"slug": "es",
  	"checked": false,
  	"status": 1
  }, {
  	"icon": "http://amir-meshkin.com/trabajamos/country/svg/fr.svg",
  	"slug": "fr",
  	"checked": false,
  	"status": 1
  }, {
  	"icon": "http://amir-meshkin.com/trabajamos/country/svg/fr.svg",
  	"slug": "it",
  	"checked": false,
  	"status": 1
  }, {
  	"icon": "http://amir-meshkin.com/trabajamos/country/svg/ir.svg",
  	"slug": "ir",
  	"checked": false,
  	"status": 1
  }]
  `

  */

            console.log("setting default languages: ", languageDefaultJson );


            this.setState({
              loading: false,
              languages: JSON.parse(languageDefaultJson)
            });



          }
        }
      });
    }, err => {
      console.log(`Encountered error: ${err}`);
    });

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  // if we change this value in firebase, this page should automatically refresh without setting state here
  handleChange = ( data ) => {

    // console.log("data: ", data);

    let newstate = this.state.languages.map(item => ({
          checked: item.slug === data.key ? !item.checked : item.checked,
          icon: item.icon,
          slug: item.slug,
          status: item.status
        })
    );

    // console.log("newstate: ",  newstate);

    let setWithOptions = saveWorkerFirestoreGeneric('worker', { "languages": newstate })
      .then((response) => {

      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });

    return setWithOptions;

  }

  // send back
  handleSubmit = () => { Actions.pop({ "error": 1, "message": "sdfsdf" }) } // TODO: send message back to Profile


  /*
  FirebaseFirestore

    function firebaseFunction(dispatch) {
    if (Firebase === null) return () => new Promise(resolve => resolve());

    const UID = Firebase.auth().currentUser.uid;
    if (!UID) return false;

    const ref = FirebaseRef.child(`favourites/${UID}`);

    return ref.on('value', (snapshot) => {
      const favs = snapshot.val() || [];

      return dispatch({
        type: 'FAVOURITES_REPLACE',
        data: favs,
      });
    });
  }

   */

  /*

   */
  render() {
    // const {  error, locale } = this.props;

    // TODO: add country flags here
    // https://pamcms.atlassian.net/secure/RapidBoard.jspa?rapidView=8&projectKey=TRAB&view=planning&selectedIssue=TRAB-29
    if (this.state.loading) return <Loading />;

    // need to wait until languages is set



    const languageList = this.state.languages.map(item => (
      <CheckBox
        title={ translate(item.slug) }
        left
        iconRight
        // component={'TouchableOpacity'}
        containerStyle={formStyles.checkCnt}
        textStyle={formStyles.checkLabel}
        uncheckedIcon='times'
        uncheckedColor={'#ff0000'}
        checkedIcon='check'
        checkedColor={'#4cff43'}
        checked={ item.checked }
        onPress={() => this.handleChange({ key: item.slug, checked: item.checked })}

      />
    ));

    return (
      <Container style={globalStyles.main}>
        <Content padder>
          <Row>
            <Col md={{ size: 6, offset: 3 }} lg={{ size: 12, offset: 3 }}>

              <Header
                subheader={ translate('language_sub') }
                // content={translate('language_sub') }
                // subheader={ translate('your_location') }
              />


              <View style={globalStyles.spaceCnt}>
                { languageList }
              </View>

              <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>

                <Button block
                        style={ formStyles.submitButton }
                        onPress={ this.handleSubmit }
                >
                  <Text style={formStyles.submitButtonText}>
                    { translate('goback').toUpperCase() }
                  </Text>
                </Button>

              </View>

            </Col>
          </Row>
        </Content>
        <Footer />
      </Container>
    );
  }
}

export default WorkerSignUpLanguage;
