import React from 'react';
import {
  Col,
  Container, Content, Row, Text, View
} from 'native-base';
import Spacer from '../partials/Spacer';
import globalStyles from '../../styles/global'
import Accordion from 'react-native-collapsible/Accordion';
import CategoryItem from "../partials/CategoryItem"
import Footer from "../partials/Footer"
import Header from "../partials/Header"
import { translate } from "../../../i18n"
import Icon from 'react-native-vector-icons/FontAwesome';

//       <Icon name="search" size={10} color='#000000' />

// TODO: get this data from firebase and make it multilingual!!!
const sectionData = [
  {
    title: 'Does this APP cost money?',
    content: 'No but we require ADS to pay for servers and programmers.'
  },
  {
    title: 'Do I pay workers with the APP?',
    content: 'You will never have to enter your payment information into this app. All communication and payments are done between you and the worker. '
  },
  {
    title: 'When will this APP become available in my area?',
    content: 'We are working hard to add more cities in Bolivia as a test market.  And we will soon expand to all of South America. '
  },
  {
    title: 'Can I sign up as a worker in more than one category?',
    content: 'We want our APP to have high quality listings and because of this reason, we do not allow users to post in more than one category. '
  }
];

  _renderHeader = (section) => {
    return (
      <View style={globalStyles.AccordionViewHeader}>
        <Text style={globalStyles.accordionHeader}>{section.title}</Text>
      </View>
    );
  }

  _renderContent = (section) => {
    return (
      <View style={globalStyles.AccordionViewContent}>
        <Text style={globalStyles.accordionContent}>{section.content}</Text>
      </View>
    );
  }

const About = () => (

  <Container style={globalStyles.main}>
    <Content padder>
      <Row>
        <Col md={{ size: 6, offset: 3 }} lg={{ size: 12, offset: 3 }}>

          <Header
            subheader={ translate('about_sub') }
          />
      <Accordion
            sections={sectionData}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
        </Col>
      </Row>
    </Content>
    <Footer />
  </Container>
);

export default About;
