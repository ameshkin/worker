
import React, { Component } from 'react';
import { PixelRatio, StatusBarIOS, StyleSheet} from "react-native"
import DeviceInfo from "react-native-device-info"
import {getAllCountries} from "react-native-country-picker-modal"
import {Text, View} from "native-base"
import CountryPicker from "react-native-country-picker-modal"



const NORTH_AMERICA = ['ES', 'US']


class CountryPickerComponent extends Component {
  constructor(props) {

    super(props)
    let userLocaleCountryCode = DeviceInfo.getDeviceCountry()
    const userCountryData = getAllCountries()
      .filter(country => NORTH_AMERICA.includes(country.cca2))
      .filter(country => country.cca2 === userLocaleCountryCode)
      .pop()
    let callingCode = null
    let cca2 = userLocaleCountryCode
    if (!cca2 || !userCountryData) {
      cca2 = 'US'
      callingCode = '1'
    } else {
      callingCode = userCountryData.callingCode
    }
    this.state = {
      cca2,
      callingCode
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Country Picker !</Text>
        <CountryPicker
          countryList={NORTH_AMERICA}
          onChange={value => {
            this.setState({ cca2: value.cca2, callingCode: value.callingCode })
          }}
          cca2={this.state.cca2}
          translation="eng"
        />
        <Text style={styles.instructions}>press on the flag</Text>
        {this.state.country && (
          <Text style={styles.data}>
            {JSON.stringify(this.state.country, null, 2)}
          </Text>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    fontSize: 12,
    textAlign: 'center',
    color: '#888',
    marginBottom: 5
  },
  data: {
    padding: 15,
    marginTop: 10,
    backgroundColor: '#ddd',
    borderColor: '#888',
    borderWidth: 1 / PixelRatio.get(),
    color: '#777'
  }
})


export default CountryPickerComponent;
