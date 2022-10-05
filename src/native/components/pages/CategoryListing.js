import React, { Component } from 'react';
import {
  FlatList,
} from 'react-native';
import {
  Container,
  Content,
} from 'native-base';
import CategoryItem from '../partials/CategoryItem';
import Header from '../partials/Header';
import globalStyles from '../../styles/global'
import Footer from "../partials/Footer"
import { translate } from "../../../i18n"
// import Spacer from "../partials/Spacer"
// import PropTypes from "prop-types"
import categoryList from '../../static/category-listing.json'

// TODO: PHASE II> get this from actions/ firestore api and store in asyncStorage


// TODO: this should be different depending on location!!!

class CategoryListing extends Component {

  constructor(props) {
    super(props);
    // console.log("super props: ", props);
    this.state = { data: this._addKeysToBooks( categoryList ) };
    // console.log("super state: ", this.state);
    // console.log("super props: ", props);
  }

  // do not use this
  _renderItem = ({ item }) => {

    return (

      <CategoryItem
        id={item.id}
        icon={item.icon}
        description={ item.meta.en.description }
        title={ item.meta.en.title }
        slug={ item.slug }
      />
    );
  };

  _addKeysToBooks = categories => {

    // console.log( "categories: ", categories.category );
    return categories.category.map(cat => {
      return Object.assign(cat, { key: cat.slug });  // Obj[locale]
    });
  };

  // TODO: spanish language


  render() {
    // let locale = '';
    // locale = 'en'



    /* returns null before promise finishes

    // TODO: should i just use props? or always get locale from expo
    let blah = this.props.locale;
    console.log("rblah: ", blah)

    Promise.resolve()
      .then( () => {
        getLocale()    // checks async storage to see if intro has been viewed on this device so we don't see intro EVERY time we open app
        console.log("running getLocale");
      })
      .then( (locale) => {
        console.log("result inside promise: ", locale)


        switch (locale) {
          case 'en':

            return (
              <Container style={globalStyles.main}>
                <Content>
                  <Header
                    subheader={ translate('cat_listing_sub') }
                  />

                  <FlatList
                    data={ this.state.data }
                    // renderItem={ this._renderItem }
                    renderItem={({ item }) => (
                      <CategoryItem
                        id={item.id}
                        icon={item.icon}
                        description={ item.meta.es.description }
                        title={ item.meta.es.title }
                      />
                    )}
                  />

                </Content>
                <Footer />
              </Container>
            );

            break;
          case 'es':

            return (
              <Container style={globalStyles.main}>
                <Content>
                  <Header
                    subheader={ translate('cat_listing_sub') }
                  />

                  <FlatList
                    data={ this.state.data }
                    // renderItem={ this._renderItem }
                    renderItem={({ item }) => (
                      <CategoryItem
                        id={item.id}
                        icon={item.icon}
                        description={ item.meta.es.description }
                        title={ item.meta.es.title }
                      />
                    )}
                  />

                </Content>
                <Footer />
              </Container>
            );

            break;
          default:

            return (
              <Container style={globalStyles.main}>
                <Content>
                  <Header
                    subheader={ translate('cat_listing_sub') }
                  />
                  <FlatList
                    data={ this.state.data }
                    // renderItem={ this._renderItem }
                    renderItem={({ item }) => (
                      <CategoryItem
                        id={item.id}
                        icon={item.icon}
                        description={ item.meta.en.description }
                        title={ item.meta.en.title }
                      />
                    )}
                  />

                </Content>
                <Footer />
              </Container>
            );
        }

      })
      .catch( reason => {
        console.error( 'onRejected function called: ' + reason );
      });
      */

    return (
      <Container style={globalStyles.main}>
        <Content>
          <Header
            subheader={ translate('cat_listing_sub') }
          />

          <FlatList
            data={ this.state.data }
            // renderItem={ this._renderItem }
            renderItem={({ item }) => (
              <CategoryItem
                id={item.id}
                icon={item.icon}
                description={ translate(`cat_${item.slug}_description`)  }
                // title={ item.meta.en.title }  // cat_handyman_label
                label={  translate(`cat_${item.slug}_label`) }
                slug={ item.slug }
              />
            )}
          />

        </Content>
        <Footer />
      </Container>
    );

    // return null; // return null for now until promise finishes
  };


}

export default CategoryListing;
