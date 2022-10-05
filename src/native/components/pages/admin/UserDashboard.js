import React from 'react';
import {
  Container, Content, Text, Row, Col, View,
} from 'native-base';
import NewsletterSignup from '../../partials/NewsletterSignup'
import globalStyles from '../../../styles/global'
// import GooglePlace from './GooglePlace'
import Footer from '../../partials/Footer'
// import FindMyLocation from '../partials/FindMyLocation'  // seems broken
import FindMyLocation from '../../partials/GeoLocationGeocode'
import Spacer from '../../partials/Spacer';
import Header from "../../partials/Header"
import { translate } from "../../../../i18n"


const UserDashboard = ( ) => (



  <Container style={globalStyles.main}>
    <Content padder>
      <Row>
        <Col md={{ size: 6, offset: 3 }} lg={{ size: 12, offset: 3 }}>

          <Header
            subheader={ translate('your_location') }
          />

          <Spacer size={20} />

          <FindMyLocation />

          <Spacer size={20} />

          <View style={globalStyles.container}>
            <Text style={globalStyles.centerHeader}>
              { translate( 'newsletter_header' ) }
            </Text>
          </View>

          <Spacer size={10} />

          <NewsletterSignup />

        </Col>
      </Row>
    </Content>
    <Footer />
  </Container>
);

export default UserDashboard;
