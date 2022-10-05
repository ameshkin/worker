import React from 'react';
import PropTypes from 'prop-types';
import {
  FlatList, TouchableOpacity, RefreshControl, Image, StyleSheet, View, Picker,
} from 'react-native';
import {
  Container, Content, Card, CardItem, Body, Text, Button
} from 'native-base';
import RecipeView from "../../../web/components/Recipe"

/*

weight is h1, h2
 */

/*
const LocationPicker = ({ styles }) => (
  <View>
    <Text>
      Select Your Location
    </Text>
    <Picker
      style={{ width: "100%" }}
      mode="dropdown"
    >
      <Picker.Item label="Java" value="java" />
      <Picker.Item label="JavaScript" value="js" />
      <Picker.Item label="sdf" value="fsfsad" />
      <Picker.Item label="JavaSsdfsafdcript" value="sdff" />
    </Picker>
  </View>
);
*/

const LocationPicker = ({
                          style,
                          hasError,
                          title,
                          enabled,
                          selectedValue,
                          onValueChange,
                          items,
                          firstItem
                        }) => {
  if (!items || !Array.isArray(items)) return null

  const { container, errorContainer, errorText, pickerTitle, pickerItem } = styles

  return (
    <View style={[container, (hasError) ? errorContainer : null, style]}>
      <Text>
        Select Your Location
      </Text>
      <Picker
        style={styles}
        mode="dropdown"
        prompt="Options"
        selectedValue={this.state.location}
        onValueChange={this.handleChangeOption}
        defaultValue="Select a Location"
        title="City"
        enabled
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
        <Picker.Item label="sdf" value="fsfsad" />
        <Picker.Item label="JavaSsdfsafdcript" value="sdff" />
      </Picker>
    </View>
  )
}

/*
LocationPicker.propTypes = {
  styles: PropTypes.element.isRequired,
  location: PropTypes.string,
};


LocationPicker.defaultProps = {
  styles: null,
  location: '',
};
*/

// TODO: geolocation and google places
const location = 'Santa Cruz Bolivia';

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerTitle: {
    flex: 1,
    textAlign: 'right',
  },
  pickerItem: {
    flex: 2,
  },
  errorContainer: {
    backgroundColor: '#F8DEE0',
    borderColor: '#DD0426',
    borderWidth: 1,
  },
  errorText: {
    color: '#DD0426',
  },
});


export default LocationPicker;
