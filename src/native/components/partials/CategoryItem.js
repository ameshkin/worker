import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import listStyles from '../../styles/lists'
import SvgUri from 'react-native-svg-uri';
import globalStyles from '../../styles/global';

/*

          <View style={ listStyles.coverContainer }>
            <Image style={ listStyles.cover } source={{ uri: this.props.image }} />
                          <Icon name={ this.props.icon } size={ 50 } style={ listStyles.iconLeft } color={"#ffffff"}  />
          </View>

 */
/*
const onPress = (category) => {
  Actions.recipes({ match: { params: { category: String(category) } } });
};
*/

const onPress = ( category, title, slug ) => {

  /*
  //category
  console.log("in category item slug: ", slug);
  console.log("in category item title: ", title);
  console.log("in category item category: ", category);

*/

  /*
  Actions.recipes({ match: { params: {
    category: String( category ),
    categoryLabel: String( title ),
    categorySlug: String( slug )
  } } });
  */

  // gets rid of error  // Actions.profile
  Actions.recipes({ match: { params: {
        category: String( category ),
        categoryLabel: String( title ),
        categorySlug: String( slug )
      } } });

};

class CategoryItem extends Component {

  constructor(props) {
    super(props);
    this.state = { pressing: false };
  }

  render() {

    return (
      <View style={ listStyles.categoryItem }>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => onPress( this.props.id, this.props.label, this.props.slug )} >

          <View style={ listStyles.flexContainerRow }>

            <View style={ listStyles.homeIcon }>
              <SvgUri
                width="50"
                height="50"
                source={{uri: this.props.icon}}
              />
            </View>

            <View style={ listStyles.flexColumn}>
              <Text style={ listStyles.label }>{this.props.label}</Text>
              <Text style={ listStyles.description }>{this.props.description}</Text>
            </View>

          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default CategoryItem;
