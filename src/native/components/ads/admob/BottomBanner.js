import React, {Component} from "react"
import {
  Content,
  ListItem, Text,
  View,
} from 'native-base';
import { AdMobBanner } from "expo"
import adStyles from "../../../styles/ads"
import core from '../../../constants/core'
import globalStyles from "../../../styles/global"
import Spacer from "../../partials/Spacer"


// TODO: only if core.ads = 1 should we show ads

/*


 */




console.log("ads: ",core.ads);

const BottomBanner = () => {

  if (core.ads) {
    return (
      <View>

        <View>
          <Spacer size={ 25 } />
        </View>

        <View style={adStyles.main}>


          <AdMobBanner
            adSize="banner"
            adUnitID="ca-app-pub-2238175514602475/4220322281"
            testDevices={[AdMobBanner.simulatorId]}
            onAdFailedToLoad={error => console.error(error)}
          />

        </View>

      </View>
    )

  }
  else {

    return (
      null

    )

  }

};

export default BottomBanner;
