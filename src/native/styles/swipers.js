import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import theme from '../constants/core'


const swiperStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#000000"
  },
  slide1: {
    flex: .8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
    paddingLeft:  30,
    paddingRight: 30,
  },
  body: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    paddingLeft:  30,
    paddingRight: 30,
  },
  swiperTitleCnt: {
    marginTop: 0,

  },
  swiperBodyCnt: {
    marginTop: 0,
  },
});

export default swiperStyles;


