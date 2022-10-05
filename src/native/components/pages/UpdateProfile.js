import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Content, Text, Body, ListItem, Form, Item, Label, Input, CheckBox, Button, View,
} from 'native-base';
import Messages from '../partials/Messages';
import Loading from '../partials/Loading';
import Header from '../partials/Header';
import Spacer from '../partials/Spacer';
import CategoryPicker from "../partials/CategoryPicker"
import {translate} from "../../../i18n"

class UpdateProfile extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    success: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    member: PropTypes.shape({
      fullName: PropTypes.string,
      username: PropTypes.string,
      phone: PropTypes.string,
      userSubtitle: PropTypes.string,
      email: PropTypes.string,
    }).isRequired,
  }

  static defaultProps = {
    error: null,
    success: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      fullName: props.member.fullName || '',
      username: props.member.username || '',
      phone: props.member.phone || '',
      userSubtitle: props.member.userSubtitle || '',
      email: props.member.email || '',
      password: '',
      password2: '',
      changeEmail: false,
      changePassword: false,
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
      .then(() => console.log('Profile Updated'))
      .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const { loading, error, success } = this.props;
    const {
      fullName,
      username,
      email,
      changeEmail,
      changePassword,
    } = this.state;

    // Loading
    if (loading) return <Loading />;

    return (
      <Container style={globalStyles.main}>
        <Content>
          <Header
            title="Update my profile"
            content="Thanks for keeping your account up to date!"
          />

          {error && <Messages message={error} />}
          {success && <Messages message={success} type="success" />}

          <Form>
            <Item stackedLabel>
              <Label>
                { translate( 'fname_label' ) }
              </Label>
              <Input
                value={fullName}
                onChangeText={v => this.handleChange('fullName', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>
                { translate( 'form_username' ) }
              </Label>
              <Input
                value={username}
                onChangeText={v => this.handleChange('username', v)}
              />
            </Item>

            <ListItem>
              <CheckBox
                checked={changeEmail}
                onPress={() => this.handleChange('changeEmail', !changeEmail)}
              />
              <Body>
                <Text>
                  Change Email
                </Text>
              </Body>
            </ListItem>

            {changeEmail
              && (
              <Item stackedLabel>
                <Label>
                  Email
                </Label>
                <Input
                  autoCapitalize="none"
                  value={email}
                  keyboardType="email-address"
                  onChangeText={v => this.handleChange('email', v)}
                />
              </Item>
              )
            }

            <ListItem>
              <CheckBox
                checked={changePassword}
                onPress={() => this.handleChange('changePassword', !changePassword)}
              />
              <Body>
                <Text>
                  Change Password
                </Text>
              </Body>
            </ListItem>

            {changePassword
              && (
              <View padder>
                <Item stackedLabel>
                  <Label>
                    Password
                  </Label>
                  <Input secureTextEntry onChangeText={v => this.handleChange('password', v)} />
                </Item>

                <Item stackedLabel last>
                  <Label>
                    Confirm Password
                  </Label>
                  <Input secureTextEntry onChangeText={v => this.handleChange('password2', v)} />
                </Item>
              </View>
              )
            }


            <Item stackedLabel>
              <Label>
                Your Sub Title
              </Label>
              <Input
                placeholder="say something to attract users"
                placeholderTextColor="#ccc"
                onChangeText={v => this.handleChange('userSubtitle', v)}
              />
            </Item>

            <CategoryPicker/>

            <Spacer size={20} />

            <Button block onPress={this.handleSubmit}>
              <Text>
                Update Profile
              </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default UpdateProfile;
