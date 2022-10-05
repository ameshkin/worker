import React from 'react';
import {
  View,
  Modal
} from "react-native"
import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Container,
  Content,
  Row,
  Text,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from '../partials/Loading';
// import Messages from '../partials/Messages';
import Header from '../partials/Header';
// import Spacer from '../partials/Spacer';
// import AlertModal from '../partials/AlertModal';
// import CategoryPicker from "../partials/CategoryPicker"  <CategoryPicker/>
import globalStyles from '../../styles/global'
import theme from "../../constants/theme"
import t from "tcomb-form-native"
import { translate } from "../../../i18n"
import formStyles from "../../styles/forms"
import modalStyles from "../../styles/modals"
import Messages from "../partials/Messages"
var _ = require('lodash');

// if logged in, this.props.member is filled, then we should not be on this page.

// register as a user, but not a WORKER first registeration form
var Form = t.form.Form;

// clone the default stylesheet
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.controlLabel.normal.color = '#ffffff';
stylesheet.controlLabel.error.color = '#ff0000';

stylesheet.textbox.normal = {
  color: '#ffffff',
  fontSize: 17,
  height: 36,
  padding: 7,
  borderRadius: 0,
  borderColor: theme.primary, // <= relevant style here
  borderWidth: 1,
  marginBottom: 5
};

stylesheet.textbox.error = {
  color: '#ffffff',
  fontSize: 17,
  height: 36,
  padding: 7,
  borderRadius: 0,
  borderColor: '#ff0000', // <= relevant style here
  borderWidth: 1,
  marginBottom: 5
};

// validate email
const EmailCheck = t.refinement(t.String, email => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
  return reg.test(email);
});

//  make forms multilingual
const fname_error = translate('fname_error');
const fname_label = translate('fname_label');
const fname_place = translate('fname_place');

const email_error = translate('email_error');
const email_label = translate('email_label');
const email_place = translate('email_place');

const pass_error = translate('pass_error');
const pass_label = translate('pass_label');
const pass_place = translate('pass_place');

const pass2_error = translate('pass2_error');
const pass2_label = translate('pass2_label');
const pass2_place = translate('pass2_place');

const phone_error = translate('phone_error');
const phone_label = translate('phone_label');
const phone_place = translate('phone_place');


// console.log("fname_label: ", fname_label);


/*
const SamePassword = t.refinement(t.String, (s) => {
  return s === this.state.value.password;
});
*/


// least amount of info needed to sign up
var User = t.struct({
  fname: t.String,
  email: EmailCheck,
  // phone: PhoneCheck, // TODO: optional phone needs to be validated to have a + in front, ALWAYS
  phone: t.maybe(t.Number), // need custom validation because PhoneCheck not working
  password: t.String,
  password2: t.String,
  // photoURL: req.param('email'), //TODO: PHASE II.  add pic support
  //password2: SamePassword, // probem with this in samePassword
  // password2: SamePassword,
  // displayname: t.String,  // username
});


// form options
var options = {
  // auto: 'placeholders',  // causes undefined gto show up
  i18n: {
    optional: '',
    required: ' *',
    add: 'Add',   // add button
    remove: '✘',  // remove button
    up: '↑',      // move up button
    down: '↓'     // move down button
  },
  fields: {
    fname: {
      stylesheet: stylesheet,
      placeholder: fname_place,
      error: fname_error,
      color: '#ffffff',
      placeholderTextColor: '#9c9c9c',
      label: fname_label,
      autoCapitalize: 'words'
    },
    email: {
      stylesheet: stylesheet,
      label: email_label,
      placeholder: email_place,
      error: email_error,
      placeholderTextColor: '#9C9C9C',
      color: '#ffffff',
      autoCapitalize: 'none' //FIXME: does not seem to be working on IOS
    },
    phone: { // TODO: phone number needs to be this format +1615
      stylesheet: stylesheet,
      label: phone_label,
      placeholder: phone_place,
      error: phone_error,
      placeholderTextColor: '#9C9C9C',
      color: '#ffffff',
      keyboardType: 'phone-pad'
    },
    password: {
      stylesheet: stylesheet,
      label: pass_label,
      placeholder: pass_place,
      error: pass_error,
      placeholderTextColor: '#9C9C9C',
      color: '#ffffff',
      password: true,
      secureTextEntry: true
    },
    password2: {
      stylesheet: stylesheet,
      label: pass2_label,
      placeholder: pass2_place,
      error: pass2_error,
      placeholderTextColor: '#9C9C9C',
      color: '#ffffff',
      password: true,
      secureTextEntry: true
    },
  },
};

/* only needed on worker form
    displayname: {
      stylesheet: stylesheet,
      label: phone,
      placeholder: phone,
      error: phone,
      placeholderTextColor: '#9C9C9C',
      color: '#ffffff',
    },
 */
