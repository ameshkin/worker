import React, {Component} from "react"
import {
  Button, Card, CardItem, ListItem,
  View,
} from 'native-base';
import { AdMobInterstitial } from "expo"
import { Text } from "react-native"
import formStyles from "../../../styles/forms"
import core from "../../../constants/core"
import globalStyles from "../../../styles/global"
import Icon from "react-native-vector-icons/FontAwesome"



const ShowAd = ( workerid ) => {

  handleReward = ( workerid ) => {

    console.log("workerid: ", workerid);

    /* TODO: reward not working */
    /*
    showRewardAd(10)
      .then(result => afterTwoSeconds(result))
      .catch(e => console.error(e))

    async function showRewardAd() {
      return AdMobRewarded.setAdUnitID('ca-app-pub-2238175514602475/4427032382');
    }

    function afterTwoSeconds(result) {
      console.log("result: ",result);
      return new Promise(resolve => {
        AdMobRewarded.requestAd()
          .then(() => AdMobRewarded.showAd()
            .catch(e => console.error(e)));
      });
    }
    */


    /* AdMobInterstitial */
    AdMobInterstitial.setAdUnitID('ca-app-pub-2238175514602475/7650309132');
    AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());



    //TODO: after ad, show contact information from firebase!


    // videoCompleted

    // adClosed

  }

  handleEmail = ( workerid ) => {


    console.log("handleEmail: ", workerid);


    console.log("handleEmail");


  }


  handleCall = ( workerid ) => {


    console.log("handleCall: ", workerid);


    console.log("handleCall");



    // videoCompleted

    // adClosed

  }

  // TODO:  if this contact has been viewed again, for THIS USER, then do not show button
  if (core.ads) {
    return (

      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>

        <Button block
                style={formStyles.submitButton}
                onPress={()=> { this.handleReward( workerid ) }}
        >
          <Text style={formStyles.submitButtonText}>
            Get Contact Info
          </Text>
        </Button>

      </View>
    )

  }
  else {

    return (

      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>

          <Button block
                  style={globalStyles.listButton}
                  onPress={()=> { this.handleCall( workerid ) }}
          >
            <Icon name="whatsapp" size={ 30 } style={globalStyles.icon} color={ "#28A61B" }  />

            <Text style={globalStyles.listButtonText}>
              616.601.5827
            </Text>
          </Button>

          <Button block
                  style={globalStyles.listButton}
                  onPress={()=> { this.handleEmail( workerid ) }}
          >
            <Icon name="envelope-o" size={ 25 } style={ globalStyles.icon } color={ "#cccccc" }  />

            <Text style={globalStyles.listButtonText}>
              amir.meshkin@gmail.com
            </Text>

          </Button>

      </View>
    )
  }
};



class RewardContactBanner extends Component {

  constructor(props) {
    super(props);
  }



  render() {
    return (

      // show contact info instead!

      <ShowAd
        workerid={ this.props.workerid }
      />
    );
  }
}


export default RewardContactBanner;
