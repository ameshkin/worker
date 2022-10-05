import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, View} from 'react-native';
import {
  Container, Content, List, ListItem, Body, Left, Text,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../partials/Header';
import globalStyles from "../../../styles/global"
import HistoryItem from "../../partials/HistoryItem"


// TODO:  get this from actions
const historyList = [
  {
    id: 1,
    title: 'Handyman',
    description: 'Hire a handyman for general work around the house',
    type: 'http://amir-meshkin.com/trabajamos/svg/moving-truck.svg',
    rating: '../../images/stars1.png',
    rating_width: '275',
    status: 'http://amir-meshkin.com/trabajamos/svg/open.svg',
        workername: 'ameshkin'
  },
  {
    id: 2,
    title: 'Movers',
    description: 'Find someone to help you move',
    type: 'http://amir-meshkin.com/trabajamos/svg/moving-truck.svg',
    rating: '../../images/stars5.png',
        rating_width: '275',
    status: 'http://amir-meshkin.com/trabajamos/svg/open.svg',
        workername: 'ameshkin'
  },
  {
    id: 3,
    title: 'House Cleaners',
    description: 'Hire a maid or service to clean your house',
    type: 'http://amir-meshkin.com/trabajamos/svg/moving-truck.svg',
    rating: '../../images/stars3.png',
        rating_width: '275',
    status: 'http://amir-meshkin.com/trabajamos/svg/open.svg',
        workername: 'ameshkin'
  },
  {
    id: 4,
    title: 'Delivery',
    description: 'Find people willing to deliver just about anything',
    type: 'http://amir-meshkin.com/trabajamos/svg/moving-truck.svg',
    rating: '../../images/stars4.png',
        rating_width: 275,
    status: 'http://amir-meshkin.com/trabajamos/svg/open.svg',
        workername: 'ameshkin'
  },
  {
    id: 5,
    title: 'Personal Shopper',
    description: 'Hire someone to do your shopping',
    type: 'http://amir-meshkin.com/trabajamos/svg/moving-truck.svg',
    rating: '../../images/stars5.png',
        rating_width: '275',
    status: 'http://amir-meshkin.com/trabajamos/svg/open.svg',
        workername: 'ameshkin'
  },
  {
    id: 6,
    title: 'Plumber',
    description: 'Find a plumber!',
    type: 'http://amir-meshkin.com/trabajamos/svg/moving-truck.svg',
    rating: '../../images/star5.png',
        rating_width: '275',
    status: 'http://amir-meshkin.com/trabajamos/svg/open.svg',
    workername: 'ameshkin'
  },
  /*
  {
    id: 7,
    title: 'Lawn Services',
    description: 'Find someone to mow your lawn, gardening or landscaping.',
    image:
      'https://via.placeholder.com/100x100',
  },
  {
    id: 8,
    title: 'Personal Driver',
    description: 'Hire someone to drive you around',
    icon: 'http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg',
  },
    */
];


class ProfileList extends Component {
  constructor(props) {
    super(props);
    this.state = { data: this._addKeys(historyList) };
  }

  _renderItem = ({ item }) => {
    //console.log(item);
    return (

      <HistoryItem
        id={item.id}
        icon={item.icon}
        title={item.title}
        description={item.description}
        rating={item.rating}
        rating_width={item.rating_width}
        type={item.type}
        status={item.status}
        workername={ item.workername }
      />

    );
  };



  _addKeys = categories => {
    // Takes the API response from the NYTimes
    // and adds a key property to the object
    // for rendering purposes
    return categories.map(cat => {
      return Object.assign(cat, { key: cat.title });
    });
  };


  render() {
    return (

      <FlatList data={this.state.data} renderItem={this._renderItem} />

    );
  };
}


const Profile = ({ member, logout }) => (
  <Container style={globalStyles.main}>
    <Content padder>
      <Content>
        <Header
          backgroundColor={'#000000'}
          style={globalStyles.topBar}
          title={`Hi ${member.fullName},`}
          content={`You are currently logged in as ${member.email}`}
          androidStatusBarColor={theme.darkBgColor}
        />
      </Content>
      <List>
        {(member && member.email)
          ? (
            <View>
              <View style={ globalStyles.listHeader }>
                <Text style={ globalStyles.listHeaderText } >
                  TASK HISTORY LOGGED IN
                </Text>
              </View>

              <View>
                <ProfileList />
              </View>

            </View>
          )
          : (

            <View>

              <View style={ globalStyles.listHeader }>
                <Text style={ globalStyles.listHeaderText } >
                  TASK HISTORY NOT LOGGED IN
                </Text>
              </View>

              <View>
                <ProfileList />
              </View>

            </View>
          )
        }
      </List>

    </Content>
  </Container>
);

Profile.propTypes = {
  member: PropTypes.shape({}),
  logout: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  member: {},
};

export default Profile;

/*
      <View style={ globalStyles.listHeader }>
        <Text style={ globalStyles.listHeaderText } >
          TASK HISTORY
        </Text>
      </View>

      <View>
        <ProfileList />
      </View>

 */
