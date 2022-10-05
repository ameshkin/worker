import React from 'react';
import { Row, Col } from 'reactstrap';

const Footer = () => (
  <footer className="mt-5">
    <Row>
      <Col sm="6" className="text-right pt-3">
        <p>
          2018 Trabajamos
        </p>
      </Col>

      <Col sm="6" className="text-left pt-3">
        <p>
          Made in Bolivia
        </p>
      </Col>
    </Row>
  </footer>
);

export default Footer;