class SignUpOLD extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      options: options,
      value: null,
      modalVisible: false,
      errorMessage: null
      // modalVisible: true,
    };

    // this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleErrorModal = this.handleErrorModal.bind(this);
    // this.SamePassword = SamePassword.bind(this);
  }

  handleSubmitOriginal = () => {
    const { onFormSubmit } = this.props;
    onFormSubmit(this.state)
      .then(() => Actions.login())
      .catch(e => console.log(`Error: ${e}`));
  }

  handleErrorModal = ( err ) => {

    console.log("error in handleErrorModal: ", err);


    switch( err.code ) {
      case 'auth/phone-number-already-exists':

        console.log("handleErrorModal error: phone-number-already-exist");
        this.setState(
          {
            modalVisible: true,
            firebaseError: err,
          });

        return true;
      case 'auth/internal-error':

        this.setState(
          {
            modalVisible: true,
            firebaseError: err,
          });
        return true;
      case 'auth/email-already-exists':

        this.setState(
          {
            modalVisible: true,
            firebaseError: err,
          });
        return true;

      default:
        console.log("default error: ", err.code );
        // don't always trigger error
        return false;

    }
  }

  /*
  handleChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  }
  */



  handleSubmit= () => {

    let newFormOptions = '';
    var value = this.refs.register.getValue();

    if(value) { // value is not values of form, but an object of the form after auto valildation
      //console.log("value: ", value);

      // this no longer AUTOMATICALLY works because we removed SamePassword check
      this.validate = this.refs.register.getValue();  console.log("this.validate: ", this.validate);

      // TODO: must manually validate the phone number
      console.log("phone: ", value.phone);


      // numbers have no length value, so must convert to string first

      let phoneLength = value.phone.toString().length;
      //allow null
      if(!phoneLength) {
        console.log("!phone true:  ", phoneLength);
        //return true;
      } else {

        if(phoneLength > 10 && phoneLength < 14) {
          console.log("phone length good");
          // check for all numbers
          const reg = /^\d+$/;
          if( reg.test(value.phone) ) {
            console.log("regex turn true: ", value.phone );
          } else {
            console.log("regex turn FALSE: ", value.phone );
            newFormOptions = this.state.options;
            newFormOptions.fields.phone.hasError = true;
            this.setState(
              {
                value: value,
                options: newFormOptions,  // only works if state is not set
              });

            return null;
          }

        } else {
          console.log("phone length NOT  good: ", phoneLength );
          console.log("false blah ");

          newFormOptions = this.state.options;
          newFormOptions.fields.phone.hasError = true;
          this.setState(
            {
              value: value,
              options: newFormOptions,  // only works if state is not set
            });

          return null;
        }
      }

      // first make sure both password fields are filled out and greater than 6 characters
      if(value.password !== null
        && value.password !== ""
        && value.password.length > 5
        && value.password2 !== null
        && value.password2 !== ""
        && value.password2.length > 5)
      {
        // console.log("both password fields are set ");

        // make sure password 1 and 2 match!
        if( value.password === value.password2 ) {
          console.log("both password MATCH! ");

          //TODO: validationhere
          // let newFormOptions = this.state.options;

          let data = {
            fname: value.fname,
            email: value.email,
            phone: value.phone,
            password: value.password
          }


          console.log("everything looks good, sending data: ", data);

          //TODO: should replace this with firestore redux



          if(response.error) {
            // validate response NOT FUCKING WORKING
            // let errorModal = this.handleErrorModal(response.error);
            // console.log("there is an ERROR in then response: ", errorModal);

            switch( response.error.code ) {
              case 'auth/phone-number-already-exists':

                console.log("error in then: phone-number-already-exist");
                this.setState(
                  {
                    errorMessage: response.error.message,
                    modalVisible: true,
                    firebaseError: response.error,
                  });

                return true;
              case 'auth/internal-error':

                this.setState(
                  {
                    errorMessage: response.error.message,
                    modalVisible: true,
                    firebaseError: response.error,
                  });
                return true;
              case 'auth/email-already-exists':

                this.setState(
                  {
                    errorMessage: response.error.message,
                    modalVisible: true,
                    firebaseError: response.error,
                  });
                return true;

              default:
                console.log("default error: ", response.error.code );
                // don't always trigger error
                return false;

            }

          } else {
            console.log("NO ERRORS IN RESPONSE, GOING TO NEXT PAGE: ");

            // Actions.welcome() // not working!!!
            Actions.login()
          }
        }

        /*

        // zapier can do other things when users are created.
        var url = 'http://localhost:8888/api/register'

        let fetchData = {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify( data ), // body data type must match "Content-Type" header
        }

        /* TODO: debug flag should be used to determine if we need ato actually upload data to firestore */
        fetch(url, fetchData )
          .then(res => res.json())
          .then((response) => {
            //.then(function(response) {  // this doesn't work without fat arrow

            console.log("response: ", response);
            if(response.error) {
              // validate response NOT FUCKING WORKING
              // let errorModal = this.handleErrorModal(response.error);
              // console.log("there is an ERROR in then response: ", errorModal);

              switch( response.error.code ) {
                case 'auth/phone-number-already-exists':

                  console.log("error in then: phone-number-already-exist");
                  this.setState(
                    {
                      errorMessage: response.error.message,
                      modalVisible: true,
                      firebaseError: response.error,
                    });

                  return true;
                case 'auth/internal-error':

                  this.setState(
                    {
                      errorMessage: response.error.message,
                      modalVisible: true,
                      firebaseError: response.error,
                    });
                  return true;
                case 'auth/email-already-exists':

                  this.setState(
                    {
                      errorMessage: response.error.message,
                      modalVisible: true,
                      firebaseError: response.error,
                    });
                  return true;

                default:
                  console.log("default error: ", response.error.code );
                  // don't always trigger error
                  return false;

              }

            } else {
              console.log("NO ERRORS IN RESPONSE, GOING TO NEXT PAGE: ");

              // Actions.welcome() // not working!!!
              Actions.login()
            }
          })
          .catch((err) => {
            console.log("error in catch: ", err);
            //TODO: catch error messages from firebase, but they don't always come back here
            // console.log("errorModal in CATCH response: ", errorModal);
            console.log("err: ", err.code);

            this.setState(
              {
                firebaseError: err,
                modalVisible: true,
                errorMessage: err.message,
              });

            return null;
          });




      } else {
        console.log("passwords DO NOT MATCH! ");

        //TODO: WTF SINCE OPTIONS NOT SETTING IF STATE SET, THEN NEED MANUAL ERROR MESSAGE

        newFormOptions = this.state.options;
        newFormOptions.fields.password2.hasError = true;
        this.setState(
          {
            value: value,
            options: newFormOptions,  // only works if state is not set
            modalVisible: true
          });

        return null;
      }
    } else {

      newFormOptions = this.state.options;
      newFormOptions.fields.password2.hasError = true;
      this.setState(
        {
          options: newFormOptions,  // only works if state is not set
          //value: this.state.value  // fields turn blank, but error is set!
          value: value  // stops fields from being blank on submit, BUT options don't work
        });
      console.log("password fields are null or less than 6: ");
      // form not valid
      return null;
    }
  }

  // form not valid
  // console.log("end form not valid");
  // return null;
}

