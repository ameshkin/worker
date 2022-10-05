import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity, Image,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import listStyles from '../../styles/lists'
import SvgUri from 'react-native-svg-uri';
import globalStyles from '../../styles/global';
import {Col} from "native-base"

/*

          <View style={ listStyles.coverContainer }>
            <Image style={ listStyles.cover } source={{ uri: this.props.image }} />
                          <Icon name={ this.props.icon } size={ 50 } style={ listStyles.iconLeft } color={"#ffffff"}  />
          </View>

 */
const onPress = (category) => {
  Actions.recipes({ match: { params: { category: String(category) } } });
};

class HistoryItem extends Component {

  constructor(props) {
    super(props);
    this.state = { pressing: false };
  }



  render() {

    // let rating =  this.props.title;
    return (
      <View style={ globalStyles.historyItem }>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => onPress(this.props.id)} >

          <View style={ listStyles.flexContainerRow }>


            <View style={ listStyles.flexColumnOneHalf}>
              <Text style={ listStyles.taskTitle }>{ this.props.workername }</Text>
              <Text style={ listStyles.taskDescription }>{ this.props.title }</Text>
            </View>

            <View style={ listStyles.flexColumnOneHalf}>
              <Image source={require('../../images/stars5.png')} style={{ height: 30, width: 159 }} />
            </View>

          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

/*



            <View style={ listStyles.taskIcon }>
              <SvgUri
                style={ listStyles.taskIcon }
                width="25"
                height="25"
                source={{uri: this.props.status}}
              />
            </View>


                 <Image source={require( this.props.rating )} style={{ height: 52, width: 275, flex: 1 }} />



 <SvgUri
                width="275"
                height="25"
                source={{uri: this.props.rating}}
              />
 */

export default HistoryItem;
