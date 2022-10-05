import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View
} from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Body,
  Left,
  Text,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../partials/Header';
import globalStyles from "../../../styles/global"
import { translate } from "../../../../i18n"
import theme from "../../../constants/theme"
import Messages from "../../partials/Messages"

//TODO: PHASE II:  profile with responsive rows and columns to show dashboard boxes with links and other information


const SettingsGeneralLink = () => (
  <ListItem icon style={globalStyles.profileLink} onPress={ Actions.settings }>
    <Left>
      <Icon name="gear" size={ 27 } color={ theme.iconBlue } style={globalStyles.icon}  />
    </Left>
    <Body>
    <Text style={globalStyles.profileLinkText}>
      { translate('general_settings' ) }
    </Text>
    </Body>
  </ListItem>
)

const SettingsPrivacyLink = () => (
  <ListItem icon style={globalStyles.profileLink} onPress={ Actions.setlocation }>
    <Left>
      <Icon name="eye-slash" size={ 27 } color={ theme.iconBlue } style={globalStyles.icon}  />
    </Left>
    <Body>
    <Text style={globalStyles.profileLinkText}>
      { translate('privacy_settings' ) }
    </Text>
    </Body>
  </ListItem>
)

const PaymentLink = () => (
  <ListItem icon style={globalStyles.profileLink} onPress={ Actions.setlocation }>
    <Left>
      <Icon name="gear" size={ 27 } color={ theme.iconBlue } style={globalStyles.icon}  />
    </Left>
    <Body>
    <Text style={globalStyles.profileLinkText}>
      { translate('dollar_settings' ) }
    </Text>
    </Body>
  </ListItem>
)


const MiscLink = () => (
  <ListItem icon style={globalStyles.profileLink} onPress={ Actions.setlocation }>
    <Left>
      <Icon name="gear" size={ 27 } color={ theme.iconBlue } style={globalStyles.icon}  />
    </Left>
    <Body>
    <Text style={globalStyles.profileLinkText}>
      { translate('misc_settings' ) }
    </Text>
    </Body>
  </ListItem>
)

const SettingsPage = ({ member, logout, dashboarduser }) => (
  <Container style={globalStyles.main}>
    <Content>
      <List>
        { // if logged in as a user
          (member && member.email)
            ? (
              <View>
                <Content>
                  <Header
                    subheader={ translate('greeting' ) }
                    content={ translate('greeting_sub' ) + ` ${member.email}`}
                  />
                </Content>

                {this.state.alert && <Messages message={this.state.message} type={this.state.type} />}

                <SettingsGeneralLink />

                <SettingsPrivacyLink />


                <PaymentLink />

                <MiscLink />


              </View>
            )
            : (
              <View>
                <Content>
                  <Header
                    subheader={ translate('profile_sub') }
                  />
                </Content>


                <SettingsGeneralLink />

                <SettingsPrivacyLink />
\

                <PaymentLink />

                <MiscLink />


              </View>
            )
        }
      </List>

    </Content>
  </Container>
);


SettingsPage.propTypes = {
  member: PropTypes.shape({}),
  logout: PropTypes.func.isRequired,  // log out link
  dashboarduser: PropTypes.func.isRequired, // user dashboard link
  // locale: PropTypes.string.isRequired,
};

SettingsPage.defaultProps = {
  member: {},
};

export default SettingsPage;