/*

this.set state won't work


        <AlertModal
          data={ this.state.value }

        />

        // TODO: upgrade phone number picker with this https://github.com/thegamenicorus/react-native-phone-input

 */

render() {
  const { loading, error } = this.props;

  console.log("error in render render: ", error);
  if (loading) return <Loading />;

  return (
    <Container style={globalStyles.main}>
      <Content>


        <View style={ modalStyles.main }>
          <Modal
            animationType="slide"
            transparent={ false }
            visible={ this.state.modalVisible }
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={ modalStyles.inside }>
              <Row>
                <Col md={{ size: 6, offset: 3 }} lg={{ size: 12, offset: 3 }}>

                  <View style={{marginTop: 22}}>
                    <View>

                      <Text style={ modalStyles.modalHeader }>
                        { translate( 'modal1_h1' ) }
                      </Text>

                      {this.state.errorMessage && <Messages message={this.state.errorMessage} />}

                      <Text style={ modalStyles.modalSubHeader }>
                        { translate( 'modal1_h2' ) }
                      </Text>

                      <Text style={ modalStyles.modalText }>
                        { translate( 'modal1_h3' ) }
                      </Text>

                      <Text style={ modalStyles.modalSubHeader }>
                        { translate( 'modal1_h4' ) }
                      </Text>

                      <Text style={ modalStyles.modalText }>
                        { translate( 'modal1_h5' ) }
                      </Text>
                    </View>
                  </View>

                  <View style={{marginTop: 22}}>
                    <View>
                      <Button
                        onPress={() => {
                          this.setState({modalVisible: false});
                        }}
                        style={ modalStyles.button }
                      >
                        <Text
                          style={ modalStyles.buttonText }
                        >
                          { translate( 'modal1_button' ) }
                        </Text>
                      </Button>
                    </View>
                  </View>

                </Col>
              </Row>
            </View>
          </Modal>
        </View>
        <Header
          subheader={ translate('signup_sub') }
          // content="Create an account to rate workers and track tasks"
        />

        <Form
          ref="register"
          type={ User }
          // options={ options }
          options={ this.state.options }
          value={ this.state.value }
          // onChange={ this.handleChange }
        />

        <View style={ globalStyles.centerColumn }>

          <Button block
                  style={ formStyles.submitButton }
                  onPress={ this.handleSubmit }
          >
            <Text style={formStyles.submitButtonText}>
              { translate('newsletter_button') }
            </Text>
          </Button>

        </View>

      </Content>
    </Container>
  );
}


export default SignUpOLD;
