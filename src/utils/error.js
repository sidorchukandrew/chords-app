import * as Sentry from '@sentry/react-native';
import Snackbar from 'react-native-snackbar';

export function reportError(error) {
  Sentry.captureException(error);
  Snackbar.show({
    text: 'Uh oh, looks like an error just occurred. Support has been notified.',
    duration: Snackbar.LENGTH_LONG,
    action: {
      text: 'CLOSE',
      onPress: () => Snackbar.dismiss(),
      textColor: '#eaeaea',
    },
  });
  console.log(error);
}
