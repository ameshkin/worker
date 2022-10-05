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
import defaultSettings from '../../../static/default-settings'


// import DatePicker from 'react-native-datepicker'


class  SettingsGeneral extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      "loading": true,
      settings: null
    };

    let settings = null

    FirebaseFirestore.settings({ timestampsInSnapshots: true });

    // this line doesn't worik. you have to subscribe to ALL documents :( wtf
    // var doc = FirebaseFirestore.collection('workers').doc(this.props.member.uid);

    var doc = FirebaseFirestore.collection('workers');

    // const uid = Firebase.auth().currentUser.uid;
    const uid = 'CwUtnEXdmMhwzEd4eePlF4NpV5g2';
    // hardcode for testijng
    // const uid = 'ameshkin2';


    var observer = doc.onSnapshot({includeMetadataChanges: true},snapshot => {

      // console.log("snapshot metadata: ",snapshot.metadata);

      // this goes through every docuyment!!!!!
      // snapshot.docChanges().forEach(function(changes) {
      snapshot.docChanges().forEach(changes => {  // binds this
        //  => {


        if( changes.doc.id === uid ) {

          console.log("SETTINGS change for this user only: ", changes.doc.id );

          //if(!changes.doc.metadata.hasPendingWrites) {


            // console.log("changes: ", changes.doc.data() );

            let worker = changes.doc.data();

            let settings = worker.settings;


            console.log('worker.settings: ', settings);



            let newstate = {}

            if(settings)
            {




              this.setState({
                loading: false,
                settings: settings
              });

              console.log("ssetting SETTING SSTATE: ", this.state );

            } else {


              console.log("NO settings: ", settings );

              this.setState({
                loading: false,
                settings: JSON.parse(defaultSettings)
              });
            }
          //}
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

    console.log("data: ", data);
    let newstate = this.state.settings.map(item => ({
          checked: item.slug === data.key ? !item.checked : item.checked,
          //checked: item.slug === data.key ? !item.checked : item.checked,
          // icon: item.icon,
          slug: item.slug,
          // status: item.status
        })
    );

    console.log("newstate: ",  newstate);

    // let setWithOptions = saveWorkerFirestoreGeneric('worker', { "programming_languages": this.state.tagsSelected })
    let setWithOptions = saveWorkerFirestoreGeneric('settings', newstate)
      .then((response) => {
        console.log(`response: `, response);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });

    return setWithOptions;

  }

  // send back
  handleSubmit = () => { Actions.pop({ "error": 1, "message": "sdfsdf" }) } // TODO: send message back to Profile

  render() {
    // const {  error, locale } = this.props;

    // TODO:  NEED ACCORDION HERE
    // https://pamcms.atlassian.net/secure/RapidBoard.jspa?rapidView=8&projectKey=TRAB&view=planning&selectedIssue=TRAB-29
    if (this.state.loading) return <Loading />;

    // need to wait until settings is set

    const list = this.state.settings.map(item => (
      <CheckBox
        title={ translate(item.slug) }
        left
        iconRight
        // component={'TouchableOpacity'}
        containerStyle={ formStyles.checkSettingsCnt }
        textStyle={ formStyles.checkSettingsLabel }
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
        <Content>
          <Row>
            <Col md={{ size: 6, offset: 3 }} lg={{ size: 12, offset: 3 }}>

              <Header
                subheader={ translate('settings_sub') }
              />

              <View style={globalStyles.spaceCnt}>
                { list }
              </View>

              <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>

                <Button block
                        style={ formStyles.submitButton }
                        onPress={ this.handleSubmit }
                >
                  <Text style={formStyles.submitButtonText}>
                    { translate('save').toUpperCase() }
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

export default SettingsGeneral;
