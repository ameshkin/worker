import React from 'react';
import {
  Text, View, Button, Container, Content, Row, Col, Card, CardItem, ListItem,
} from 'native-base';

import globalStyles from "../../../styles/global"
import Header from "../../partials/Header"
var _ = require('lodash');
import Bluebox from "../../../styles/forms/Bluebox"
import theme from "../../../constants/theme"
import {translate} from "../../../../i18n"
import { Actions } from "react-native-router-flux"
import PropTypes from "prop-types"
import Messages from "../../partials/Messages"
import { saveFirestore } from "../../helpers/saveFirestore"
import { Firebase, FirebaseFirestore } from "../../../../lib/firebase"
import {
  Modal,
  Slider,
  ScrollView
} from "react-native"
import modalStyles from "../../../styles/modals"
import listStyles from "../../../styles/lists"
import AutoTags from "react-native-tag-autocomplete"
import computerLanguagesDefault from "../../../static/computer-languages"
import {CheckBox} from "react-native-elements"
import formStyles from "../../../styles/forms"
import { Dropdown } from 'react-native-material-dropdown';  // https://www.npmjs.com/package/react-native-material-dropdown


// TODO: advanced search filter modal shows up on filter click WorkerByCategory.js
// TODO: demo only for now

/*
 FILTERS HERE

 Location
 Skills with at least this level of experience

 */


class AdvancedSearch extends React.Component {
  static propTypes = {
    alert: PropTypes.bool,
    message: PropTypes.string,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onHandleSubmit: PropTypes.func.isRequired,
    category: PropTypes.array,  // from store!
  }

  static defaultProps = {
    error: null,
  }
  constructor (props) {
    super(props)


    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFilterModalClose = this.handleFilterModalClose.bind(this)


    // this.handleChange = this.handleChange .bind(this)

    console.log("AdvancedSearch props: ", props);
    // console.log("AdvancedSearch states: ", this.state);


    this.onChangeText = this.onChangeText.bind(this);

    this.dropRef = this.updateRef.bind(this, 'categoryDrop');

    this.state = {
      loading: true,
      modalVisible: true,
      //suggestions : [ {name:'Mickey Mouse'}, ],
      suggestions : computerLanguagesDefault,
      tagsSelected : [],
      categorySelected: '',
      salaryPerHour: 15,  // TODO: should be based on area
    };

  }

  onChangeText(text) {

    console.log("onChangeText: ", text);



    ['categorySelected']
      .map((name) => ({ name, ref: this[name] }))
      .filter(({ ref }) => ref && ref.isFocused())
      .forEach(({ name, ref }) => {
        this.setState({ [name]: text });
      });





  }

  updateRef(name, ref) {
    this[name] = ref;
  }


  componentWillMount = () => {


  }



  handleSubmit = (value) => {

    this.setState(() => {
      return {
        salaryPerHour: parseFloat(value),
      };
    });


  }



  // handle modal close
  handleFilterModalClose = () => {

    console.log("handleFilterModalClose");

    this.setState(() => {
      return {
        modalVisible: false,
      };
    });

  }

