import * as Sentry from '@sentry/react-native';
import Snackbar from 'react-native-snackbar';

export function reportError(error, {showError = true}) {
  console.log(error);

  Sentry.captureException(error);
  if (showError) {
    Snackbar?.show({
      text: 'Uh oh, looks like an error just occurred. Support has been notified.',
      duration: Snackbar.LENGTH_LONG,
      numberOfLines: 3,
      action: {
        text: 'CLOSE',
        onPress: () => Snackbar.dismiss(),
        textColor: '#eaeaea',
      },
    });
  }
}
