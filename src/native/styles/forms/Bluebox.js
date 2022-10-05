import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import theme from '../../constants/theme'
import t from "tcomb-form-native"
var _ = require('lodash');
var Form = t.form.Form;

// clone the default stylesheet
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.controlLabel.normal.color = '#ffffff';
stylesheet.controlLabel.error.color = '#ff0000';

stylesheet.textbox.normal = {
  color: '#ffffff',
  fontSize: 17,
  height: 36,
  padding: 7,
  borderRadius: 0,
  borderColor: theme.primary, // <= relevant style here
  borderWidth: 1,
  marginBottom: 5
};

stylesheet.textbox.notEditable = {
  color: '#cccccc',
  fontSize: 17,
  height: 36,
  padding: 7,
  borderRadius: 0,
  borderColor: "#aaaeb9", // <= relevant style here
  borderWidth: 1,
  marginBottom: 5
};

stylesheet.textbox.error = {
  color: '#ffffff',
  fontSize: 17,
  height: 36,
  padding: 7,
  borderRadius: 0,
  borderColor: '#ff0000', // <= relevant style here
  borderWidth: 1,
  marginBottom: 5
};


stylesheet.pickerContainer.normal = {
  color: '#ffffff',
  marginTop: 10,
  marginBottom: 10,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 5,
  borderRadius: 0,
  borderColor: theme.primary,
  borderWidth: 1,
};

stylesheet.pickerContainer.error = {
  color: '#ffffff',
  marginBottom: 5,
  borderRadius: 0,
  borderColor: '#ff0000',
  borderWidth: 1
};

/* creates weird box
stylesheet.select.normal = {
  color: '#ffffff',
  fontSize: 17,
  height: 36,
  padding: 7,
  borderRadius: 0,
  borderColor: theme.primary, // <= relevant style here
  borderWidth: 1,
  marginBottom: 5
};
*/

// pickerContainer, pickerTouchable and pickerValue
stylesheet.pickerContainer.open = {
  color: '#ffffff',
  borderColor: '#a9a9bc',
};

stylesheet.pickerValue.normal = {
  color: '#ffffff',
};

stylesheet.pickerValue.open = {
  color: '#ffffff',
};


stylesheet.pickerValue.error = {
  color: '#ffffff',
};

stylesheet.pickerTouchable.normal = {
  color: '#ffffff',
  height: 30,
  flexDirection: "row",
  alignItems: "center"
};

stylesheet.pickerTouchable.error = {
  color: '#ffffff',
  height: 30,
  flexDirection: "row",
  alignItems: "center"
};

stylesheet.pickerTouchable.active = {
  color: '#ffffff',
};


stylesheet.pickerTouchable.open = {
  color: '#ffffff',
};

stylesheet.pickerTouchable.error = {
  color: '#ffffff',
};

// on off switch


/*
stylesheet.select.normal = {
  color: '#ffffff',
  marginBottom: 5,
  borderRadius: 0,
  borderColor: '#ff0000',
  borderWidth: 1
};

stylesheet.select.error = {
  color: '#ffffff',
  marginBottom: 5,
  borderRadius: 0,
  borderColor: '#ff0000',
  borderWidth: 1
};

stylesheet.select.open = {
  color: '#ffffff',
  borderColor: '#7cffe4',
};
*/

export default stylesheet;
