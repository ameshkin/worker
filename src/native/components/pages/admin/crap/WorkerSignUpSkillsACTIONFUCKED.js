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


class WorkerSignUpSkill extends React.Component {

  constructor(props) {
    super(props);

    this.state = { "loading": true };

    const settings = { timestampsInSnapshots: true };

    let skills = null

    FirebaseFirestore.settings(settings);

    // this line doesn't worik. you have to subscribe to ALL documents :( wtf
    // var doc = FirebaseFirestore.collection('workers').doc(this.props.member.uid);

    var doc = FirebaseFirestore.collection('workers');

    const uid = Firebase.auth().currentUser.uid;

    // hardcode for testijng
    // const uid = 'ameshkin2';

    var observer = doc.onSnapshot({includeMetadataChanges: true},snapshot => {

      // console.log("snapshot metadata: ",snapshot.metadata);

      // this goes through every docuyment!!!!!
      // snapshot.docChanges().forEach(function(changes) {
      snapshot.docChanges().forEach(changes => {  // binds this

        if( changes.doc.id === uid ) {

          console.log("change for this user only: ", changes.doc.id );

          let worker = changes.doc.data();

          skills = worker.skills;

          let newstate = {}

          if(skills) {

            console.log("YES skills: ", skills );
            this.setState({
              loading: false,
              skills: skills
            });

          } else {


            let skillsDefaultJson = `
[{
    "checked": false,
    "icon": "check",
    "color": "#02b50b",
    "slug": "writer",
    "status": 1
  },
    {
      "checked": false,
      "icon": "check",
      "color": "#02b50b",
      "slug": "programming",
      "status": 1
    },
    {
      "checked": false,
      "icon": "check",
      "color": "#02b50b",
      "slug": "publishing",
      "status": 1
    }
  ]
  `

            console.log("setting default skillsDefaultJson: ", skillsDefaultJson );


            this.setState({
              loading: false,
              skills: JSON.parse(skillsDefaultJson)
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

    let newstate = this.state.skills.map(item => ({
          checked: item.slug === data.key ? !item.checked : item.checked,
          icon: item.icon,
          slug: item.slug,
          color: item.color,
          status: item.status
        })
    );

    // let tofirestore = { "skills": newstate }
    // console.log("tofirestore: ",  tofirestore);



    let setWithOptions = saveWorkerFirestoreGeneric('skills', newstate)
      .then((response) => {

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

    // TODO: add icons to the left of the words
    // https://pamcms.atlassian.net/secure/RapidBoard.jspa?rapidView=8&projectKey=TRAB&view=planning&selectedIssue=TRAB-29
    if (this.state.loading) return <Loading />;
    const skillList = this.state.skills.map(item => (
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
                subheader={ translate('skills_sub') }
              />


              <View style={globalStyles.spaceCnt}>
                { skillList }
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

export default WorkerSignUpSkill;
