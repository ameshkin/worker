import React, {Component} from "react"
import {
  Container, Content, List,
  View,
} from 'native-base';
import globalStyles from "../../styles/global"
import Header from "../partials/Header"
import {translate} from "../../../i18n"

const BuyAdPage = () => (

  <Container style={globalStyles.main}>
    <Content>
      <List>

        <View>
          <Content>
            <Header
              subheader={ translate('greeting' ) }
              content={ translate('greeting_sub' ) + ` ${member.email}`}
            />
          </Content>

        </View>

      </List>
    </Content>
  </Container>
);

export default BuyAdPage;
