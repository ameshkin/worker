import React from 'react';
import {
  Text, View, Button, Container, Content,
} from 'native-base';
import formStyles from '../../../styles/forms'
import t from 'tcomb-form-native';
import globalStyles from "../../../styles/global"
import Header from "../../partials/Header"
var _ = require('lodash');
import Bluebox from "../../../styles/forms/Bluebox"
import theme from "../../../constants/theme"
import {translate} from "../../../../i18n"
import { Actions } from "react-native-router-flux"
import PropTypes from "prop-types"
import Messages from "../../partials/Messages"
import { saveFirestore } from "../../helpers/saveFirestore"
import {Firebase, FirebaseFirestore} from "../../../../lib/firebase"

// TODO: question marks or help icons open a MODAL with help info

var Form = t.form.Form;

// validate email
const EmailCheck = t.refinement(t.String, email => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
  return reg.test(email);
});

// TODO: get this from local store for now, but may need to put this into firestore at some point
var Categories = t.enums({
  handyman: 'Handyman',
  driver: 'Delivery Driver'
});


// here we are: define your domain model
// this page is where ALL user data is added and EDITED. both auth, and worker collection
var Worker = t.struct({
  // displayName: t.String,  // leave up to firebase
  // email: EmailCheck,  // leave up to firebase
  // phone: t.maybe(t.String), // from firebase
  headline: t.String,
  moreinfo: t.maybe(t.String),
  category: Categories,
  experience: t.Number,
  // username: t.String, // real names should be used to make the site more legit
  public: t.maybe(t.Boolean), // TODO: allow user to make their profile public or not
  // isworker: t.maybe(t.Boolean),
});

//  make forms multilingual
/*
const fname_error = translate('fname_error');
const fname_label = translate('fname_label');
const fname_place = translate('fname_place');

const email_error = translate('email_error');
const email_label = translate('email_label');
const worker_email_place = translate('worker_email_place');
*/

const headline_error = translate('headline_error');
const headline_label = translate('headline_label');
const headline_place = translate('headline_place');

const category_error = translate('category_error');
const category_label = translate('category_label');
const category_null = translate('category_null');

const exp_label = translate('exp_label');
const exp_error = translate('exp_error');
const exp_place = translate('exp_place');

const more_label = translate('more_information');
const more_error = translate('more_error');
const more_place = translate('more_place');

const phone_error = translate('phone_error');
const phone_label = translate('phone_label');
const phone_place = translate('phone_place');

const public_label = translate('public_label');

// form options
var options = {
  i18n: {
    optional: '',
    required: ' *',
    add: 'Add',   // add button
    remove: '✘',  // remove button
    up: '↑',      // move up button
    down: '↓'     // move down button
  },
  fields: {
    /*
displayName: {
  stylesheet: Bluebox,
  label: fname_label,
  placeholder: fname_place,
  error: fname_label,
  color: '#ffffff',
  placeholderTextColor: '#9c9c9c',
},
email: {
  stylesheet: Bluebox,
  label: email_label,
  placeholder: worker_email_place,
  error: email_error,
  placeholderTextColor: '#9C9C9C',
  color: '#ffffff',
  autoCapitalize: 'none',
  // editable: false // keep worker email seperate! login with one. get leads in another
},

phone: {
  stylesheet: Bluebox,
  label: phone_label,
  placeholder: phone_place,
  error: phone_error,
  placeholderTextColor: '#9C9C9C',
  color: '#ffffff',
  keyboardType: 'phone-pad'
},
 */
    headline: {
      stylesheet: Bluebox,
      label: headline_label,
      placeholder: headline_place,
      error: headline_error,
      placeholderTextColor: '#9C9C9C',
      color: '#ffffff',
    },
    category: {
      stylesheet: Bluebox,
      label: category_label,
      // placeholder: headline_place,
      error: category_error,
      placeholderTextColor: '#9C9C9C',
      color: '#ffffff',
      nullOption: {value: '', text: category_null },
      itemStyle: {
        color: '#ffffff',
      },
    },
    experience: { // TODO: phone number needs to be this format +1615
      stylesheet: Bluebox,
      label: exp_label,
      placeholder: exp_place,
      error: exp_error,
      placeholderTextColor: '#9C9C9C',
      color: '#ffffff',
      keyboardType: 'number-pad'
    },
    moreinfo: {
      label: more_label,
      placeholder: more_place,
      error: more_error,
      placeholderTextColor: '#9C9C9C',
      color: '#ffffff',
      maxLength: 100,
      multiline: true,
      stylesheet: {  // override and make height larger
        ...Form.stylesheet,
        textbox: {
          ...Form.stylesheet.textbox,
          normal: {
            ...Form.stylesheet.textbox.normal,
            height: 100,
            color: '#ffffff',
            fontSize: 17,
            padding: 7,
            borderRadius: 0,
            borderColor: theme.primary, // <= relevant style here
            borderWidth: 1,
            marginBottom: 5
          },
          error: {
            ...Form.stylesheet.textbox.error,
            height: 100,
            color: '#ffffff',
            fontSize: 17,
            padding: 7,
            borderRadius: 0,
            borderColor: '#ff0000', // <= relevant style here
            borderWidth: 1,
            marginBottom: 5
          }
        },
        controlLabel: {
          ...Form.stylesheet.controlLabel,
          normal: {
            ...Form.stylesheet.controlLabel.normal,
            color: '#ffffff',
          },
          error: {
            ...Form.stylesheet.controlLabel.error,
            color: '#ffffff',
          }
        }
      },
      numberOfLines: 5,
      autoCapitalize: 'sentences',
    },
    public: {
      stylesheet: Bluebox,
      label: public_label,
      color: '#ffffff',
    },
  },
};


