import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import theme from '../constants/theme'

const formStyles = StyleSheet.create({
  inputItem: {
    marginBottom: 10
  },
  inputBox: {
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    marginTop: 0,
    width: '100%',
    borderBottomColor: theme.borderBottomColor,
    borderBottomWidth: 2,
  },
  inputLabel: {
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
  },
 submitButton: {
    backgroundColor: theme.borderBottomColor,
    padding: 10,
    margin: 15,
    height: 40,
 },
  submitButtonText:{
    color: 'white'
  },
  calmButton: {
    backgroundColor: theme.borderBottomColor,
    padding: 10,
    margin: 15,
    height: 40,
  },
  calmButtonText:{
    color: 'white'
  },
  button: {
    backgroundColor: theme.color === "dark" ? "#4A4C4E" : "#ffffff",
  },
  buttonText: {
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
  },
  oneLineItem: {
    marginBottom: 20
  },
  oneLineBox: {
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    marginTop: 0,
    width: '100%',
    borderBottomColor: theme.borderBottomColor,
    borderBottomWidth: 2,
    paddingBottom: 7
  },
  oneLineLabel: {
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,

  },
  checkCnt: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: 'transparent',
    borderWidth: 1
  },
  checkLabel: {
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    fontSize: 20,
    alignItems: "flex-start",
    textAlign: "left",
    flex: .99,
  },
  checkSettingsCnt: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0
  },
  checkSettingsLabel: {
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    fontSize: 14,
    alignItems: "flex-start",
    textAlign: "left",
    flex: 1,
  },
  checkBox: {
    flex: .01,
    justifyContent: 'flex-end'
  },
  fullPageBtn: {
    zIndex: 0,
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: "#e0324c",
    padding: 10,
    margin: 15,
    height: 40,
    zIndex: 0
  },
  saveButtonText: {
    color: "#fff"
  },
  pickerComp: {
    color: "#fff",
    paddingVertical: 2,
    backgroundColor: '#ccc',
    borderRadius: 0,
    justifyContent: 'flex-end',
    height: 35
  },
  checkSearchCnt: {
    //flex: 1,
    flexDirection: 'row',
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: 'transparent',
    borderWidth: 1,
    height: 45
  },
  checkSearchLabel: {
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    fontSize: 17,
    alignItems: "flex-start",
    textAlign: "left",
    flex: .99,
    fontWeight: '500',
  },
  dropDownCnt: { // react-native-material-dropdown style
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    fontSize: 17,
  },
  dropDownOverlay: { // react-native-material-dropdown style
    backgroundColor: theme.color === "dark" ? theme.darkBgColor: theme.lightBgColor,
  },
  dropDownPicker: { // react-native-material-dropdown style
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    backgroundColor: theme.color === "dark" ? theme.darkBgColor: theme.lightBgColor,
    fontSize: 17,
    alignItems: "flex-start",
    textAlign: "left",
    fontWeight: '500',
  },

});

export default formStyles;