  render() {
    const { alert, loading, error } = this.props;


    /*

                  <View style={globalStyles.filterBorder}>
                    <Text style={ globalStyles.filterHeader } >
                      Worker Category
                    </Text>
                  </View>


     */

    return (

      <Modal
        animationType="slide"
        transparent={ false }
        visible={ this.state.modalVisible }
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <ScrollView>
          <View style={ modalStyles.inside }>
            <Row>
              <Col md={{ size: 6, offset: 3 }} lg={{ size: 12, offset: 3 }}>

                <View style={ globalStyles.filterModalHeader }>
                  <Text style={ globalStyles.filterHeaderLeft } >
                    Search Filters
                  </Text>
                  <Text style={ globalStyles.filterHeaderRight } onPress={ this.handleFilterModalClose } >
                    X
                  </Text>
                </View>

                <View style={globalStyles.filterSection}>

                  <View style={globalStyles.filterHeaderFirst}>
                    <Text style={ globalStyles.filterHeader } >
                      Worker Type
                    </Text>
                  </View>

                  <View>
                    <CheckBox
                      title="Full Time"
                      left
                      iconRight
                      containerStyle={formStyles.checkSearchCnt}
                      textStyle={formStyles.checkSearchLabel}
                      uncheckedIcon='times'
                      uncheckedColor={'#ff0000'}
                      checkedIcon='check'
                      checkedColor={'#4cff43'}
                      checked={ true }
                      // onPress={() => this.handleChange({ key: item.slug, checked: item.checked })}

                    />

                    <CheckBox
                      title="Part Time"
                      left
                      iconRight
                      containerStyle={formStyles.checkSearchCnt}
                      textStyle={formStyles.checkSearchLabel}
                      uncheckedIcon='times'
                      uncheckedColor={'#ff0000'}
                      checkedIcon='check'
                      checkedColor={'#4cff43'}
                      checked={ true }
                      // onPress={() => this.handleChange({ key: item.slug, checked: item.checked })}

                    />

                    <CheckBox
                      title="Remote"
                      left
                      iconRight
                      containerStyle={formStyles.checkSearchCnt}
                      textStyle={formStyles.checkSearchLabel}
                      uncheckedIcon='times'
                      uncheckedColor={'#ff0000'}
                      checkedIcon='check'
                      checkedColor={'#4cff43'}
                      checked={ true }
                      // onPress={() => this.handleChange({ key: item.slug, checked: item.checked })}

                    />

                    <CheckBox
                      title="Pays in Crypto"
                      left
                      iconRight
                      containerStyle={formStyles.checkSearchCnt}
                      textStyle={formStyles.checkSearchLabel}
                      uncheckedIcon='times'
                      uncheckedColor={'#ff0000'}
                      checkedIcon='check'
                      checkedColor={'#4cff43'}
                      checked={ true }
                      // onPress={() => this.handleChange({ key: item.slug, checked: item.checked })}

                    />
                  </View>

                </View>

                <View style={globalStyles.filterSection}>

                  <Dropdown
                    ref={ this.dropRef }
                    onChangeText={this.onChangeText}
                    label='Worker Category'
                    // value='Mango'
                    value={ this.state.categorySelected }
                    data={ this.props.categories.category }  // TODO: not multilingual like this!!!!
                    // valueExtractor={({ slug }) => slug}
                    baseColor={"#ffffff"}
                    textColor={"#ffffff"}
                    itemColor={"#ffffff"}
                    selectedItemColor={ theme.primary }
                    disabledItemColor={"#cccccc"}
                    fontSize={18}
                    labelFontSize={16}
                    containerStyle={ formStyles.dropDownCnt }
                    overlayStyle={ formStyles.dropDownOverlay }
                    pickerStyle={ formStyles.dropDownPicker }
                    itemCount={ 10 }
                    // multiline={true} // does nothing
                  />

                </View>

                <View style={globalStyles.filterSection}>

                  <View style={globalStyles.filterBorder}>
                    <Text style={ globalStyles.filterHeader } >
                      Salary
                    </Text>
                  </View>

                  <View>

                    <Text style={ globalStyles.sliderText } >
                      at least ${ String(this.state.salaryPerHour) } an hour
                    </Text>

                    <Slider
                      step={1}
                      maximumValue={100}
                      onValueChange={this.handleSubmit.bind(this)}
                      value={ this.state.salaryPerHour }
                    />
                  </View>

                </View>

                <View style={ globalStyles.filterSection }>

                  <View style={globalStyles.filterBorder}>
                    <Text style={ globalStyles.filterHeader } >
                      Computer Languages
                    </Text>
                  </View>

                  <View style={globalStyles.spaceCnt}>

                    <CheckBox
                      title="PHP"
                      left
                      iconRight
                      containerStyle={formStyles.checkSearchCnt}
                      textStyle={formStyles.checkSearchLabel}
                      uncheckedIcon='times'
                      uncheckedColor={'#ff0000'}
                      checkedIcon='check'
                      checkedColor={'#4cff43'}
                      checked={ true }
                      // onPress={() => this.handleChange({ key: item.slug, checked: item.checked })}

                    />

                    <CheckBox
                      title="JAVASCRIPT"
                      left
                      iconRight
                      containerStyle={formStyles.checkSearchCnt}
                      textStyle={formStyles.checkLabel}
                      uncheckedIcon='times'
                      uncheckedColor={'#ff0000'}
                      checkedIcon='check'
                      checkedColor={'#4cff43'}
                      checked={ true }
                      // onPress={() => this.handleChange({ key: item.slug, checked: item.checked })}

                    />

                  </View>
                </View>

                <View style={globalStyles.filterSection}>

                  <View style={globalStyles.filterBorder}>
                    <Text style={ globalStyles.filterHeader } >
                      Worker Languages
                    </Text>
                  </View>

                  <View>
                    <CheckBox
                      title="Full Time"
                      left
                      iconRight
                      containerStyle={formStyles.checkSearchCnt}
                      textStyle={formStyles.checkSearchLabel}
                      uncheckedIcon='times'
                      uncheckedColor={'#ff0000'}
                      checkedIcon='check'
                      checkedColor={'#4cff43'}
                      checked={ true }
                      // onPress={() => this.handleChange({ key: item.slug, checked: item.checked })}

                    />

                    <CheckBox
                      title="Part Time"
                      left
                      iconRight
                      containerStyle={formStyles.checkSearchCnt}
                      textStyle={formStyles.checkSearchLabel}
                      uncheckedIcon='times'
                      uncheckedColor={'#ff0000'}
                      checkedIcon='check'
                      checkedColor={'#4cff43'}
                      checked={ true }
                      // onPress={() => this.handleChange({ key: item.slug, checked: item.checked })}

                    />

                    <CheckBox
                      title="Remote"
                      left
                      iconRight
                      containerStyle={formStyles.checkSearchCnt}
                      textStyle={formStyles.checkSearchLabel}
                      uncheckedIcon='times'
                      uncheckedColor={'#ff0000'}
                      checkedIcon='check'
                      checkedColor={'#4cff43'}
                      checked={ true }
                      // onPress={() => this.handleChange({ key: item.slug, checked: item.checked })}

                    />

                    <CheckBox
                      title="Pays in Crypto"
                      left
                      iconRight
                      containerStyle={formStyles.checkSearchCnt}
                      textStyle={formStyles.checkSearchLabel}
                      uncheckedIcon='times'
                      uncheckedColor={'#ff0000'}
                      checkedIcon='check'
                      checkedColor={'#4cff43'}
                      checked={ true }
                      // onPress={() => this.handleChange({ key: item.slug, checked: item.checked })}

                    />
                  </View>

                </View>

              </Col>
            </Row>
          </View>
        </ScrollView>
      </Modal>

    );
  }
}

export default AdvancedSearch;
