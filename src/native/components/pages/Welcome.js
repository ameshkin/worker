import React from 'react';
import {
  Container, Content, Text, Row, Col, View,
} from 'native-base';
import NewsletterSignup from '../partials/NewsletterSignup'
import globalStyles from '../../styles/global'
import Footer from '../partials/Footer'

import Spacer from '../partials/Spacer';
import Header from "../partials/Header"
import { translate } from "../../../i18n"

// TODO: show welcome screen, try and push users to become "workers"
// TODO: explain features such as task history now that you're signed up
const Welcome = ( props ) => (

  <Container style={globalStyles.main}>
    <Content padder>
      <Row>
        <Col md={{ size: 6, offset: 3 }} lg={{ size: 12, offset: 3 }}>

          <Header
            subheader={ translate('your_location') }
          />

          <View style={globalStyles.container}>
            <Text style={globalStyles.centerHeader}>
              Welcome to Trabajamos
            </Text>
          </View>

          <View style={globalStyles.container}>
            <Text style={globalStyles.centerHeader}>
              { translate( 'newsletter_header' ) }
            </Text>
          </View>

        </Col>
      </Row>
    </Content>
    <Footer />
  </Container>
);

export default Welcome;
