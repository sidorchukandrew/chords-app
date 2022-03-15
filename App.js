import React from 'react';
import {Provider} from 'react-redux';
import Routes from './Routes';
import store from './src/redux/store';

import * as Sentry from '@sentry/react-native';
import Config from 'react-native-config';

Sentry.init({
  dsn: Config.SENTRY_URL,
  tracesSampleRate: 1.0,
});

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
