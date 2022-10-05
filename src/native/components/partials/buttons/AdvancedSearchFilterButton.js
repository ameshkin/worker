import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Content, Text, H3, Button, View,
} from 'native-base';
import formStyles from "../../../styles/forms"
import {TouchableOpacity} from "react-native"
import {Actions} from "react-native-router-flux"



const onPress = ( item ) => {
  Actions.advancedsearch()
};


const AdvancedSearchFilterButton = ({ title }) => (

  <Button style={formStyles.calmButton}
          onPress={() => onPress()}
    // onPress={this.handleSubmit}
>
<Text style={ formStyles.calmButtonText }>
  { title }
</Text>
</Button>
);

AdvancedSearchFilterButton.propTypes = {
  title: PropTypes.string,
};

AdvancedSearchFilterButton.defaultProps = {
  title: 'filters',
};

export default AdvancedSearchFilterButton;
