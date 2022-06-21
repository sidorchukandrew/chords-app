import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {useSelector} from 'react-redux';
import {selectCurrentSubscription} from '../redux/slices/subscriptionSlice';
import {getSetlistActiveSessions} from '../services/sessionsService';
import {reportError} from '../utils/error';

export default function useSessions(setlistId) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState();
  const [data, setData] = useState([]);
  const currentSubscription = useSelector(selectCurrentSubscription);
  const loading = status === 'loading';
  const resolved = status === 'resolved';
  const errored = status === 'rejected';

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        try {
          setStatus('loading');
          let result = await getSetlistActiveSessions(setlistId);
          setData(result?.data);

          setStatus('resolved');
        } catch (e) {
          setStatus('rejected');
          reportError(e);
          setError(e);
        }
      }

      if (currentSubscription.isPro) {
        fetchData();
      }
    }, [setlistId, currentSubscription.isPro]),
  );

  function updateData(newData) {
    setData(newData);
  }
  return {data, status, error, loading, resolved, errored, updateData};
}
