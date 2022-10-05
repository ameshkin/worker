import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Content, Form, Item, Label, Input, Text, Button, View, Icon
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from '../partials/Loading';
import Messages from '../partials/Messages';
import { translate } from '../../../i18n';
import Header from '../partials/Header';
import Spacer from '../partials/Spacer';
import globalStyles from "../../styles/global"
import formStyles from "../../styles/forms"


// TODO: this is actually the page you come to after signing up!!!


class Login extends React.Component {
  static propTypes = {
    member: PropTypes.shape({
      email: PropTypes.string,
    }),
    locale: PropTypes.string,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    errorMessage:  PropTypes.string,
    alert: PropTypes.bool,
    message: PropTypes.string,
    type: PropTypes.string,
  }

  static defaultProps = {
    locale: null,
    member: {},
  }

  /*

  LOGIN PAGE PROPS AFTER SIGN IN

  06 PM: LOGIN PAGE PROPS:  Object {
6:15:06 PM:   "alert": null,
6:15:06 PM:   "error": null,
6:15:06 PM:   "info": null,
6:15:06 PM:   "loading": false,
6:15:06 PM:   "locale": "en",
6:15:06 PM:   "member": Object {
6:15:06 PM:     "category": undefined,
6:15:06 PM:     "createdAt": undefined,
6:15:06 PM:     "displayName": "Amir Meshkin",
6:15:06 PM:     "email": "amir.meshkin@gmail.com",
6:15:06 PM:     "emailVerified": true,
6:15:06 PM:     "error": null,
6:15:06 PM:     "experience": undefined,
6:15:06 PM:     "headline": undefined,
6:15:06 PM:     "isworker": undefined,
6:15:06 PM:     "lastLoginAt": undefined,
6:15:06 PM:     "loading": false,
6:15:06 PM:     "phone": "+16156015827",
6:15:06 PM:     "photoURL": null,
6:15:06 PM:     "totalstars": undefined,
6:15:06 PM:     "uid": "CwUtnEXdmMhwzEd4eePlF4NpV5g2",
6:15:06 PM:     "verified": undefined,
6:15:06 PM:   },
6:15:06 PM:   "message": null,
6:15:06 PM:   "onFormSubmit": [Function anonymous],
6:15:06 PM:   "success": null,
6:15:06 PM:   "type": null,
6:15:06 PM: }




  M: LOGIN PAGE PROPS:  Object {
4:40:44 PM:   "alert": 1,
4:40:44 PM:   "error": null,
4:40:44 PM:   "errorMessage": null,
4:40:44 PM:   "info": null,
4:40:44 PM:   "loading": false,
4:40:44 PM:   "locale": "en",
4:40:44 PM:   "member": Object {
4:40:44 PM:     "error": null,
4:40:44 PM:     "loading": false,
4:40:44 PM:   },
4:40:44 PM:   "message": null,
4:40:44 PM:   "onFormSubmit": [Function anonymous],
4:40:44 PM:   "success": null,
4:40:44 PM:   "type": null,
4:40:44 PM: }
4:40:44 PM: LOGIN PAGE STATE:  Object {
4:40:44 PM:   "email": "",
4:40:44 PM:   "password": "",
4:40:44 PM: }
   */
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
    const { onFormSubmit } = this.props;
    onFormSubmit(this.state)
      .then(() => Actions.tabbar())
      .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const { loading, error, locale, alert, type, message } = this.props;
    const { email } = this.state;

    console.log("LOGIN PAGE PROPS: ", this.props);
    console.log("LOGIN PAGE STATE: ", this.state);
    if (loading) return <Loading />;

    return (
      <Container style={globalStyles.main}>
        <Content>
          <View padder>
            <Header
              subheader= { translate('new_user_sub') }
            />
            {error && <Messages message={error} />}
            {alert && <Messages message={ translate(message) } type={ type } />}
          </View>

          <Form>
            <Item stackedLabel style={formStyles.inputItem}>
              <Label style={formStyles.inputLabel}>
                { translate('email', locale) }
              </Label>
              <Input
                autoCapitalize="none"
                value={email}
                keyboardType="email-address"
                onChangeText={v => this.handleChange('email', v)}
                style={ formStyles.inputBox}
                errorStyle={{ color: 'red' }}
                errorMessage={ translate('email_error') }
                shake={true}
                leftIcon={
    <Icon
      name='user'
      size={24}
      color='white'
    />
  }
              />
            </Item>
            <Item stackedLabel style={formStyles.inputItem}>
              <Label style={formStyles.inputLabel}>
                {translate('password', locale)}
              </Label>
              <Input
                secureTextEntry
                onChangeText={v => this.handleChange('password', v)}
                style={ formStyles.inputBox }
              />
            </Item>

            <Spacer size={20} />

            <View padder>
              <Button block onPress={this.handleSubmit} style={ formStyles.submitButton }>
                <Text style={ formStyles.submitButtonText }>
                  { translate('login', locale) }
                </Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default Login;
