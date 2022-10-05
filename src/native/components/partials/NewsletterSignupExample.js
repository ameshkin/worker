import React, { Component }  from 'react';
import {
  Container, Content, Text, Row, Col, View, Item, Label, Input, Button,
} from 'native-base';
import MailchimpSubscribe from "react-mailchimp-subscribe"
import formStyles from '../../styles/forms'
import {Actions} from "react-native-router-flux"
import PropTypes from "prop-types"
import t from 'tcomb-form-native';

var Form = t.form.Form;

// here we are: define your domain model
var Person = t.struct({
  name: t.String,              // a required string
  surname: t.maybe(t.String),  // an optional string
  age: t.Number,               // a required number
  rememberMe: t.Boolean        // a boolean
});

// define a stylesheet (see lib/stylesheets/bootstrap for an example)
var stylesheet = {
    controlLabel: {
    normal: {
      color: '#ffffff',
      placeholderTextColor: '#ffffff'
    },
    // the style applied when a validation error occours
    error: {
      color: '#ff0000',
    }
  },

};

// override globally the default stylesheet
Form.stylesheet = stylesheet;



// var options = {}; // optional rendering options (see documentation)
// https://github.com/gcanti/tcomb-form-native#other-standard-options

var options = {
  auto: 'placeholders',
  fields: {

    name: {
      label: 'Insert your name',
      placeholder: 'Your placeholder here',
      error: 'Insert a valid email',
      placeholderTextColor: '#ffffff'
    },
    surname: {
     label: 'Insert your name',
      placeholder: 'Your placeholder here',
      error: 'Insert a valid email',
      placeholderTextColor: '#ffffff'
    },
  }
};

var value = {
  name: '',
  surname: 'Canti',
  age: 41,
  gender: 'M'
};


/*
const options = {
  i18n: {
    optional: ' (optional)',
    required: '',
    add: 'Add',   // add button
    remove: '✘',  // remove button
    up: '↑',      // move up button
    down: '↓'     // move down button
  }
};
 */


class NewsletterSignup extends React.Component {
  static propTypes = {
    member: PropTypes.shape({
      email: PropTypes.string,
    }),
    locale: PropTypes.string,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
    locale: null,
    member: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      email: (props.member && props.member.email) ? props.member.email : '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  }



  handleSubmit = () => {


    console.log('handleSubmit');
    console.log(this.props);

    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Person
    }




  }



  render() {
    const url =
      "https://sachagreif.us2.list-manage.com/subscribe/post?u=b1dc8411c707d733b79d8d2a7&id=5d822ac286";
    return (



      <View>

           <Form
          ref="form"
          value={value}
          type={Person}
          options={options}
        />



       <Button block
              style={formStyles.submitButton}
              onPress={this.handleSubmit}
              >
              <Text style={formStyles.submitButtonText}>
                STAY INFORMED
              </Text>
            </Button>
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
