import React, { Component }  from 'react';
import {
  Container, Content, Text, Row, Col, View, Form, Item, Label, Input, Button,
} from 'native-base';
import MailchimpSubscribe from "react-mailchimp-subscribe"
import formStyles from '../../styles/forms'
import {Actions} from "react-native-router-flux"
import PropTypes from "prop-types"
var t = require('tcomb-form-native');

var Form = t.form.Form;

// here we are: define your domain model
var Person = t.struct({
  name: t.String,              // a required string
  surname: t.maybe(t.String),  // an optional string
  age: t.Number,               // a required number
  rememberMe: t.Boolean        // a boolean
});

var options = {}; // optional rendering options (see documentation)



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

    const value = this._form.getValue(); // use that ref to get the form value
    console.log('value: ', value);



  }



  render() {
    const url =
      "https://sachagreif.us2.list-manage.com/subscribe/post?u=b1dc8411c707d733b79d8d2a7&id=5d822ac286";
    return (



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


    );
  }
}

export default NewsletterSignup;
