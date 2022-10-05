import React from 'react';
import PropTypes from 'prop-types';
import {
  FlatList, TouchableOpacity, RefreshControl, Image,
} from 'react-native';
import {
  Container, Content, Card, CardItem, Body, Text, Button,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from '../partials/Loading';
import Error from '../partials/Error';
import Header from '../partials/Header';
import Spacer from '../partials/Spacer';
import globalStyles from "../../styles/global"

const HomeListing = ({
  error,
  loading,
  categories,
  reFetch,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;

  const onPress = item => Actions.recipe({ match: { params: { id: String(item.id) } } });

  return (
    <Container style={globalStyles.main}>
      <Content>
        <Header
          title="Workers in Your Area"
          content="This is here to show how you can read and display data from a data source (in our case, Firebase)."
        />

        <FlatList
          numColumns={2}
          data={categories}
          renderItem={({ item }) => (
            <Card transparent style={{ paddingHorizontal: 6 }}>
              <CardItem cardBody>
                <TouchableOpacity onPress={() => onPress(item)} style={{ flex: 1 }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      height: 100,
                      width: null,
                      flex: 1,
                    }}
                  />
                </TouchableOpacity>
              </CardItem>
              <CardItem cardBody>
                <Body>
                <Spacer size={10} />
                <Text style={globalStyles.centerHeader}>
                  {item.title}
                </Text>
                <Spacer size={15} />
                <Button
                  block
                  bordered
                  small
                  onPress={() => onPress(item)}
                  style={globalStyles.button}
                >
                  <Text style={globalStyles.buttonText}>
                    View Worker
                  </Text>
                </Button>
                <Spacer size={5} />
                </Body>
              </CardItem>
            </Card>
          )}
          keyExtractor={keyExtractor}
          refreshControl={(
            <RefreshControl
              refreshing={loading}
              onRefresh={reFetch}
            />
          )}
        />

        <Spacer size={20} />
      </Content>
    </Container>
  );
};

HomeListing.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  reFetch: PropTypes.func,
};

HomeListing.defaultProps = {
  error: null,
  reFetch: null,
};

export default HomeListing;
