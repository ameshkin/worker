import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'native-base';
import theme from '../../constants/theme';


const Messages = ({ message, type }) => (
  <View style={{
    backgroundColor: (type === 'error') ? theme.errorBg : (type === 'success') ? theme.successBg : theme.successBg,
    paddingVertical: 20,
    paddingHorizontal: 5,
    marginVertical: 25,

  }}
  >
    <Text style={{ color: (type === 'error') ? theme.errorMessage : (type === 'success') ? theme.successMessage : theme.successMessage, textAlign: 'center' }}>
      {message}
    </Text>
  </View>
);

Messages.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['error', 'success', 'info']),
};

Messages.defaultProps = {
  message: null,
  type: null,
};

export default Messages;
