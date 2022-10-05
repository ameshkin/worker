// TODO: change default
import React from 'react';
import PropTypes from 'prop-types';
import { View, Picker } from 'react-native';
import { Text, H2 } from 'native-base';
import Spacer from './Spacer';
import globalStyles from '../../styles/global'

// import Headings from "./Headings"


// TODO:  wrappers for heading

// TODO: dropdown for geolocation and selection

/*
    <Text>
      <H2>
        {title}
      </H2>
    </Text>
 */

const Header = ({ title, content, weight, subheader, size   }) => (
  <View>
    <Spacer size={5} />
    <Text>
      <H2 style={globalStyles.centerHeader}>
        {subheader}
      </H2>
    </Text>
    {!!content && (
      <View>
        <Text style={globalStyles.centerHeaderContent}>
          {content}
        </Text>
      </View>
    )}
    <Spacer size={5} />
  </View>
);

Header.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  content: PropTypes.string,
  weight: PropTypes.string,
};

Header.defaultProps = {
  title: '',
  content: '',
  subheader: '',
  weight: null,
};

export default Header;