class WorkerSignUp extends React.Component {
  static propTypes = {
    alert: PropTypes.bool,
    message: PropTypes.string,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onHandleSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
  }
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      worker: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleChange = this.handleChange .bind(this)

    //console.log("WorkerSignUp props: ", props);
  }


  componentWillMount = () => {

    // focuses on name field but this can be annoying
    // this.refs.form.getComponent('displayName').refs.input.focus();

    FirebaseFirestore.settings({ timestampsInSnapshots: true });

    var doc = FirebaseFirestore.collection('workers');
    const uid = Firebase.auth().currentUser.uid;

    var observer = doc.onSnapshot({includeMetadataChanges: true},snapshot => {

      snapshot.docChanges().forEach(changes => {  // binds this

        if (changes.doc.id === uid) {
          let worker = changes.doc.data();
          // if there are pending writes, DO NOT SET STATE!!!
          if(!changes.doc.metadata.hasPendingWrites) {
            //console.log("we got a change on THIS guy AND THERE ARE NO WRITES!!!!: ", changes.doc.metadata.hasPendingWrites);
            this.setState({
              loading: false,
              worker: worker.worker
            });
          }
        }
      });
    });
  }

  /* not needed
  // bind on change
  handleChange = (value) => {
    this.setState({
      worker: value
    });
  }
  */

  handleSubmit = () => {

    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      // console.log(value); // value here is an instance of Worker


      let data = {
        worker: {
          //displayName: value.displayName,
          // email: value.email,
          headline: value.headline,
          category: value.category,
          moreinfo: value.moreinfo,
          experience: value.experience,
          public: value.public,
          isworker: 1, // hard code this in
        }
      }

      /* TODO:  NOTHING FUCKING WORKS CAN'T GO TO NEXT PAGE! */


      FirebaseFirestore.settings({ timestampsInSnapshots: true });

      let setWithOptions = saveFirestore('workers', data)
        .then(() => setTimeout(function(){ Actions.pop() }, 10) )
        .catch((err) => {
          console.log(`Error: ${err}`);
        });

      return setWithOptions;
    }
  }

  render() {
    const { alert, loading, error } = this.props;
    return (
      <Container style={globalStyles.main}>
        <Content>
          <Header
            subheader={ translate('workersignup_sub') }
            content={ translate('workersignup_content') }
          />

          { alert && <Messages message={ message } type={ type } />}

          <View style={{ flexGrow: 1}}>

            <Form
              ref="form"
              type={ Worker }
              options={ options }
              // value={ this.props.member }
              value={ this.state.worker }
              // onChange={ this.handleChange }
            />

            <View>

              <Button block
                      style={formStyles.submitButton}
                      onPress={this.handleSubmit}
              >
                <Text style={formStyles.submitButtonText}>
                  submit
                </Text>
              </Button>

            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default WorkerSignUp;
