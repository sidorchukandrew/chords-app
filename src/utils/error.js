import * as Sentry from '@sentry/react-native';

export function reportError(error) {
  Sentry.captureException(error);
  console.log(error);
}
