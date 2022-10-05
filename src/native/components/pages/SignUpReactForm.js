import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Content, Text, Form, Item, Label, Input, Button,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from '../partials/Loading';
import Messages from '../partials/Messages';
import Header from '../partials/Header';
import Spacer from '../partials/Spacer';
// import CategoryPicker from "../partials/CategoryPicker"  <CategoryPicker/>
import globalStyles from '../../styles/global'
import {View} from "react-native"
import formStyles from "../../styles/forms"
// var admin = require('firebase-admin');


// import admin from 'firebase-admin';
// import * as admin from 'firebase-admin';

/*
Metro Bundler has encountered an internal error, please check your terminal error output for more details

ABI30_0_0RCTFatal
__37-[ABI30_0_0RCTCxxBridge handleError:]_block_invoke
_dispatch_call_block_and_release
_dispatch_client_callout
_dispatch_main_queue_callback_4CF
__CFRUNLOOP_IS_SERVICING_THE_MAIN_DISPATCH_QUEUE__
__CFRunLoopRun
CFRunLoopRunSpecific
GSEventRunModal
UIApplicationMain
main
start

 */
class SignUpReactForm extends React.Component {
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
      fullName: '',
      username: '',
      email: '',
      phone: '',
      userSubtitle: '',
      password: '',
      password2: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  }

  handleSubmitOriginal = () => {
    const { onFormSubmit } = this.props;
    onFormSubmit(this.state)
      .then(() => Actions.login())
      .catch(e => console.log(`Error: ${e}`));
  }

  //TODO: send data t zapier, then to firebase!!!

  //TODO: how to handle validatin withut the form plugin i used
  handleSubmit= () => {

    console.log("SignUpReactForm handleSubmit: ", this.state);



    var url = 'http://localhost:8888/api/register'

    let fetchData = {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify( this.state ), // body data type must match "Content-Type" header
    }


    // TODO: handle regular form submit to firestore

    fetch(url, fetchData )
      .then(res => res.json())
      .then(function(response) {

        console.log("response: ", response);

        // TODO: action to go to a welcome page?

      })
      .catch((err) => {
        console.log(" GeoBlah geocode error: ");
        console.error(err.message);
      });

  }


  render() {
    const { loading, error } = this.props;

    if (loading) return <Loading />;

    return (
      <Container style={globalStyles.main}>
        <Content>
          <Header
            subheader="Create an account to rate workers and track tasks"
          />

          {error && <Messages message={error} />}

          <Form>
            <Item style={globalStyles.inputItem} stackedLabel>
              <Label style={globalStyles.inputLabel}>
                Full Name
              </Label>
              <Input style={globalStyles.inputBox} onChangeText={v => this.handleChange('fullName', v)} />
            </Item>

            <Item style={globalStyles.inputItem} stackedLabel>
              <Label style={globalStyles.inputLabel}>
                Username
              </Label>
              <Input
                style={globalStyles.inputBox}
                placeholder="no spaces or special characters"
                placeholderTextColor="#ccc"
                onChangeText={v => this.handleChange('username', v)} />
            </Item>


            <Item style={globalStyles.inputItem} stackedLabel>
              <Label style={globalStyles.inputLabel}>
                Your Sub Title
              </Label>
              <Input
                style={globalStyles.inputBox}
                placeholder="say something to attract users"
                placeholderTextColor="#ccc"
                onChangeText={v => this.handleChange('userSubtitle', v)}
              />
            </Item>

            <Item style={globalStyles.inputItem} stackedLabel>
              <Label style={globalStyles.inputLabel}>
                Email
              </Label>
              <Input
                style={globalStyles.inputBox}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={v => this.handleChange('email', v)}
              />
            </Item>

            <Item style={globalStyles.inputItem} stackedLabel>
              <Label style={globalStyles.inputLabel}>
                Phone Number
              </Label>
              <Input
                style={globalStyles.inputBox}
                autoCapitalize="none"
                keyboardType="phone-pad"
                placeholder="with country code and area code"
                placeholderTextColor="#ccc"
                onChangeText={v => this.handleChange('phone', v)}
              />
            </Item>


            <Item style={globalStyles.inputItem} stackedLabel>
              <Label style={globalStyles.inputLabel}>
                Password
              </Label>
              <Input style={globalStyles.inputBox} secureTextEntry onChangeText={v => this.handleChange('password', v)} />
            </Item>

            <Item style={globalStyles.inputItem} stackedLabel>
              <Label style={globalStyles.inputLabel}>
                Confirm Password
              </Label>
              <Input style={globalStyles.inputBox} secureTextEntry onChangeText={v => this.handleChange('password2', v)} />
            </Item>

            <Spacer size={20} />



            <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>

              <Button block
                      style={formStyles.submitButton}
                      onPress={this.handleSubmit}
              >
                <Text style={formStyles.submitButtonText}>
                  Register as a User
                </Text>
              </Button>

            </View>


          </Form>
        </Content>
      </Container>
    );
  }
}

export default SignUpReactForm;
