// TODO: NOT BEING USED
import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Content, Text, Button, ActionSheet, Label, View
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from '../partials/Loading';
import Messages from '../partials/Messages';
import Header from '../partials/Header';
import globalStyles from "../../styles/global"
import { translate, Translations } from '../../../i18n';
import formStyles from "../../styles/forms"
import Log from 'am-simple-log'

class Locale extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    locale: PropTypes.string.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onChangeLocale: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
  }

  handleChange = (locale) => {
    const { onChangeLocale } = this.props;


    // Log(onChangeLocale,51,1);
    console.log(`locale: `, locale)

    //TODO: save in async storage here!

    onChangeLocale(locale)
      .then(() => Actions.pop)
      .then(e => console.log(`done with action pop hre are props: `, this.props))
      .catch(e => console.log(`Error: ${e}`));



  }

  changeLocale = () => {
    // Form array of possible locales eg. ['en', 'it']
    const options = Object.keys(Translations);
    options.push('Cancel');

    console.log(`Translations: `, Translations)
    // Log(options,51,1);


    // console.log(`Error: ${e}`)


    ActionSheet.show(
      {
        title: 'Select language',
        cancelButtonIndex: options.length - 1,
        options,
      },
      (idx) => {

        // Log(idx,51,1);
        console.log(`idx: `, idx)

        if (idx !== options.length - 1) {
          this.handleChange(options[idx]);
        }
      },
    );
  }

  render() {
    const { loading, error, locale } = this.props;

    console.log("this.props: ", this.props );

    if (loading) return <Loading />;

    return (
      <Container style={globalStyles.main}>
        <Content>
          <Header
            subheader="Change language"
            content=""
          />

          {error && <Messages message={error} />}

          <Button
            style={ formStyles.button }
            onPress={this.changeLocale}>
            <Text style={ formStyles.buttonText } >
              Change from
              {' '}
              {locale}
            </Text>
          </Button>

          <View>
            <Text style={ formStyles.buttonText }>
              { translate('Email', locale) }
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Locale;
