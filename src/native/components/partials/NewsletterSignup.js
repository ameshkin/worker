import React from 'react';
import {
   Text, View, Button,
} from 'native-base';
import formStyles from '../../styles/forms'
import t from 'tcomb-form-native';
import {translate} from "../../../i18n"
var _ = require('lodash');
var v = require('tcomb-validation');

var Form = t.form.Form;

// clone the default stylesheet
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.textbox.normal.color = '#ffffff';
stylesheet.controlLabel.normal.color = '#ffffff';
stylesheet.controlLabel.error.color = '#ff0000';

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

const city_error = translate('city_error');
const city_label = translate('city_label');
const city_place = translate('city_place');

// console.log("fname_label: ", fname_label);


// define form model
var Person = t.struct({
  fname: t.String,
  email: EmailCheck,
  // email: t.String,
  city: t.maybe(t.String),
  // email: t.maybe(t.String),
  // email: EmailCheck,
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

    },
    email: {
      stylesheet: stylesheet,
      label: email_label,
      placeholder: email_place,
      error: email_error,
      placeholderTextColor: '#9C9C9C',
      color: '#ffffff',
    },
    city: {
      stylesheet: stylesheet,
      label: city_label,
      placeholder: city_place,
      error: city_error,
      placeholderTextColor: '#9C9C9C',
      color: '#ffffff',
    },
  },
};


class NewsletterSignup extends React.Component {

  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  componentDidMount = () => {
    // this.refs.form.getComponent('fname').refs.input.focus();  // focus on a field
  }

  handleSubmit = () => {



    // call getValue() to get the values of the form
    // var value = this.refs.form.getValue(); //TODO: not working, sometimes null
    // var value = this.refs.formref.value;

    var value = this.refs.formref.getValue();
    // var value = this.state;

    if(value) { // value is not values of form, but an object of the form after auto valildation
      console.log("value: ", value);

      //TODO: validationhere

      let data = {
        FNAME: value.fname,  // should also be displayName
        email: value.email,
        city: value.city
      }

      let url = 'https://hooks.zapier.com/hooks/catch/3347587/lo3jik/';

      let fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }
      fetch(url, fetchData)
        .then(function(response) {
          // console.log("res from zapier: ");
          // console.log(response);

          //TODO: remove box for this user, forever

        }).catch(function(e) {
        console.log("error...");
        console.error(e)
      });
    } else {
      // form not valid
      return null;
    }


    // NOT WORKING RIGHT
    // var validate = v.validate;
    /*
    null is not an object (evaluating 'value.fname')

handleSubmit
    NewsletterSignup.js:315:21


     */

    /*
    var check1 =  ( typeof(value.fname) !== 'undefined' && value.fname !== null)  ? false : true
    var check2 =  ( typeof(value.email) !== 'undefined' && value.email !== null)  ? false : true

    // first check for undefined and null
    if (check1)  // make sure full name is valid
    {

      if (check2) // make sure EMAIL is valid
      {

        // for each value?
        if(validate(value.fname, t.String).isValid()  && validate(value.email, t.String).isValid()) {
          console.log('everything is valid: ', value.fname);

          console.log("value: ", value);

          //TODO: validationhere

          let data = {
            FNAME: value.fname,
            email: value.email,
            city: value.city
          }

          let url = 'https://hooks.zapier.com/hooks/catch/3347587/lo3jik/';

          let fetchData = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }
          fetch(url, fetchData)
            .then(function(response) {
              // console.log("res from zapier: ");
              // console.log(response);

              //TODO: remove box for this user, forever

            }).catch(function(e) {
            console.log("error...");
            console.error(e)
          });

        }  else {
          console.log('not true: ', value.fname);
          return null;
        }
      }
    }
         */
  }


  render() {
    return (

      <View>

        <Form
          ref="formref"
          type={ Person }
          options={ options }
        />

        <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>

          <Button block
                  style={ formStyles.submitButton }
                  onPress={ this.handleSubmit }
          >
            <Text style={formStyles.submitButtonText}>
              { translate('newsletter_button') }
            </Text>
          </Button>

        </View>


      </View>

    );
  }
}


/* old form
            <Form>
            <Item stackedLabel style={ formStyles.inputItem }>
              <Label style={ formStyles.inputLabel }>
                Email Address
              </Label>
              <Input
                value=''
                style={ formStyles.inputBox }
                autoCapitalize='none'
                autoCorrect={false}
              />
            </Item>


              <Item stackedLabel style={ formStyles.inputItem }>
              <Label style={ formStyles.inputLabel }>
                City and Country
              </Label>
              <Input
                value=''
                style={ formStyles.inputBox }
              />
            </Item>

            <Button block
              style={formStyles.submitButton}
              onPress={this.handleSubmit}

            >
              <Text style={formStyles.submitButtonText}>
                STAY INFORMED
              </Text>
            </Button>
          </Form>

*/
export default NewsletterSignup;
