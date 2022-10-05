import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import theme from '../../constants/theme'

const Loading = () => (
  <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', backgroundColor: theme.color === "dark" ? "#101719" : "#ffffff" }}>
    <ActivityIndicator size="large" color={ theme.primary } />
  </View>
);

export default Loading;
