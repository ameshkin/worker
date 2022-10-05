import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import theme from '../constants/theme'


const modalStyles = StyleSheet.create({
  main: {
    backgroundColor: "#000000",
  },
  inside: {
    // backgroundColor: theme.color === "dark" ? "#101719" : "#ffffff",
    backgroundColor: "rgba(0,0,0,.9)",
    paddingTop: 10,
    paddingLeft:  20,
    paddingRight: 20,
    height: '100%',
    display: 'flex',
    flex: 1
  },
  modalHeader: {
    //color: theme.color === "dark" ? theme.darkBgColor: theme.lightBgColor,
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    // color: '#ffffff',
    fontWeight: '800',
    textAlign: 'center',
    fontSize: 24,
    marginTop: 30,
    marginBottom: 10,
    width: '100%',
  },
  modalSubHeader: {
    // color: theme.color === "dark" ? theme.darkBgColor: theme.lightBgColor,
    color: theme.primary,
    // color: '#ffffff',
    fontWeight: '500',
    textAlign: "left",
    fontSize: 20,
    marginTop: 20,
    width: '100%',
  },
  modalText: {
    // color: theme.color === "dark" ? theme.darkBgColor: theme.lightBgColor,
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    // color: '#ffffff',
    fontWeight: '400',
    textAlign: "left",
    fontSize: 14,
    marginTop: 20,
    width: '100%'
  },
  button: {
    backgroundColor: theme.primary,
    marginTop: 2,
    height: 50,
    borderRadius: 0
  },
  buttonText: {
    color: theme.color === "dark" ? theme.lightBgColor: theme.darkBgColor,
    fontWeight: '800',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 0,
    width: '100%',
  },




});

export default modalStyles;
