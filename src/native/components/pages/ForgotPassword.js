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
import { translate } from "../../../i18n"
import globalStyles from "../../styles/global"
import formStyles from "../../styles/forms"

class ForgotPassword extends React.Component {
  static propTypes = {
    member: PropTypes.shape({
      email: PropTypes.string,
    }),
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
    member: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      email: (props.member && props.member.email) ? props.member.email : '',
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
      .then(() => Actions.login())
      .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const { loading, error } = this.props;
    const { email } = this.state;

    // Loading
    if (loading) return <Loading />;

    return (
      <Container style={globalStyles.main}>
        <Content>
          <Header
            subheader={ translate('forgot_sub') }
            content={ translate('forgot_content') }
          />
          { error && <Messages message={ error } type={"error"} />}
          <Form>

            <Item style={globalStyles.inputItem} stackedLabel>
              <Label style={globalStyles.inputLabel}>
                Your Email
              </Label>
              <Input
                autoCapitalize="none"
                value={email}
                style={globalStyles.inputBox}
                placeholderTextColor="#ccc"
                keyboardType="email-address"
                onChangeText={v => this.handleChange('email', v)} />
            </Item>

            <Spacer size={20} />

            <Button block
                    style={formStyles.submitButton}
                    onPress={this.handleSubmit}
            >
              <Text style={formStyles.submitButtonText}>
                Reset Password
              </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default ForgotPassword;
