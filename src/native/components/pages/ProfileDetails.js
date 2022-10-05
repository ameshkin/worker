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
  Card,
  CardItem,
  Button,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../partials/Header';
import globalStyles from "../../styles/global"
import formStyles from "../../styles/forms"
import { translate } from "../../../i18n"
import theme from "../../constants/theme"
import Messages from "../partials/Messages"


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


const SetLanguageLink = () => (
  <ListItem icon style={globalStyles.profileLink} onPress={ Actions.setlanguage }>
    <Left>
      <Icon name="flag" size={ 27 } color={ theme.iconOrange } style={globalStyles.icon}  />
    </Left>
    <Body>
    <Text style={globalStyles.profileLinkText}>
      { translate('set_language' ) }
    </Text>
    </Body>
  </ListItem>
)

const SetSkillsLink = () => (
  <ListItem icon style={globalStyles.profileLink} onPress={ Actions.setskills }>
    <Left>
      <Icon name="address-card" size={ 27 } color={ theme.iconBlue } style={globalStyles.icon}  />
    </Left>
    <Body>
    <Text style={globalStyles.profileLinkText}>
      { translate('set_skills' ) }
    </Text>
    </Body>
  </ListItem>
)

const SetComputerLanguagesLink = () => (
  <ListItem icon style={globalStyles.profileLink} onPress={ Actions.setcpuskills }>
    <Left>
      <Icon name="code" size={ 27 } color={ theme.iconPurple } style={globalStyles.icon}  />
    </Left>
    <Body>
    <Text style={globalStyles.profileLinkText}>
      { translate('set_cpu_languages' ) }
    </Text>
    </Body>
  </ListItem>
)

const CertificationsLink = () => (
  <ListItem icon style={globalStyles.profileLink} onPress={ Actions.setcpuskills }>
    <Left>
      <Icon name="certificate" size={ 27 } color={ theme.iconGreen } style={globalStyles.icon}  />
    </Left>
    <Body>
    <Text style={globalStyles.profileLinkText}>
      { translate('set_certs' ) }
    </Text>
    </Body>
  </ListItem>
)

const DegreesLink = () => (
  <ListItem icon style={globalStyles.profileLink} onPress={ Actions.setcpuskills }>
    <Left>
      <Icon name="graduation-cap" size={ 27 } color={ theme.iconYellow } style={globalStyles.icon}  />
    </Left>
    <Body>
    <Text style={globalStyles.profileLinkText}>
      { translate('set_degrees' ) }
    </Text>
    </Body>
  </ListItem>
)


const ClearanceLink = () => (
  <ListItem icon style={globalStyles.profileLink} onPress={ Actions.setcpuskills }>
    <Left>
      <Icon name="eye-slash" size={ 27 } color={ theme.iconRed } style={globalStyles.icon}  />
    </Left>
    <Body>
    <Text style={globalStyles.profileLinkText}>
      { translate('set_clearance' ) }
    </Text>
    </Body>
  </ListItem>
)


const handleSubmit = () => { Actions.workersignup({ "error": 1, "message": "sdfsdf" }) } // TODO: send message back to Profile

const ProfileDetails = ({ member, logout, dashboarduser }) => (
  <Container style={globalStyles.main}>
    { console.log("state inside of profile details: ", this.state) }

    { console.log("PROPS inside of profile details: ", this.props) }
    <Content>
      <List>
        { // if logged in as a user
          (member && member.email)
          ? (
            <View>
              <Content>
                <Header
                  subheader={ translate('worker_details_profile_sub' ) }
                  content={ translate('worker_details_profile_cnt' ) }
                />
              </Content>

              {this.state.alert && <Messages message={this.state.message} type={this.state.type} />}


              <SetLanguageLink />

              <SetSkillsLink />

              <SetComputerLanguagesLink />

              <CertificationsLink />

              <DegreesLink />

              <ClearanceLink />


            </View>
          ) : ( // TODO: if not logged in, show basically an AD to try and get people to sign up
              <View>
                <Content>
                  <Header
                    subheader={ translate('profile_detals_sub2' ) }
                  />

                  <View style={ globalStyles.listHeader }>
                    <Text style={ globalStyles.listHeaderText } >
                        Sign Up as a Worker
                    </Text>
                  </View>

                  <Card>
                    <CardItem>
                      <Text style={globalStyles.customText}>
                        Signing up as a worker is completely free and always will be.  You won't have to pay anything to appear on our list of workers.  You can choose to publically show your email, phone number, or linkedin profile.
                      </Text>
                    </CardItem>
                  </Card>


                  <View style={ globalStyles.listHeader }>
                    <Text style={ globalStyles.listHeaderText } >
                      { translate( 'profile_details_header1' ) }
                    </Text>
                  </View>

                  <Card>
                    <CardItem>
                      <Text style={globalStyles.customText}>
                        Your data will never be sold.  But if you make your profile public, then companies and recruiters will be able to contact you.  We do not make your information available in any API or list to anyone.  And we will never send you emails unless you opt into our newsletter.
                      </Text>
                    </CardItem>
                  </Card>


                  <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>

                    <Button block
                            style={formStyles.submitButton}
                            onPress={() => handleSubmit()}
                    >
                      <Text style={formStyles.submitButtonText}>
                        Sign Up as a Worker
                      </Text>
                    </Button>

                  </View>
                </Content>
            </View>
          )
        }
      </List>

    </Content>
  </Container>
);

ProfileDetails.propTypes = {
  member: PropTypes.shape({}),
  logout: PropTypes.func.isRequired,  // log out link
  dashboarduser: PropTypes.func.isRequired, // user dashboard link
  // locale: PropTypes.string.isRequired,
};

ProfileDetails.defaultProps = {
  member: {},
};

export default ProfileDetails;
