import React from 'react';
import {
  Container, Content, Text, H1, H2, H3, Row, Col
} from 'native-base';
// import { Actions } from 'react-native-router-flux';
import {
  Image,
} from 'react-native';

// TODO:  use geolocation and give warning if not in bolivia

// TODO:  allow signup in app if or if not in bolivia


// import { Actions } from 'react-native-router-flux'

import Box from '../partials/Box';
import Spacer from '../partials/Spacer';


// <TouchableOpacity onPress={() => onPress(item)} style={{ flex: 1 }}>     </TouchableOpacity>
// const onPress = item => Actions.recipe({ match: { params: { id: String(item.id) } } });

// TODO: for now just use static data
const Home = () => (


  <Container style={globalStyles.main}>
    <Content>
      <Spacer size={10} />

      <Row>
        <Col md={{ size: 6, offset: 3 }} lg={{ size: 12, offset: 3 }}>

          <H1>Handyman</H1>

          <Image source={{ uri: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180' }} style={{ height: 100, width: null, flex: 1 }} />

          <Text>
            blah bhall
          </Text>
        </Col>

      </Row>

      <Spacer size={20} border={1} />

      <Spacer size={10} />

      <Row>
        <Col md={{ size: 6, offset: 3 }} lg={{ size: 12, offset: 3 }}>

          <H1>
            Handyman
          </H1>
          <Image source={{ uri: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180' }} style={{ height: 100, width: null, flex: 1 }} />

          <Text>
            blah bhall
          </Text>
        </Col>

      </Row>
    </Content>
  </Container>
);

export default Home;
