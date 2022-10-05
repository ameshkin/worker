import React, { Component } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';

// TODO: the options for this picker need to come from firebase
class CategoryPicker extends Component {
  state = {userCategory: ''}

  updateCategory = (user) => {
    this.setState({ userCategory: userCategory })
  }

  render() {
    return (
      <View style={styles.picker}>
        <Text style = {styles.pickerHeader}>Select a Category</Text>
        <Text style = {styles.text}>{this.state.user}</Text>
        <Picker
          selectedValue = {this.state.userCategory}
          onValueChange = {this.updateCategory}>
          <Picker.Item label = "Handyman" value = "handyman" />
          <Picker.Item label = "Moving" value = "moving" />
          <Picker.Item label = "Cleaning" value = "cleaning" />
          <Picker.Item label = "Delivery" value = "delivery" />
          <Picker.Item label = "Shopping" value = "shopping" />
          <Picker.Item label = "Plumbing" value = "plumbing" />
        </Picker>

      </View>
    )
  }
}
export default CategoryPicker

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    paddingTop: 5,
    paddingBottom: 0,
    alignSelf: 'center',
    color: '#000'
  },
  pickerHeader: {
    fontWeight: '700',
    fontSize: 16,
    paddingTop: 20,
    alignSelf: 'center',
    color: '#000'
  },
  picker: {
    paddingTop: 0,
    marginTop: 0,

  }
})
