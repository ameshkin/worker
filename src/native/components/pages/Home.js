import React from 'react';
import {
  Container, Content, Text, Row, Col, View,
} from 'native-base';
import NewsletterSignup from '../partials/NewsletterSignup'
import globalStyles from '../../styles/global'
// import GooglePlace from './GooglePlace'
import Footer from '../partials/Footer'
// import FindMyLocation from '../partials/FindMyLocation'  // seems broken
import FindMyLocation from '../partials/GeoLocationGeocode'
import SvgUri from 'react-native-svg-uri'

// TODO:  allow signup in app if or if not in bolivia

// TODO:  This needs to pull all data from firebase


// import { Actions } from 'react-native-router-flux'
//import Box from '../partials/Box';
import Spacer from '../partials/Spacer';
import Header from "../partials/Header"
import { translate } from "../../../i18n"
import listStyles from "../../styles/lists"
import {Image} from "react-native"

// console.log("this.props.locale: ", this.props.locale);

// <TouchableOpacity onPress={() => onPress(item)} style={{ flex: 1 }}>     </TouchableOpacity>
// const onPress = item => Actions.recipe({ match: { params: { id: String(item.id) } } });


// TODO: for now just use static data
const Home = ( props ) => (


  /*


  {
    console.log("locale: ", locale);
    console.log("this.props.locale: ", this.props.locale);

}

     <Spacer size={10} />
      <Row>
        <Col md={{ size: 6, offset: 3 }} lg={{ size: 12, offset: 3 }}>
          <View style={globalStyles.container}>
            <Text style={globalStyles.centerHeader}>
              Hello Santa Cruz Bolivia
            </Text>
          </View>

          <Spacer size={10} />

          <Text style={globalStyles.customText}>
            Trabajamos is only available in Santa Cruz but we plan to expand to all of South America.
          </Text>
        </Col>
      </Row>




            <SvgUri
              width={"200"}
              height={"43"}
              //source={{uri: ""}}
              source={require('../../svg/logo.svg')}
            />



   */

  <Container style={globalStyles.main}>
    <Content padder>
      <Row>
        <Col md={{ size: 6, offset: 3 }} lg={{ size: 12, offset: 3 }}>

          <View style={ globalStyles.center }>
            <Image source={require('../../svg/logo.png')} style={{ height: 44, width: 200 }} />
          </View>

          <Spacer size={20} />

          <View style={globalStyles.container}>
            <Text style={globalStyles.centerHeader}>
              { translate( 'newsletter_header' ) }
            </Text>
          </View>

          <Spacer size={10} />


        </Col>
      </Row>
    </Content>
    <Footer />
  </Container>
);

export default Home;
