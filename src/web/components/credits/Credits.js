import React from 'react';
import { Row, Col } from 'reactstrap';

// TODO:  get credits from firebase

// TODO: list credit use history



const About = () => (
  <div>
    <Row className="pt-5">
      <Col xs="12" md="4" className="pt-3 pt-md-0">
        <h3>Buy Credits</h3>
        <p>
          Click on the button below to buy more credits.
        </p>
        <p>
          <a href="/buy-credits" className="btn btn-primary">
            Buy Credits
          </a>
        </p>
      </Col>
    </Row>

    <Row className="pt-5">
      <Col xs="12" md="4" className="pt-3 pt-md-0">
        <h3>Credit History</h3>
        <p>
          Below is your credit history.
        </p>
        <p>
          history here
        </p>
      </Col>
    </Row>
  </div>
);

export default About;
