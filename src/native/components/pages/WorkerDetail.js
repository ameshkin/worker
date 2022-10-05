import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  StyleSheet
} from 'react-native';
import {
  Container, Content, Card, CardItem, ListItem, Text, View, Col,
} from 'native-base';
import SvgUri from 'react-native-svg-uri';
import Spacer from '../partials/Spacer';
import globalStyles from "../../styles/global"
import Icon from "react-native-vector-icons/FontAwesome"
import RewardContactBanner from "../ads/admob/RewardContactInfo"
import Footer from "../partials/Footer"
import Basic from 'react-native-swiper';
import WorkerLocation from '../partials/WorkerLocation'
import swiperStyles from "../../styles/swipers"
import { translate } from "../../../i18n"


//TODO: not important but would be cool to bind to firestore two ways

const WorkerDetail = ( worker ) => {
  console.log("worker.worker: ", worker.worker.data.worker.languages);

  // Build languages listing
  const languages = worker.worker.data.worker.languages.map(item => (
    <ListItem key={ item.id } style={globalStyles.listItem} leftIcon={{ style: { opacity: 0 } }}>

      <SvgUri
        width="45"
        height="25"
        source={{ uri: item.icon }}
      />

      <Text style={globalStyles.workerListHeader}>
        { translate( item.slug ) }
      </Text>

    </ListItem>
  ));


  // Build Method listing
  const stats = worker.worker.data.worker.skills.map(item => (
    <ListItem key={item.id} style={globalStyles.listItem} leftIcon={{ style: { opacity: 0 } }}>

      <Icon name={ item.icon } size={25} style={globalStyles.icon} color={ item.color }  />

      <Text style={globalStyles.workerListHeader}>
        { translate( item.slug ) }
      </Text>

    </ListItem>
  ));
  //     <Image source={{ uri: worker.worker.image }} style={{ height: 100, width: null, flex: 1 }} />

  return (
    <Container style={globalStyles.main}>
      <Content>

        <View style={ globalStyles.listHeader }>
          <Text style={ globalStyles.listHeaderText } >
            { worker.worker.data.worker.private.fullName }
          </Text>
        </View>

        <Card>
          <CardItem style={ globalStyles.noborder }>
            <ListItem key="item2" style={ globalStyles.listItem } >
              <Text style={globalStyles.customText}>
                { worker.worker.data.worker.headline }
              </Text>
            </ListItem>
          </CardItem>
        </Card>

        <RewardContactBanner
          workerid={ worker.worker.data.worker.id }
        />

        <View style={ globalStyles.listHeader }>
          <Text style={ globalStyles.listHeaderText } >
            { translate( 'ratings_header' ) }
          </Text>
        </View>

        <View style={ globalStyles.ratingStars }>

          <Image source={require('../../images/stars5.png')} style={{ height: 30, width: 159 }} />

        </View>

        <Basic
          style={ swiperStyles.wrapper }
          showsButtons={ true }
          height={ 180 }
        >
          {
            worker.worker.data.worker.ratings.map(item => (
              <View key={ item.id } style={ swiperStyles.slide1 }>

                <View style={swiperStyles.swiperTitleCnt}>
                  <Text style={ swiperStyles.title }>
                    { item.title }
                  </Text>
                </View>

                <View style={swiperStyles.swiperBodyCnt}>
                  <Text style={ swiperStyles.body }>
                    { item.body }
                  </Text>
                </View>

              </View>
            ))
          }
        </Basic>

        <View style={ globalStyles.listHeader }>
          <Text style={ globalStyles.listHeaderText } >
            { translate( 'languages_spoken' ) }
          </Text>
        </View>

        <Card>
          <CardItem>
            <Text style={globalStyles.customText}>
              { languages }
            </Text>
          </CardItem>
        </Card>

        <View style={ globalStyles.listHeader }>
          <Text style={ globalStyles.listHeaderText } >
            { translate( 'worker_stats' ) }
          </Text>
        </View>

        <Card>
          <CardItem>
            <Text style={globalStyles.customText}>
              { stats }
            </Text>
          </CardItem>
        </Card>

        <View style={ globalStyles.listHeader }>
          <Text style={ globalStyles.listHeaderText } >
            { translate( 'more_information' ) }
          </Text>
        </View>

        <Card>
          <CardItem>
            <Text style={globalStyles.customText}>
              { worker.worker.data.worker.moreinfo }
            </Text>
          </CardItem>
        </Card>

        <View style={ globalStyles.listHeader }>
          <Text style={ globalStyles.listHeaderText } >
            { translate( 'city_header' ) }
            { worker.worker.data.worker.location.city }
          </Text>
        </View>

        <WorkerLocation
          latitude={ worker.worker.data.worker.location.latitude }
          longitude={ worker.worker.data.worker.location.longitude }
        />

        <Spacer size={20} />
      </Content>
      <Footer />
    </Container>
  );
};

/*
      <SvgUri
            width="150"
            height="28"
            source={{uri: "http://amir-meshkin.com/trabajamos/svg/star4.svg" }}
            style={{ flex: .5, flexDirection: 'column' }}
          />
 */


export default WorkerDetail;
