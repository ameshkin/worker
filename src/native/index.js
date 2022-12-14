import React from 'react';
import { StatusBar, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Stack } from 'react-native-router-flux';
import { PersistGate } from 'redux-persist/es/integration/react';

import { Root, StyleProvider } from 'native-base';
import getTheme from '../../native-base-theme/components';
import theme from '../../native-base-theme/variables/commonColor';

import Routes from './routes/index';
import Loading from './components/partials/Loading';

import Reactotron, { asyncStorage, trackGlobalErrors } from 'reactotron-react-native'

Reactotron
  .configure()
  .use(trackGlobalErrors())
  .useReactNative()
  // .use(reactotronRedux())
  .use(asyncStorage())
  .connect()

// Hide StatusBar on Android as it overlaps tabs
if (Platform.OS === 'android') StatusBar.setHidden(true);
// StatusBar.setHidden(false);  makes all icons dissapear! battery, wifi, etc
StatusBar.setBarStyle("light-content")  // works!!!!

const App = ({ store, persistor }) => (
  <Root>
    <Provider store={store}>

      <PersistGate
        loading={<Loading />}
        persistor={persistor}
      >
        <StyleProvider style={getTheme(theme)}>
          <Router>
            <Stack key="root">
              {Routes}
            </Stack>
          </Router>
        </StyleProvider>
      </PersistGate>
    </Provider>
  </Root>
);

App.propTypes = {
  store: PropTypes.shape({}).isRequired,
  persistor: PropTypes.shape({}).isRequired,
};

export default App;
