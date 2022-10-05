import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'native-base';

const Spacer = ({ size, border }) => (
  <View style={{ flex: 1, paddingTop: size, borderBottomWidth: border, borderBottomColor: '#d6d7da', paddingBottom: size }} />
);

Spacer.propTypes = {
  size: PropTypes.number,
  border: PropTypes.number,
};

Spacer.defaultProps = {
  size: 20,
  border: 0,
};

export default Spacer;
