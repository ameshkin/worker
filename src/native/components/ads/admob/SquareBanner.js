import React, {Component} from "react"
import {
  View,
} from 'native-base';
import adStyles from "../../../styles/ads"
import { AdMobBanner } from "expo"


const SquareBanner = () => (

  <View style={adStyles.main}>
    <AdMobBanner
      adSize="mediumRectangle"
      adUnitID="ca-app-pub-2238175514602475/4220322281"
      testDevices={[AdMobBanner.simulatorId]}
      onAdFailedToLoad={error => console.error(error)}
    />

  </View>
);

export default SquareBanner;
