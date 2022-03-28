import React from 'react';
import {Provider} from 'react-redux';
import Routes from './Routes';
import store from './src/redux/store';

import * as Sentry from '@sentry/react-native';
import Config from 'react-native-config';
import OneSignal from 'react-native-onesignal';

Sentry.init({
  dsn: Config.SENTRY_URL,
  tracesSampleRate: 1.0,
});

//OneSignal Init Code
OneSignal.setLogLevel(6, 0);
OneSignal.setAppId('e74ed29a-0bb3-4484-9403-45b6271b7f94');
//END OneSignal Init Code

//Prompt for push on iOS
OneSignal.promptForPushNotificationsWithUserResponse(response => {
  console.log('Prompt response:', response);
});

//Method for handling notifications received while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler(
  notificationReceivedEvent => {
    console.log(
      'OneSignal: notification will show in foreground:',
      notificationReceivedEvent,
    );
    let notification = notificationReceivedEvent.getNotification();
    console.log('notification: ', notification);
    const data = notification.additionalData;
    console.log('additionalData: ', data);
    // Complete with null means don't show a notification.
    notificationReceivedEvent.complete(notification);
  },
);

//Method for handling notifications opened
OneSignal.setNotificationOpenedHandler(notification => {
  console.log('OneSignal: notification opened:', notification);
});

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
