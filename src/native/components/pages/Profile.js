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
import Header from '../partials/Header';
import globalStyles from "../../styles/global"
import { translate } from "../../../i18n"
import theme from "../../constants/theme"
import Messages from "../partials/Messages"

//TODO: PHASE II:  profile with responsive rows and columns to show dashboard boxes with links and other information

// one component for ALL links
// not sure how to handle Actions which don't seem to work well
const GenericLink = ( icon, color, label, scene ) => (<ListItem icon style={globalStyles.profileLink} onPress={  Actions.jump(scene) }>
  <Left>
    <Icon name={ icon } size={ 27 } color={ color } style={globalStyles.icon}  />
  </Left>
  <Body>
  <Text style={globalStyles.profileLinkText}>
    { translate( label ) }
  </Text>
  </Body>
</ListItem>)


const UserDashboardLink = ( { dashboarduser } ) => (
  <ListItem
    icon
    style={globalStyles.profileLink}
    // onPress={ dashboarduser } // error above
    onPress={ dashboarduser }

  >
    <Left>
      <Icon name="user-plus" size={ 27 } color={  theme.iconOrange } style={globalStyles.icon}  />
    </Left>
    <Body>
      <Text style={globalStyles.profileLinkText}>
        { translate('user_dashboard' ) }
      </Text>
    </Body>
  </ListItem>
)

// TODO: do not use as of now, user dashboard should allow edits and this LINK may not be necessary
const ProfileDetailsLink = () => (
  <ListItem icon style={globalStyles.profileLink} onPress={ Actions.profiledetails }>
    <Left>
      <Icon name="user-plus" size={ 27 } color={ theme.iconPurple } style={globalStyles.icon}  />
    </Left>
    <Body>
    <Text style={globalStyles.profileLinkText}>
      { translate('profile_details_link' ) }
    </Text>
    </Body>
  </ListItem>
)

const LogOutLink = ({ logout }) => (
  <ListItem
    icon
            style={globalStyles.profileLink}
            onPress={ logout } //works here but not for user dashboard
  >
    <Left>
      <Icon name="sign-out" size={ 27 } color={ theme.iconRed  } style={globalStyles.icon}  />
    </Left>
    <Body>
      <Text style={globalStyles.profileLinkText}>
        { translate('logout' ) }
      </Text>
    </Body>
  </ListItem>
)

const SetLocationLink = () => (
  <ListItem icon style={globalStyles.profileLink} onPress={ Actions.setlocation }>
    <Left>
      <Icon name="map" size={ 27 } color={ theme.iconBlue } style={globalStyles.icon}  />
    </Left>
    <Body>
    <Text style={globalStyles.profileLinkText}>
      { translate('set_location' ) }
    </Text>
    </Body>
  </ListItem>
)

const SettingsPageLink = () => (
  <ListItem icon style={globalStyles.profileLink} onPress={ Actions.settings }>
    <Left>
      <Icon name="gear" size={ 27 } color={ theme.iconBlue } style={globalStyles.icon}  />
    </Left>
    <Body>
    <Text style={globalStyles.profileLinkText}>
      { translate('settings_profile' ) }
    </Text>
    </Body>
  </ListItem>
)

// links for non members
const LogInLink = () => (
  <ListItem icon style={globalStyles.profileLink} onPress={Actions.login}>
    <Left>
      <Icon name="sign-in" size={ 27 } color={ theme.iconOrange } style={globalStyles.icon}  />
    </Left>
    <Body>
    <Text style={globalStyles.profileLinkText}>
      { translate('login') }
    </Text>
    </Body>
  </ListItem>
  )

const Profile = ({ member, logout, dashboarduser }) => (
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

              <UserDashboardLink
                dashboarduser={ dashboarduser }
              />

              <SetLocationLink />

              {  // show this if member is also a worker (member.worker)  ? (<ProfileDetailsLink />) : (<SignUpWorkerLink/>)
                (member.worker)  ? (<SignUpWorkerLink />) : (<ProfileDetailsLink/>)
              }

              <SettingsPageLink />

              <LogOutLink
                logout={ logout }
              />

            </View>
          )
          : (
            <View>
              <Content>
                <Header
                  subheader={ translate('profile_sub') }
                />
              </Content>

              <LogInLink />

              <ListItem icon style={globalStyles.profileLink} onPress={Actions.signUp}>
                <Left>
                  <Icon name="user-plus" size={ 27 } color={ theme.iconPurple } style={globalStyles.icon}  />
                </Left>
                <Body>
                  <Text style={globalStyles.profileLinkText}>
                    { translate('register_user' ) }
                  </Text>
                </Body>
              </ListItem>

              <SetLocationLink />

              <ListItem icon style={globalStyles.profileLink} onPress={Actions.forgotPassword}>
                <Left>
                  <Icon name="key" size={ 27 } color={'#1ebd1e'} style={globalStyles.icon}  />
                </Left>
                <Body>
                  <Text style={globalStyles.profileLinkText}>
                    { translate('forgot_password' ) }
                  </Text>
                </Body>
              </ListItem>
            </View>
          )
        }
      </List>

    </Content>
  </Container>
);

Profile.propTypes = {
  member: PropTypes.shape({}),
  logout: PropTypes.func.isRequired,  // log out link
  dashboarduser: PropTypes.func.isRequired, // user dashboard link
  // locale: PropTypes.string.isRequired,
};

Profile.defaultProps = {
  member: {},
};

export default Profile;
