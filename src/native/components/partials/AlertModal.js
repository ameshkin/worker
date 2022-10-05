// TODO: not using because this.setstate won't set state of last screen
import React from 'react';
import { View, Modal } from 'react-native';
import {Button, Col, Content, Row, Text} from "native-base"
import globalStyles from "../../styles/global"
import modalStyles from "../../styles/modals"
import { translate } from "../../../i18n"


const AlertModal = ( data ) => (

  <View style={ modalStyles.main }>
    <Modal
      animationType="slide"
      transparent={ false }
      visible={ this.state.modalVisible }
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={ modalStyles.inside }>
        <Row>
          <Col md={{ size: 6, offset: 3 }} lg={{ size: 12, offset: 3 }}>

            <View style={{marginTop: 22}}>
              <View>
                <Text style={ modalStyles.modalHeader }>
                  { translate( 'modal1_h1' ) }
                </Text>

                <Text style={ modalStyles.modalSubHeader }>
                  { translate( 'modal1_h2' ) }
                </Text>

                <Text style={ modalStyles.modalText }>
                  { translate( 'modal1_h3' ) }
                </Text>

                <Text style={ modalStyles.modalSubHeader }>
                  { translate( 'modal1_h4' ) }
                </Text>

                <Text style={ modalStyles.modalText }>
                  { translate( 'modal1_h5' ) }
                </Text>
              </View>
            </View>

            <View style={{marginTop: 22}}>
              <View>
                <Button
                  onPress={() => {
                    this.setState({modalVisible: false});
                  }}
                  style={ modalStyles.button }
                >
                  <Text
                    style={ modalStyles.buttonText }
                  >
                    { translate( 'modal1_button' ) }
                  </Text>
                </Button>
              </View>
            </View>

          </Col>
        </Row>
      </View>
    </Modal>
  </View>
);

export default AlertModal;

/*


                <Text style={ modalStyles.modalText }>
                  name: { data.fname }
                </Text>


                <Text style={ modalStyles.modalText }>
                  email: { data.email }
                </Text>

 */
