import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View
} from 'react-native';
import {
  Card,
  CardItem,
  Text,
} from 'native-base';

import { Actions } from 'react-native-router-flux'

const styles = StyleSheet.create({
  categoryItem: {
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#AAAAAA',
    borderBottomWidth: 2,
    padding: 5,
    height: 175,
  },
  cover: { flex: 1, height: 150, resizeMode: 'contain' },
  info: {
    flex: 3,
    alignItems: 'flex-end',
    flexDirection: 'column',
    alignSelf: 'center',
    padding: 20,
  },
  description: { fontSize: 18 },
  title: { fontSize: 18, fontWeight: 'bold' },
});

const onPress = item => Actions.recipe({ match: { params: { id: String(item.id) } } });

class CategoryItem extends Component {
  render() {
    return (
      <View style={styles.categoryItem}>
        <Card transparent>
          <CardItem cardBody>
            <TouchableOpacity onPress={() => onPress(this.props.id)} style={{ flex: 1 }}>
              <Image style={styles.cover} source={this.props.image} />
              <View style={styles.info}>
                <Text style={styles.title}>{this.props.title}</Text>
                <Text style={styles.description}>{this.props.description}</Text>
              </View>
            </TouchableOpacity>
          </CardItem>
        </Card>
      </View>
    );
  }
}

export default CategoryItem;
