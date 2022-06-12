import {createSlice} from '@reduxjs/toolkit';
import {getCurrentSubscriptionFromStorage} from '../../services/authService';
import Config from 'react-native-config';
const initialState = {
  subscription: getCurrentSubscriptionFromStorage(),
};
export const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setSubscription: (state, {payload}) => {
      state.subscription = payload;
      state.subscription.isPro =
        payload?.stripe_price_id === Config.STRIPE_PRO_PRICE_ID;
    },
  },
});

export const {setSubscription} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;

export const selectCurrentSubscription = state =>
  state.subscription.subscription;
