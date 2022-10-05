import React from "react"
import {StyleSheet, View, Text, Image, AsyncStorage, Platform, } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
// import Home from "./Home"
import Loading from "../partials/Loading"
// import { translate, getLocale } from "../../../i18n"
import { getLocale } from "../../../i18n"
// import PropTypes from "prop-types"
import CategoryListing from "./CategoryListing"


const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  imageCnt: {
    width: 350,
    height: 400,
  },
  image: {
    width: 350,
    height: 400,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 22,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 0,
  },
  titleCnt: {
    marginBottom: 0,
    paddingBottom: 0,
  }
});

// TODO: make slides multilingual
const slides = [
  {
    key: 'somethun',
    title: 'Choose a Category',
    text: '',
    //image_local: require('../../images/test.png'),
    image: 'https://via.placeholder.com/350x150',
    imageStyle: styles.image,
    backgroundColor: '#5f30ff',
    icon: 'ios-options-outline',
  },
  {
    key: 'somethun-dos',
    title: '',
    text: '',
    icon: 'ios-images-outline',
    image: 'https://via.placeholder.com/350x150',
    imageStyle: styles.image,
    backgroundColor: '#fe8e2e',
  },
  {
    key: 'somethun1',
    title: '',
    text: '',
    image: 'https://via.placeholder.com/350x150',
    imageStyle: styles.image,
    backgroundColor: '#02b50b',
    icon: 'ios-images-outline',
  }
];



const setIntro = async flag => {
  try {
    console.log("setIntro flag: ", flag);
    let set = await AsyncStorage.setItem( 'flag_intro', flag )
      .catch((err) => {
        console.log(err);

      });
    return set;

  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
};



// <TouchableOpacity onPress={() => onPress(item)} style={{ flex: 1 }}>     </TouchableOpacity>
// const onPress = item => Actions.recipe({ match: { params: { id: String(item.id) } } });

// TODO: for now just use static data
class HomeIntro extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
      loading: true
    };
  }

/* promise functions won't work here
  static propTypes = {
    locale: PropTypes.string.isRequired
  }

  static defaultProps = {
    // locale: I18n.currentLocale(), // default should stay default, translation now finds current locale
    // locale:  getLocale()
}
*/




_renderOnSkip = () => {

    let flag = { showRealApp: true } ;

    setIntro( JSON.stringify( flag ) );

    // console.log("_renderOnSkip setIntroResult: ", setIntroResult);

    this.setState({ showRealApp: true });
  }

// const getUserStorage = async => {
// export function getUserStorage() {
// export const getUserStorage = async () => {
// function getUserStorage() {

  getUserStorage = async flag => {
    // let state = {}
    try {


      AsyncStorage.getItem('flag_intro')
        .then((values) => {  // do not show if flag intro set in async storage, create state but don't set
            //   value = values;
            // console.log('gettingFlag: ',values);

            let flag = JSON.parse( values );

            if(flag === null) {
              // console.log( "flag 1: ", flag );


              let state = {
                showRealApp: false,
                loading: false
              }

              this.setState({ showRealApp: false, loading: false });
              return state;
            } else {
              // console.log( "flag 2: ", flag );
              if( flag.showRealApp || flag.showRealApp !== 'null' || flag.showRealApp !== 'undefined'  ) {
                // console.log( "show real app is true: ", flag.showRealApp );
                state = {
                  showRealApp: true,
                  loading: false
                }
                this.setState({ showRealApp: true, loading: false  });
                return state;
              } else {
                // console.log( "show real app is NOT TRUE: ", flag.showRealApp );
                let state = {
                  showRealApp: false,
                  loading: false
                }
                this.setState({ showRealApp: false, loading: false });
                return state;
              }
            }
          })
        .then(() => {  // run get locale here

          Expo.DangerZone.Localization.getCurrentLocaleAsync()
            .then((locale) => {

              console.log("getLocale in homeIntro: ", locale)
              return locale;

            })
            .then((locale) => {
              // console.log("result inside promise: ", locale)

              this.setState({ locale: locale });
            })
            .catch((err) => {
              console.log("danger zone error: ");
              console.error(err.message);
            });
        });


    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }

    // this.setState({ state });
  }

  componentWillMount() {



    Promise.resolve()
      .then(() => this.getUserStorage() )
      // .then(() => getLocale() )
      .then((response) => {
        // console.log(" componentWillMount: ", this.state);

      })
      // TODO: get locale here and save in props


      .catch( reason => {
        console.error( 'onRejected function called: ' + reason );
      })



    /*
    Promise.resolve()
      .then( () => {
       return this.getUserStorage()    // checks async storage to see if intro has been viewed on this device so we don't see intro EVERY time we open app
      })
      .catch( reason => {
        console.error( 'onRejected function called: ' + reason );
      })
    */

  }


  _renderItem = props => (
    <View
      style={[styles.mainContent, {
        paddingTop: 0,
        marginTop: 0,
        paddingBottom: props.bottomSpacer,
        width: props.width,
        height: props.height,
        backgroundColor: props.backgroundColor,
      }]}
      colors={props.colors}

    >

      <View style={ styles.titleCnt} >
        <Text style={styles.title}>{props.title}</Text>
      </View>

      <View style={styles.imageCnt}>
        <Image source={{uri: props.image }} style={ styles.image } />
      </View>

      <View>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </View>
  );

  _onDone = () => {

    setIntro( JSON.stringify( flag ) );

    //TODO: set this in async storage so we don't see intro EVERY time we open app
    this.setState({ showRealApp: true });
  }

  // return <CategoryListing />;
  render() {

    if ( this.state.loading ) return <Loading />;

    if ( this.state.showRealApp ) {
      // return <Home />;
      return <CategoryListing />;
    } else {
      return <AppIntroSlider
        slides={ slides }
        onDone={ this._onDone }
        renderItem={ this._renderItem }
        showSkipButton={ true }
        onSkip={ this._renderOnSkip }
        // hidePagination={ true }

      />;
    }
  }
}


export default HomeIntro;
