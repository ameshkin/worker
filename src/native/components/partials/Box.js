import React from 'react';
import {
  Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button
} from 'reactstrap';

import { Image } from 'react-native';

/*
   <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />


const Box = () => (
  <Col md={{ size: 6, offset: 3 }}>
    <Card>
      <Image source={{ uri: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180' }} style={{ height: 100, width: null, flex: 1 }} />
    </Card>
  </Col>
);

*/

const Box = () => (
  <Col md={{ size: 6, offset: 3 }}>


    <Card>
      <Image source={{ uri: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180' }} style={{ height: 100, width: null, flex: 1 }} />

      <CardBody>
        <CardTitle>
          sdf
        </CardTitle>
        <CardText>
         sdfasf
        </CardText>

      </CardBody>
    </Card>
  </Col>
);

/*
// invariant violation h5
const Box = () => (
  <Col md={{ size: 6, offset: 3 }}>


    <Card>
      <Image source={{ uri: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180' }} style={{ height: 100, width: null, flex: 1 }} />

      <CardBody>
        <CardTitle>
          sdf
        </CardTitle>
        <CardText>
         sdfasf
        </CardText>

      </CardBody>
    </Card>
  </Col>
);
 */

export default Box;
