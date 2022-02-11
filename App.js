import React from 'react';
import {Provider} from 'react-redux';
import Routes from './Routes';
import store from './src/redux/store';

import * as Sentry from '@sentry/react-native';
import {SafeAreaView} from 'react-native';

Sentry.init({
  dsn: 'https://fce9d826ac5845b3b3e2809b25b4ae4b@o486136.ingest.sentry.io/6181996',
  tracesSampleRate: 1.0,
});

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <Routes />
      </SafeAreaView>
    </Provider>
  );
}
