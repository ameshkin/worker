import React from 'react';
import {
  Container,
  Content,
  Text,
  Row,
  Col,
  View,
  Button,
  Icon,
  Form,
  Picker
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
// import DatePicker from 'react-native-datepicker'
// https://react-native-training.github.io/react-native-elements/docs/0.19.1/rating.html

const pickerStyle = {
  inputIOS: {
    color: 'white',
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    backgroundColor: '#ccc',
    borderRadius: 0
  },
  inputAndroid: {
    color: 'white',
  },
  placeholderColor: 'white',
  underline: { borderTopWidth: 0 },
  icon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 5,
    borderTopColor: '#00000099',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
    top: 20,
    right: 15,
  },
};

class WorkerSignUpComputerLanguages extends React.Component {

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

    let programming_languages = null

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

          let programming_languages = worker.worker.programming_languages;

          // console.log("worker.programming_languages: ", programming_languages);

          if(programming_languages)
          {

            console.log("YES programming_languages: ", programming_languages );
            this.setState({
              loading: false,
              //programming_languages: programming_languages,
              tagsSelected: programming_languages
            });

          } else {

            console.log("setting default computerLanguages: " );

            this.setState({
              loading: false,
              // skills: JSON.parse(computerLanguages)
              programming_languages: computerLanguagesDefault,
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
    this.yearList = this.yearList.bind(this);

  }

  handleDelete = index => {
    let tagsSelected = this.state.tagsSelected;
    console.log("going to deleete: ", index);
    tagsSelected.splice(index, 1);
    this.setState({ tagsSelected });
  }

  handleAddition = suggestion => {

    // TODO: find picker value here!!!

    // var firstused = this.refs.pickerInput;

   // console.log("handleAddition item: ",item);


    console.log("handleAddition running: ", suggestion);
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

  yearList = () => {

    let startYear = 1950

    var currentYear = new Date().getFullYear(), years = [];
    while ( startYear <= currentYear ) {
      years.push(startYear++);
    }

    // console.log("years: ", years);

    return years.map(item => (
      <Picker.Item label={ item } value={ item } />
    ));

  }

  // when years experience changes
  yearPickerChange = (data) => {


    console.log("yearPickerChange: ", data);

  }

  tagRender = (data) => {

    // console.log("tagRender: ", data);

    /*
    NO DATEPICKER. OVERKILL

        <DatePicker
              style={{width: 200}}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="2016-05-01"
              maxDate="2016-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                },
                placeholderText: {
                  color: "#ffffff"
                }
              }}
              onDateChange={(date) => {this.setState({date: date})}}
            />

    appearance: dateInput, disabled, dateTouchBody, dateIcon, placeholderText, dateText
ios select panel: datePickerCon, datePicker, btnConfirm, btnTextConfirm, btnCancel, btnTextCancel
     */



    let startYear = 1950
    var currentYear = new Date().getFullYear(), years = [];

    while ( startYear <= currentYear ) {
      years.push(startYear++);
    }

    // console.log("years.reverse(): ", years.reverse());
    var list = years.reverse().map(item => (
      <Picker.Item label={ item } value={ item } />
    ));

    console.log("data for render tag: ", data);
    const languageList = data.map(item => (

      <View style={ listStyles.touchableWrap }>

        <View style={ listStyles.flexFullRow }>

          <View style={ listStyles.flexColumn90}>

            <Text style={listStyles.tagButtonText}>
              { item.name }
            </Text>

            <View style={{flexDirection:"row"}}>
              <View style={{flex:1}}>
                <Text style={listStyles.tagButtonExp}>
                  First used in
                </Text>
              </View>
              <View style={{flex:1}}>

                <Picker
                  // ref={"drop" + item.slug }
                  ref= {(el) => { this.pickerInput = el; }}
                  mode="dropdown"
                  iosHeader="Selecione"
                  selectedValue={ item.firstused ? item.firstused : currentYear }  // if empty default to 2018
                  style={ formStyles.pickerComp }
                  onValueChange={() => this.yearPickerChange(item)}

                  // iosIcon={<IosIcon />}
                  // itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily:"Ebrima", fontSize:17 }}
                  itemTextStyle={{ fontSize: 18, color: '#000000' }}
                  //onPickerDone={(pickedValue) => {
                  //  this.setYearData(pickedValue)
                  //}}
                >
                  { list }
                </Picker>

              </View>
            </View>
          </View>

          <View style={ listStyles.flexColumn10}>
            <Icon onPress={() => this.handleDelete(item)}  name="trash" size={10} color='#ffffff' style={ listStyles.tagIcon } />
          </View>

        </View>
      </View>
    ));

    return (
      <List containerStyle={ listStyles.listCnt } >
        { languageList }
      </List>
    )

  }

  // save in firestore here on button click
  handleSubmit = () => {

    // handleDelete


    // Actions.pop({ "error": 1, "message": "sdfsdf" })


    // console.log("selected: ", this.state.tagsSelected );

    // TODO: need to save years too!

    let setWithOptions = saveWorkerFirestoreGeneric('worker', { "programming_languages": this.state.tagsSelected })
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
                subheader={ translate('cpu_language_sub') }
                content={ translate('cpu_language_content') }
              />

              <View style={listStyles.autocompleteContainer }>
                <AutoTags
                  suggestions={this.state.suggestions }
                  tagsSelected={this.state.tagsSelected }
                  handleAddition={ this.handleAddition }
                  handleDelete={this.handleDelete}
                  renderTags={ this.tagRender }
                  renderSuggestion={ this.renderSuggestion }
                  tagStyles={ listStyles.tagStyles }
                  placeholder={ translate('cpu_language_place') }
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

export default WorkerSignUpComputerLanguages;
