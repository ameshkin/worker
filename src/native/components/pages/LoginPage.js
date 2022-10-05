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

class Login extends React.Component {
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
    const { onFormSubmit } = this.props;
    onFormSubmit(this.state)
      .then(() => Actions.tabbar())
      .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const { loading, error, locale } = this.props;
    const { email } = this.state;

    if (loading) return <Loading />;

    return (
      <Container style={globalStyles.main}>
        <Content>
          <View padder>
            <Header
              // subheader="Welcome back" { translate('cat_listing_sub') }

              Login Page
              subheader= { translate('login_sub') }
            />

            {error && <Messages message={error} />}
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
