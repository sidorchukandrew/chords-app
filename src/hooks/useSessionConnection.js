import {useEffect, useContext} from 'react';

import {useSelector} from 'react-redux';
import {SessionConnectionContext} from '../contexts/SessionConnectionProvider';
import {selectCurrentSubscription} from '../redux/slices/subscriptionSlice';

export default function useSessionConnection(setlistId) {
  const {activeSessionDetails, setActiveSessionDetails} = useContext(
    SessionConnectionContext,
  );
  const currentSubscription = useSelector(selectCurrentSubscription);

  useEffect(() => {
    if (setlistId && currentSubscription.isPro) {
      // check if there are any sessions you are in charge of and auto connect to it if one is found
    }
  }, [setlistId, currentSubscription.isPro]);

  function joinSessionAsMember(sessionId) {}

  return {joinSessionAsMember, activeSessionDetails, setActiveSessionDetails};
}
