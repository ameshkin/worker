// NOT USING
import React from 'react';
import {
  Container,
  Content,
  Text,
  Row,
  Col,
  View,
  Button,
  Icon, Form
} from 'native-base';
import globalStyles from '../../../styles/global'
import Footer from '../../partials/Footer'
import { Actions } from 'react-native-router-flux'
import Header from "../../partials/Header"
import Loading from '../../partials/Loading';
import { translate } from "../../../../i18n"
import { CheckBox } from 'react-native-elements'
// import listStyles from "../../../styles/forms"
import { FirebaseFirestore, Firebase } from '../../../../lib/firebase'
import { saveWorkerFirestoreGeneric } from '../../helpers/saveWorkerFirestoreGeneric'
import computerLanguagesDefault from '../../../static/computer-languages.json'
import AutoTags from 'react-native-tag-autocomplete';
import {Image, TouchableOpacity} from "react-native"
import { List, ListItem } from 'react-native-elements'
import listStyles from "../../../styles/lists"
import formStyles from '../../../styles/forms'

class WorkerSignUpComputerPrograms extends React.Component {

  constructor(props) {
    super(props);


    // tagsSelected from firestore


    this.state = {
      loading: true,
      //suggestions : [ {name:'Mickey Mouse'}, ],
      suggestions : computerLanguagesDefault,
      tagsSelected : []
    };

    const settings = { timestampsInSnapshots: true };

    let programming_programs = null

    // TODO: security here
    FirebaseFirestore.settings(settings);
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

        if( changes.doc.id === uid ) {

          console.log("change for this user only: ", changes.doc.id );

          let worker = changes.doc.data();

          let programming_programs = worker.worker.programming_programs;

          // console.log("worker.programming_programs: ", programming_programs);

          if(programming_programs)
          {

            console.log("YES programming_programs: ", programming_programs );
            this.setState({
              loading: false,
              //programming_programs: programming_programs,
              tagsSelected: programming_programs
            });

          } else {

            console.log("setting default computerLanguages: " );

            this.setState({
              loading: false,
              // skills: JSON.parse(computerLanguages)
              programming_programs: computerLanguagesDefault,
            });
          }
        }
      });
    }, err => {
      console.log(`Encountered error: ${err}`);
    });

    // this.handleRemove  = this.handleRemove.bind(this);
    this.handleSubmit  = this.handleSubmit.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
  }

  handleDelete = index => {

    let tagsSelected = this.state.tagsSelected;
    tagsSelected.splice(index, 1);
    this.setState({ tagsSelected });
  }

  handleAddition = suggestion => {

    this.setState(
      {
        tagsSelected: this.state.tagsSelected.concat([suggestion])
      }
      );
  }

  renderSuggestion = (data) => {

    return (
      <View style={ listStyles.tagSuggestionList }>

        <Text style={listStyles.tagSuggestionListText}>
          { data.name }
        </Text>

      </View>
    )
  }

  tagRender = (data) => {

    // console.log("tagRender: ", data);
    const languageList = data.map(item => (

      <TouchableOpacity onPress={() => this.handleDelete(item)} style={ listStyles.touchableWrap }>

        <View style={ listStyles.flexFullRow }>

          <View style={ listStyles.flexColumn90}>
            <Text style={listStyles.tagButtonText}>
              { item.name }
            </Text>

          </View>

          <View style={ listStyles.flexColumn10}>
            <Icon name="trash" size={10} color='#ffffff' style={ listStyles.tagIcon } />
          </View>

        </View>


      </TouchableOpacity>
    ));

    return (
      <List containerStyle={ listStyles.listCnt } >
        { languageList }
      </List>
    )
  }

  // save in firestore here on button click
  handleSubmit = () => {


    let setWithOptions = saveWorkerFirestoreGeneric('worker', { "programming_programs": this.state.tagsSelected })
      .then((response) => {
        Actions.pop({ "error": 1, "message": "sdfsdf" })
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });

    return setWithOptions;



  }

  render() {
    // const {  error, locale } = this.props;

    // TODO: add icons to the left of the words
    // https://pamcms.atlassian.net/secure/RapidBoard.jspa?rapidView=8&projectKey=TRAB&view=planning&selectedIssue=TRAB-29
    if (this.state.loading) return <Loading />;

    return (
      <Container style={globalStyles.main}>
        <Content padder>
          <Row>
            <Col md={{ size: 6, offset: 3 }} lg={{ size: 12, offset: 3 }}>

              <Header
                subheader={ translate('cpu_programs_sub') }
              />

              <View style={listStyles.autocompleteContainer }>
                <AutoTags
                  suggestions={this.state.suggestions }
                  tagsSelected={this.state.tagsSelected }
                  handleAddition={this.handleAddition}
                  handleDelete={this.handleDelete}
                  renderTags={ this.tagRender }
                  renderSuggestion={ this.renderSuggestion }
                  tagStyles={ listStyles.tagStyles }
                  placeholder={ translate('cpu_programs_place') }
                  tagsOrientedBelow={ true }
                />
              </View>

            </Col>
          </Row>

          {
            // TODO: bug with zindex
          }
          <View style={ formStyles.fullPageBtn}>

            <Button block
                    style={formStyles.saveButton}
                    onPress={this.handleSubmit}
            >
              <Text style={formStyles.saveButtonText}>
                SAVE
              </Text>
            </Button>
          </View>

        </Content>





        <Footer />
      </Container>
    );
  }
}

export default WorkerSignUpComputerPrograms;
