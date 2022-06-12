import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {selectCurrentSubscription} from '../redux/slices/subscriptionSlice';
import {getSetlistActiveSessions} from '../services/sessionsService';
import {reportError} from '../utils/error';

export default function useActiveSessions(setlistId) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState();
  const [data, setData] = useState([]);
  const currentSubscription = useSelector(selectCurrentSubscription);
  const loading = status === 'loading';
  const resolved = status === 'resolved';
  const errored = status === 'rejected';
  const empty = status === 'empty';

  useEffect(() => {
    async function fetchData() {
      try {
        setStatus('loading');
        let result = await getSetlistActiveSessions(setlistId);
        setData(result?.data);
        if (result?.data?.length === 0) {
          setStatus('empty');
        } else {
          setStatus('resolved');
        }
      } catch (e) {
        setStatus('rejected');
        reportError(e);
        setError(e);
      }
    }

    if (currentSubscription.isPro) {
      fetchData();
    }
  }, [setlistId, currentSubscription.isPro]);
  return {data, status, error, loading, resolved, errored, empty};
}
